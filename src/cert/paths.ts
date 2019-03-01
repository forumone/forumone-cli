import makeDir from 'make-dir';

import storagePath from '../util/storagePath';

import { getExecutableSuffix } from './system';

const binaryPath = 'bin';
const caPath = 'ca';
const certPath = 'cert';

export const certificateName = 'web-starter.crt';
export const certificateKeyName = 'web-starter.key';

function getMkcertName() {
  return 'mkcert' + getExecutableSuffix();
}

export function getMkcertPath() {
  return storagePath(binaryPath, getMkcertName());
}

export function getCaRoot() {
  return storagePath(caPath);
}

export function getCertificateRoot() {
  return storagePath(certPath);
}

export function getCertificatePath() {
  return storagePath(certPath, certificateName);
}

export function getCertificateKeyPath() {
  return storagePath(certPath, certificateKeyName);
}

export async function initializeStoragePaths() {
  const directories = [binaryPath, caPath, certPath];

  for (const directory of directories) {
    await makeDir(storagePath(directory));
  }
}
