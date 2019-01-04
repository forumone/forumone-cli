import runProcess, { RunProcessOptions } from '../process/runProcess';

export interface RunDockerOptions extends RunProcessOptions {
  dockerArgs?: ReadonlyArray<string>;
}

async function runDocker(
  service: string,
  serviceArgs: ReadonlyArray<string>,
  { dockerArgs = [], ...options }: RunDockerOptions,
) {
  return runProcess(
    'docker',
    ['run', '-it', '--rm', ...dockerArgs, service, ...serviceArgs],
    options,
  );
}

export default runDocker;
