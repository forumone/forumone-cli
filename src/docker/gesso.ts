import Project from '../project/Project';

import runComposer from './runComposer';
import runComposeService from './runComposeService';

function runStylesContainer(project: Project, args: ReadonlyArray<string>) {
  return runComposeService('gesso', args, {
    cwd: project.root,
    extraFiles: ['docker-compose.cli.yml'],
    stdout: 'pipe',
  });
}

export function runStylesBuild(project: Project) {
  return runStylesContainer(project, ['grunt', 'gessoBuildStyles']);
}

export function runStylesWatch(project: Project) {
  return runStylesContainer(project, []);
}

function runPatternLabContainer(project: Project, args: ReadonlyArray<string>) {
  return runComposeService('pattern-lab', args, {
    cwd: project.root,
    extraFiles: ['docker-compose.cli.yml'],
    stdout: 'pipe',
  });
}

export function runPatternLabBuild(project: Project) {
  // Explicitly override memory limit for large PL builds
  return runPatternLabContainer(project, [
    'php',
    '-dmemory_limit=-1',
    'core/console',
    '--generate',
  ]);
}

export function runPatternLabWatch(project: Project) {
  return runPatternLabContainer(project, []);
}

export function installPatternLabDependencies(project: Project) {
  return runComposer({
    args: ['install'],
    project,
    serviceName: 'theme-composer',
  });
}
