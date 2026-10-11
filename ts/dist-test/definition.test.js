"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "audit",
        "accessor": "Audit",
        "op": "list",
        "method": "GET",
        "path": "/api/v1/audit",
        "args": [],
        "select": {
            "case_id": "v1",
            "event_type": "v1",
            "limit": 100
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "case_id",
            "event_type",
            "limit"
        ],
        "queryArgs": [
            {
                "name": "case_id",
                "wire": "case_id"
            },
            {
                "name": "event_type",
                "wire": "event_type"
            },
            {
                "name": "limit",
                "wire": "limit"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "id": "x",
                "case_id": "x",
                "correlation_id": "x",
                "actor_type": "x",
                "actor_id": "x",
                "event_type": "x",
                "summary": "x",
                "prior_state_json": {},
                "new_state_json": {},
                "created_at": "x"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "case",
        "accessor": "Case",
        "op": "list",
        "method": "GET",
        "path": "/api/v1/cases",
        "args": [],
        "select": {
            "q": "v1",
            "stage": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "stage",
            "q"
        ],
        "queryArgs": [
            {
                "name": "q",
                "wire": "q"
            },
            {
                "name": "stage",
                "wire": "stage"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "id": "x",
                "reference": "x",
                "legal_business_name": "x",
                "trading_name": "x",
                "registration_number": "x",
                "jurisdiction": "x",
                "industry": "x",
                "requested_amount": "x",
                "currency": "x",
                "funding_purpose": "x",
                "annual_revenue": "x",
                "contact_name": "x",
                "contact_email": "x",
                "stage": "DRAFT",
                "completeness_score": 1,
                "completeness_breakdown": [
                    {}
                ],
                "assigned_reviewer_id": "x",
                "created_at": "x",
                "updated_at": "x",
                "version": 1,
                "open_finding_count": 1,
                "issue_codes": [
                    "x"
                ],
                "last_action": "x"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "case",
        "accessor": "Case",
        "op": "load",
        "method": "GET",
        "path": "/api/v1/cases/{case_id}",
        "args": [
            {
                "name": "id",
                "wire": "case_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "id": "x",
            "reference": "x",
            "legal_business_name": "x",
            "trading_name": "x",
            "registration_number": "x",
            "jurisdiction": "x",
            "industry": "x",
            "requested_amount": "x",
            "currency": "x",
            "funding_purpose": "x",
            "annual_revenue": "x",
            "contact_name": "x",
            "contact_email": "x",
            "stage": "DRAFT",
            "completeness_score": 1,
            "completeness_breakdown": [
                {}
            ],
            "assigned_reviewer_id": "x",
            "created_at": "x",
            "updated_at": "x",
            "version": 1,
            "documents": [
                {
                    "id": "x",
                    "case_id": "x",
                    "original_filename": "x",
                    "document_type": "x",
                    "mime_type": "x",
                    "sha256": "x",
                    "upload_status": "x",
                    "extraction_status": "x",
                    "page_count": 1,
                    "metadata_json": {},
                    "uploaded_at": "x",
                    "extracted_at": "x",
                    "error_code": "x",
                    "error_message_safe": "x"
                }
            ],
            "extracted_fields": [
                {
                    "id": "x",
                    "document_id": "x",
                    "field_name": "x",
                    "raw_value": "x",
                    "confidence": 1,
                    "source_page": 1,
                    "source_locator": "x",
                    "extraction_method": "x",
                    "verified_by_human": true
                }
            ],
            "findings": [
                {
                    "id": "x",
                    "rule_code": "x",
                    "severity": "x",
                    "status": "x",
                    "message": "x",
                    "evidence_json": [
                        {}
                    ],
                    "detected_at": "x",
                    "resolved_at": "x",
                    "resolution_note": "x",
                    "resolved_by": "x"
                }
            ],
            "agent_runs": [
                {
                    "id": "x",
                    "workflow_name": "x",
                    "model_provider": "x",
                    "model_name": "x",
                    "prompt_version": "x",
                    "tool_calls_json": [
                        {}
                    ],
                    "structured_output_json": {},
                    "status": "x",
                    "started_at": "x",
                    "completed_at": "x",
                    "token_usage": {},
                    "latency_ms": 1,
                    "error_code": "x"
                }
            ],
            "review_actions": [
                {
                    "id": "x",
                    "reviewer_id": "x",
                    "action_type": "x",
                    "edited_draft": "x",
                    "rationale": "x",
                    "prior_stage": "x",
                    "resulting_stage": "x",
                    "created_at": "x"
                }
            ],
            "audit_events": [
                {
                    "id": "x",
                    "case_id": "x",
                    "correlation_id": "x",
                    "actor_type": "x",
                    "actor_id": "x",
                    "event_type": "x",
                    "summary": "x",
                    "prior_state_json": {},
                    "new_state_json": {},
                    "created_at": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "dashboard",
        "accessor": "Dashboard",
        "op": "load",
        "method": "GET",
        "path": "/api/v1/dashboard",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "open_cases": 1,
            "ready_for_review": 1,
            "needs_information": 1,
            "manual_investigation": 1,
            "approved": 1,
            "average_processing_seconds": 1,
            "top_failure_reasons": [
                {}
            ],
            "recent_activity": [
                {
                    "id": "x",
                    "case_id": "x",
                    "correlation_id": "x",
                    "actor_type": "x",
                    "actor_id": "x",
                    "event_type": "x",
                    "summary": "x",
                    "prior_state_json": {},
                    "new_state_json": {},
                    "created_at": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "health",
        "accessor": "Health",
        "op": "load",
        "method": "GET",
        "path": "/health",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {},
        "idField": "id"
    },
    {
        "entity": "readiness",
        "accessor": "Readiness",
        "op": "load",
        "method": "GET",
        "path": "/ready",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {},
        "idField": "id"
    },
    {
        "entity": "system",
        "accessor": "System",
        "op": "load",
        "method": "GET",
        "path": "/api/v1/system",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {},
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map