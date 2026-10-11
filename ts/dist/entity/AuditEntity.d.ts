import { OpsledgerEntityBase } from '../OpsledgerEntityBase';
import type { OpsledgerSDK } from '../OpsledgerSDK';
import type { Control } from '../types';
import type { Audit, AuditListMatch } from '../OpsledgerTypes';
declare class AuditEntity extends OpsledgerEntityBase<Audit> {
    constructor(client: OpsledgerSDK, entopts: any);
    make(this: AuditEntity): AuditEntity;
    list(this: any, reqmatch?: AuditListMatch, ctrl?: Control): Promise<AuditEntity[]>;
}
export { AuditEntity };
