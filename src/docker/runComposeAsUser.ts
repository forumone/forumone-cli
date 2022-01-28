import getCertificates from '../cert';
import getUserGroupOptions from './getUserGroupOptions';
import runComposeService, {
  RunComposeServiceOptions,
} from './runComposeService';

// Runs a docker-compose service as the host machine's user.
async function runComposeAsUser(
  service: string,
  serviceArgs: ReadonlyArray<string>,
  { composeArgs = [], env = {}, ...options }: RunComposeServiceOptions,
) {
  const { certificate, certificateKey } = await getCertificates();

  const environment: NodeJS.ProcessEnv = {
    F1_TLS_CERT: certificate,
    F1_TLS_KEY: certificateKey,
  };

  return runComposeService(service, serviceArgs, {
    ...options,
    env: { ...environment, ...env },
    composeArgs: [...composeArgs, ...getUserGroupOptions()],
  });
}

export default runComposeAsUser;
