import { OpsledgerEntityBase } from '../OpsledgerEntityBase';
import type { OpsledgerSDK } from '../OpsledgerSDK';
import type { Control } from '../types';
import type { System, SystemLoadMatch } from '../OpsledgerTypes';
declare class SystemEntity extends OpsledgerEntityBase<System> {
    constructor(client: OpsledgerSDK, entopts: any);
    make(this: SystemEntity): SystemEntity;
    load(this: any, reqmatch?: SystemLoadMatch, ctrl?: Control): Promise<SystemEntity>;
}
export { SystemEntity };
