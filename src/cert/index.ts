import installCertificatesIfNeeded from './certs';
import { getCertificateKeyPath, getCertificatePath } from './paths';

export interface Certificates {
  readonly certificate: string;
  readonly certificateKey: string;
}

/**
 * Returns the certificate (and key) for localhost, as provided by mkcert.
 */
async function getCertificates(): Promise<Certificates> {
  await installCertificatesIfNeeded();

  return {
    certificate: getCertificatePath(),
    certificateKey: getCertificateKeyPath(),
  };
}

export default getCertificates;
