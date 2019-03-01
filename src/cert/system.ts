import os from 'os';

/**
 * Identifies the currently-running OS for mkcert.
 */
export function getPlatform(): string {
  const platform = os.platform();

  switch (platform) {
    case 'linux':
    case 'darwin':
      return platform;

    // Rename for mkcert
    case 'win32':
      return 'windows';

    default:
      throw new Error(`Platform '${platform}' is not supported by mkcert.`);
  }
}

/**
 * Identifies the CPU architecture to download mkcert.
 */
export function getArch(): string {
  const arch = os.arch();

  switch (arch) {
    case 'x64':
      return 'amd64';

    // Sorry, x86 users. You're pretty SOL here.
    default:
      throw new Error(`The architecture '${arch} is not supported by mkcert.`);
  }
}

/**
 * Returns `'.exe'` on Windows to identify executable files.
 */
export function getExecutableSuffix(): string {
  return os.platform() === 'win32' ? '.exe' : '';
}
