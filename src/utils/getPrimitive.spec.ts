import { SchemaObject } from 'openapi3-ts';
import getPrimitive from './getPrimitive';

const mockedPrimitives = {
  bar: () => 'bar',
  foo: () => 'foo',
  foo_bar: () => 'foo-bar',
};

describe('getPrimitive()', () => {
  it('returns primitive with no format', () => {
    const schema: SchemaObject = {
      type: 'foo',
    };

    const primitive = getPrimitive(schema, mockedPrimitives);

    expect(primitive).toBe('foo');
  });

  it('returns primitive with format', () => {
    const schema: SchemaObject = {
      format: 'bar',
      type: 'foo',
    };

    const primitive = getPrimitive(schema, mockedPrimitives);

    expect(primitive).toBe('foo-bar');
  });

  it('throws error if type is unknown', () => {
    const schema: SchemaObject = {
      type: 'baz',
    };

    expect(
      () => getPrimitive(schema, mockedPrimitives)
    ).toThrow('Unknown primative: baz');
  });

  it('throws error if format is unknown', () => {
    const schema: SchemaObject = {
      format: 'baz',
      type: 'foo',
    };

    expect(
      () => getPrimitive(schema, mockedPrimitives)
    ).toThrow('Unknown primative: foo_baz');
  });
})
