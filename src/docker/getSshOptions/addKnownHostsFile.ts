import addWellKnownFile from './addWellKnownFile';

async function addKnownHostsFile(): Promise<string[]> {
  return addWellKnownFile('known_hosts');
}

export default addKnownHostsFile;
