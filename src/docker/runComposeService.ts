import { Command } from '../process/runProcess';

import runCompose, { RunComposeOptions } from './runCompose';

export interface RunComposeServiceOptions extends RunComposeOptions {
  composeArgs?: ReadonlyArray<string>;
}

export interface ServiceCommand extends Command {
  detach(): Promise<string>;
}

function runComposeService(
  service: string,
  serviceArgs: ReadonlyArray<string>,
  { composeArgs = [], cwd, ...options }: RunComposeServiceOptions,
): ServiceCommand {
  const command = runCompose(
    ['run', '--rm', ...composeArgs, service, ...serviceArgs],
    {
      cwd,
      ...options,
    },
  );

  const detachCommand = runCompose(
    ['run', '-d', ...composeArgs, service, ...serviceArgs],
    {
      cwd,
      ...options,
    },
  );

  return {
    ...command,
    detach() {
      return detachCommand.stdout();
    },
  };
}

export default runComposeService;
