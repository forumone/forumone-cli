import addWellKnownFile from './addWellKnownFile';

/**
 * Returns the `docker run` flags necessary to share the user's SSH configuration file.
 */
async function addSshConfigFile() {
  return addWellKnownFile('config');
}

export default addSshConfigFile;
