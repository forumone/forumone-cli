import getCertificates from '../cert';
import runProcess from '../process/runProcess';
import findNetworkAddress from '../util/findNetworkAddress';

import Project from './Project';

export interface StartProjectOptions {
  dryRun: boolean;
  foreground: boolean;
  xdebug?: boolean;
}

async function startGruntProject(root: string, dryRun: boolean) {
  return runProcess('grunt', [], { cwd: root, dryRun });
}

async function startComposeProject(root: string, options: StartProjectOptions) {
  // When running in the foreground, bring down the cluster if a container crashes. This can aid in
  // debugging the setup.
  const runArgs = options.foreground
    ? ['--abort-on-container-exit']
    : ['--detach'];

  const environment: NodeJS.ProcessEnv = { PWD: root };

  if (!options.dryRun) {
    const { certificate, certificateKey } = await getCertificates();

    environment.F1_TLS_CERT = certificate;
    environment.F1_TLS_KEY = certificateKey;
  }

  // Add local IP address for XDebug to find. See comments in the function for why.
  const address = findNetworkAddress();
  if (address) {
    environment.F1_XDEBUG_REMOTE = address;
  }

  if (options.xdebug) {
    environment.F1_XDEBUG = '1';
  }

  return runProcess('docker-compose', ['up', '--build', ...runArgs], {
    cwd: root,
    dryRun: options.dryRun,
    env: environment,
  });
}

async function startProject(project: Project, options: StartProjectOptions) {
  switch (project.type) {
    case 'compose':
      return startComposeProject(project.root, options);

    case 'javascript':
      return startGruntProject(project.root, options.dryRun);
  }
}

export default startProject;
