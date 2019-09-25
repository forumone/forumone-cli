import execa from 'execa';
import os from 'os';
import tempWrite from 'temp-write';

import AgentStatus from '../AgentStatus';
import getAgentStatus from '../getAgentStatus';

import addKnownHostsFile from './addKnownHostsFile';
import addSshConfigFile from './addSshConfigFile';

/**
 * Creates a synthetic `/etc/passwd` file for Mac users. At the top of `/etc/passwd` is
 * the following warning:
 *
 * ```plain
 * # Note that this file is consulted directly only when the system is running
 * # in single-user mode.  At other times this information is provided by
 * # Open Directory.
 * ```
 *
 * In practice, this means that system-level services are enumerated in `/etc/passwd` but not
 * regular users. We have to create our own database in a temp file, hence this function.
 */
async function createPasswdFile(): Promise<string> {
  const { gid, homedir, uid, username } = os.userInfo();

  // NB. structure of /etc/passwd entries:
  // 1. Username
  // 2. Password information (shadowed)
  // 3. uid
  // 4. gid
  // 5. Gecos field
  // 6. Home directory
  // 7. login shell
  //
  // Since we're making this entry up, we use the username as the GECOS information and
  // /bin/false instead of looking this information up with dscl.

  const passwd = [username, 'x', uid, gid, username, homedir, '/bin/false'];

  return tempWrite(passwd.join(':') + '\n');
}

/**
 * Retrieves the `docker-compose run` flags needed for enabling SSH within a container.
 *
 * This function relies on the presence of a persistent forwarding container in order
 * to grant access to the running SSH agent in MacOS, due to the fact that the Docker
 * VM/hypervisor can't use UNIX domain sockets (which the `$SSH_AUTH_SOCKET` is).
 */
async function getAuthSocketForMac(): Promise<string[]> {
  const status = await getAgentStatus();
  if (status !== AgentStatus.Running) {
    return [];
  }

  const output = await execa.stdout('pinata-ssh-mount', { shell: false });
  const args = output.split(/\s+/);

  const passwdPath = await createPasswdFile();

  return [
    ...args,
    '-v',
    `${passwdPath}:/etc/passwd:ro`,
    ...(await addKnownHostsFile()),
    ...(await addSshConfigFile()),
  ];
}

export default getAuthSocketForMac;
