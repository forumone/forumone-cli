import getAuthSocketOptions from './getAuthSocketOptions';

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
