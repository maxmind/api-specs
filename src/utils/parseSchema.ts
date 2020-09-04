import { merge } from 'lodash';
import { isSchemaObject, ReferenceObject, SchemaObject } from 'openapi3-ts';

const parseSchema = (
  schema: ReferenceObject | SchemaObject,
  combinedSchema: SchemaObject = {},
): SchemaObject => {
  if (isSchemaObject(schema)) {
    if (schema.allOf) {
      schema.allOf
        .map((s: SchemaObject) => parseSchema(s, combinedSchema))
        .forEach((s: SchemaObject) => merge(combinedSchema, s));

      return combinedSchema;
    }

    if (schema.properties) {
      Object.entries(schema.properties as SchemaObject).map((
        property: [string, SchemaObject]
      ) => {
        const [
          name,
          value,
        ] = property;

        (schema.properties as SchemaObject)[name] = parseSchema(value);
      });
    }
  }

  return schema;
};

export default parseSchema;
