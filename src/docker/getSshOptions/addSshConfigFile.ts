import addWellKnownFile from './addWellKnownFile';

async function addSshConfigFile() {
  return addWellKnownFile('config');
}

export default addSshConfigFile;
