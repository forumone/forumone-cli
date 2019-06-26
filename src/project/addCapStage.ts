import runNpx from '../process/runNpx';

function addCapStage() {
  return runNpx(['yo', 'web-starter:cap-stage'], {
    cwd: process.cwd(),
    packages: ['yo', 'generator-web-starter'],
  });
}

export default addCapStage;
