import { promisify } from 'util';
import which from 'which';

const whichAsync = promisify(which);

async function commandExists(command: string): Promise<boolean> {
  try {
    // Discard the return value: it's not needed
    await whichAsync(command);
    return true;
  } catch (error) {
    // `which` returns a "not found" error when it doesn't successfully look up a path
    if (error instanceof Error && error.message.startsWith('not found: ')) {
      return false;
    }

    // Bubble up other errors we found
    throw error;
  }
}

export default commandExists;
