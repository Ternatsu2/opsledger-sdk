import type { Case } from '../ts/src/OpsledgerTypes';

// The API contract allows null. The generated type currently rejects it.
const reviewer: Case['assigned_reviewer_id'] = null;
void reviewer;
