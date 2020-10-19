import runNpx from '../process/runNpx';

export interface CreateProjectOptions {
  directory: string;
  next: boolean;
  subgenerator?: string;
}

// Use `npx' to ensure that users always have the latest generator version.
function createProject({
  directory,
  next,
  subgenerator,
}: CreateProjectOptions) {
  const tagSuffix = next ? '@next' : '';

  const command = ['yo'];

  if (subgenerator === undefined) {
    command.push('web-starter');
  } else {
    command.push('web-starter:' + subgenerator);
  }

  return runNpx(command, {
    cwd: directory,
    packages: ['yo', 'generator-web-starter' + tagSuffix],
  });
}

export default createProject;
