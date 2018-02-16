import { Inject, Injectable, InjectionToken } from '@angular/core';

import { BehaviorSubject, from, Observable, ObservableInput, of } from 'rxjs';
import { catchError, first, map, mergeAll, switchMap } from 'rxjs/operators';

import { Wtf2Permission } from '../model/permission.model';
import { Wtf2PermissionsStore } from '../store/permissions.store';

import { isBoolean, isFunction, transformStringToArray } from '../utils/utils';

export interface Wtf2PermissionsObject { [name: string]: Wtf2Permission; }

export const USE_PERMISSIONS_STORE = new InjectionToken('USE_PERMISSIONS_STORE');

@Injectable()
export class Wtf2PermissionsService {

    private permissionsSource: BehaviorSubject<Wtf2PermissionsObject>;
    public permissions$: Observable<Wtf2PermissionsObject>;

    constructor(
        @Inject(USE_PERMISSIONS_STORE) private isolate: boolean = false,
        private permissionsStore: Wtf2PermissionsStore,
    ) {
        this.permissionsSource = isolate ? new BehaviorSubject<Wtf2PermissionsObject>({}) : permissionsStore.permissionsSource;
        this.permissions$ = this.permissionsSource.asObservable();
    }

    /**
     * Remove all permissions from permissions source
     */
    public flushPermissions(): void {
        this.permissionsSource.next({});
    }

    public hasPermission(permission: string | string[]): Promise<boolean> {
        if (!permission || (Array.isArray(permission) && permission.length === 0)) {
            return Promise.resolve(true);
        }

        permission = transformStringToArray(permission);
        return this.hasArrayPermission(permission);
    }

    public loadPermissions(permissions: string[], validationFunction?: Function): void {
        const newPermissions = permissions.reduce((source, p) =>
                this.reducePermission(source, p, validationFunction)
            , {});

        this.permissionsSource.next(newPermissions);
    }

    public addPermission(permission: string | string[], validationFunction?: Function): void {
        if (Array.isArray(permission)) {
            const permissions = permission.reduce((source, p) =>
                    this.reducePermission(source, p, validationFunction)
                , this.permissionsSource.value);

            this.permissionsSource.next(permissions);
        } else {
            const permissions = this.reducePermission(this.permissionsSource.value, permission, validationFunction);

            this.permissionsSource.next(permissions);
        }
    }

    public removePermission(permissionName: string): void {
        const permissions = {
            ...this.permissionsSource.value,
        };
        delete permissions[permissionName];
        this.permissionsSource.next(permissions);
    }

    public getPermission(name: string): Wtf2Permission {
        return this.permissionsSource.value[name];
    }

    public getPermissions(): Wtf2PermissionsObject {
        return this.permissionsSource.value;
    }

    private reducePermission(
        source: Wtf2PermissionsObject,
        name: string,
        validationFunction?: Function,
    ): Wtf2PermissionsObject {
        if (!!validationFunction && isFunction(validationFunction)) {
            return {
                ...source,
                [name]: {name, validationFunction},
            };
        } else {
            return {
                ...source,
                [name]: {name},
            };
        }
    }

    private hasArrayPermission(permissions: string[]): Promise<boolean> {
        const promises: Observable<boolean>[] = permissions.map((key) => {
            if (this.hasPermissionValidationFunction(key)) {
                const immutableValue = {...this.permissionsSource.value};
                const validationFunction: Function = <Function>this.permissionsSource.value[key].validationFunction;

                return of(null).pipe(
                    map(() => validationFunction(key, immutableValue)),
                    switchMap((promise: Promise<boolean> | boolean): ObservableInput<boolean> => isBoolean(promise) ?
                        of(promise as boolean) : promise as Promise<boolean>),
                    catchError(() => of(false)),
                );
            }

            // check for name of the permission if there is no validation function
            return of(!!this.permissionsSource.value[key]);
        });

        return from(promises).pipe(
            mergeAll(),
            first((data) => data !== false, false),
            map((data) => data === false ? false : true),
        ).toPromise().then((data: any) => data);
    }

    private hasPermissionValidationFunction(key: string): boolean {
        return !!this.permissionsSource.value[key] &&
            !!this.permissionsSource.value[key].validationFunction &&
            isFunction(this.permissionsSource.value[key].validationFunction);
    }

}
