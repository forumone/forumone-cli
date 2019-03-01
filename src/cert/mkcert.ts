import fs from 'fs';
import stream from 'stream';
import { promisify } from 'util';

import fileExists from '../util/fileExists';

import { getMkcertPath, initializeStoragePaths } from './paths';
import runMkcert from './runMkcert';
import { getArch, getExecutableSuffix, getPlatform } from './system';

async function hasMkcert() {
  return fileExists(getMkcertPath());
}

// Permission set for read (0o400) and execute (0o100) for only the current user. mkcert
// isn't too dangerous on its own - it needs sudo to do anything to the root store - but
// a little paranoia helps.
// We do this instead of using fs.constants because there isn't any guarantee of
// availability for them, and having a constant like this is, frankly, easier to understand
// than the S_* constants.
// tslint:disable-next-line:no-bitwise
const readAndExecute = 0o400 | 0o100;

/**
 * Returns the download URL of the latest mkcert release.
 */
async function findMkcertRelease() {
  // Scan GitHub for the latest release of the mkcert binary.
  const { default: Octokit } = await import('@octokit/rest');

  const client = new Octokit();

  const releases = await client.repos.listReleases({
    owner: 'FiloSottile',
    repo: 'mkcert',
  });

  const release = releases.data.find(release => !release.prerelease);
  if (!release) {
    throw new Error(`Unable to find a release for mkcert`);
  }

  // mkcert binaries follow a pretty standard naming convention, so we can construct the
  // name based on the release tag and the platform/arch combination.
  const name = `mkcert-${
    release.tag_name
  }-${getPlatform()}-${getArch()}${getExecutableSuffix()}`;

  const asset = release.assets.find(asset => asset.name === name);
  if (!asset) {
    throw new Error(`Unable to locate asset matching ${name}`);
  }

  return asset.browser_download_url;
}

/**
 * Downloads the mkcert binary and runs the `-install` command to generate a new local CA.
 */
async function installMkcert() {
  const finished = promisify(stream.finished);

  const downloadUrl = await findMkcertRelease();

  const { default: fetch } = await import('node-fetch');

  const response = await fetch(downloadUrl);
  if (!response.ok) {
    const { url, status, statusText } = response;
    throw new Error(`fetch(${url}): ${status} ${statusText}`);
  }

  const mkcertPath = getMkcertPath();

  // Use mode 0700 - the user can read/write/execute, but no one else is allowed to touch
  // it.
  const download = fs.createWriteStream(mkcertPath, {
    encoding: 'binary',
    mode: readAndExecute,
  });
  response.body.pipe(download);

  await finished(download);

  return runMkcert(['-install']);
}

async function installMkcertIfNeeded() {
  // Make sure that the storage directory has actually been created before we download
  // anything into it.
  await initializeStoragePaths();

  const needsInstallation = !(await hasMkcert());

  if (needsInstallation) {
    await installMkcert();
  }
}

export default installMkcertIfNeeded;
