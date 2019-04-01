import runNpx from '../process/runNpx';

export interface CreateProjectOptions {
  directory: string;
  next: boolean;
}

// Use `npx' to ensure that users always have the latest generator version.
function createProject({ directory, next }: CreateProjectOptions) {
  const tagSuffix = next ? '@next' : '';

  return runNpx(['yo', 'web-starter'], {
    cwd: directory,
    packages: ['yo', 'generator-web-starter' + tagSuffix],
  });
}

export default createProject;
