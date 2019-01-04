import findUp from 'find-up';
import path from 'path';

import Project from './Project';

async function findProject(directory = process.cwd()): Promise<Project | null> {
  const composePath = await findUp('docker-compose.yml', { cwd: directory });
  if (composePath !== null) {
    return {
      root: path.dirname(composePath),
      type: 'compose',
    };
  }

  const gruntfilePath = await findUp(['Gruntfile.js', 'gruntfile.js'], {
    cwd: directory,
  });
  if (gruntfilePath !== null) {
    return {
      root: path.dirname(gruntfilePath),
      type: 'javascript',
    };
  }

  return null;
}

export default findProject;
