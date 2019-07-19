import { Command } from '@oclif/command';
import os from 'os';

import AgentStatus from './AgentStatus';
import getAgentStatus from './getAgentStatus';

const notInstalledWarning = `SSH forwarding is not installed on this computer.
Docker containers will be unable to authenticate with remote servers.

Please follow the installation instructions in the repository below:
https://github.com/uber-common/docker-ssh-agent-forward`;

const notRunningWarning = `No SSH agent container detected.
Did you remember to run 'pinata-ssh-forward'?`;

/**
 * Ensures that there is an SSH agent container running. If not, the `command`'s
 * logger is used to emit a warning.
 */
async function checkAgentStatus(command: Command): Promise<void> {
  if (os.platform() !== 'darwin') {
    return;
  }

  switch (await getAgentStatus()) {
    case AgentStatus.NotInstalled:
      command.warn(notInstalledWarning);
      break;

    case AgentStatus.NotRunning:
      command.warn(notRunningWarning);
  }
}

export default checkAgentStatus;
