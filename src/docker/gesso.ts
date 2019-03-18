import Project from '../project/Project';

import runComposer from './runComposer';
import runComposeService from './runComposeService';

function runStylesContainer(
  project: Project,
  dryRun: boolean,
  args: ReadonlyArray<string>,
) {
  return runComposeService('gesso', args, {
    cwd: project.root,
    dryRun,
    extraFiles: ['docker-compose.cli.yml'],
    stdout: 'pipe',
  });
}

export function runStylesBuild(project: Project, dryRun: boolean) {
  return runStylesContainer(project, dryRun, ['grunt', 'gessoBuildStyles']);
}

export function runStylesWatch(project: Project, dryRun: boolean) {
  return runStylesContainer(project, dryRun, []);
}

function runPatternLabContainer(
  project: Project,
  dryRun: boolean,
  args: ReadonlyArray<string>,
) {
  return runComposeService('pattern-lab', args, {
    cwd: project.root,
    dryRun,
    extraFiles: ['docker-compose.cli.yml'],
    stdout: 'pipe',
  });
}

export function runPatternLabBuild(project: Project, dryRun: boolean) {
  // Explicitly override memory limit for large PL builds
  return runPatternLabContainer(project, dryRun, [
    'php',
    '-dmemory_limit=-1',
    'core/console',
    '--generate',
  ]);
}

export function runPatternLabWatch(project: Project, dryRun: boolean) {
  return runPatternLabContainer(project, dryRun, []);
}

export function installPatternLabDependencies(
  project: Project,
  dryRun: boolean,
) {
  return runComposer({
    args: ['install'],
    dryRun,
    project,
    serviceName: 'theme-composer',
  });
}
