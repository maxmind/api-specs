import { OpenAPIV3 } from 'openapi-types';
import minFraud from './minfraud/2.0';

const specs: Record<string, OpenAPIV3.Document> = {
  minFraud,
};

export { specs };
