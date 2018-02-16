import { NgModule, ModuleWithProviders } from '@angular/core';
import { Wtf2PermissionsDirective } from './directive/permissions.directive';
import { Wtf2PermissionsService, USE_PERMISSIONS_STORE } from './service/permissions.service';
import { Wtf2PermissionsGuard } from './router/permissions-guard.service';
import { Wtf2RolesService, USE_ROLES_STORE } from './service/roles.service';
import { Wtf2PermissionsStore } from './store/permissions.store';
import { Wtf2RolesStore } from './store/roles.store';
import { Wtf2PermissionsAllowStubDirective } from './testing/permissions-allow.directive.stub';
import { Wtf2PermissionsRestrictStubDirective } from './testing/permissions-restrict.directive.stub';
import { Wtf2PermissionsConfigurationService, USE_CONFIGURATION_STORE } from './service/configuration.service';
import { Wtf2PermissionsConfigurationStore } from './store/configuration.store';

export * from './store/roles.store';
export * from './store/permissions.store';
export * from './store/configuration.store';

export * from './directive/permissions.directive';

export * from './service/permissions.service';
export * from './service/roles.service';
export * from './service/configuration.service';

export * from './router/permissions-guard.service';

export * from './model/permissions-router-data.model';
export * from './model/role.model';

export * from './testing/permissions-allow.directive.stub';
export * from './testing/permissions-restrict.directive.stub';

export * from './enums/predefined-strategies.enum';

export interface Wtf2PermissionsModuleConfig {
    // isolate the service instance, only works for lazy loaded modules or components with the "providers" property
    rolesIsolate?: boolean;
    permissionsIsolate?: boolean;
    configurationIsolate?: boolean;
}


@NgModule({
    imports: [],
    declarations: [
        Wtf2PermissionsDirective,
    ],
    exports: [
        Wtf2PermissionsDirective,
    ],
})
export class Wtf2PermissionsModule {
    static forRoot(config: Wtf2PermissionsModuleConfig = {}): ModuleWithProviders {
        return {
            ngModule: Wtf2PermissionsModule,
            providers: [
                Wtf2PermissionsStore,
                Wtf2RolesStore,
                Wtf2PermissionsConfigurationStore,
                Wtf2PermissionsService,
                Wtf2PermissionsGuard,
                Wtf2RolesService,
                Wtf2PermissionsConfigurationService,
                {provide: USE_PERMISSIONS_STORE, useValue: config.permissionsIsolate},
                {provide: USE_ROLES_STORE, useValue: config.rolesIsolate},
                {provide: USE_CONFIGURATION_STORE, useValue: config.configurationIsolate},
            ],
        };
    }

    static forChild(config: Wtf2PermissionsModuleConfig = {}): ModuleWithProviders {
        return {
            ngModule: Wtf2PermissionsModule,
            providers: [
                {provide: USE_PERMISSIONS_STORE, useValue: config.permissionsIsolate},
                {provide: USE_ROLES_STORE, useValue: config.rolesIsolate},
                {provide: USE_CONFIGURATION_STORE, useValue: config.configurationIsolate},
                Wtf2PermissionsConfigurationService,
                Wtf2PermissionsService,
                Wtf2RolesService,
                Wtf2PermissionsGuard,
            ],
        };
    }
}

@NgModule({
    imports: [],
    declarations: [
        Wtf2PermissionsAllowStubDirective,
    ],
    exports: [
        Wtf2PermissionsAllowStubDirective,
    ],
})
export class Wtf2PermissionsAllowStubModule {
}


@NgModule({
    imports: [],
    declarations: [
        Wtf2PermissionsRestrictStubDirective,
    ],
    exports: [
        Wtf2PermissionsRestrictStubDirective,
    ],
})
export class Wtf2PermissionsRestrictStubModule {
}


