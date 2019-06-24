import { Command, flags } from '@oclif/command';

import {
  installPatternLabDependencies,
  runPatternLabBuild,
  runStylesBuild,
} from '../../docker/gesso';
import runParallelProcesses, {
  NamedCommand,
} from '../../process/runParallelProcesses';
import findProject from '../../project/findProject';

export default class ThemeBuild extends Command {
  static description = '[DEPRECATED] run gesso-related build tasks';

  static flags = {
    help: flags.help({ char: 'h' }),
    'dry-run': flags.boolean({
      description: 'print command instead of running',
    }),
    css: flags.boolean({ description: 'build CSS' }),
    'pattern-lab': flags.boolean({ description: 'build PL' }),
  };

  async run() {
    process.emitWarning(
      `The "theme:build" command is deprecated and will be removed in a later release.

For more information, please see https://github.com/forumone/generator-web-starter/wiki/Gesso-2.x-Container-Migration.`,
    );

    const { flags } = this.parse(ThemeBuild);
    const dryRun = flags['dry-run'];

    const project = await findProject();
    if (project === null || project.type !== 'compose') {
      return this.error(
        'Could not find a docker-compose.yml file in the current directory or any parent',
        { exit: 1 },
      );
    }

    // If this is true, then the user specified either both --css and --pattern-lab,
    // or neither.
    const buildBoth = flags.css === flags['pattern-lab'];
    const buildStyles = buildBoth || flags.css;
    const buildPatternLab = buildBoth || flags['pattern-lab'];

    const install = await installPatternLabDependencies(project);
    const stylesCommand = runStylesBuild(project);
    const patternLabCommand = runPatternLabBuild(project);

    if (dryRun) {
      install.dryRun();

      if (buildStyles) {
        stylesCommand.dryRun();
      }

      if (buildPatternLab) {
        patternLabCommand.dryRun();
      }

      return;
    }

    await install.run();

    const processes: NamedCommand[] = [];
    if (buildStyles) {
      processes.push({ ...stylesCommand, name: 'gesso' });
    }

    if (buildPatternLab) {
      processes.push({ ...patternLabCommand, name: 'pattern-lab' });
    }

    await runParallelProcesses(processes);
  }
}
