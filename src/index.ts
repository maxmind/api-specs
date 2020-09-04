import { OpenApiBuilder } from 'openapi3-ts';
import minFraud from './minfraud/2.0';
import parseSchema from './utils/parseSchema';

const specs: Record<string, OpenApiBuilder> = {
  minFraud,
};

const compileSpec = (spec: OpenApiBuilder) => {
  const parsedSchema = parseSchema(spec);
};

export { specs };
