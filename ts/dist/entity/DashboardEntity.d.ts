import { OpsledgerEntityBase } from '../OpsledgerEntityBase';
import type { OpsledgerSDK } from '../OpsledgerSDK';
import type { Control } from '../types';
import type { Dashboard, DashboardLoadMatch } from '../OpsledgerTypes';
declare class DashboardEntity extends OpsledgerEntityBase<Dashboard> {
    constructor(client: OpsledgerSDK, entopts: any);
    make(this: DashboardEntity): DashboardEntity;
    load(this: any, reqmatch?: DashboardLoadMatch, ctrl?: Control): Promise<DashboardEntity>;
}
export { DashboardEntity };
