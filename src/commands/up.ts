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
    verbose: flags.boolean({
      char: 'v',
      description: 'print command information prior to execution',
    }),
    foreground: flags.boolean({
      char: 'f',
      description: 'run compose in the foreground',
    }),
    xdebug: flags.boolean({ description: 'enable xdebug in the container' }),
    'xdebug-profile': flags.boolean({
      description:
        `Enables the triggering of xdebug's profiler. See https://xdebug.org/docs/profiler` +
        ' for how to trigger these requests.',
    }),
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

    const command = await startProject(project, {
      foreground: flags.foreground,
      xdebug: flags.xdebug,
      xdebugProfile: flags['xdebug-profile'],
    });

    // eslint-disable-next-line no-console
    console.log(flags);
    if (flags['verbose']) {
      command.dryRun();
    }

    return flags['dry-run'] ? command.dryRun() : command.run();
  }
}
