import os from 'os';
import path from 'path';

import fileExists from '../util/fileExists';

/**
 * Creates a UNIX-friendly directory for mounting `$SSH_AUTH_SOCK` in a container.
 */
function getContainerDirectory(socketDirectory: string): string {
  return socketDirectory;
}

/**
 * Creates a synthetic directory for mounting a container in Windows.
 */
function getContainerDirectoryForWindows(socketDirectory: string): string {
  const directoryName = path.basename(socketDirectory);

  return path.posix.join('/root/.tmp', directoryName);
}

/**
 * Returns the Docker command-line options necessary to mount `$SSH_AUTH_SOCK` into a container.
 */
async function getAuthSocketOptions(authSocket: string) {
  const socketDirectory = path.dirname(authSocket);
  const getDirectory =
    os.platform() === 'win32'
      ? getContainerDirectoryForWindows
      : getContainerDirectory;

  const containerDirectory = getDirectory(socketDirectory);

  const args = [
    '-v',
    `${socketDirectory}:${containerDirectory}`,
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
