import Docker from 'dockerode';
import os from 'os';
import { promisify } from 'util';
import which from 'which';

import AgentStatus from './AgentStatus';

const whichAsync = promisify(which);

async function pathExists(path: string): Promise<boolean> {
  try {
    // Discard the return value: it's not needed
    await whichAsync(path);
    return true;
  } catch (error) {
    // `which` returns a "not found" error when it doesn't successfully look up a path
    if (error instanceof Error && error.message.startsWith('not found: ')) {
      return false;
    }
    throw error;
  }
}

async function hasForwardingInstalled(): Promise<boolean> {
  const hasForwardCommand = await pathExists('pinata-ssh-forward');
  const hasMountCommand = await pathExists('pinata-ssh-mount');

  return hasForwardCommand && hasMountCommand;
}

async function isContainerRunning(): Promise<boolean> {
  const client = new Docker();

  // `pinata-ssh-forward` always creates the container with the same name.
  const containers = await client.listContainers({
    filters: { name: ['pinata-sshd'] },
  });

  return containers.length > 0;
}

/**
 * Determines the status of the `pinata-sshd` agent container.
 */
async function getAgentStatus(): Promise<AgentStatus> {
  if (os.platform() !== 'darwin') {
    return AgentStatus.Running;
  }

  if (!(await hasForwardingInstalled())) {
    return AgentStatus.NotInstalled;
  }

  if (!(await isContainerRunning())) {
    return AgentStatus.NotRunning;
  }

  return AgentStatus.Running;
}

export default getAgentStatus;
