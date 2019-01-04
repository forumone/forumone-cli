import os from 'os';
import path from 'path';

import fileExists from '../util/fileExists';

/**
 * Returns the Docker command-line options necessary to mount `$SSH_AUTH_SOCK` into a container.
 */
async function getAuthSocketOptions(authSocket: string) {
  const socketDirectory = path.dirname(authSocket);

  const args = [
    '-v',
    `${socketDirectory}:${socketDirectory}`,
    '-e',
    `SSH_AUTH_SOCK=${authSocket}`,
  ];

  if (os.platform() !== 'win32') {
    args.push('-v', '/etc/passwd:/etc/passwd:ro');

    const knownHostsFile = path.join(os.homedir(), '.ssh/known_hosts');
    if (await fileExists(knownHostsFile)) {
      args.push('-v', `${knownHostsFile}:${knownHostsFile}:ro`);
    }
  }

  return args;
}

/**
 * Returns the Docker command-line options necessary to use SSH as the user of the host machine.
 */
async function getSshOptions(): Promise<string[]> {
  const authSocket = process.env.SSH_AUTH_SOCK;
  if (authSocket !== undefined) {
    return getAuthSocketOptions(authSocket);
  }

  return [];
}

export default getSshOptions;
