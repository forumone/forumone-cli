import { Command, flags } from '@oclif/command';

import runCompose from '../docker/runCompose';
import { dryRunFlag, verboseFlag } from '../flags';
import findProject from '../project/findProject';

export default class Down extends Command {
  static description = 'stop and optionally clean a project';

  static flags = {
    help: flags.help({ char: 'h' }),
    clean: flags.boolean({ description: 'remove images and volumes' }),
    'dry-run': dryRunFlag,
    verbose: verboseFlag,
  };

  async run() {
    const { flags } = this.parse(Down);

    const project = await findProject();
    if (project === null || project.type !== 'compose') {
      return this.error(
        'Could not find a docker-compose.yml file in the current directory or any parent.',
        { exit: 1 },
      );
    }

    // The --remove-orphans flag is used to alleviate potential issues when switching
    // container definitions (e.g., switching from nginx to apache and forgetting to
    // run `f1 down' before doing so).
    //
    // This is safe to do automatically since it only removes containers, not images or
    // volumes.
    const downCommand = ['down', '--remove-orphans'];
    if (flags.clean) {
      downCommand.push('--rmi', 'local', '--volumes');
    }

    const command = runCompose(downCommand, {
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
