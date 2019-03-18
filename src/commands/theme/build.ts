import { Command, flags } from '@oclif/command';
import { ExecaChildProcess } from 'execa';

import {
  installPatternLabDependencies,
  runPatternLabBuild,
  runStylesBuild,
} from '../../docker/gesso';
import runParallelProcesses, {
  NamedChild,
} from '../../process/runParallelProcesses';
import findProject from '../../project/findProject';

export default class ThemeBuild extends Command {
  static description = 'run gesso-related build tasks';

  static flags = {
    help: flags.help({ char: 'h' }),
    'dry-run': flags.boolean({
      description: 'print command instead of running',
    }),
    css: flags.boolean({ description: 'build CSS' }),
    'pattern-lab': flags.boolean({ description: 'build PL' }),
  };

  async run() {
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

    await installPatternLabDependencies(project, dryRun);

    const processes: NamedChild[] = [];
    if (buildStyles) {
      processes.push([
        'gesso',
        runStylesBuild(project, dryRun) as ExecaChildProcess,
      ]);
    }

    if (buildPatternLab) {
      processes.push([
        'pattern-lab',
        runPatternLabBuild(project, dryRun) as ExecaChildProcess,
      ]);
    }

    if (!dryRun) {
      await runParallelProcesses(processes);
    }
  }
}
