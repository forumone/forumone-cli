import { Command, flags } from '@oclif/command';
import { ExecaChildProcess } from 'execa';

import {
  installPatternLabDependencies,
  runPatternLabWatch,
  runStylesWatch,
} from '../../docker/gesso';
import runParallelProcesses, {
  NamedChild,
} from '../../process/runParallelProcesses';
import findProject from '../../project/findProject';

export default class ThemeWatch extends Command {
  static description = 'run gesso-related watch tasks';

  static flags = {
    help: flags.help({ char: 'h' }),
    'dry-run': flags.boolean({
      description: 'print command instead of running',
    }),
    css: flags.boolean({ description: 'watch CSS' }),
    'pattern-lab': flags.boolean({ description: 'watch PL' }),
  };

  async run() {
    const { flags } = this.parse(ThemeWatch);
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
    const watchBoth = flags.css === flags['pattern-lab'];
    const watchStyles = watchBoth || flags.css;
    const watchPatternLab = watchBoth || flags['pattern-lab'];

    await installPatternLabDependencies(project, dryRun);

    const processes: NamedChild[] = [];
    if (watchStyles) {
      processes.push([
        'gesso',
        runStylesWatch(project, dryRun) as ExecaChildProcess,
      ]);
    }

    if (watchPatternLab) {
      processes.push([
        'pattern-lab',
        runPatternLabWatch(project, dryRun) as ExecaChildProcess,
      ]);
    }

    if (!dryRun) {
      await runParallelProcesses(processes);
    }
  }
}
