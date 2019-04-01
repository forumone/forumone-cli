import runProcess from '../process/runProcess';

async function kill(containers: ReadonlyArray<string>) {
  const command = runProcess('docker', ['kill', ...containers], {
    cwd: process.cwd(),
    stdio: 'ignore',
  });

  try {
    await command.run();
  } catch {
    // Ignore errors
  }
}

export default kill;
