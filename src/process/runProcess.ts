import execa, { Options } from 'execa';
import path from 'path';

export interface RunProcessOptions extends Options {
  // Require a cwd since $PWD isn't necessarily the project root
  cwd: string;

  // Whether or not to actually run the command being given. When true, we just dump the command
  // and environment instead of running it.
  dryRun: boolean;
}

async function runProcess(
  file: string,
  args: ReadonlyArray<string>,
  { dryRun, ...options }: RunProcessOptions,
): Promise<unknown> {
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

  return execa(file, args, { stdio: 'inherit', ...options });
}

export default runProcess;
