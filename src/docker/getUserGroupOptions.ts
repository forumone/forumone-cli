import os from 'os';

/**
 * Returns the `--user` options for platforms that require it, when running Docker or
 * Docker Compose services.
 */
function getUserGroupOptions() {
  if (os.platform() === 'win32') {
    return [];
  }

  const { uid, gid } = os.userInfo();
  return ['--user', `${uid}:${gid}`];
}

export default getUserGroupOptions;
