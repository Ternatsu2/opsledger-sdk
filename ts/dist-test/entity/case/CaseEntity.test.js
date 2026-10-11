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
(0, node_test_1.describe)('CaseEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when OPSLEDGER_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('OPSLEDGER_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.OpsledgerSDK.test();
        const ent = testsdk.Case();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('case hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.OpsledgerSDK.test(offline).Case().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.OpsledgerSDK.test(offline).Case()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.OpsledgerSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Case().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.OpsledgerSDK.test().Case().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.OpsledgerSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Case().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Case().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.OpsledgerSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Case().load({ "id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.OPSLEDGER_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'case.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "agent_runs": { "a": true, "h": "Agent Runs", "n": "agent_runs", "r": true, "t": "`$ARRAY`", "key$": "agent_runs", "index$": 0 }, "annual_revenue": { "a": true, "h": "Annual Revenue", "n": "annual_revenue", "r": true, "t": "`$STRING`", "key$": "annual_revenue", "index$": 1 }, "assigned_reviewer_id": { "a": true, "h": "Assigned Reviewer Id", "n": "assigned_reviewer_id", "r": true, "t": "`$STRING`", "key$": "assigned_reviewer_id", "index$": 2 }, "audit_events": { "a": true, "h": "Audit Events", "n": "audit_events", "r": true, "t": "`$ARRAY`", "key$": "audit_events", "index$": 3 }, "completeness_breakdown": { "a": true, "h": "Completeness Breakdown", "n": "completeness_breakdown", "r": true, "t": "`$ARRAY`", "key$": "completeness_breakdown", "index$": 4 }, "completeness_score": { "a": true, "h": "Completeness Score", "n": "completeness_score", "r": true, "t": "`$INTEGER`", "key$": "completeness_score", "index$": 5 }, "contact_email": { "a": true, "fo": "email", "h": "Contact Email", "n": "contact_email", "r": true, "t": "`$STRING`", "key$": "contact_email", "index$": 6 }, "contact_name": { "a": true, "h": "Contact Name", "n": "contact_name", "r": true, "t": "`$STRING`", "key$": "contact_name", "index$": 7 }, "created_at": { "a": true, "h": "Created At", "n": "created_at", "r": true, "t": "`$STRING`", "key$": "created_at", "index$": 8 }, "currency": { "a": true, "h": "Currency", "n": "currency", "r": true, "t": "`$STRING`", "key$": "currency", "index$": 9 }, "documents": { "a": true, "h": "Documents", "n": "documents", "r": true, "t": "`$ARRAY`", "key$": "documents", "index$": 10 }, "extracted_fields": { "a": true, "h": "Extracted Fields", "n": "extracted_fields", "r": true, "t": "`$ARRAY`", "key$": "extracted_fields", "index$": 11 }, "findings": { "a": true, "h": "Findings", "n": "findings", "r": true, "t": "`$ARRAY`", "key$": "findings", "index$": 12 }, "funding_purpose": { "a": true, "h": "Funding Purpose", "n": "funding_purpose", "r": true, "t": "`$STRING`", "key$": "funding_purpose", "index$": 13 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 14 }, "industry": { "a": true, "h": "Industry", "n": "industry", "r": true, "t": "`$STRING`", "key$": "industry", "index$": 15 }, "issue_codes": { "a": true, "h": "Issue Codes", "n": "issue_codes", "r": true, "t": "`$ARRAY`", "key$": "issue_codes", "index$": 16 }, "jurisdiction": { "a": true, "h": "Jurisdiction", "n": "jurisdiction", "r": true, "t": "`$STRING`", "key$": "jurisdiction", "index$": 17 }, "last_action": { "a": true, "h": "Last Action", "n": "last_action", "r": true, "t": "`$ANY`", "key$": "last_action", "index$": 18 }, "legal_business_name": { "a": true, "h": "Legal Business Name", "n": "legal_business_name", "r": true, "t": "`$STRING`", "key$": "legal_business_name", "index$": 19 }, "open_finding_count": { "a": true, "h": "Open Finding Count", "n": "open_finding_count", "r": true, "t": "`$INTEGER`", "key$": "open_finding_count", "index$": 20 }, "reference": { "a": true, "h": "Reference", "n": "reference", "r": true, "t": "`$STRING`", "key$": "reference", "index$": 21 }, "registration_number": { "a": true, "h": "Registration Number", "n": "registration_number", "r": true, "t": "`$STRING`", "key$": "registration_number", "index$": 22 }, "requested_amount": { "a": true, "h": "Requested Amount", "n": "requested_amount", "r": true, "t": "`$STRING`", "key$": "requested_amount", "index$": 23 }, "review_actions": { "a": true, "h": "Review Actions", "n": "review_actions", "r": true, "t": "`$ARRAY`", "key$": "review_actions", "index$": 24 }, "stage": { "a": true, "h": "Stage", "n": "stage", "r": true, "t": "`$STRING`", "key$": "stage", "index$": 25 }, "trading_name": { "a": true, "h": "Trading Name", "n": "trading_name", "r": true, "t": "`$ANY`", "key$": "trading_name", "index$": 26 }, "updated_at": { "a": true, "h": "Updated At", "n": "updated_at", "r": true, "t": "`$STRING`", "key$": "updated_at", "index$": 27 }, "version": { "a": true, "h": "Version", "n": "version", "r": true, "t": "`$INTEGER`", "key$": "version", "index$": 28 } }, "id": { "field": "id", "name": "id" }, "name": "case", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/cases", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "q", "or": "q", "r": false, "t": "`$ANY`", "index$": 0 }, { "a": true, "k": "query", "n": "stage", "or": "stage", "r": false, "t": "`$ANY`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/v1/cases", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "cases" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/cases/{case_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "case_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/cases/{case_id}", "q": { "exist": ["id"] }, "r": { "param": { "case_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "cases" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "case", "name__orig": "case", "Name": "Case", "name_": "case", "name-": "case", "NAME": "CASE", "index$": 1 }, { "active": true, "entity": "case", "key$": "BasicCaseFlow", "kind": "basic", "name": "BasicCaseFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "case_ref01" } }] }, { "a": true, "d": {}, "i": { "ref": "case_ref01", "srcdatavar": "case_ref01_data", "suffix": "_dt0" }, "m": { "id": "case01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-case_ref01" } }] }] }, 'Case', { "GET /api/v1/cases": { "protocol": "http", "parameters": [{ "name": "stage", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "string", "enum": ["DRAFT", "SUBMITTED", "INGESTING", "EXTRACTION_FAILED", "VALIDATING", "NEEDS_INFORMATION", "AGENT_REVIEW", "READY_FOR_HUMAN_REVIEW", "MANUAL_INVESTIGATION", "APPROVED_FOR_NEXT_STAGE", "CLOSED"], "title": "CaseStage", "x-ref": "#/components/schemas/CaseStage" }, { "type": "null" }], "title": "Stage" }, "index$": 0 }, { "name": "q", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "string", "maxLength": 120 }, { "type": "null" }], "title": "Q" }, "index$": 1 }] }, "GET /api/v1/cases/{case_id}": { "protocol": "http", "parameters": [{ "name": "case_id", "in": "path", "required": true, "schema": { "type": "string", "title": "Case Id" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let case_ref01_data = Object.values(setup.data.existing.case)[0];
        // LIST
        const case_ref01_ent = client.Case();
        const case_ref01_match = {};
        const case_ref01_list = (await case_ref01_ent.list(case_ref01_match)).map((e) => e.data());
        // LOAD
        const case_ref01_match_dt0 = {};
        case_ref01_match_dt0.id = case_ref01_data.id;
        const case_ref01_data_dt0 = (await case_ref01_ent.load(case_ref01_match_dt0)).data();
        (0, node_assert_1.default)(case_ref01_data_dt0.id === case_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/case/CaseTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.OpsledgerSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['case01', 'case02', 'case03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'OPSLEDGER_TEST_CASE_ENTID': idmap,
        'OPSLEDGER_TEST_LIVE': 'FALSE',
        'OPSLEDGER_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['OPSLEDGER_TEST_CASE_ENTID'];
    const live = 'TRUE' === env.OPSLEDGER_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['OPSLEDGER_TEST_CASE_ENTID'];
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
//# sourceMappingURL=CaseEntity.test.js.map