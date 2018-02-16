//
//
// import { Wtf2PermissionsModule } from '../index';
// import { NgModule } from '@angular/core';
//
// @NgModule({
//     exports: [Wtf2PermissionsModule],
//     providers: [
//         {provide: Wtf2PermissionsStore, useClass: Wtf2PermissionsMockStore},
//         {provide: Wtf2RolesStore, useClass: Wtf2PermissionsMockStore},
//         {provide: NgModuleFactoryLoader, useClass: SpyNgModuleFactoryLoader}, {
//             provide: Router,
//             useFactory: setupTestingRouter,
//             deps: [
//                 UrlSerializer, ChildrenOutletContexts, Location, NgModuleFactoryLoader, Compiler, Injector,
//                 ROUTES, ROUTER_CONFIGURATION, [UrlHandlingStrategy, new Optional()]
//             ]
//         },
//         {provide: PreloadingStrategy, useExisting: NoPreloading}, provideRoutes([])
//     ]
// })
// export class RouterTestingModule {
//     static withRoutes(routes: Routes, config?: ExtraOptions): ModuleWithProviders {
//         return {
//             ngModule: RouterTestingModule,
//             providers: [
//                 provideRoutes(routes),
//                 {provide: ROUTER_CONFIGURATION, useValue: config ? config : {}},
//             ]
//         };
//     }
// }
//
// // ngModule: Wtf2PermissionsModule,
// //     providers: [
// //     Wtf2PermissionsStore,
// //     Wtf2RolesStore,
// //     Wtf2PermissionsService,
// //     Wtf2PermissionsGuard,
// //     Wtf2RolesService,
// //     {provide: USE_PERMISSIONS_STORE, useValue: config.permissionsIsolate},
// //     {provide: USE_ROLES_STORE, useValue: config.rolesIsolate},
// // ]
