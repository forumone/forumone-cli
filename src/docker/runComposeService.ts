import runCompose, { RunComposeOptions } from './runCompose';

export interface RunComposeServiceOptions extends RunComposeOptions {
  composeArgs?: ReadonlyArray<string>;
}

async function runComposeService(
  service: string,
  serviceArgs: ReadonlyArray<string>,
  { composeArgs = [], cwd, ...options }: RunComposeServiceOptions,
) {
  return runCompose(['run', '--rm', ...composeArgs, service, ...serviceArgs], {
    cwd,
    ...options,
  });
}

export default runComposeService;
