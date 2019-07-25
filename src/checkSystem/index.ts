import Listr from 'listr';

import checkDockerStatus from './checkDockerStatus';
import checkNodeStatus from './checkNodeStatus';
import checkSSHStatus from './checkSSHStatus';
import DoctorContext from './DoctorContext';

/**
 * Checks the user's system for potential issues.
 */
async function checkSystem() {
  const tasks = new Listr<DoctorContext>(
    [checkNodeStatus(), checkDockerStatus(), checkSSHStatus()],
    {
      exitOnError: false,
    },
  );

  try {
    await tasks.run({});
    return true;
  } catch {
    // Eat errors from Listr - the error message is simply "something went wrong".
    // Each task reports its own errors, and those are more informative.
    return false;
  }
}

export default checkSystem;
