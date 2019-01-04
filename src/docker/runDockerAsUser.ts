import getUserGroupOptions from './getUserGroupOptions';
import runDocker, { RunDockerOptions } from './runDocker';

// Runs a one-off Docker container as the host user.
async function runDockerAsUser(
  service: string,
  serviceArgs: ReadonlyArray<string>,
  { dockerArgs = [], ...options }: RunDockerOptions,
) {
  return runDocker(service, serviceArgs, {
    ...options,
    dockerArgs: [...dockerArgs, ...getUserGroupOptions()],
  });
}

export default runDockerAsUser;
