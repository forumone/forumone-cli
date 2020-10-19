import Command, { flags } from '@oclif/command';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import validFilename from 'valid-filename';

import createProject from '../project/createProject';

const mkdir = promisify(fs.mkdir);

function mkdirDryRun(target: string) {
  const relative = path.relative(process.cwd(), target);
  process.stdout.write(`mkdir ${relative}\n`);
}

export default class New extends Command {
  static description = 'Create a new project in a new directory.';

  static flags = {
    help: flags.help({ char: 'h' }),
    'dry-run': flags.boolean({
      description: 'print command instead of running',
    }),
    next: flags.boolean({
      description: 'use prerelease generator for testing ',
    }),
    verbose: flags.boolean({
      char: 'v',
      description: 'print command information prior to execution',
    }),
  };

  static args = [
    {
      name: 'target',
      description: 'directory name to create',
      required: true,
    },
  ];

  async run() {
    const { args, flags } = this.parse(New);

    const target = args.target;
    if (!validFilename(target)) {
      return this.error(`Argument '${target}' is not a valid filename.`, {
        exit: 1,
      });
    }

    const targetDirectory = path.join(process.cwd(), target);

    try {
      const createDirectory = flags['dry-run'] ? mkdirDryRun : mkdir;
      await createDirectory(targetDirectory);
    } catch (error) {
      if (error.code === 'EEXIST') {
        return this.error(
          `Failed to create '${target}' because it already exists.`,
          { exit: 1 },
        );
      }

      return this.error(error, { exit: 1 });
    }

    const command = createProject({
      directory: targetDirectory,
      next: flags.next,
    });

    // Output command information before execution if the verbose flag is enabled.
    if (flags['verbose'] && !flags['dry-run']) {
      command.dryRun();
    }

    return flags['dry-run'] ? command.dryRun() : command.run();
  }
}
