import fs from 'fs-extra';
import { OpenApiBuilder, SchemaObject } from 'openapi3-ts';
import { specs } from './index';
import parseSchema from './utils/parseSchema';

const compileSpec = (spec: OpenApiBuilder) => {
  return parseSchema(spec);
};

Object.entries(specs).map(([name, spec]) => {
  const compiledSpec = compileSpec(spec);
  const file = `${process.cwd()}/dist/${name}.json`;

  fs.outputFile(
    file,
    (compiledSpec as unknown as OpenApiBuilder).getSpecAsJson(),
  );
});
