import os from 'os';

/**
 * Returns the `--user` options for platforms that require it, when running Docker or
 * Docker Compose services.
 *
 * These options need to be used when a container is going to write to the host's
 * filesystem in order to avoid ownership problems.
 */
function getUserGroupOptions() {
  if (os.platform() === 'win32') {
    return [];
  }

  const { uid, gid } = os.userInfo();
  return ['--user', `${uid}:${gid}`];
}

export default getUserGroupOptions;
