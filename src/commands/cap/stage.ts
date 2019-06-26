import { Command, flags } from '@oclif/command';

import addCapStage from '../../project/addCapStage';

export default class CapStage extends Command {
  static description = 'create new capistrano stage(s)';

  static flags = {
    help: flags.help({ char: 'h' }),
    'dry-run': flags.boolean({
      description: 'print command instead of running',
    }),
  };

  async run() {
    const { flags } = this.parse(CapStage);

    const command = addCapStage();
    return flags['dry-run'] ? command.dryRun() : command.run();
  }
}
