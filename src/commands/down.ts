import { Command, flags } from '@oclif/command';

import runCompose from '../docker/runCompose';
import findProject from '../project/findProject';

export default class Down extends Command {
  static description = 'stop and optionally clean a project';

  static flags = {
    help: flags.help({ char: 'h' }),
    clean: flags.boolean({ description: 'remove images and volumes' }),
    'dry-run': flags.boolean({
      description: 'print command instead of running',
    }),
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

    const downCommand = ['down'];
    if (flags.clean) {
      downCommand.push('--rmi', 'local', '--volumes');
    }

    const command = runCompose(downCommand, {
      cwd: project.root,
      extraFiles: ['docker-compose.cli.yml'],
    });

    return flags['dry-run'] ? command.dryRun() : command.run();
  }
}
