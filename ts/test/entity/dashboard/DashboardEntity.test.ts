

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


describe('DashboardEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when OPSLEDGER_TEST_LIVE=TRUE.
  afterEach(liveDelay('OPSLEDGER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OpsledgerSDK.test()
    const ent = testsdk.Dashboard()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = OpsledgerSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Dashboard().load({"approved":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.OPSLEDGER_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'dashboard.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"approved":{"a":true,"h":"Approved","n":"approved","r":true,"t":"`$INTEGER`","key$":"approved","index$":0},"average_processing_seconds":{"a":true,"h":"Average Processing Seconds","n":"average_processing_seconds","r":true,"t":"`$ANY`","key$":"average_processing_seconds","index$":1},"manual_investigation":{"a":true,"h":"Manual Investigation","n":"manual_investigation","r":true,"t":"`$INTEGER`","key$":"manual_investigation","index$":2},"needs_information":{"a":true,"h":"Needs Information","n":"needs_information","r":true,"t":"`$INTEGER`","key$":"needs_information","index$":3},"open_cases":{"a":true,"h":"Open Cases","n":"open_cases","r":true,"t":"`$INTEGER`","key$":"open_cases","index$":4},"ready_for_review":{"a":true,"h":"Ready For Review","n":"ready_for_review","r":true,"t":"`$INTEGER`","key$":"ready_for_review","index$":5},"recent_activity":{"a":true,"h":"Recent Activity","n":"recent_activity","r":true,"t":"`$ARRAY`","key$":"recent_activity","index$":6},"top_failure_reasons":{"a":true,"h":"Top Failure Reasons","n":"top_failure_reasons","r":true,"t":"`$ARRAY`","key$":"top_failure_reasons","index$":7}},"name":"dashboard","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/dashboard","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/api/v1/dashboard","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"dashboard"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"dashboard","name__orig":"dashboard","Name":"Dashboard","name_":"dashboard","name-":"dashboard","NAME":"DASHBOARD","index$":2}, {"active":true,"entity":"dashboard","key$":"BasicDashboardFlow","kind":"basic","name":"BasicDashboardFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"dashboard_ref01","srcdatavar":"dashboard_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-dashboard_ref01"}}]}]}, 'Dashboard', {"GET /api/v1/dashboard":{"protocol":"http","parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let dashboard_ref01_data = Object.values(setup.data.existing.dashboard)[0] as any

    // LOAD
    const dashboard_ref01_ent = client.Dashboard()
    const dashboard_ref01_match_dt0: any = {}
    const dashboard_ref01_data_dt0 = (await dashboard_ref01_ent.load(dashboard_ref01_match_dt0)).data()
    assert(null != dashboard_ref01_data_dt0)


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
      '../../../../.sdk/test/entity/dashboard/DashboardTestData.json')

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
    ['dashboard01','dashboard02','dashboard03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'OPSLEDGER_TEST_DASHBOARD_ENTID': idmap,
    'OPSLEDGER_TEST_LIVE': 'FALSE',
    'OPSLEDGER_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['OPSLEDGER_TEST_DASHBOARD_ENTID']

  const live = 'TRUE' === env.OPSLEDGER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['OPSLEDGER_TEST_DASHBOARD_ENTID']
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
  
