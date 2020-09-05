import { SchemaObject } from 'openapi3-ts';
import normalizeObject from './normalizeObject';

export default (
  schema: SchemaObject,
  primitives: Record<string, any>,
): unknown => {
  const { type, format } = normalizeObject(schema);

  const fn = format
    ? (primitives as any)[`${type}_${format}`]
    : (primitives as any)[(type as string)];

  if (typeof(fn) !== 'function') {
    const fnName = format ? `${type}_${format}` : type;
    throw new Error(`Unknown primative: ${fnName}`);
  }

  return fn(schema);
};
