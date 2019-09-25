import addWellKnownFile from './addWellKnownFile';

/**
 * Returns the `docker run` flags necessary to share the user's SSH configuration file.
 */
async function addKnownHostsFile(): Promise<string[]> {
  return addWellKnownFile('known_hosts');
}

export default addKnownHostsFile;
