import Dockerode from 'dockerode';
import Listr, { ListrTask } from 'listr';

import commandExists from '../util/commandExists';

import DoctorContext from './DoctorContext';

function checkDocker(): ListrTask<DoctorContext> {
  return {
    title: 'Find `docker` command',
    async task(ctx) {
      ctx.hasDocker = await commandExists('docker');
      if (!ctx.hasDocker) {
        throw new Error('No `docker` command found. Is it installed?');
      }
    },
  };
}

function checkDockerVersion(): ListrTask<DoctorContext> {
  return {
    title: 'Check Docker version',
    skip(ctx) {
      if (!ctx.hasDocker) {
        return 'Docker not installed';
      }
    },
    async task() {
      const client = new Dockerode();
      const versions = await client.version();

      // This should use semver.cmp(), but it can't handle Docker's habit of using 0-padded
      // numerals - so we have to manually parse things out.
      const [major, minor] = versions.Version.split('.', 2).map(parseFloat);

      const isCorrectVersion = major >= 19 || (major === 18 && minor >= 6);

      if (!isCorrectVersion) {
        throw new Error(
          `Engine version ${
            versions.Version
          } older than 18.06; an upgrade is required.`,
        );
      }
    },
  };
}

function checkDockerCompose(): ListrTask<DoctorContext> {
  return {
    title: 'Find `docker-compose` command',
    skip(ctx) {
      if (!ctx.hasDocker) {
        return 'Docker not installed';
      }
    },
    async task() {
      const hasCompose = await commandExists('docker-compose');
      if (!hasCompose) {
        throw new Error('No `docker-compose` command found. Is it installed?');
      }
    },
  };
}

function checkDockerStatus(): ListrTask<DoctorContext> {
  return {
    title: 'Docker',
    task() {
      return new Listr<DoctorContext>([
        checkDocker(),
        checkDockerVersion(),
        checkDockerCompose(),
      ]);
    },
  };
}

export default checkDockerStatus;
