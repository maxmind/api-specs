import { SchemaObject } from 'openapi3-ts';

const CustomInputs: SchemaObject = {
  description: 'Custom Inputs are optional inputs to the minFraud service that must first be defined for your account. Select “Custom Inputs” from the Account Portal in order to do so. See our Custom Inputs documentation for more information.',
  anyOf: [
    {
      properties: {
        'custom_input_key_1': {
          type: 'boolean',
        },
      },
      type: 'object'
    },
    {
      properties: {
        'custom_input_key_2': {
          description: 'A floating point number between -10<sup>13</sup> and 10<sup>13</sup>',
          maximum: 10e13,
          minimum: -10e13,
          type: 'number',
        },
      },
      type: 'object'
    },
    {
      properties: {
        'custom_input_key_3': {
          description: 'A phone number, limited to 255 characters. Numbers, spaces and punctuation accepted, although spaces and punctuation will be stripped. The following ASCII characters constitute the accepted punctuation: ` ~ ! @ # $ % ^ & * ( ) – _ = + ‘ ” ; : , < . > / ? \\ | [ ] { and }.',
          format: 'phone',
          maxLength: 255,
          type: 'string',
        },
      },
      type: 'object'
    },
    {
      properties: {
        'custom_input_key_4': {
          description: 'A string, limited to 255 characters. The null character is not allowed.',
          maxLength: 255,
          type: 'string',
        },
      },
      type: 'object'
    },
  ],
  type: 'object',
};

export default CustomInputs;
