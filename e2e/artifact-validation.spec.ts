import OpenApiParser from '@apidevtools/swagger-parser';

const parser = new OpenApiParser();

describe('minfraud.json', () => {
  it('is a valid OpenAPI v3 spec', async () => {
    try {
      await parser.validate('dist/minFraud.json');
    } catch(e) {
      fail(e);
    }
  });
});
