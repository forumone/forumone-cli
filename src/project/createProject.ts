import runNpx from '../process/runNpx';

export interface CreateProjectOptions {
  directory: string;
  dryRun: boolean;
  next: boolean;
}

// Use `npx' to ensure that users always have the latest generator version.
async function createProject({
  directory,
  dryRun,
  next,
}: CreateProjectOptions) {
  const tagSuffix = next ? '@next' : '';

  return runNpx(['yo', 'web-starter'], {
    cwd: directory,
    dryRun,
    packages: ['yo', 'generator-web-starter' + tagSuffix],
  });
}

export default createProject;
