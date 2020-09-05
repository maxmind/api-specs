import OpenApiParser from '@apidevtools/swagger-parser';
import * as minFraud from '@maxmind/minfraud-api-node';
import dotenv from 'dotenv';
import jestOpenAPI from 'jest-openapi';
import snakecaseKeys from 'snakecase-keys';

dotenv.config();

const parser = new OpenApiParser();

describe('minfraud.json', () => {
  let client: any;

  beforeAll(async () => {
    const spec = await parser.dereference('dist/minFraud.json');
    jestOpenAPI(spec);
    client = new minFraud.Client(
      process.env.MAXMIND_ACCOUNT_ID,
      process.env.MAXMIND_LICENSE_KEY,
    );
  });

  it('is a valid OpenAPI v3 spec', async () => {
    const transaction = new minFraud.Transaction({
      device: new minFraud.Device({
        ipAddress: '8.8.8.8',
      }),
      email: new minFraud.Email({
        address: 'foo@bar.com',
        domain: 'bar.com',
      }),
    });

    const response = await client.insights(transaction);

    expect(snakecaseKeys(response)).toSatisfySchemaInApiSpec('Response.Insights');
  });
});
