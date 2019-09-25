import addWellKnownFile from './addWellKnownFile';

/**
 * Returns the `docker run` flags necessary to share the user's known_hosts file.
 */
async function addSshConfigFile() {
  return addWellKnownFile('config');
}

export default addSshConfigFile;
