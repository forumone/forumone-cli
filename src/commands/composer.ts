import { Command, flags } from '@oclif/command';
import makeDir from 'make-dir';

import runComposeAsUser from '../docker/runComposeAsUser';
import findProject from '../project/findProject';
import cachePath from '../util/cachePath';

export default class Composer extends Command {
  static description = 'run composer commands';

  static flags = {
    help: flags.help({ char: 'h' }),
    'dry-run': flags.boolean({
      description: 'print command instead of running',
    }),
  };

  // Allow extra arguments (we forward them to composer)
  static strict = false;

  async run() {
    const { argv, flags } = this.parse(Composer);

    const project = await findProject();
    if (project === null || project.type !== 'compose') {
      return this.error(
        'Could not find a docker-compose.yml file in the current directory or any parent',
        { exit: 1 },
      );
    }

    const composerCachePath = cachePath('composer');

    const mounts: string[] = [];
    try {
      await makeDir(composerCachePath);
      mounts.push('-v', composerCachePath + ':/tmp/cache:cached');
    } catch {
      // Ignore errors
    }

    return runComposeAsUser('composer', argv, {
      cwd: project.root,
      dryRun: flags['dry-run'],
      extraFiles: ['docker-compose.cli.yml'],
      composeArgs: mounts,
    });
  }
}
