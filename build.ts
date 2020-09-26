import OpenApiParser from '@apidevtools/swagger-parser';
import { rmdirSync } from 'fs';
import { outputFileSync } from 'fs-extra';
import { specs } from './src/index';

const DIST_PATH = `${process.cwd()}/dist`;
const parser = new OpenApiParser();

rmdirSync(DIST_PATH, { recursive: true });

Object.entries(specs).map(async ([name, spec]) => {
  const bundled = await parser.bundle(spec);
  outputFileSync(
    [
      DIST_PATH,
      name.toLowerCase(),
      spec.info.version,
      'spec.bundled.json',
    ].join('/'),
    JSON.stringify(bundled, null, 2),
  );

  const dereferenced = await parser.dereference(spec);
  outputFileSync(
    [
      DIST_PATH,
      name.toLowerCase(),
      spec.info.version,
      'spec.dereferenced.json',
    ].join('/'),
    JSON.stringify(dereferenced, null, 2),
  );
});
