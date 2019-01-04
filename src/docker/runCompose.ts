import path from 'path';

import runProcess, { RunProcessOptions } from '../process/runProcess';
import fileExists from '../util/fileExists';

export interface RunComposeOptions extends RunProcessOptions {
  extraFiles?: ReadonlyArray<string>;
}

// Runs docker-compose in a specific directory. If extra files are passed in (i.e., the cli.yml file),
// this function arranges for the main compose and override files to be present in the flags. This
// allows CLI containers to attach to the project's network and see mounted volumes.
async function runCompose(
  composeArgs: ReadonlyArray<string>,
  { extraFiles, cwd, ...options }: RunComposeOptions,
) {
  const fileArguments: string[] = [];
  if (extraFiles) {
    fileArguments.push('-f', 'docker-compose.yml');
    if (await fileExists(path.join(cwd, 'docker-compose.override.yml'))) {
      fileArguments.push('-f', 'docker-compose.override.yml');
    }

    for (const extraFile of extraFiles) {
      fileArguments.push('-f', extraFile);
    }
  }

  return runProcess('docker-compose', [...fileArguments, ...composeArgs], {
    cwd,
    ...options,
  });
}

export default runCompose;
