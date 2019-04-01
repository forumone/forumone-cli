import merge from 'merge2';
import split from 'split2';
import { finished } from 'stream';
import { promisify } from 'util';

import attach from '../docker/attach';
import kill from '../docker/kill';
import { ServiceCommand } from '../docker/runComposeService';

export interface NamedCommand extends ServiceCommand {
  name: string;
}

// Runs several child processes in parallel, multiplexing their stdout channels.
// The behavior is like docker-compose, but with some differences - it is much
// less intelligent about terminal escape codes, for instance.
//
// This function is more complicated than it perhaps could be - the usage of detached
// containers is due to a strange behavior in Windows, where running a container via
// 'docker-compose run' results in no output from stdout. The containers are still
// running and have output, but the run command never sees it.
//
// As a result, we have to detach the containers and then reattach - even though this is
// what docker-compose does internally. Why this is the case is a total mystery.
async function runParallelProcesses(
  commands: ReadonlyArray<NamedCommand>,
): Promise<void> {
  if (commands.length === 0) {
    return;
  }

  const maxNameLen = commands.reduce(
    (len, { name }) => Math.max(len, name.length),
    0,
  );

  const children = await Promise.all(
    commands.map(async command => {
      const id = await command.detach();

      return {
        id,
        child: attach(id),
        name: command.name,
      };
    }),
  );

  // Create an array of split streams: only output single lines, no matter
  // how badly-behaved the child process might be.
  const streams = children.map(({ name, child }) => {
    // Prefix each output with the process' name, like docker-compose does.
    const prefix = name.padEnd(maxNameLen) + ' | ';

    return child.stdout.pipe(split(line => prefix + line + '\n'));
  });

  // Allow each stream to send data down in parallel
  const stream = merge(streams);

  stream.pipe(
    process.stdout,
    { end: false },
  );

  // Try to wait on everything to run to completion.
  const done = promisify(finished)(stream);

  const promises: Promise<unknown>[] = children.map(({ child }) => child);

  // If the user presses ^C, ensure we clean up the detached containers by killing them
  // off - this avoids leaking long-lived watch commands.
  process.once('SIGINT', () => {
    const ids = children.map(({ id }) => id);
    kill(ids).then(reraise, reraise);

    function reraise() {
      // Re-raise SIGINT to terminate the Node.js process.
      // This is safe because we only listen to SIGINT as a .once() handler, so re-raising
      // effectively causes Node.js to see the signal again and take the default action.
      process.kill(process.pid, 'SIGINT');
    }
  });

  try {
    await Promise.all([...promises, done]);
  } catch (error) {
    // If any detached container failed, kill all containers - if we don't do this here,
    // we won't be able to perform any cleanup since the detached container isn't really
    // owned by anyone other than the Docker daemon.
    const ids = children.map(({ id }) => id);
    await kill(ids);
  }
}

export default runParallelProcesses;
