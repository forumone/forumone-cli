import mkcert from 'mkcert';
import fs from 'fs';

import fileExists from '../util/fileExists';

import { getCaCrtPath, getCaKeyPath, getCertificateKeyPath, getCertificatePath } from './paths';

/**
 * Determines if mkcert has already been run to generate certificates for web-starter.
 */
async function hasCertificates() {
  const hasCertificate = await fileExists(getCertificatePath());
  const hasCertificateKey = await fileExists(getCertificateKeyPath());

  return hasCertificate && hasCertificateKey;
}

async function installCertificates() {
  const hasCaCrt = await fileExists(getCaCrtPath());
  const hasCaKey = await fileExists(getCaKeyPath());

  if (!hasCaCrt || !hasCaKey) {
    const ca = await mkcert.createCA({
      organization: 'F1 Test CA',
      countryCode: 'US',
      locality: 'Alexandria',
      state: 'VA',
      validityDays: 365,
    });
    fs.writeFileSync(getCaCrtPath(), ca.cert);
    fs.writeFileSync(getCaKeyPath(), ca.key);
  }

  const ca = {
    cert: fs.readFileSync(getCaCrtPath()).toString(),
    key: fs.readFileSync(getCaKeyPath()).toString(),
  };

  const cert = await mkcert.createCert({
    caCert: ca.cert,
    caKey: ca.key,
    validityDays: 365,
    domains: ['localhost', '127.0.0.1', '*.ddev.site'],
  });

  fs.writeFileSync(getCertificatePath(), cert.cert, {
    mode: 0o400,
  });
  fs.writeFileSync(getCertificateKeyPath(), cert.key, {
    mode: 0o400,
  });
}

async function installCertificatesIfNeeded() {
  const needsInstall = !(await hasCertificates());

  if (needsInstall) {
    await installCertificates();
  }
}

export default installCertificatesIfNeeded;
