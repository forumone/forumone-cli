import makeDir from 'make-dir';

import storagePath from '../util/storagePath';

const caPath = 'ca';
const certPath = 'cert';

export const certificateName = 'web-starter.crt';
export const certificateKeyName = 'web-starter.key';

export function getCaRoot() {
  return storagePath(caPath);
}

export function getCertificateRoot() {
  return storagePath(certPath);
}

export function getCaCrtPath() {
  return storagePath(caPath, 'ca.crt');
}

export function getCaKeyPath() {
  return storagePath(caPath, 'ca.key');
}

export function getCertificatePath() {
  return storagePath(certPath, certificateName);
}

export function getCertificateKeyPath() {
  return storagePath(certPath, certificateKeyName);
}

export async function initializeStoragePaths() {
  const directories = [caPath, certPath];

  for (const directory of directories) {
    await makeDir(storagePath(directory)); // eslint-disable-line no-await-in-loop
  }
}
