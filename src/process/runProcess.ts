import execa, { ExecaChildProcess, Options } from 'execa';
import path from 'path';

export interface RunProcessOptions extends Options {
  // Require a cwd since $PWD isn't necessarily the project root
  cwd: string;

  // Whether or not to actually run the command being given. When true, we just dump the command
  // and environment instead of running it.
  dryRun: boolean;
}

const ignoreKeys: Array<keyof Options> = ['stderr', 'stdin', 'stdout'];

function runProcess(
  file: string,
  args: ReadonlyArray<string>,
  { dryRun, ...options }: RunProcessOptions,
): void | ExecaChildProcess {
  if (dryRun) {
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
    return;
  }

  // Don't include 'stdio' option if conflicting options are present
  const execaOptions: Options = ignoreKeys.some(key => Boolean(options[key]))
    ? { stdin: 'ignore', stdout: 'inherit', stderr: 'inherit', ...options }
    : { stdio: 'inherit', ...options };

  return execa(file, args, execaOptions);
}

export default runProcess;
