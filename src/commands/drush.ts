import { Command, flags } from '@oclif/command';

import checkAgentStatus from '../docker/checkAgentStatus';
import runComposeWithSsh from '../docker/runComposeWithSsh';
import findProject from '../project/findProject';

export default class Drush extends Command {
  static description = 'run drush commands';

  static flags = {
    help: flags.help({ char: 'h' }),
    'dry-run': flags.boolean({
      description: 'print command instead of running it',
    }),
  };

  static strict = false;

  async run() {
    const { argv, flags } = this.parse(Drush);

    const project = await findProject();
    if (project === null || project.type !== 'compose') {
      return this.error(
        'Could not find a docker-compose.yml file in the current directory or any parent',
        { exit: 1 },
      );
    }

    await checkAgentStatus(this);

    const command = await runComposeWithSsh('drush', argv, {
      cwd: project.root,
      extraFiles: ['docker-compose.cli.yml'],
    });

    return flags['dry-run'] ? command.dryRun() : command.run();
  }
}
