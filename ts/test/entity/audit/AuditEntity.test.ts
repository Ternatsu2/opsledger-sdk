

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { OpsledgerSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('AuditEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when OPSLEDGER_TEST_LIVE=TRUE.
  afterEach(liveDelay('OPSLEDGER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OpsledgerSDK.test()
    const ent = testsdk.Audit()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('audit hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of OpsledgerSDK.test(offline).Audit().stream('list')) { }
    }, /offline/)

    for await (const _item of OpsledgerSDK.test(offline).Audit()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = OpsledgerSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Audit().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of OpsledgerSDK.test().Audit().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new OpsledgerSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Audit().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Audit().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = OpsledgerSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Audit().list({"case_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.OPSLEDGER_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'audit.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"actor_id":{"a":true,"h":"Actor Id","n":"actor_id","r":true,"t":"`$STRING`","key$":"actor_id","index$":0},"actor_type":{"a":true,"h":"Actor Type","n":"actor_type","r":true,"t":"`$STRING`","key$":"actor_type","index$":1},"case_id":{"a":true,"h":"Case Id","n":"case_id","r":true,"t":"`$STRING`","key$":"case_id","index$":2},"correlation_id":{"a":true,"h":"Correlation Id","n":"correlation_id","r":true,"t":"`$STRING`","key$":"correlation_id","index$":3},"created_at":{"a":true,"h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":4},"event_type":{"a":true,"h":"Event Type","n":"event_type","r":true,"t":"`$STRING`","key$":"event_type","index$":5},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":6},"new_state_json":{"a":true,"h":"New State Json","n":"new_state_json","r":true,"t":"`$OBJECT`","key$":"new_state_json","index$":7},"prior_state_json":{"a":true,"h":"Prior State Json","n":"prior_state_json","r":true,"t":"`$OBJECT`","key$":"prior_state_json","index$":8},"summary":{"a":true,"h":"Summary","n":"summary","r":true,"t":"`$STRING`","key$":"summary","index$":9}},"id":{"field":"id","name":"id"},"name":"audit","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/audit","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"case_id","or":"case_id","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"event_type","or":"event_type","r":false,"t":"`$ANY`","index$":1},{"a":true,"ex":100,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":2}]},"k":"http","m":"GET","o":"/api/v1/audit","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"audit"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"audit","name__orig":"audit","Name":"Audit","name_":"audit","name-":"audit","NAME":"AUDIT","index$":0}, {"active":true,"entity":"audit","key$":"BasicAuditFlow","kind":"basic","name":"BasicAuditFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"audit_ref01"}}]}]}, 'Audit', {"GET /api/v1/audit":{"protocol":"http","parameters":[{"name":"case_id","in":"query","required":false,"schema":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Case Id"},"index$":0},{"name":"event_type","in":"query","required":false,"schema":{"anyOf":[{"type":"string","maxLength":80},{"type":"null"}],"title":"Event Type"},"index$":1},{"name":"limit","in":"query","required":false,"schema":{"type":"integer","maximum":200,"minimum":1,"default":100,"title":"Limit"},"index$":2}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let audit_ref01_data = Object.values(setup.data.existing.audit)[0] as any

    // LIST
    const audit_ref01_ent = client.Audit()
    const audit_ref01_match: any = {}

    const audit_ref01_list = (await audit_ref01_ent.list(audit_ref01_match)).map((e: any) => e.data())


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/audit/AuditTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = OpsledgerSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['audit01','audit02','audit03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'OPSLEDGER_TEST_AUDIT_ENTID': idmap,
    'OPSLEDGER_TEST_LIVE': 'FALSE',
    'OPSLEDGER_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['OPSLEDGER_TEST_AUDIT_ENTID']

  const live = 'TRUE' === env.OPSLEDGER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['OPSLEDGER_TEST_AUDIT_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new OpsledgerSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.OPSLEDGER_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
