import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    CanLoad,
    NavigationExtras,
    Route,
    Router,
    RouterStateSnapshot,
} from '@angular/router';

import { forkJoin, from, Observable, of } from 'rxjs';
import { first, mergeMap, tap } from 'rxjs/operators';

import { Wtf2PermissionsRouterData } from '../model/permissions-router-data.model';
import { Wtf2PermissionsService } from '../service/permissions.service';
import { Wtf2RolesService } from '../service/roles.service';
import { isFunction, isPlainObject, transformStringToArray } from '../utils/utils';

interface Wtf2RedirectToNavigationParameters {
    navigationCommands: any[] | Function;
    navigationExtras?: NavigationExtras | Function;
}

@Injectable()
export class Wtf2PermissionsGuard implements CanActivate, CanLoad, CanActivateChild {

    constructor(private permissionsService: Wtf2PermissionsService, private  rolesService: Wtf2RolesService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
        return this.hasPermissions(route, state);
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.hasPermissions(childRoute, state);
    }

    canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
        return this.hasPermissions(route);
    }

    private hasPermissions(route: ActivatedRouteSnapshot | Route, state?: RouterStateSnapshot) {
        const purePermissions = !!route && route.data ? route.data['permissions'] as Wtf2PermissionsRouterData : {};
        const permissions: Wtf2PermissionsRouterData = this.transformPermission(purePermissions, route, state);

        if (this.isParameterAvailable(permissions.except)) {
            return this.passingExceptPermissionsValidation(permissions, route, state);
        }

        if (this.isParameterAvailable(permissions.only)) {
            return this.passingOnlyPermissionsValidation(permissions, route, state);
        }

        return true;
    }

    private transformPermission(purePermissions: Wtf2PermissionsRouterData, route: any, state: any): any {
        const permissions = {
            ...purePermissions,
        };

        if (isFunction(permissions.except)) {
            permissions.except = (permissions.except as Function)(route, state);
        }

        if (isFunction(permissions.only)) {
            permissions.only = (permissions.only as Function)(route, state);
        }

        permissions.except = transformStringToArray(permissions.except);
        permissions.only = transformStringToArray(permissions.only);

        return permissions;
    }

    private isParameterAvailable(permission: any) {
        return !!(permission) && permission.length > 0;
    }

    private passingExceptPermissionsValidation(permissions: Wtf2PermissionsRouterData, route: any, state: any) {
        if (!!permissions.redirectTo && ((isFunction(permissions.redirectTo)) || (isPlainObject(permissions.redirectTo) && !this.isRedirectionWithParameters(
            permissions.redirectTo)))) {
            let failedPermission = '';

            return from(permissions.except as any[]).pipe(
                mergeMap((data) => {
                    return forkJoin([
                        this.permissionsService.hasPermission(<string | string[]>data),
                        this.rolesService.hasOnlyRoles(<string | string[]>data),
                    ]).pipe(tap((hasPermissions: boolean[]) => {
                        const dontHavePermissions = hasPermissions.every((data) => data === false);

                        if (!dontHavePermissions) {
                            failedPermission = data;
                        }
                    }));
                }),
                first((data: any) => data.some((data: boolean) => data === true), false),
                mergeMap((isAllFalse) => {
                    if (!!failedPermission) {
                        this.handleRedirectOfFailedPermission(permissions, failedPermission, route, state);

                        return of(false);
                    }

                    if (!isAllFalse && permissions.only) {
                        return this.onlyRedirectCheck(permissions, route, state);
                    }

                    return of(!isAllFalse);
                }),
            ).toPromise();
        }

        return Promise.all([this.permissionsService.hasPermission(<string | string[]>permissions.except), this.rolesService.hasOnlyRoles(<string | string[]>permissions.except)])
            .then(([hasPermission, hasRoles]) => {
                if (hasPermission || hasRoles) {
                    if (permissions.redirectTo) {
                        this.redirectToAnotherRoute(permissions.redirectTo, route, state);
                    }

                    return false;
                }


                if (permissions.only) {
                    return this.checkOnlyPermissions(permissions, route, state);
                }
                return true;
            });
    }

    private redirectToAnotherRoute(redirectTo: string | any[] | Wtf2RedirectToNavigationParameters | Function,
                                   route: ActivatedRouteSnapshot | Route,
                                   state?: RouterStateSnapshot,
                                   failedPermissionName?: string) {

        if (isFunction(redirectTo)) {
            redirectTo = (redirectTo as Function)(failedPermissionName, route, state);
        }

        if (this.isRedirectionWithParameters(redirectTo)) {
            if (this.hasNavigationExtrasAsFunction(redirectTo)) {
                (<Wtf2RedirectToNavigationParameters>redirectTo).navigationExtras = ((<Wtf2RedirectToNavigationParameters>redirectTo).navigationExtras as Function)(
                    route,
                    state,
                );
            }

            if (this.hasNavigationCommandsAsFunction(redirectTo)) {
                (<Wtf2RedirectToNavigationParameters>redirectTo).navigationCommands = ((<Wtf2RedirectToNavigationParameters>redirectTo).navigationCommands as Function)(
                    route,
                    state,
                );
            }

            this.router.navigate(
                ((<Wtf2RedirectToNavigationParameters>redirectTo).navigationCommands as any[]),
                ((<Wtf2RedirectToNavigationParameters> redirectTo).navigationExtras as NavigationExtras),
            );

            return;
        }

        if (Array.isArray(redirectTo)) {
            this.router.navigate(redirectTo);
        } else {
            this.router.navigate([redirectTo]);
        }
    }

    private isRedirectionWithParameters(object: any | Wtf2RedirectToNavigationParameters): boolean {
        return isPlainObject(object) && (!!object.navigationCommands || !!object.navigationExtras);
    }

    private hasNavigationExtrasAsFunction(redirectTo: any): boolean {
        return !!(<Wtf2RedirectToNavigationParameters> redirectTo).navigationExtras &&
            isFunction((<Wtf2RedirectToNavigationParameters> redirectTo).navigationExtras);
    }

    private hasNavigationCommandsAsFunction(redirectTo: any): boolean {
        return !!(<Wtf2RedirectToNavigationParameters> redirectTo).navigationCommands &&
            isFunction((<Wtf2RedirectToNavigationParameters> redirectTo).navigationCommands);
    }

    private onlyRedirectCheck(permissions: any, route: ActivatedRouteSnapshot | Route, state?: RouterStateSnapshot): Promise<boolean> {
        let failedPermission = '';

        return from(permissions.only).pipe(
            mergeMap((data: any) => {
                return forkJoin([
                    this.permissionsService.hasPermission(<string | string[]>data),
                    this.rolesService.hasOnlyRoles(<string | string[]>data),
                ]).pipe(
                    tap((hasPermission: boolean[]) => {
                        const failed = hasPermission.every((data) => data === false);

                        if (failed) {
                            failedPermission = data;
                        }
                    }),
                );
            }),
            first(
                (data: any) => {
                    if (isFunction(permissions.redirectTo)) {
                        return data.some((data: boolean) => data === true);
                    }

                    return data.every((data: boolean) => data === false);
                },
                false,
            ),
            mergeMap((pass: boolean): Observable<boolean> => {
                if (isFunction(permissions.redirectTo)) {
                    if (pass) {
                        return of(true);
                    } else {
                        this.handleRedirectOfFailedPermission(permissions, failedPermission, route, state);
                        return of(false);
                    }
                } else {
                    if (!!failedPermission) {
                        this.handleRedirectOfFailedPermission(permissions, failedPermission, route, state);
                    }
                    return of(!pass);
                }
            }),
        ).toPromise();
    }

    private handleRedirectOfFailedPermission(
        permissions: any,
        failedPermission: string,
        route: ActivatedRouteSnapshot | Route,
        state?: RouterStateSnapshot,
    ) {
        if (this.isFailedPermissionPropertyOfRedirectTo(permissions, failedPermission)) {
            this.redirectToAnotherRoute((<any>permissions.redirectTo)[failedPermission], route, state, failedPermission);
        } else {
            if (isFunction(permissions.redirectTo)) {
                this.redirectToAnotherRoute((<any>permissions.redirectTo), route, state, failedPermission);
            } else {
                this.redirectToAnotherRoute((<any>permissions.redirectTo)['default'], route, state, failedPermission);
            }
        }
    }

    private isFailedPermissionPropertyOfRedirectTo(permissions: any, failedPermission: string) {
        return !!permissions.redirectTo && permissions.redirectTo[<any>failedPermission];
    }

    private checkOnlyPermissions(purePermissions: any, route: ActivatedRouteSnapshot | Route, state?: RouterStateSnapshot) {
        const permissions: Wtf2PermissionsRouterData = {
            ...purePermissions,
        };

        return Promise.all([this.permissionsService.hasPermission(<string | string[]>permissions.only), this.rolesService.hasOnlyRoles(<string | string[]>permissions.only)])
            .then(([hasPermission, hasRole]) => {
                if (hasPermission || hasRole) { return true; }

                if (permissions.redirectTo) {
                    this.redirectToAnotherRoute(permissions.redirectTo, route, state);
                }

                return false;
            });
    }

    private passingOnlyPermissionsValidation(permissions: Wtf2PermissionsRouterData, route: ActivatedRouteSnapshot | Route, state?: RouterStateSnapshot) {
        if ((isFunction(permissions.redirectTo) || isPlainObject(permissions.redirectTo) && !this.isRedirectionWithParameters(permissions.redirectTo))) {
            return this.onlyRedirectCheck(permissions, route, state);
        }
        return this.checkOnlyPermissions(permissions, route, state);
    }

}
