import { Wtf2PermissionsService } from '../service/permissions.service';
import { Component, ModuleWithProviders, NgModule, NgModuleFactoryLoader } from '@angular/core';
import { Route, Router, RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { ComponentFixture, fakeAsync, getTestBed, inject, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule, SpyNgModuleFactoryLoader } from '@angular/router/testing';
import { Wtf2PermissionsModule } from '../index';
import { Wtf2RolesService } from '../service/roles.service';

@Component({
    selector: 'root-cmp',
    template: `
        <router-outlet></router-outlet>`,
})
class RootCmp {
    constructor(public permissions: Wtf2PermissionsService) {
        permissions.addPermission('ADMIN', () => {
            return false;
        });
    }
}

@Component({
    selector: 'lazy',
    template: 'lazy-loaded-parent [<router-outlet></router-outlet>]',
})
class ParentLazyLoadedComponent {
}

function getLazyLoadedModule(importedModule: ModuleWithProviders) {
    @Component({selector: 'lazy', template: 'lazy-loaded-child'})
    class ChildLazyLoadedComponent {
        constructor(public permissions: Wtf2PermissionsService) {
            permissions.addPermission('ADMIN', () => {
                return true;
            });
            // expect(permissions.hasPermission('LAZY')).toBe(true);
        }
    }

    @NgModule({
        declarations: [ParentLazyLoadedComponent, ChildLazyLoadedComponent],
        imports: [
            RouterModule.forChild([<Route>{
                path: 'loaded',
                component: ParentLazyLoadedComponent,
                children: [{path: 'child', component: ChildLazyLoadedComponent}],
            }]),
            importedModule,
        ],
    })
    class LoadedModule {
    }

    return LoadedModule;
}

function advance(fixture: ComponentFixture<any>): void {
    tick();
    fixture.detectChanges();
}

function createRoot(router: Router, type: any): ComponentFixture<any> {
    const f = TestBed.createComponent(type);
    advance(f);
    router.initialNavigation();
    advance(f);
    return f;
}

describe('module', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                Wtf2PermissionsModule.forRoot(),
            ],
            declarations: [RootCmp],
        });
    });

    it('should work when lazy loaded using forChild', fakeAsync(inject(
        [Router, Location, NgModuleFactoryLoader],
        (router: Router, location: Location, loader: SpyNgModuleFactoryLoader) => {
            const LoadedModule = getLazyLoadedModule(Wtf2PermissionsModule.forChild());
            loader.stubbedModules = {expected: LoadedModule};

            const fixture = createRoot(router, RootCmp),
                injector = getTestBed(),
                permissionsService: Wtf2PermissionsService = injector.get(Wtf2PermissionsService);

            permissionsService.hasPermission('ADMIN').then((data) => {
                expect(data).toBe(false);
            });

            router.resetConfig([{path: 'lazy', loadChildren: 'expected'}]);

            router.navigateByUrl('/lazy/loaded/child');
            advance(fixture);

            expect(location.path()).toEqual('/lazy/loaded/child');

            // since the root module imports the Wtf2PermissionsModule with forRoot and the lazy loaded module with forChild
            // the permissionsService service is shared between both modules
            // the constructor of the ChildLazyLoadedComponent overwrote the "ADMIN" key of the root Wtf2PermissionsService
            permissionsService.hasPermission('ADMIN').then((data) => {
                expect(data).toBe(true);
            });
        })),
    );

    it('should work when loaded using just Module', fakeAsync(inject(
        [Router, Location, NgModuleFactoryLoader],
        (router: Router, location: Location, loader: SpyNgModuleFactoryLoader) => {
            const LoadedModule = getLazyLoadedModule(Wtf2PermissionsModule);
            loader.stubbedModules = {expected: LoadedModule};

            const fixture = createRoot(router, RootCmp),
                injector = getTestBed(),
                permissionsService: Wtf2PermissionsService = injector.get(Wtf2PermissionsService);

            permissionsService.hasPermission('ADMIN').then((data) => {
                expect(data).toBe(false);
            });

            router.resetConfig([{path: 'lazy', loadChildren: 'expected'}]);

            router.navigateByUrl('/lazy/loaded/child');
            advance(fixture);

            expect(location.path()).toEqual('/lazy/loaded/child');

            // since the root module imports the Wtf2PermissionsModule with forRoot and the lazy loaded module with forChild
            // the permissionsService service is shared between both modules
            // the constructor of the ChildLazyLoadedComponent overwrote the "ADMIN" key of the root Wtf2PermissionsService
            permissionsService.hasPermission('ADMIN').then((data) => {
                expect(data).toBe(true);
            });
        })),
    );

    it('should create 2 instances of the service when lazy loaded using forRoot', fakeAsync(inject(
        [Router, Location, NgModuleFactoryLoader],
        (router: Router, location: Location, loader: SpyNgModuleFactoryLoader) => {
            const LoadedModule = getLazyLoadedModule(Wtf2PermissionsModule.forRoot());
            loader.stubbedModules = {expected: LoadedModule};

            const fixture = createRoot(router, RootCmp),
                injector = getTestBed(),
                permissionsService = injector.get(Wtf2PermissionsService);

            permissionsService.hasPermission('ADMIN').then((data) => {
                expect(data).toBe(false);
            });
            router.resetConfig([{path: 'lazy', loadChildren: 'expected'}]);

            router.navigateByUrl('/lazy/loaded/child');
            advance(fixture);

            expect(location.path()).toEqual('/lazy/loaded/child');

            // since both the root module and the lazy loaded module use forRoot to define the Wtf2PermissionsModule
            // the permissionsService service is NOT shared, and 2 instances co-exist
            // the constructor of the ChildLazyLoadedComponent didn't overwrote the "ADMIN" key of the root Wtf2PermissionsService
            permissionsService.hasPermission('ADMIN').then((data) => {
                expect(data).toBe(false);
            });        })),
    );

    it('should create 2 instances of the service when lazy loaded using forChild and isolate true', fakeAsync(inject(
        [Router, Location, NgModuleFactoryLoader],
        (router: Router, location: Location, loader: SpyNgModuleFactoryLoader) => {
            const LoadedModule = getLazyLoadedModule(Wtf2PermissionsModule.forChild({permissionsIsolate: true}));
            loader.stubbedModules = {expected: LoadedModule};

            const fixture = createRoot(router, RootCmp),
                injector = getTestBed(),
                permissionsService = injector.get(Wtf2PermissionsService);

            permissionsService.hasPermission('ADMIN').then((data) => {
                expect(data).toBe(false);
            });
            router.resetConfig([{path: 'lazy', loadChildren: 'expected'}]);

            router.navigateByUrl('/lazy/loaded/child');
            advance(fixture);

            expect(location.path()).toEqual('/lazy/loaded/child');

            // since both the root module and the lazy loaded module use forRoot to define the Wtf2PermissionsModule
            // the permissions service is NOT shared, and 2 instances co-exist
            // the constructor of the ChildLazyLoadedComponent didn't overwrote the "false" key of the root Wtf2PermissionsService
            permissionsService.hasPermission('ADMIN').then((data) => {
                expect(data).toBe(false);
            });
        })),
    );
});


@Component({
    selector: 'root-cmp',
    template: `
        <router-outlet></router-outlet>`,
})
class RootRolesCmp {
    constructor(public roleService: Wtf2RolesService) {
        roleService.addRole('ADMIN', () => {
            return false;
        });
    }
}

@Component({
    selector: 'lazy',
    template: 'lazy-loaded-parent [<router-outlet></router-outlet>]',
})
class ParentLazyRolesLoadedComponent {
}

function getLazyRolesLoadedModule(importedModule: ModuleWithProviders) {
    @Component({selector: 'lazy', template: 'lazy-loaded-child'})
    class ChildLazyLoadedComponent {
        constructor(public permissions: Wtf2RolesService) {
            permissions.addRole('ADMIN', () => {
                return true;
            });
            // expect(permissions.hasPermission('LAZY')).toBe(true);
        }
    }

    @NgModule({
        declarations: [ParentLazyLoadedComponent, ChildLazyLoadedComponent],
        imports: [
            RouterModule.forChild([<Route>{
                path: 'loaded',
                component: ParentLazyLoadedComponent,
                children: [{path: 'child', component: ChildLazyLoadedComponent}],
            }]),
            importedModule,
        ],
    })
    class LoadedModule {
    }

    return LoadedModule;
}

describe('Role module', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                Wtf2PermissionsModule.forRoot(),
            ],
            declarations: [RootRolesCmp],
        });
    });

    it('should work when lazy loaded using forChild', fakeAsync(inject(
        [Router, Location, NgModuleFactoryLoader],
        (router: Router, location: Location, loader: SpyNgModuleFactoryLoader) => {
            const LoadedModule = getLazyRolesLoadedModule(Wtf2PermissionsModule.forChild());
            loader.stubbedModules = {expected: LoadedModule};

            const fixture = createRoot(router, RootRolesCmp),
                injector = getTestBed(),
                rolesService: Wtf2RolesService = injector.get(Wtf2RolesService);

            rolesService.hasOnlyRoles('ADMIN').then((data) => {
                expect(data).toBe(false);
            });

            router.resetConfig([{path: 'lazy', loadChildren: 'expected'}]);

            router.navigateByUrl('/lazy/loaded/child');
            advance(fixture);

            expect(location.path()).toEqual('/lazy/loaded/child');

            // since the root module imports the Wtf2PermissionsModule with forRoot and the lazy loaded module with forChild
            // the rolesServihasOnlyRoles() is shared between both modules
            // the constructor of the ChildLazyLoadedComponent overwrote the "ADMIN" key of the root roleServiceService
            rolesService.hasOnlyRoles('ADMIN').then((data) => {
                expect(data).toBe(true);
            });
        })),
    );

    it('should create 2 instances of the service when lazy loaded using forRoot', fakeAsync(inject(
        [Router, Location, NgModuleFactoryLoader],
        (router: Router, location: Location, loader: SpyNgModuleFactoryLoader) => {
            const LoadedModule = getLazyRolesLoadedModule(Wtf2PermissionsModule.forRoot());
            loader.stubbedModules = {expected: LoadedModule};

            const fixture = createRoot(router, RootRolesCmp),
                injector = getTestBed(),
                rolesService = injector.get(Wtf2RolesService);

            rolesService.hasOnlyRoles('ADMIN').then((data) => {
                expect(data).toBe(false);
            });
            router.resetConfig([{path: 'lazy', loadChildren: 'expected'}]);

            router.navigateByUrl('/lazy/loaded/child');
            advance(fixture);

            expect(location.path()).toEqual('/lazy/loaded/child');

            // since both the root module and the lazy loaded module use forRoot to define the Wtf2PermisionsModule
            // the rolesService service is NOT shared, and 2 instances co-exist
            // the constructor of the ChildLazyLoadedComponent didn't overwrote the "ADMIN" key of the root PermissionsService
            rolesService.hasOnlyRoles('ADMIN').then((data) => {
                expect(data).toBe(false);
            });        })),
    );

    it('should create 2 instances of the service when lazy loaded using forChild and isolate true', fakeAsync(inject(
        [Router, Location, NgModuleFactoryLoader],
        (router: Router, location: Location, loader: SpyNgModuleFactoryLoader) => {
            const LoadedModule = getLazyRolesLoadedModule(Wtf2PermissionsModule.forChild({rolesIsolate: true}));
            loader.stubbedModules = {expected: LoadedModule};

            const fixture = createRoot(router, RootRolesCmp),
                injector = getTestBed(),
                rolesService = injector.get(Wtf2RolesService);

            rolesService.hasOnlyRoles('ADMIN').then((data) => {
                expect(data).toBe(false);
            });
            router.resetConfig([{path: 'lazy', loadChildren: 'expected'}]);

            router.navigateByUrl('/lazy/loaded/child');
            advance(fixture);

            expect(location.path()).toEqual('/lazy/loaded/child');

            // since both the root module and the lazy loaded module use forRoot to define the Wtf2PermissionsModule
            // the permissions service is NOT shared, and 2 instances co-exist
            // the constructor of the ChildLazyLoadedComponent didn't overwrote the "false" key of the root Wtf2RolesService
            rolesService.hasOnlyRoles('ADMIN').then((data) => {
                expect(data).toBe(false);
            });
        })),
    );
});
