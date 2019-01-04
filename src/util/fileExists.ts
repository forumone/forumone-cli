import fs from 'fs';
import { promisify } from 'util';

// fs.exists is considered deprecated, so we use the recommended replacement (fs.access).
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
