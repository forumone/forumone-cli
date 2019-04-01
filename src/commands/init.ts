import Command, { flags } from '@oclif/command';

import createProject from '../project/createProject';

export default class Init extends Command {
  static description = 'create a new project in the current directory';

  static flags = {
    help: flags.help({ char: 'h' }),
    'dry-run': flags.boolean({
      description: 'print command instead of running',
    }),
    next: flags.boolean({
      description: 'use prerelease generator for testing',
    }),
  };

  async run() {
    const { flags } = this.parse(Init);

    const command = createProject({
      directory: process.cwd(),
      next: flags.next,
    });

    return flags['dry-run'] ? command.dryRun() : command.run();
  }
}
