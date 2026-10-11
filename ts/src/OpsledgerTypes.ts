// Typed models for the Opsledger SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Audit {
  actor_id: string
  actor_type: string
  case_id: string
  correlation_id: string
  created_at: string
  event_type: string
  id: string
  new_state_json: Record<string, any>
  prior_state_json: Record<string, any>
  summary: string
}

export interface AuditListMatch {
  case_id?: string
  event_type?: any
  limit?: number
}

export interface Case {
  agent_runs: any[]
  annual_revenue: string
  assigned_reviewer_id: string
  audit_events: any[]
  completeness_breakdown: any[]
  completeness_score: number
  contact_email: string
  contact_name: string
  created_at: string
  currency: string
  documents: any[]
  extracted_fields: any[]
  findings: any[]
  funding_purpose: string
  id: string
  industry: string
  issue_codes: any[]
  jurisdiction: string
  last_action: any
  legal_business_name: string
  open_finding_count: number
  reference: string
  registration_number: string
  requested_amount: string
  review_actions: any[]
  stage: string
  trading_name: any
  updated_at: string
  version: number
}

export interface CaseLoadMatch {
  id: string
}

export interface CaseListMatch {
  q?: any
  stage?: any
}

export interface Dashboard {
  approved: number
  average_processing_seconds: any
  manual_investigation: number
  needs_information: number
  open_cases: number
  ready_for_review: number
  recent_activity: any[]
  top_failure_reasons: any[]
}

export interface DashboardLoadMatch {
  approved?: number
  average_processing_seconds?: any
  manual_investigation?: number
  needs_information?: number
  open_cases?: number
  ready_for_review?: number
  recent_activity?: any[]
  top_failure_reasons?: any[]
}

export interface Health {
}

export interface HealthLoadMatch {
}

export interface Readiness {
}

export interface ReadinessLoadMatch {
}

export interface System {
}

export interface SystemLoadMatch {
}

