import runNpx from '../process/runNpx';

export interface CreateProjectOptions {
  directory: string;
  dryRun: boolean;
}

// Use `npx' to ensure that users always have the latest generator version.
async function createProject({ directory, dryRun }: CreateProjectOptions) {
  return runNpx(['yo', 'web-starter'], {
    cwd: directory,
    dryRun,
    packages: ['yo', 'web-starter'],
  });
}

export default createProject;
