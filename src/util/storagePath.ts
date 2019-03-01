import path from 'path';

import paths from './paths';

function storagePath(...parts: string[]): string {
  const { data } = paths();

  return path.join(data, ...parts);
}

export default storagePath;
