import { Command, flags } from '@oclif/command';

import findProject from '../project/findProject';
import startProject from '../project/startProject';

export default class Up extends Command {
  static description = 'start a project up';

  static flags = {
    help: flags.help({ char: 'h' }),
    'dry-run': flags.boolean({
      description: 'print command instead of running',
    }),
    foreground: flags.boolean({
      char: 'f',
      description: 'run compose in the foreground',
    }),
    xdebug: flags.boolean({ description: 'enable xdebug in the container' }),
  };

  async run() {
    const { flags } = this.parse(Up);

    const project = await findProject(process.cwd());

    if (project === null) {
      return this.error(
        'Neither a docker-compose.yml nor a Gruntfile.js could be found in this directory or its parents.',
        { exit: 1 },
      );
    }

    return startProject(project, {
      dryRun: flags['dry-run'],
      foreground: flags.foreground,
      xdebug: flags.xdebug,
    });
  }
}
