import os from 'os';
import path from 'path';

import fileExists from '../../util/fileExists';

/**
 * Returns the flags necessary to bind-mount a file from the user's `.ssh` directory.
 * This could be their SSH config or their known_hosts file. Avoid using SSH keys; that
 * should be handled by SSH agent forwarding instead. If the file does not exist, no
 * flags are returned - this prevents Docker from creating the file automatically.
 *
 * The return value is a promise for an array of strings intended to be spread into a
 * list of arguments to `docker run` or compatible interfaces like `docker-compose run`.
 *
 * @param name The name of a well-known SSH file (such as `known_hosts` or `config`).
 * @param readOnly Whether or not to mount the file as immutable in the container.
 */
async function addWellKnownFile(
  name: string,
  readOnly = true,
): Promise<string[]> {
  const wellKnownFile = path.join(os.homedir(), '.ssh', name);

  const flags = readOnly ? ':ro' : '';

  if (await fileExists(wellKnownFile)) {
    return ['-v', `${wellKnownFile}:${wellKnownFile}${flags}`];
  }

  return [];
}

export default addWellKnownFile;
