import ajv from 'ajv';
import { inspect } from 'util';

// This is a type-only import, so we don't need to worry about not using this at runtime
// tslint:disable-next-line:no-implicit-dependencies
type Schema = import('json-schema').JSONSchema7;

// Ensure this schema is in sync with the `Configuration` type below it (and vice-versa).
const schema: Schema = {
  type: 'object',
  required: ['version'],
  additionalProperties: false,
  properties: {
    version: { type: 'integer', const: 1 },
    composer: {
      type: 'object',
      additionalProperties: false,
      properties: {
        project: { type: 'string' },
      },
    },
  },
};

export interface Configuration {
  readonly version: 1;
  readonly composer?: {
    readonly project?: string;
  };
}

function formatValidationError(error: ajv.ErrorObject): string {
  switch (error.keyword) {
    case 'additionalProperties': {
      const params = error.params as ajv.AdditionalPropertiesParams;
      return `config${error.dataPath} is not allowed to have the property ${
        params.additionalProperty
      }.`;
    }

    case 'required': {
      const params = error.params as ajv.RequiredParams;
      return `config${error.dataPath} is missing the required parameter ${
        params.missingProperty
      }.`;
    }

    case 'const': {
      // For some reason, there are no type definitions for the params returned by the
      // 'const' validator. We have to do a little type assertion juggling to make this
      // work.
      const params = (error.params as unknown) as { allowedValue: unknown };
      return `config${error.dataPath} does not match the expected value ${
        params.allowedValue
      }.`;
    }

    case 'type': {
      const params = error.params as ajv.TypeParams;
      return `config${error.dataPath} is not the expected type ${params.type}`;
    }

    default: {
      const params = inspect(error.params);
      return `config${error.dataPath} failed with message ${
        error.message
      }: ${params}`;
    }
  }
}

export function validateConfiguration(config: unknown): Configuration {
  const validator = ajv({ allErrors: true }).compile(schema);
  if (validator(config)) {
    return config as Configuration;
  }

  const errors = validator.errors;
  const errorMessage = errors
    ? '\n' + errors.map(error => '* ' + formatValidationError(error)).join('\n')
    : '';

  throw new Error(`Configuration validation failed:${errorMessage}`);
}
