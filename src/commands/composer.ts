import { Command, flags } from '@oclif/command';

import runComposer from '../docker/runComposer';
import { dryRunFlag, verboseFlag } from '../flags';
import findProject from '../project/findProject';

export default class Composer extends Command {
  static description = 'run composer commands';

  static flags = {
    help: flags.help({ char: 'h' }),
    'dry-run': dryRunFlag,
    verbose: verboseFlag,
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

    const command = await runComposer({
      args: argv,
      project,
    });

    // Output command information before execution if the verbose flag is enabled.
    if (flags['verbose'] && !flags['dry-run']) {
      command.dryRun();
    }

    return flags['dry-run'] ? command.dryRun() : command.run();
  }
}
