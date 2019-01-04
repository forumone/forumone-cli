import runProcess, { RunProcessOptions } from './runProcess';

export interface RunNpxOptions extends RunProcessOptions {
  packages: ReadonlyArray<string>;
}

async function runNpx(
  command: ReadonlyArray<string>,
  { packages, ...options }: RunNpxOptions,
) {
  const packageArgs = packages
    .map(pkg => ['-p', pkg])
    .reduce((args, arg) => [...args, ...arg], []);

  const processArgs = [
    ...packageArgs,
    // Pass --ignore-existing to npx to avoid conflicts caused by misbehaving or uninstalled versions
    // of, e.g., `yo'.
    '--ignore-existing',
    ...command,
  ];

  return runProcess('npx', processArgs, options);
}

export default runNpx;
