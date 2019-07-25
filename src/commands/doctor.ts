import { Command, flags } from '@oclif/command';
import execa from 'execa';

import checkSystem from '../checkSystem';

export default class Doctor extends Command {
  static description = 'diagnose potential issues';

  static flags = {
    help: flags.help({ char: 'h' }),
    verbose: flags.boolean({ char: 'v', description: 'print system info' }),
  };

  async run() {
    const { flags } = this.parse(Doctor);

    await checkSystem();

    if (flags.verbose) {
      await this.reportInfo('docker', ['version']);
      await this.reportInfo('docker-compose', ['version']);
      await this.reportInfo('node', ['--version']);
      await this.reportInfo('npm', ['--version']);
    }
  }

  private async reportInfo(command: string, args: ReadonlyArray<string>) {
    const commandString = [command, ...args].join(' ');

    const result = await execa(command, args, { reject: false });
    if (result.failed) {
      this.warn(`Could not run \`${commandString}`);
      return;
    }

    const output = result.stdout.trim();
    const hasNewline = output.includes('\n');

    const space = hasNewline ? '\n' : ' ';
    const trailer = hasNewline ? '\n' : '';

    this.log(`Output of \`${commandString}\`:${space}${output}${trailer}`);
  }
}
