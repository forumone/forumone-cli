import { Command, flags } from '@oclif/command';
import getCertificates from '../cert';

import runCompose from '../docker/runCompose';
import { dryRunFlag, verboseFlag } from '../flags';
import findProject from '../project/findProject';

export default class Build extends Command {
  static description = 'build or rebuild all images';

  static flags = {
    help: flags.help({ char: 'h' }),
    'dry-run': dryRunFlag,
    parallel: flags.boolean({
      allowNo: true,
      default: true,
      description: 'build in parallel (defaults to true)',
    }),
    pull: flags.boolean({
      allowNo: true,
      default: true,
      description: 'pull latest docker image versions (defaults to true)',
    }),
    verbose: verboseFlag,
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

    const { certificate, certificateKey } = await getCertificates();

    // These are only required so docker-compose doesn't see invalid volume specs.
    const environment: NodeJS.ProcessEnv = {
      F1_TLS_CERT: certificate,
      F1_TLS_KEY: certificateKey,
    };

    const buildCommand = ['build'];
    if (flags.parallel) {
      buildCommand.push('--parallel');
    }
    if (flags.pull) {
      buildCommand.push('--pull');
    }

    const command = await runCompose(buildCommand, {
      cwd: project.root,
      extraFiles: ['docker-compose.cli.yml'],
      env: environment,
    });

    // Output command information before execution if the verbose flag is enabled.
    if (flags['verbose'] && !flags['dry-run']) {
      command.dryRun();
    }

    return flags['dry-run'] ? command.dryRun() : command.run();
  }
}
