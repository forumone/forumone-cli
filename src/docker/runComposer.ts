import makeDir from 'make-dir';

import Project from '../project/Project';
import cachePath from '../util/cachePath';

import runComposeAsUser from './runComposeAsUser';

export interface RunComposerOptions {
  /**
   * Optional name to override service. Defaults to `'composer'`.
   */
  serviceName?: string;
  args: ReadonlyArray<string>;
  dryRun: boolean;
  project: Project;
}

async function runComposer({
  args,
  dryRun,
  project,
  serviceName = 'composer',
}: RunComposerOptions) {
  const composerCachePath = cachePath('composer');

  const mounts: string[] = [];
  try {
    await makeDir(composerCachePath);
    mounts.push('-v', composerCachePath + ':/tmp/cache:cached');
  } catch {
    // Ignore errors
  }

  return runComposeAsUser(serviceName, args, {
    cwd: project.root,
    dryRun,
    extraFiles: ['docker-compose.cli.yml'],
    composeArgs: mounts,
  });
}

export default runComposer;
