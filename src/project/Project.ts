export type ProjectType = 'compose' | 'javascript';

interface Project {
  readonly type: ProjectType;
  readonly root: string;
}

export default Project;
