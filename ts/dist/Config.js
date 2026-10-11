"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const TestFeature_1 = require("./feature/test/TestFeature");
const FEATURE_CLASS = {
    test: TestFeature_1.TestFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'Opsledger',
        slug: "opsledger",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
    };
    options = {
        base: "https://opsledger-api-production.up.railway.app",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            audit: {},
            case: {},
            dashboard: {},
            health: {},
            readiness: {},
            system: {},
        }
    };
    entity = {
        "audit": {
            "fields": [
                {
                    "name": "actor_id",
                    "title": "Actor Id",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "actor_type",
                    "title": "Actor Type",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "case_id",
                    "title": "Case Id",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "correlation_id",
                    "title": "Correlation Id",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "created_at",
                    "title": "Created At",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "event_type",
                    "title": "Event Type",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "new_state_json",
                    "title": "New State Json",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "prior_state_json",
                    "title": "Prior State Json",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "summary",
                    "title": "Summary",
                    "type": "`$STRING`",
                    "req": true
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "audit",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/audit",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "audit"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "audit"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "case_id",
                                        "orig": "case_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "event_type",
                                        "orig": "event_type",
                                        "type": "`$ANY`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 100
                                    }
                                ]
                            },
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "case": {
            "fields": [
                {
                    "name": "agent_runs",
                    "title": "Agent Runs",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "annual_revenue",
                    "title": "Annual Revenue",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "assigned_reviewer_id",
                    "title": "Assigned Reviewer Id",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "audit_events",
                    "title": "Audit Events",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "completeness_breakdown",
                    "title": "Completeness Breakdown",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "completeness_score",
                    "title": "Completeness Score",
                    "type": "`$INTEGER`",
                    "req": true
                },
                {
                    "name": "contact_email",
                    "title": "Contact Email",
                    "type": "`$STRING`",
                    "req": true,
                    "format": "email"
                },
                {
                    "name": "contact_name",
                    "title": "Contact Name",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "created_at",
                    "title": "Created At",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "currency",
                    "title": "Currency",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "documents",
                    "title": "Documents",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "extracted_fields",
                    "title": "Extracted Fields",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "findings",
                    "title": "Findings",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "funding_purpose",
                    "title": "Funding Purpose",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "industry",
                    "title": "Industry",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "issue_codes",
                    "title": "Issue Codes",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "jurisdiction",
                    "title": "Jurisdiction",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "last_action",
                    "title": "Last Action",
                    "type": "`$ANY`",
                    "req": true
                },
                {
                    "name": "legal_business_name",
                    "title": "Legal Business Name",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "open_finding_count",
                    "title": "Open Finding Count",
                    "type": "`$INTEGER`",
                    "req": true
                },
                {
                    "name": "reference",
                    "title": "Reference",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "registration_number",
                    "title": "Registration Number",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "requested_amount",
                    "title": "Requested Amount",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "review_actions",
                    "title": "Review Actions",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "stage",
                    "title": "Stage",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "trading_name",
                    "title": "Trading Name",
                    "type": "`$ANY`",
                    "req": true
                },
                {
                    "name": "updated_at",
                    "title": "Updated At",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "version",
                    "title": "Version",
                    "type": "`$INTEGER`",
                    "req": true
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "case",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/cases",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "cases"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "cases"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "q",
                                        "orig": "q",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "stage",
                                        "orig": "stage",
                                        "type": "`$ANY`",
                                        "kind": "query",
                                        "field": true
                                    }
                                ]
                            },
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/cases/{case_id}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "cases"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "cases",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "case_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "case_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "dashboard": {
            "fields": [
                {
                    "name": "approved",
                    "title": "Approved",
                    "type": "`$INTEGER`",
                    "req": true
                },
                {
                    "name": "average_processing_seconds",
                    "title": "Average Processing Seconds",
                    "type": "`$ANY`",
                    "req": true
                },
                {
                    "name": "manual_investigation",
                    "title": "Manual Investigation",
                    "type": "`$INTEGER`",
                    "req": true
                },
                {
                    "name": "needs_information",
                    "title": "Needs Information",
                    "type": "`$INTEGER`",
                    "req": true
                },
                {
                    "name": "open_cases",
                    "title": "Open Cases",
                    "type": "`$INTEGER`",
                    "req": true
                },
                {
                    "name": "ready_for_review",
                    "title": "Ready For Review",
                    "type": "`$INTEGER`",
                    "req": true
                },
                {
                    "name": "recent_activity",
                    "title": "Recent Activity",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "top_failure_reasons",
                    "title": "Top Failure Reasons",
                    "type": "`$ARRAY`",
                    "req": true
                }
            ],
            "name": "dashboard",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/dashboard",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "dashboard"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "dashboard"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "health": {
            "fields": [],
            "name": "health",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/health",
                            "segments": [
                                {
                                    "lit": "health"
                                }
                            ],
                            "parts": [
                                "health"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "readiness": {
            "fields": [],
            "name": "readiness",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/ready",
                            "segments": [
                                {
                                    "lit": "ready"
                                }
                            ],
                            "parts": [
                                "ready"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "system": {
            "fields": [],
            "name": "system",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/system",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "system"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "system"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map