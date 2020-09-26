import OpenApiParser from '@apidevtools/swagger-parser';
import dotenv from 'dotenv';
import jestOpenAPI from 'jest-openapi';
import fetch, { Headers } from 'node-fetch';

dotenv.config();

const parser = new OpenApiParser();

const { MAXMIND_ACCOUNT_ID, MAXMIND_LICENSE_KEY } = process.env;

if (!MAXMIND_ACCOUNT_ID) {
  throw Error("The `MAXMIND_ACCOUNT_ID` environment variable is required.");
}

if (!MAXMIND_LICENSE_KEY) {
  throw Error("The `MAXMIND_LICENSE_KEY` environment variable is required.");
}

const basicAuth = Buffer.from(
  `${MAXMIND_ACCOUNT_ID}:${MAXMIND_LICENSE_KEY}`
).toString('base64');

const minfraud = async (endpoint: any, body: any) => await fetch(
  `https://minfraud.maxmind.com/minfraud/v2.0/${endpoint}`,
  {
    body: JSON.stringify(body),
    headers: new Headers({
      Authorization: `Basic ${basicAuth}`
    }),
    method: 'POST',
  },
).then(res => res.json());

const transaction = {
  device: {
    ip_address: '8.8.8.8',
  },
  email: {
    address: 'foo@bar.com',
    domain: 'bar.com',
  },
};

describe('minFraud Web Service', () => {
  beforeAll(async () => {
    const spec = await parser.dereference('dist/minfraud/2.0/spec.dereferenced.json');
    jestOpenAPI(spec);
  });

  describe('Score', () => {
    it('response matches OpenAPI Spec', async () => {
      const response = await minfraud('score', transaction);
      expect(response).toSatisfySchemaInApiSpec('Response.Score');
    });
  });

  describe('Insights', () => {
    it('response matches OpenAPI Spec', async () => {
      const response = await minfraud('insights', transaction);
      expect(response).toSatisfySchemaInApiSpec('Response.Insights');
    });
  });

  describe('Factors', () => {
    it('response matches OpenAPI Spec', async () => {
      const response = await minfraud('factors', transaction);
      expect(response).toSatisfySchemaInApiSpec('Response.Factors');
    });
  });
});
