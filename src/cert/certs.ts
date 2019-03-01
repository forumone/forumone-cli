import fileExists from '../util/fileExists';

import installMkcertIfNeeded from './mkcert';
import { getCertificateKeyPath, getCertificatePath } from './paths';
import runMkcert from './runMkcert';

/**
 * Determines if mkcert has already been run to generate certificates for web-starter.
 */
async function hasCertificates() {
  const hasCertificate = await fileExists(getCertificatePath());
  const hasCertificateKey = await fileExists(getCertificateKeyPath());

  return hasCertificate && hasCertificateKey;
}

async function installCertificates() {
  await installMkcertIfNeeded();

  // Passing -cert-file and -key-file ensure that, no matter what we run, we get a
  // consistent name for the files.
  await runMkcert([
    '-cert-file',
    getCertificatePath(),
    '-key-file',
    getCertificateKeyPath(),
    'localhost',
  ]);
}

async function installCertificatesIfNeeded() {
  const needsInstall = !(await hasCertificates());

  if (needsInstall) {
    await installCertificates();
  }
}

export default installCertificatesIfNeeded;
