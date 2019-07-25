import execa from 'execa';
import Listr, { ListrTask } from 'listr';
import os from 'os';

import AgentStatus from '../docker/AgentStatus';
import getAgentStatus from '../docker/getAgentStatus';

import DoctorContext from './DoctorContext';

function checkAgentContainer(): ListrTask<DoctorContext> {
  return {
    title: 'SSH agent container',
    skip(ctx) {
      if (os.platform() !== 'darwin') {
        return 'Only needed on MacOS';
      }

      if (!ctx.hasDocker) {
        return 'Docker is not installed';
      }
    },
    async task() {
      switch (await getAgentStatus()) {
        case AgentStatus.NotInstalled:
          throw new Error(
            'Forwarding not installed. Please follow the installation instructions in this repository: https://github.com/uber-common/docker-ssh-agent-forward',
          );

        case AgentStatus.NotRunning:
          throw new Error(
            'Forwarding not running. Run `pinata-ssh-forward` to enable SSH forwarding.',
          );
      }
    },
  };
}

function checkKeychain(): ListrTask<DoctorContext> {
  return {
    title: 'SSH keychain',
    async task() {
      if (process.env.SSH_AUTH_SOCK === undefined) {
        throw new Error('The SSH agent is unavailable.');
      }

      const output = await execa.stdout('ssh-add', ['-L']);
      if (output.trim() === 'The agent has no identities.') {
        throw new Error('The SSH agent does not have any keys.');
      }
    },
  };
}

function checkSSHStatus(): ListrTask<DoctorContext> {
  return {
    title: 'SSH',
    task() {
      return new Listr<DoctorContext>([checkKeychain(), checkAgentContainer()]);
    },
  };
}

export default checkSSHStatus;
