import { Command, flags } from '@oclif/command';
import { dryRunFlag, verboseFlag } from '../../flags';

import addCapStage from '../../project/addCapStage';

export default class CapStage extends Command {
  static description = 'create new capistrano stage(s)';

  static flags = {
    help: flags.help({ char: 'h' }),
    'dry-run': dryRunFlag,
    verbose: verboseFlag,
  };

  async run() {
    const { flags } = this.parse(CapStage);

    const command = addCapStage();

    // Output command information before execution if the verbose flag is enabled.
    if (flags['verbose'] && !flags['dry-run']) {
      command.dryRun();
    }
    return flags['dry-run'] ? command.dryRun() : command.run();
  }
}
