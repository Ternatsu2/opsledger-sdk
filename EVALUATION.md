# Voxgig SDK generator evaluation

Terry Benjamin Jr, 10 October 2026

## Result

Generated a TypeScript SDK for [OpsLedger](https://github.com/Ternatsu2/opsledger-ai), my public synthetic-data demo. The scoped client has six entities and seven GET operations: health, readiness, system information, dashboard, case list, case detail and audit list. No OpsLedger repository was found in the `voxgig-sdk` organization when checked on 10 October.

The SDK and my additions are MIT licensed. The API specification retains its Apache-2.0 license. See [third-party notices](THIRD_PARTY_NOTICES.md).

This is a working runtime evaluation, not a production release: the generated types have a contract issue described below. The package has not been published to npm.

## Developer experience

The scaffold installed and compiled without dependency or authentication problems. The generated examples and offline tests were useful starting points. Keeping adjustments in a guide and project overlay made regeneration straightforward.

Three things needed attention:

1. **Ambiguous endpoint grouping.** The first import grouped `/health`, `/ready` and `/api/v1/system` into the same `System.load` operation. The build reported a partial model because the paths shared an empty selector. I separated health and readiness in [the guide overlay](.sdk/model/guide/guide.aontu). I also changed the dashboard's inferred operation from `list` to `load`, because its response is one object. Regeneration then completed without that ambiguity.
2. **Response types lose information.** `CaseDetail` and `CaseListItem` permit `assigned_reviewer_id` to be `string` or `null`, but the generated `Case` interface declares `string`. The merged interface also marks detail-only fields such as `documents` as required for list results. Runtime calls work, but TypeScript consumers receive stronger guarantees than the API provides. I left this visible rather than patching generated output by hand. A small nullable-field reproduction is included below. Per-operation response types and preserved nullability would make this much safer.
3. **Initial project setup.** FastAPI's source specification did not include a `servers` entry, so I added the deployed base URL while preparing the read-only input. I also set my own repository, author and package metadata in [the project overlay](.sdk/model/project.aontu). Those are project configuration steps, not API failures.

The most useful improvement would be an import summary listing every path, its inferred entity and operation, and any unresolved selector conflict before calling generation successful. That would make the first issue easier to catch.

The original warning remains in `.sdk/apidef-warnings.txt` after successful regeneration. It is retained as initial-import evidence; the final model and live tests resolve all seven operations.

## Verification

Environment: Node.js 26.5.0 on macOS. Scaffold: `@voxgig/create-sdkgen@0.30.7`. Resolved toolchain: `@voxgig/sdkgen@4.34.5`, `@voxgig/apidef@8.25.2`, `@voxgig/model@12.0.1` and `@voxgig/docgen@0.30.1`. Lockfiles are included.

- Generated suite: 249 tests, 238 passed, 11 skipped, zero failed. Skips concern optional features not enabled in this build.
- Five additional live tests passed against the public synthetic demo. They cover all seven operations, query filters, an empty result, rejection of a missing case, a server-side 422 validation error and a GET-only guard that rejects a write before sending it.
- Generator doctor: `.sdk matches the scaffold (0 additive)`.
- Nullability reproduction: expected TypeScript compilation failure, documenting the unresolved contract issue rather than treating it as a passing conformance test.

The generated GitHub Actions files are retained as [inactive examples](.github/workflow-examples/README.md). The submission login cannot upload active workflows, so these results are local test results, not hosted CI results.

The live checks do not approve cases, upload files or change records. Authentication, write operations, binary responses, load testing and production delivery are outside this submission. Read-only scope describes the generated operations; callers should also use `allow: { method: 'GET' }` to restrict the low-level client, as the tests do.

## Reproduce

The original public API document and the prepared subset are saved in `.sdk/def/`. To regenerate and test this repository from a clone:

```sh
node scripts/prepare-spec.mjs
npm ci --prefix .sdk
npm run generate --prefix .sdk
npm ci --prefix ts
npm test --prefix ts
node --test scripts/live.test.mjs
```

The original scaffold command, run before the guide adjustments, was:

```sh
npm exec --yes --package=@voxgig/create-sdkgen@0.30.7 -- create-sdkgen opsledger -d ./openapi.readonly.json -o ./opsledger-sdk -t ts -f test
```

To reproduce the known nullability problem, run this from the repository root. It should currently exit nonzero with `Type 'null' is not assignable to type 'string'`:

```sh
./ts/node_modules/.bin/tsc --noEmit --strict --skipLibCheck scripts/nullable-repro.ts
```

## AI assistance

Codex was used for scaffold setup, model adjustments, test implementation, command execution and this report. The generator produced the SDK runtime. This submission is AI-assisted, not an unaided coding exercise. Elapsed session time is reported with the delivery email; it is not a claim of manually typed development time.
