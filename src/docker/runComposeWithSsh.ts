import getSshOptions from './getSshOptions';
import runComposeAsUser from './runComposeAsUser';
import { RunComposeServiceOptions } from './runComposeService';

// Runs a docker-compose service as the host machine's user, with their SSH configuration mounted
// into the container (where available).
async function runComposeWithSsh(
  service: string,
  serviceArgs: ReadonlyArray<string>,
  { composeArgs = [], ...options }: RunComposeServiceOptions,
) {
  const sshOptions = await getSshOptions();

  return runComposeAsUser(service, serviceArgs, {
    ...options,
    composeArgs: [...composeArgs, ...sshOptions],
  });
}

export default runComposeWithSsh;
