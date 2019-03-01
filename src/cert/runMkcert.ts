import execa from 'execa';

import storagePath from '../util/storagePath';

import { getCaRoot, getMkcertPath } from './paths';

function runMkcert(args: ReadonlyArray<string>) {
  return execa(getMkcertPath(), args, {
    cwd: storagePath(),
    env: { CAROOT: getCaRoot() },
    stdio: 'inherit',
  });
}

export default runMkcert;
