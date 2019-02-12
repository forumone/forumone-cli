import { Command, flags } from '@oclif/command';
import { ExecaChildProcess } from 'execa';

import runComposeService from '../../docker/runComposeService';
import runParallelProcesses, {
  NamedChild,
} from '../../process/runParallelProcesses';
import findProject from '../../project/findProject';
import Project from '../../project/Project';

function runGessoContainer(project: Project, dryRun: boolean) {
  return runComposeService('gesso', [], {
    cwd: project.root,
    dryRun,
    extraFiles: ['docker-compose.cli.yml'],
    stdout: 'pipe',
  });
}

function runPatternLabContainer(project: Project, dryRun: boolean) {
  return runComposeService('pattern-lab', [], {
    cwd: project.root,
    dryRun,
    extraFiles: ['docker-compose.cli.yml'],
    stdout: 'pipe',
  });
}

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

    const processes: NamedChild[] = [];
    if (flags.css === flags['pattern-lab']) {
      // In this branch, either both --css and --pattern-lab were present, or neither.
      // We can't default to 'true' for these variables because oclif doesn't support
      // a --no-foo option to disable it.

      processes.push([
        'gesso',
        runGessoContainer(project, dryRun) as ExecaChildProcess,
      ]);

      processes.push([
        'pattern-lab',
        runPatternLabContainer(project, dryRun) as ExecaChildProcess,
      ]);
    } else if (flags.css) {
      processes.push([
        'gesso',
        runGessoContainer(project, dryRun) as ExecaChildProcess,
      ]);
    } else if (flags['pattern-lab']) {
      processes.push([
        'pattern-lab',
        runPatternLabContainer(project, dryRun) as ExecaChildProcess,
      ]);
    }

    if (!dryRun) {
      await runParallelProcesses(processes);
    }
  }
}
