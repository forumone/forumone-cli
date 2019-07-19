import os from 'os';
import path from 'path';

import fileExists from '../../util/fileExists';

async function addKnownHostsFile(): Promise<string[]> {
  const knownHostsFile = path.join(os.homedir(), '.ssh/known_hosts');

  if (await fileExists(knownHostsFile)) {
    return ['-v', `${knownHostsFile}:${knownHostsFile}:ro`];
  }

  return [];
}

export default addKnownHostsFile;
