import { flags } from '@oclif/command';

export const verboseFlag = flags.boolean({
  char: 'v',
  description: 'print command information prior to execution',
});

export const dryRunFlag = flags.boolean({
  description: 'print command instead of running it',
});

export const subGeneratorFlag = flags.string({
  description: 'run a specific sub-generator within generator-web-starter',
  options: ['manifest', 'buildkite-pipeline'],
  // @todo Remove this dependency once the sub-generators are fully released.
  dependsOn: ['next'],
});
