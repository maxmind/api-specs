import { SchemaObject } from 'openapi3-ts';

export default {
  boolean: (
    schema: SchemaObject
  ): boolean => typeof schema.default === 'boolean' ? schema.default : true,
  integer: (): number => 0,
  number: (): number => 0,
  number_float: (): number => 0.0,
  string: (): string => 'string',
  string_date: (): string => new Date().toISOString().substring(0, 10),
  'string_date-time': (): string => new Date().toISOString(),
  string_email: (): string => 'user@example.com',
  string_hostname: (): string => 'example.com',
  string_ipv4: (): string => '198.51.100.42',
  string_ipv6: (): string => '2001:0db8:5b96:0000:0000:426f:8e17:642a',
  string_uuid: (): string => '3fa85f64-5717-4562-b3fc-2c963f66afa6',
};
