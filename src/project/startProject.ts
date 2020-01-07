import getCertificates from '../cert';
import runCompose from '../docker/runCompose';
import runProcess from '../process/runProcess';
import findNetworkAddress from '../util/findNetworkAddress';

import Project from './Project';

export interface StartProjectOptions {
  foreground: boolean;
  xdebug?: boolean;
  xdebugProfile?: boolean;
}

async function startGruntProject(root: string) {
  return runProcess('grunt', [], { cwd: root });
}

async function startComposeProject(root: string, options: StartProjectOptions) {
  // When running in the foreground, bring down the cluster if a container crashes. This can aid in
  // debugging the setup.
  const runArgs = options.foreground
    ? ['--abort-on-container-exit']
    : ['--detach'];

  const { certificate, certificateKey } = await getCertificates();

  const environment: NodeJS.ProcessEnv = {
    F1_TLS_CERT: certificate,
    F1_TLS_KEY: certificateKey,
  };

  // Add local IP address for XDebug to find. See comments in the function for why.
  const address = findNetworkAddress();
  if (address) {
    environment.F1_XDEBUG_REMOTE = address;
  }

  if (options.xdebug) {
    environment.F1_XDEBUG = '1';
  }

  if (options.xdebugProfile) {
    environment.F1_XDEBUG_PROFILE = '1';
  }

  return runCompose(['up', '--build', ...runArgs], {
    cwd: root,
    env: environment,
  });
}

async function startProject(project: Project, options: StartProjectOptions) {
  switch (project.type) {
    case 'compose':
      return startComposeProject(project.root, options);

    case 'javascript':
      return startGruntProject(project.root);
  }
}

export default startProject;
