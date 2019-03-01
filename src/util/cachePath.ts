import path from 'path';

import paths from './paths';

function cachePath(name: string): string {
  const { cache } = paths();

  return path.join(cache, name);
}

export default cachePath;
