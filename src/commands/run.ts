import { Command, flags } from '@oclif/command';

import runCompose from '../docker/runCompose';
import { dryRunFlag, verboseFlag } from '../flags';
import findProject from '../project/findProject';

export default class Run extends Command {
  static description = 'run an arbitrary compose service';

  static flags = {
    help: flags.help({ char: 'h' }),
    'dry-run': dryRunFlag,
    verbose: verboseFlag,
  };

  static args = [
    { name: 'service', required: true, description: 'compose service name' },
  ];

  // Allow extra arguments (we forward them to the compose service)
  static strict = false;

  async run() {
    const { argv, flags } = this.parse(Run);

    const project = await findProject();
    if (project === null || project.type !== 'compose') {
      return this.error(
        'Could not find a docker-compose.yml file in the current directory or any parent',
        { exit: 1 },
      );
    }

    const command = runCompose(['run', '--rm', ...argv], {
      cwd: project.root,
      extraFiles: ['docker-compose.cli.yml'],
    });

    // Output command information before execution if the verbose flag is enabled.
    if (flags['verbose'] && !flags['dry-run']) {
      command.dryRun();
    }

    return flags['dry-run'] ? command.dryRun() : command.run();
  }
}
