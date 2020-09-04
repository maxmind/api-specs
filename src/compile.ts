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
  console.log(file);

  fs.outputFile(
    file,
    JSON.stringify(compiledSpec, null, 2),
  );
});
