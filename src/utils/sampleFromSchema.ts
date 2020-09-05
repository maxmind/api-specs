import merge from 'lodash/merge';
import { isSchemaObject, SchemaObject } from 'openapi3-ts';
import getPrimitive from './getPrimitive';
import normalizeArray from './normalizeArray';
import normalizeObject from './normalizeObject';
import primitives from '../primitives';

const sampleFromSchema = (schema: SchemaObject, config: any = {}): any => {
  let { type } = schema;
  const { allOf, items, properties } = schema;
  const { includeReadOnly, includeWriteOnly } = config;

  if (allOf) {
    const composedSchema = {};
    allOf.map((item: any) => merge(composedSchema, item));
    return sampleFromSchema(composedSchema, config);
  }

  if (properties) {
    type = 'object';
  }

  if (items) {
    type = 'array';
  }

  if (!type || type === 'file') {
    return;
  }

  if (type === 'object') {
    const props = normalizeObject(properties);
    const obj: any = {};
    for (const name in props) {
      if (
        props[name] && (
          props[name].deprecated ||
          (props[name].readOnly && !includeReadOnly) ||
          (props[name].writeOnly && !includeWriteOnly)
        )
      ) {
        continue;
      }

      obj[name] = sampleFromSchema(props[name], config);
    }

    return obj;
  }

  if (type === 'array' && items && isSchemaObject(items)) {
    if (Array.isArray(items.anyOf)) {
      return items.anyOf.map((item: any)  => sampleFromSchema(item, config));
    }

    if (Array.isArray(items.oneOf)) {
      return sampleFromSchema(items.oneOf[0], config);
    }

    return [
      sampleFromSchema(items, config),
    ];
  }

  if (schema['enum']) {
    return (schema['default'])
      ? schema['default']
      : normalizeArray(schema['enum'])[0];
  }

  return getPrimitive(schema, primitives);
};

export default sampleFromSchema;
