import { Command, flags } from '@oclif/command';

import {
  installPatternLabDependencies,
  runPatternLabWatch,
  runStylesWatch,
} from '../../docker/gesso';
import runParallelProcesses, {
  NamedCommand,
} from '../../process/runParallelProcesses';
import findProject from '../../project/findProject';

export default class ThemeWatch extends Command {
  static description = '[DEPRECATED] run gesso-related watch tasks';

  static flags = {
    help: flags.help({ char: 'h' }),
    'dry-run': flags.boolean({
      description: 'print command instead of running',
    }),
    css: flags.boolean({ description: 'watch CSS' }),
    'pattern-lab': flags.boolean({ description: 'watch PL' }),
    verbose: flags.boolean({
      char: 'v',
      description: 'print command information prior to execution',
    }),
  };

  async run() {
    process.emitWarning(
      `The "theme:watch" command is deprecated and will be removed in a later release.

For more information, please see https://github.com/forumone/generator-web-starter/wiki/Gesso-2.x-Container-Migration.`,
    );

    const { flags } = this.parse(ThemeWatch);
    const dryRun = flags['dry-run'];
    const verbose = flags['verbose'];

    const project = await findProject();
    if (project === null || project.type !== 'compose') {
      return this.error(
        'Could not find a docker-compose.yml file in the current directory or any parent',
        { exit: 1 },
      );
    }

    // If this is true, then the user specified either both --css and --pattern-lab,
    // or neither.
    const watchBoth = flags.css === flags['pattern-lab'];
    const watchStyles = watchBoth || flags.css;
    const watchPatternLab = watchBoth || flags['pattern-lab'];

    const install = await installPatternLabDependencies(project);
    const stylesCommand = runStylesWatch(project);
    const patternLabCommand = runPatternLabWatch(project);

    if (dryRun) {
      install.dryRun();

      if (watchStyles) {
        stylesCommand.dryRun();
      }

      if (watchPatternLab) {
        patternLabCommand.dryRun();
      }

      return;
    }

    // Run verbose output immediately before command execution.
    if (verbose) {
      install.dryRun();
    }
    await install.run();

    const processes: NamedCommand[] = [];
    if (watchStyles) {
      processes.push({ ...stylesCommand, name: 'gesso' });
    }

    if (watchPatternLab) {
      processes.push({ ...patternLabCommand, name: 'pattern-lab' });
    }

    // Run verbose output immediately before command execution.
    if (verbose) {
      if (watchStyles) {
        stylesCommand.dryRun();
      }

      if (watchPatternLab) {
        patternLabCommand.dryRun();
      }
    }
    await runParallelProcesses(processes);
  }
}
