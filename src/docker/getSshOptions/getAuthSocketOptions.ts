import os from 'os';
import path from 'path';

import addKnownHostsFile from './addKnownHostsFile';
import getAuthSocketForMac from './getAuthSocketForMac';

async function getAuthSocketForLinux(authSocket: string): Promise<string[]> {
  const socketDirectory = path.dirname(authSocket);
  return [
    '-v',
    // Mount /etc/passwd because ssh reads it for the user
    '/etc/passwd:/etc/passwd:ro',
    '-v',
    `${socketDirectory}:${socketDirectory}`,
    '-e',
    `SSH_AUTH_SOCK=${authSocket}`,
    ...(await addKnownHostsFile()),
  ];
}

async function getAuthSocketForWindows(authSocket: string): Promise<string[]> {
  const socketDirectory = path.dirname(authSocket);
  const containerDirectory = path.posix.join(
    '/root/.tmp',
    path.basename(socketDirectory),
  );

  return [
    '-v',
    `${socketDirectory}:${containerDirectory}`,
    '-e',
    `SSH_AUTH_SOCK=${path.posix.join(
      containerDirectory,
      path.basename(authSocket),
    )}`,
  ];
}

/**
 * Returns the Docker command-line options necessary to mount `$SSH_AUTH_SOCK` into a container.
 */
async function getAuthSocketOptions(authSocket: string): Promise<string[]> {
  switch (os.platform()) {
    case 'linux':
      return getAuthSocketForLinux(authSocket);

    case 'darwin':
      return getAuthSocketForMac();

    case 'win32':
      return getAuthSocketForWindows(authSocket);

    default:
      return [];
  }
}

export default getAuthSocketOptions;
