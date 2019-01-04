import getSshOptions from './getSshOptions';
import runComposeAsUser from './runComposeAsUser';
import { RunComposeServiceOptions } from './runComposeService';

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
