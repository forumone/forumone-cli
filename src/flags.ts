import { flags } from '@oclif/command';

export const verboseFlag = flags.boolean({
  char: 'v',
  description: 'print command information prior to execution',
});

export const dryRunFlag = flags.boolean({
  description: 'print command instead of running',
});
