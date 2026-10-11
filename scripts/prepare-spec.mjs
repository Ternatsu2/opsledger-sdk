import { readFile, writeFile } from 'node:fs/promises';

const directory = new URL('../.sdk/def/', import.meta.url);
const spec = JSON.parse(await readFile(new URL('openapi.source.json', directory), 'utf8'));
const paths = [
  '/health',
  '/ready',
  '/api/v1/system',
  '/api/v1/dashboard',
  '/api/v1/cases',
  '/api/v1/cases/{case_id}',
  '/api/v1/audit',
];

spec.paths = Object.fromEntries(paths.map(path => [path, { get: spec.paths[path].get }]));
spec.servers = [{ url: 'https://opsledger-api-production.up.railway.app' }];
spec.info.description = 'Read-only SDK scope for the public OpsLedger synthetic-data demo. No decisions, uploads or mutations.';
spec.info.license = {
  name: 'Apache-2.0',
  url: 'https://github.com/Ternatsu2/opsledger-ai/blob/main/LICENSE',
};

await writeFile(new URL('openapi.readonly.json', directory), JSON.stringify(spec, null, 2) + '\n');
console.log(`Prepared ${paths.length} read-only operations from the saved public OpenAPI document.`);
