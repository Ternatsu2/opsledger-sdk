import { OpsledgerEntityBase } from '../OpsledgerEntityBase';
import type { OpsledgerSDK } from '../OpsledgerSDK';
import type { Control } from '../types';
import type { Health, HealthLoadMatch } from '../OpsledgerTypes';
declare class HealthEntity extends OpsledgerEntityBase<Health> {
    constructor(client: OpsledgerSDK, entopts: any);
    make(this: HealthEntity): HealthEntity;
    load(this: any, reqmatch?: HealthLoadMatch, ctrl?: Control): Promise<HealthEntity>;
}
export { HealthEntity };
