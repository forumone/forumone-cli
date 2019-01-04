import runProcess from '../process/runProcess';
import findNetworkAddress from '../util/findNetworkAddress';

import Project from './Project';

export interface StartProjectOptions {
  dryRun: boolean;
  foreground: boolean;
}

async function startGruntProject(root: string, dryRun: boolean) {
  return runProcess('grunt', [], { cwd: root, dryRun });
}

async function startComposeProject(root: string, options: StartProjectOptions) {
  // Foreground is the default in compose, but not in f1-cli
  const foregroundArgs = options.foreground ? [] : ['--detach'];

  const environment: NodeJS.ProcessEnv = { PWD: root };

  // Add local IP address for XDebug to find
  const address = findNetworkAddress();
  if (address) {
    environment.F1_XDEBUG_REMOTE = address;
  }

  return runProcess('docker-compose', ['up', '--build', ...foregroundArgs], {
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
