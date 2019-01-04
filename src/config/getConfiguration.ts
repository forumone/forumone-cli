import cosmiconfig from 'cosmiconfig';
import path from 'path';

import { Configuration, validateConfiguration } from './schema';

export interface ConfigurationResult {
  root: string;
  config: Configuration;
}

async function getConfiguration(): Promise<ConfigurationResult | null> {
  const config = cosmiconfig('f1', { searchPlaces: ['.f1.yml'] });

  const result = await config.search();
  if (result === null || result.isEmpty) {
    return null;
  }

  return {
    config: validateConfiguration(result.config),
    root: path.dirname(result.filepath),
  };
}

export default getConfiguration;
