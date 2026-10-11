"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('DashboardEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when OPSLEDGER_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('OPSLEDGER_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.OpsledgerSDK.test();
        const ent = testsdk.Dashboard();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.OpsledgerSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Dashboard().load({ "approved": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.OPSLEDGER_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'dashboard.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "approved": { "a": true, "h": "Approved", "n": "approved", "r": true, "t": "`$INTEGER`", "key$": "approved", "index$": 0 }, "average_processing_seconds": { "a": true, "h": "Average Processing Seconds", "n": "average_processing_seconds", "r": true, "t": "`$ANY`", "key$": "average_processing_seconds", "index$": 1 }, "manual_investigation": { "a": true, "h": "Manual Investigation", "n": "manual_investigation", "r": true, "t": "`$INTEGER`", "key$": "manual_investigation", "index$": 2 }, "needs_information": { "a": true, "h": "Needs Information", "n": "needs_information", "r": true, "t": "`$INTEGER`", "key$": "needs_information", "index$": 3 }, "open_cases": { "a": true, "h": "Open Cases", "n": "open_cases", "r": true, "t": "`$INTEGER`", "key$": "open_cases", "index$": 4 }, "ready_for_review": { "a": true, "h": "Ready For Review", "n": "ready_for_review", "r": true, "t": "`$INTEGER`", "key$": "ready_for_review", "index$": 5 }, "recent_activity": { "a": true, "h": "Recent Activity", "n": "recent_activity", "r": true, "t": "`$ARRAY`", "key$": "recent_activity", "index$": 6 }, "top_failure_reasons": { "a": true, "h": "Top Failure Reasons", "n": "top_failure_reasons", "r": true, "t": "`$ARRAY`", "key$": "top_failure_reasons", "index$": 7 } }, "name": "dashboard", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/dashboard", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/api/v1/dashboard", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "dashboard" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "dashboard", "name__orig": "dashboard", "Name": "Dashboard", "name_": "dashboard", "name-": "dashboard", "NAME": "DASHBOARD", "index$": 2 }, { "active": true, "entity": "dashboard", "key$": "BasicDashboardFlow", "kind": "basic", "name": "BasicDashboardFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "dashboard_ref01", "srcdatavar": "dashboard_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-dashboard_ref01" } }] }] }, 'Dashboard', { "GET /api/v1/dashboard": { "protocol": "http", "parameters": [] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let dashboard_ref01_data = Object.values(setup.data.existing.dashboard)[0];
        // LOAD
        const dashboard_ref01_ent = client.Dashboard();
        const dashboard_ref01_match_dt0 = {};
        const dashboard_ref01_data_dt0 = (await dashboard_ref01_ent.load(dashboard_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != dashboard_ref01_data_dt0);
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/dashboard/DashboardTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.OpsledgerSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['dashboard01', 'dashboard02', 'dashboard03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'OPSLEDGER_TEST_DASHBOARD_ENTID': idmap,
        'OPSLEDGER_TEST_LIVE': 'FALSE',
        'OPSLEDGER_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['OPSLEDGER_TEST_DASHBOARD_ENTID'];
    const live = 'TRUE' === env.OPSLEDGER_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['OPSLEDGER_TEST_DASHBOARD_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.OpsledgerSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=DashboardEntity.test.js.map