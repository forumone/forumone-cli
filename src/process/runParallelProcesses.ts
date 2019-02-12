import { ExecaChildProcess } from 'execa';
import merge from 'merge2';
import split from 'split2';
import { finished } from 'stream';
import { promisify } from 'util';

export type NamedChild = [string, ExecaChildProcess];

// Runs several child processes in parallel, multiplexing their stdout channels.
// The behavior is like docker-compose, but with some differences - it is much
// less intelligent about terminal escape codes, for instance.
async function runParallelProcesses(
  children: ReadonlyArray<NamedChild>,
): Promise<void> {
  if (children.length === 0) {
    return;
  }

  const maxNameLen = children.reduce(
    (len, [name]) => Math.max(len, name.length),
    0,
  );

  // Create an array of split streams: only output single lines, no matter
  // how badly-behaved the child process might be.
  const streams = children.map(([name, child]) => {
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

  const promises: Promise<unknown>[] = children.map(([, child]) => child);

  await Promise.all([...promises, done]);
}

export default runParallelProcesses;
