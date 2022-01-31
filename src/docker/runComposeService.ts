import { Command } from '../process/runProcess';

import runCompose, { RunComposeOptions } from './runCompose';

export interface RunComposeServiceOptions extends RunComposeOptions {
  composeArgs?: ReadonlyArray<string>;
}

export interface ServiceCommand extends Command {
  detach(): Promise<string>;
}

async function runComposeService(
  service: string,
  serviceArgs: ReadonlyArray<string>,
  { composeArgs = [], cwd, ...options }: RunComposeServiceOptions,
): Promise<ServiceCommand> {
  const command = await runCompose(
    ['run', '--rm', ...composeArgs, service, ...serviceArgs],
    {
      cwd,
      ...options,
    },
  );

  const detachCommand = await runCompose(
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
