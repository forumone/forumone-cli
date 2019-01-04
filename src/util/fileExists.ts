import fs from 'fs';
import { promisify } from 'util';

async function fileExists(path: string): Promise<boolean> {
  const access = promisify(fs.access);

  try {
    await access(path);
    return true;
  } catch (error) {
    if (error.code === 'ENOENT') {
      return false;
    }

    throw error;
  }
}

export default fileExists;
