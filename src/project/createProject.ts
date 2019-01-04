import runNpx from '../process/runNpx';

export interface CreateProjectOptions {
  directory: string;
  dryRun: boolean;
}

async function createProject({ directory, dryRun }: CreateProjectOptions) {
  return runNpx(['yo', 'web-starter-2'], {
    cwd: directory,
    dryRun,
    packages: [], // ['yo', 'web-starter'],
  });
}

export default createProject;
