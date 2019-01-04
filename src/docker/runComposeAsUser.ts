import getUserGroupOptions from './getUserGroupOptions';
import runComposeService, {
  RunComposeServiceOptions,
} from './runComposeService';

async function runComposeAsUser(
  service: string,
  serviceArgs: ReadonlyArray<string>,
  { composeArgs = [], ...options }: RunComposeServiceOptions,
) {
  return runComposeService(service, serviceArgs, {
    ...options,
    composeArgs: [...composeArgs, ...getUserGroupOptions()],
  });
}

export default runComposeAsUser;
