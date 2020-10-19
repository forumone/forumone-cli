import Command, { flags } from '@oclif/command';
import { dryRunFlag, verboseFlag } from '../flags';

import createProject from '../project/createProject';

export default class Init extends Command {
  static description = 'create a new project in the current directory';

  static flags = {
    'dry-run': dryRunFlag,
    help: flags.help({ char: 'h' }),
    next: flags.boolean({
      description: 'use prerelease generator for testing',
    }),
    verbose: verboseFlag,
  };

  async run() {
    const { flags } = this.parse(Init);

    const command = createProject({
      directory: process.cwd(),
      next: flags.next,
    });

    // Output command information before execution if the verbose flag is enabled.
    if (flags['verbose'] && !flags['dry-run']) {
      command.dryRun();
    }

    return flags['dry-run'] ? command.dryRun() : command.run();
  }
}
