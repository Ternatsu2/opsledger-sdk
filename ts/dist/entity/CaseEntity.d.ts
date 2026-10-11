import { OpsledgerEntityBase } from '../OpsledgerEntityBase';
import type { OpsledgerSDK } from '../OpsledgerSDK';
import type { Control } from '../types';
import type { Case, CaseLoadMatch, CaseListMatch } from '../OpsledgerTypes';
declare class CaseEntity extends OpsledgerEntityBase<Case> {
    constructor(client: OpsledgerSDK, entopts: any);
    make(this: CaseEntity): CaseEntity;
    load(this: any, reqmatch?: CaseLoadMatch, ctrl?: Control): Promise<CaseEntity>;
    list(this: any, reqmatch?: CaseListMatch, ctrl?: Control): Promise<CaseEntity[]>;
}
export { CaseEntity };
