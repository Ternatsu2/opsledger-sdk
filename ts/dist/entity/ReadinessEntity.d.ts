import { OpsledgerEntityBase } from '../OpsledgerEntityBase';
import type { OpsledgerSDK } from '../OpsledgerSDK';
import type { Control } from '../types';
import type { Readiness, ReadinessLoadMatch } from '../OpsledgerTypes';
declare class ReadinessEntity extends OpsledgerEntityBase<Readiness> {
    constructor(client: OpsledgerSDK, entopts: any);
    make(this: ReadinessEntity): ReadinessEntity;
    load(this: any, reqmatch?: ReadinessLoadMatch, ctrl?: Control): Promise<ReadinessEntity>;
}
export { ReadinessEntity };
