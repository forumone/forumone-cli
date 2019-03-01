import envPaths, { Paths } from 'env-paths';

function paths(): Paths {
  return envPaths('forumone-cli');
}

export default paths;
