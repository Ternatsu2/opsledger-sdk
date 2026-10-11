# Opsledger TypeScript SDK Reference

Complete API reference for the Opsledger TypeScript SDK.


## OpsledgerSDK

### Constructor

```ts
new OpsledgerSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `OpsledgerSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = OpsledgerSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `OpsledgerSDK` instance in test mode.


### Instance Methods

#### `Audit(data?: object)`

Create a new `Audit` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AuditEntity` instance.

#### `Case(data?: object)`

Create a new `Case` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CaseEntity` instance.

#### `Dashboard(data?: object)`

Create a new `Dashboard` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DashboardEntity` instance.

#### `Health(data?: object)`

Create a new `Health` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `HealthEntity` instance.

#### `Readiness(data?: object)`

Create a new `Readiness` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ReadinessEntity` instance.

#### `System(data?: object)`

Create a new `System` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SystemEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |
| `fetchargs.ctrl.signal` | `AbortSignal` | Aborts the request in flight: `ok` is then `false` and `err.code` is `request_aborted`. |

**Returns:** `Promise<{ ok, status, headers, data }>`. On a failure
`ok` is `false` and `err` holds the error.

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `OpsledgerSDK.test()`.

**Returns:** `OpsledgerSDK` instance in test mode.

#### Cancelling a call

Every entity operation takes an optional `ctrl` object after its match or
data, and an `AbortSignal` in `ctrl.signal` cancels the request in flight.
The operation then rejects with an error whose `code` is
`request_aborted` and whose `cause` is the signal's reason. A request
whose signal has already aborted is not sent. `stream()` takes the signal
as `callopts.signal`, and ends when it aborts.


---

## AuditEntity

```ts
const audit = client.Audit()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `actor_id` | `string` | Yes |  |
| `actor_type` | `string` | Yes |  |
| `case_id` | `string` | Yes |  |
| `correlation_id` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `event_type` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `new_state_json` | `Record<string, any>` | Yes |  |
| `prior_state_json` | `Record<string, any>` | Yes |  |
| `summary` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Audit().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AuditEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpsledgerSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CaseEntity

```ts
const case_ = client.Case()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_runs` | `any[]` | Yes |  |
| `annual_revenue` | `string` | Yes |  |
| `assigned_reviewer_id` | `string` | Yes |  |
| `audit_events` | `any[]` | Yes |  |
| `completeness_breakdown` | `any[]` | Yes |  |
| `completeness_score` | `number` | Yes |  |
| `contact_email` | `string` | Yes |  |
| `contact_name` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `currency` | `string` | Yes |  |
| `documents` | `any[]` | Yes |  |
| `extracted_fields` | `any[]` | Yes |  |
| `findings` | `any[]` | Yes |  |
| `funding_purpose` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `industry` | `string` | Yes |  |
| `issue_codes` | `any[]` | Yes |  |
| `jurisdiction` | `string` | Yes |  |
| `last_action` | `any` | Yes |  |
| `legal_business_name` | `string` | Yes |  |
| `open_finding_count` | `number` | Yes |  |
| `reference` | `string` | Yes |  |
| `registration_number` | `string` | Yes |  |
| `requested_amount` | `string` | Yes |  |
| `review_actions` | `any[]` | Yes |  |
| `stage` | `string` | Yes |  |
| `trading_name` | `any` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `version` | `number` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Case().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Case().load({ id: 'case_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CaseEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpsledgerSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DashboardEntity

```ts
const dashboard = client.Dashboard()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `approved` | `number` | Yes |  |
| `average_processing_seconds` | `any` | Yes |  |
| `manual_investigation` | `number` | Yes |  |
| `needs_information` | `number` | Yes |  |
| `open_cases` | `number` | Yes |  |
| `ready_for_review` | `number` | Yes |  |
| `recent_activity` | `any[]` | Yes |  |
| `top_failure_reasons` | `any[]` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Dashboard().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DashboardEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpsledgerSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## HealthEntity

```ts
const health = client.Health()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Health().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `HealthEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpsledgerSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ReadinessEntity

```ts
const readiness = client.Readiness()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Readiness().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ReadinessEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpsledgerSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SystemEntity

```ts
const system = client.System()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.System().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SystemEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpsledgerSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | Test transport |


Features are activated via the `feature` option:

```ts
const client = new OpsledgerSDK({
  feature: {
    test: { active: true },
  }
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

