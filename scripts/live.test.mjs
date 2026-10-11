import assert from 'node:assert/strict';
import test from 'node:test';
import { OpsledgerSDK } from '../ts/dist/OpsledgerSDK.js';

const client = new OpsledgerSDK({ allow: { method: 'GET' } });

test('seven generated operations read the public synthetic demo', { timeout: 20000 }, async () => {
  const health = (await client.Health().load()).data();
  assert.equal(health.status, 'ok');

  const ready = (await client.Readiness().load()).data();
  assert.equal(ready.status, 'ready');

  const system = (await client.System().load()).data();
  assert.equal(typeof system, 'object');

  const cases = await client.Case().list();
  assert.ok(cases.length > 0);
  const first = cases[0].data();
  assert.ok(first.id);

  const detail = (await client.Case().load({ id: first.id })).data();
  assert.equal(detail.reference, first.reference);
  assert.ok(Array.isArray(detail.documents));

  const dashboard = (await client.Dashboard().load()).data();
  assert.equal(typeof dashboard.open_cases, 'number');

  const audit = await client.Audit().list({ case_id: first.id, limit: 2 });
  assert.ok(audit.length <= 2);
  assert.ok(audit.every(entry => entry.data().case_id === first.id));
});

test('case filters preserve query parameters and empty results', { timeout: 15000 }, async () => {
  const cases = await client.Case().list({ stage: 'NEEDS_INFORMATION' });
  assert.ok(cases.length > 0);
  assert.ok(cases.every(entry => entry.data().stage === 'NEEDS_INFORMATION'));
  const empty = await client.Case().list({ q: 'sdk-evaluation-no-such-business-20261010' });
  assert.deepEqual(empty, []);
});

test('missing cases reject rather than returning a success entity', { timeout: 10000 }, async () => {
  await assert.rejects(client.Case().load({ id: 'sdk-evaluation-no-such-case' }));
});

test('direct reports the HTTP status for server validation failures', { timeout: 10000 }, async () => {
  const result = await client.direct({ path: '/api/v1/audit', query: { limit: 0 } });
  assert.equal(result.ok, false);
  assert.equal(result.status, 422);
});

test('GET-only client rejects a write before sending it', { timeout: 1000 }, async () => {
  const request = await client.prepare({ path: '/api/v1/cases', method: 'POST', body: {} });
  assert.ok(request instanceof Error);
});
