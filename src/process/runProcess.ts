import execa, { ExecaChildProcess, Options } from 'execa';
import path from 'path';

export interface RunProcessOptions extends Options {
  // Require a cwd since $PWD isn't necessarily the project root
  cwd: string;
}

const ignoreKeys: Array<keyof Options> = ['stderr', 'stdin', 'stdout'];

export interface Command {
  run(): ExecaChildProcess;
  dryRun(): void;
  stdout(): Promise<string>;
}

function runProcess(
  file: string,
  args: ReadonlyArray<string>,
  options: RunProcessOptions,
): Command {
  return {
    run() {
      // Don't include 'stdio' option if conflicting options are present
      const execaOptions: Options = ignoreKeys.some(key =>
        Boolean(options[key]),
      )
        ? { stdin: 'ignore', stdout: 'inherit', stderr: 'inherit', ...options }
        : { stdio: 'inherit', ...options };

      return execa(file, args, execaOptions);
    },
    dryRun() {
      const target = path.relative(process.cwd(), options.cwd);
      process.stdout.write(`DIR: ${target}\n`);

      const envEntries = Object.entries(options.env || {});
      if (envEntries.length) {
        process.stdout.write('ENV:\n');
        for (const [key, value] of envEntries) {
          process.stdout.write(`  ${key}=${value}\n`);
        }
      }

      process.stdout.write(`CMD: ${file} ${args.join(' ')}\n`);
    },
    stdout() {
      return execa.stdout(file, args, options);
    },
  };
}

export default runProcess;
