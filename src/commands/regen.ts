import Command, { flags } from '@oclif/command';
import fs from 'fs';
import path from 'path';
import validFilename from 'valid-filename';

import recreateProject from '../project/recreateProject';


function mkdirDryRun(target: string) {
  const relative = path.relative(process.cwd(), target);
  process.stdout.write(`mkdir ${relative}\n`);
}

function findConfigFile(filePath: string): string {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Path '${filePath}' does not exist.`);
  }

  if (fs.statSync(filePath).isDirectory()) {
    return findConfigFile(path.join(filePath, '.yo-rc.json'));
  }

  if (!fs.statSync(filePath).isFile()) {
    throw new Error(`Path '${filePath}' is not a file.`);
  }

  return filePath;
}

export default class Regen extends Command {
  static description = 'Regenerate a new project from an existing .yo-rc.json file.';

  static flags = {
    help: flags.help({ char: 'h' }),
    'dry-run': flags.boolean({
      description: 'print command instead of running',
    }),
    next: flags.boolean({
      description: 'use prerelease generator for testing',
    }),
  };

  static args = [
    {
      name: 'config',
      description: 'path of .yo-rc.json file or project directory',
      required: true,
    },
    {
      name: 'target',
      description: 'directory name to create',
      required: true,
    },
  ];

  async run() {
    const { args, flags } = this.parse(Regen);

    if (!validFilename(args.target)) {
      return this.error(`Argument '${args.target}' is not a valid filename.`, {
        exit: 1,
      });
    }

    const directory = path.join(process.cwd(), args.target);
    const configPath = path.join(process.cwd(), args.config);

    let configFile;
    try {
      configFile = findConfigFile(configPath);
    } catch (e) {
      return this.error(e.getMessage(), {
        exit: 1,
      });
    }

    try {
      const createDirectory = flags['dry-run'] ? mkdirDryRun : fs.mkdirSync;
      createDirectory(directory);
    } catch (error) {
      if (error.code === 'EEXIST') {
        return this.error(
          `Failed to create '${args.target}' because it already exists.`,
          { exit: 1 },
        );
      }

      return this.error(error, { exit: 1 });
    }

    const command = recreateProject({
      configFile,
      directory,
      next: flags.next,
    });

    return flags['dry-run'] ? command.dryRun() : command.run();
  }
}
