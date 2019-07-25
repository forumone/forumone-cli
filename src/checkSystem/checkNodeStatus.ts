import execa from 'execa';
import Listr, { ListrTask } from 'listr';
import { cmp } from 'semver';

import commandExists from '../util/commandExists';

import DoctorContext from './DoctorContext';

function checkNpx(): ListrTask<DoctorContext> {
  return {
    title: 'npx',
    async task() {
      const hasNpx = await commandExists('npx');
      if (!hasNpx) {
        throw new Error('No `npx` command was found. Please upgrade npm.');
      }
    },
  };
}

function checkVersion(): ListrTask<DoctorContext> {
  return {
    title: 'Node version',
    task() {
      if (cmp(process.version, '<', '10.0.0')) {
        throw new Error(
          `Node version ${
            process.version
          } is too old. Please upgrade to the latest LTS.`,
        );
      }
    },
  };
}

function checkGlobalInstalls(): ListrTask<DoctorContext> {
  return {
    title: 'Globally-installed modules',
    async task(_, task) {
      task.output = 'Checking `npm ls -g`';

      // Eventually we should figure out if there is a programmatic way to interrogate
      // the list of installed modules, but this at least suffices.
      const result = await execa('npm', ['ls', '-g', '--depth=0'], {
        // Don't reject on non-zero exits - we don't care if npm reports issues with the
        // user's installation.
        reject: false,
      });

      const match = /generator-web-starter@(\d+\.\d+\.\d+)/.exec(result.stdout);
      if (match) {
        const version = match[1];

        throw new Error(
          `Globally-installed generator-web-starter (version ${version}) detected`,
        );
      }
    },
  };
}

function checkNodeStatus(): ListrTask<DoctorContext> {
  return {
    title: 'Node',
    task() {
      return new Listr<DoctorContext>([
        checkVersion(),
        checkNpx(),
        checkGlobalInstalls(),
      ]);
    },
  };
}

export default checkNodeStatus;
