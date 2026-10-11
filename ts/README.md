# Opsledger TypeScript SDK



The TypeScript SDK for the Opsledger API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Audit()` — each with a small set of operations (`list`, `load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`, see [Tags](https://github.com/Ternatsu2/opsledger-sdk/tags)), or from a
clone, which carries the compiled `dist/`:

```bash
git clone https://github.com/Ternatsu2/opsledger-sdk
npm install ./opsledger-sdk/ts
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { OpsledgerSDK } from '@ternatsu2/opsledger-sdk'

const client = new OpsledgerSDK()
```

### 2. List audit records

`list()` resolves to an array of Audit ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

```ts
const audits = await client.Audit().list()

for (const audit of audits) {
  console.log(audit.data())
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const health = await client.Health().load()
  console.log(health.data())
} catch (err) {
  console.error('load failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
result envelope. Branch on `ok`; on failure `status` holds the HTTP status
(for error responses) and `err` holds the error:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (!result.ok) {
  console.error('request failed:', result.status, result.err)
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = OpsledgerSDK.test()

const health = await client.Health().load()
// health is the Health entity; .data() reads its mock record
console.log(health.data())
```

You can also use the instance method:

```ts
const client = new OpsledgerSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Health()

// First call runs the operation and stores its result
await entity.load()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new OpsledgerSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
OPSLEDGER_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```

Live entity tests continue independent operations after errors and attempt
supported cleanup. Their final result reports failures and missing prerequisites
after the remaining work completes. The model and test inputs determine which
API operations the generated scenarios cover.


## Reference

### OpsledgerSDK

#### Constructor

```ts
new OpsledgerSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Audit(data?)` | `AuditEntity` | Create an Audit entity instance. |
| `Case(data?)` | `CaseEntity` | Create a Case entity instance. |
| `Dashboard(data?)` | `DashboardEntity` | Create a Dashboard entity instance. |
| `Health(data?)` | `HealthEntity` | Create a Health entity instance. |
| `Readiness(data?)` | `ReadinessEntity` | Create a Readiness entity instance. |
| `System(data?)` | `SystemEntity` | Create a System entity instance. |
| `tester(testopts?, sdkopts?)` | `OpsledgerSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `OpsledgerSDK.test(testopts?, sdkopts?)` | `OpsledgerSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria, and return it. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria, one per record. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): OpsledgerSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity itself — there is no result
envelope, and an entity's `data()` reads its record:

- `load` resolves to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Audit

| Field | Description |
| --- | --- |
| `actor_id` |  |
| `actor_type` |  |
| `case_id` |  |
| `correlation_id` |  |
| `created_at` |  |
| `event_type` |  |
| `id` |  |
| `new_state_json` |  |
| `prior_state_json` |  |
| `summary` |  |

Operations: list.

API path: `/api/v1/audit`

#### Case

| Field | Description |
| --- | --- |
| `agent_runs` |  |
| `annual_revenue` |  |
| `assigned_reviewer_id` |  |
| `audit_events` |  |
| `completeness_breakdown` |  |
| `completeness_score` |  |
| `contact_email` |  |
| `contact_name` |  |
| `created_at` |  |
| `currency` |  |
| `documents` |  |
| `extracted_fields` |  |
| `findings` |  |
| `funding_purpose` |  |
| `id` |  |
| `industry` |  |
| `issue_codes` |  |
| `jurisdiction` |  |
| `last_action` |  |
| `legal_business_name` |  |
| `open_finding_count` |  |
| `reference` |  |
| `registration_number` |  |
| `requested_amount` |  |
| `review_actions` |  |
| `stage` |  |
| `trading_name` |  |
| `updated_at` |  |
| `version` |  |

Operations: list, load.

API path: `/api/v1/cases`

#### Dashboard

| Field | Description |
| --- | --- |
| `approved` |  |
| `average_processing_seconds` |  |
| `manual_investigation` |  |
| `needs_information` |  |
| `open_cases` |  |
| `ready_for_review` |  |
| `recent_activity` |  |
| `top_failure_reasons` |  |

Operations: load.

API path: `/api/v1/dashboard`

#### Health

| Field | Description |
| --- | --- |

Operations: load.

API path: `/health`

#### Readiness

| Field | Description |
| --- | --- |

Operations: load.

API path: `/ready`

#### System

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/v1/system`



## Entities


### Audit

Create an instance: `const audit = client.Audit()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `actor_id` | `string` |  |
| `actor_type` | `string` |  |
| `case_id` | `string` |  |
| `correlation_id` | `string` |  |
| `created_at` | `string` |  |
| `event_type` | `string` |  |
| `id` | `string` |  |
| `new_state_json` | `Record<string, any>` |  |
| `prior_state_json` | `Record<string, any>` |  |
| `summary` | `string` |  |

#### Example: List

```ts
const audits = await client.Audit().list()
```


### Case

Create an instance: `const case_ = client.Case()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_runs` | `any[]` |  |
| `annual_revenue` | `string` |  |
| `assigned_reviewer_id` | `string` |  |
| `audit_events` | `any[]` |  |
| `completeness_breakdown` | `any[]` |  |
| `completeness_score` | `number` |  |
| `contact_email` | `string` |  |
| `contact_name` | `string` |  |
| `created_at` | `string` |  |
| `currency` | `string` |  |
| `documents` | `any[]` |  |
| `extracted_fields` | `any[]` |  |
| `findings` | `any[]` |  |
| `funding_purpose` | `string` |  |
| `id` | `string` |  |
| `industry` | `string` |  |
| `issue_codes` | `any[]` |  |
| `jurisdiction` | `string` |  |
| `last_action` | `any` |  |
| `legal_business_name` | `string` |  |
| `open_finding_count` | `number` |  |
| `reference` | `string` |  |
| `registration_number` | `string` |  |
| `requested_amount` | `string` |  |
| `review_actions` | `any[]` |  |
| `stage` | `string` |  |
| `trading_name` | `any` |  |
| `updated_at` | `string` |  |
| `version` | `number` |  |

#### Example: Load

```ts
const case_ = await client.Case().load({ id: 'case_id' })
```

#### Example: List

```ts
const case_s = await client.Case().list()
```


### Dashboard

Create an instance: `const dashboard = client.Dashboard()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `approved` | `number` |  |
| `average_processing_seconds` | `any` |  |
| `manual_investigation` | `number` |  |
| `needs_information` | `number` |  |
| `open_cases` | `number` |  |
| `ready_for_review` | `number` |  |
| `recent_activity` | `any[]` |  |
| `top_failure_reasons` | `any[]` |  |

#### Example: Load

```ts
const dashboard = await client.Dashboard().load()
```


### Health

Create an instance: `const health = client.Health()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const health = await client.Health().load()
```


### Readiness

Create an instance: `const readiness = client.Readiness()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const readiness = await client.Readiness().load()
```


### System

Create an instance: `const system = client.System()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const system = await client.System().load()
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | Test transport |

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: Test transport

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
opsledger/
├── src/
│   ├── OpsledgerSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { OpsledgerSDK } from '@ternatsu2/opsledger-sdk'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const health = client.Health()
await health.load()

// health.data() now returns the health data from the last `load`
// health.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
