import { Command, flags } from '@oclif/command';
import path from 'path';

import getConfiguration from '../config/getConfiguration';
import runDockerAsUser from '../docker/runDockerAsUser';

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

    const result = await getConfiguration();
    if (result === null) {
      return this.error(
        'Unable to run composer due to missing configuration file',
        { exit: 1 },
      );
    }

    const { config, root } = result;

    const projectDirectory = config.composer && config.composer.project;
    if (projectDirectory === undefined) {
      return this.error(
        'Unable to run composer because no project directory has been defined.',
        { exit: 1 },
      );
    }

    const pwd = path.resolve(root, projectDirectory);

    return runDockerAsUser('composer:1.7', argv, {
      cwd: pwd,
      dryRun: flags['dry-run'],
      dockerArgs: ['-v', `${pwd}:/app`],
    });
  }
}
