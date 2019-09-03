import { Command, flags } from '@oclif/command';

import runCompose from '../docker/runCompose';
import findProject from '../project/findProject';

export default class Build extends Command {
  static description = 'build or rebuild all images';

  static flags = {
    help: flags.help({ char: 'h' }),
    'dry-run': flags.boolean({
      description: 'print command instead of running',
    }),
    parallel: flags.boolean({
      allowNo: true,
      default: true,
      description: 'build in parallel (defaults to true)',
    }),
  };

  static args = [];

  async run() {
    const { flags } = this.parse(Build);

    const project = await findProject();
    if (project === null || project.type !== 'compose') {
      return this.error(
        'Could not find a docker-compose.yml file in the current directory or any parent',
        { exit: 1 },
      );
    }

    const buildCommand = ['build'];
    if (flags.parallel) {
      buildCommand.push('--parallel');
    }

    const command = await runCompose(buildCommand, {
      cwd: project.root,
    });

    return flags['dry-run'] ? command.dryRun() : command.run();
  }
}
