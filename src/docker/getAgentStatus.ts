import Docker from 'dockerode';
import os from 'os';

import commandExists from '../util/commandExists';

import AgentStatus from './AgentStatus';

async function hasForwardingInstalled(): Promise<boolean> {
  const hasForwardCommand = await commandExists('pinata-ssh-forward');
  const hasMountCommand = await commandExists('pinata-ssh-mount');

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
