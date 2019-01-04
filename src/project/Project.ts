export type ProjectType = 'compose' | 'javascript';

interface Project {
  readonly type: ProjectType;
  // The directory in which the project config file (docker-compose.yml or Gruntfile.js) was found.
  readonly root: string;
}

export default Project;
