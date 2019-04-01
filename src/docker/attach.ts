import runProcess from '../process/runProcess';

function attach(id: string) {
  const command = runProcess('docker', ['attach', '--no-stdin', id], {
    cwd: process.cwd(),
    stdin: 'ignore',
    stdout: 'pipe',
    stderr: 'inherit',
  });

  return command.run();
}

export default attach;
