import { AuditEntity } from './entity/AuditEntity';
import { CaseEntity } from './entity/CaseEntity';
import { DashboardEntity } from './entity/DashboardEntity';
import { HealthEntity } from './entity/HealthEntity';
import { ReadinessEntity } from './entity/ReadinessEntity';
import { SystemEntity } from './entity/SystemEntity';
export type * from './OpsledgerTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { OpsledgerEntityBase } from './OpsledgerEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class OpsledgerSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Audit(entopts?: Record<string, any>): AuditEntity;
    Case(entopts?: Record<string, any>): CaseEntity;
    Dashboard(entopts?: Record<string, any>): DashboardEntity;
    Health(entopts?: Record<string, any>): HealthEntity;
    Readiness(entopts?: Record<string, any>): ReadinessEntity;
    System(entopts?: Record<string, any>): SystemEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): OpsledgerSDK;
    tester(testopts?: any, sdkopts?: any): OpsledgerSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof OpsledgerSDK;
export { stdutil, config, BaseFeature, OpsledgerEntityBase, OpsledgerSDK, SDK, };
export type { DirectResult };
