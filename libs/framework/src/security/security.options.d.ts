import { InjectionToken } from '@angular/core';
export interface Wtf2AclRole {
    parent?: string;
    [permission: string]: string | string[];
}
export interface Wtf2AccessControl {
    [role: string]: Wtf2AclRole;
}
export interface Wtf2AclOptions {
    accessControl?: Wtf2AccessControl;
}
export declare const WTF2_SECURITY_OPTIONS_TOKEN: InjectionToken<Wtf2AclOptions>;
