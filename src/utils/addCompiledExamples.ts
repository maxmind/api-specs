import OpenApiParser from '@apidevtools/swagger-parser';
import cloneDeep from 'lodash/cloneDeep';
import { OpenAPI } from 'openapi-types';
import { addExtension, OpenAPIObject, SchemaObject } from 'openapi3-ts';
import sortKeys from './sortKeys';
import sampleFromSchema from './sampleFromSchema';

export default (
  Spec: OpenAPIObject
): Promise<OpenAPI.Document> => OpenApiParser.validate(
  cloneDeep(Spec) as any
)
  .then((spec: any): any => {
    Object.entries(spec.components.schemas).map(([
      name,
      schema,
    ]) => {
      if (Spec.components && Spec.components.schemas) {
        addExtension(
          Spec.components.schemas[name],
          'x-compiled-example',
          sampleFromSchema(schema as SchemaObject)
        );

        if (Spec.components.schemas[name]) {
          Object.values(Spec.components.schemas[name]);
        }
      }
    });

    return sortKeys(Spec);
  })
  .then((spec) => {
    Object.entries(spec.components.schemas).map(([
      name,
      schema,
    ]) => {
      const properties = (schema as SchemaObject).properties;

      if (!properties) {
        return;
      }

      Object.keys(properties).map(property => {
        const compiledExample = spec.components.schemas[name]['x-compiled-example'][property];
        const exampleProperty = JSON.stringify(
          compiledExample,
          null,
          2
        );

        if (!exampleProperty) {
          return;
        }

        let ExampleRegex = RegExp(
          `(?:"${property}": )(.*?)(?:\\n)`,
          'gm'
        );

        if (typeof compiledExample === 'object') {
          if (Array.isArray(compiledExample)) {
            // eslint-disable-next-line security/detect-non-literal-regexp
            ExampleRegex = new RegExp(
              `(?:"${property}": \\[)((.|\\s)*?)(?:\\])`,
              'gm'
            );
          } else {
            // eslint-disable-next-line security/detect-non-literal-regexp
            ExampleRegex = new RegExp(
              `(?:"${property}": {)((.|\\s)*?)(?:})`,
              'gm'
            );
          }
        }

        const example = JSON.stringify(
          spec.components.schemas[name]['x-compiled-example'],
          null,
          2,
        );

        const index = example.search(ExampleRegex);

        if (index <= 0) {
          return;
        }

        const startingLineNumber = example
          .substring(0, index)
          .split('\n')
          .length;

        const endingLineNumber = (exampleProperty.split('\n')
          .length) + startingLineNumber - 1;

        addExtension(
          spec.components.schemas[name].properties[property],
          'x-line-numbers',
          startingLineNumber === endingLineNumber
            ? startingLineNumber
            : `${startingLineNumber}-${endingLineNumber}`
        );
      });
    });

    return spec;
  });
