import runNpx from '../process/runNpx';

export interface RecreateProjectOptions {
  configFile: string;
  directory: string;
  next: boolean;
}

// Use `npx' to ensure that users always have the latest generator version.
function recreateProject({ configFile, directory, next }: RecreateProjectOptions) {
  const tagSuffix = next ? '@next' : '';

  // yo-gen-run --name web-starter --config ./tmp-wp/.yo-rc.json --out ./tmp-wp2
  return runNpx([
    'yo-gen-run',
    '--name', 'web-starter',
    '--config', configFile,
    '--out', directory,
  ], {
    cwd: directory,
    packages: ['yo', 'yeoman-gen-run', 'generator-web-starter' + tagSuffix],
  });
}

export default recreateProject;
