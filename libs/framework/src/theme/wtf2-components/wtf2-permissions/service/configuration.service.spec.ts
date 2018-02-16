import { fakeAsync, inject, TestBed } from '@angular/core/testing';
import { Wtf2PermissionsModule } from '../index';
import { Wtf2PermissionsConfigurationService, USE_CONFIGURATION_STORE } from './configuration.service';
import { Wtf2PermissionsConfigurationStore } from '../store/configuration.store';

const StrategiesFunction = {
    FUNCTION: () => {},
};

describe('Configuration Service', () => {
    let localService: Wtf2PermissionsConfigurationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [Wtf2PermissionsModule.forRoot()],
        });
    });

    beforeEach(inject([Wtf2PermissionsConfigurationService], (service: Wtf2PermissionsConfigurationService) => {
        localService = service;
    }));

    it('should create an instance', () => {
        expect(localService).toBeTruthy();
    });

    it ('should add configuration function', () => {
        expect(localService.getAllStrategies()['FUNCTION']).toBeFalsy();
        localService.addPermissionStrategy('FUNCTION', () => {});
        expect(localService.getAllStrategies()['FUNCTION']).toBeTruthy();
    });

    it ('should retrieve strategy function', () => {
        expect(localService.getStrategy('FUNCTION')).toBeFalsy();
        localService.addPermissionStrategy('FUNCTION', () => {});
        expect(localService.getStrategy('FUNCTION')).toBeTruthy();
    });

    it ('should throw an error when strategy is not defined but user tries to set it as default on authorised method', () => {
        expect(function () { localService.setDefaultOnAuthorizedStrategy('FUNCTION'); }).toThrow();
    });


    it ('should throw an error when strategy is not defined but user tries to set it as default on unauthorised method', () => {
        expect(function () { localService.setDefaultOnUnauthorizedStrategy('FUNCTION'); }).toThrow();
    });

    it ('should set default unauthorised method with string', () => {
        localService.addPermissionStrategy('FUNCTION', () => {});
        localService.setDefaultOnUnauthorizedStrategy('FUNCTION');
        expect(localService.onUnAuthorisedDefaultStrategy).toBeTruthy();
        expect(localService.onUnAuthorisedDefaultStrategy).toEqual('FUNCTION');
    });

    it ('should set default authorised method with string', () => {
        localService.addPermissionStrategy('FUNCTION', () => {});
        localService.setDefaultOnAuthorizedStrategy('FUNCTION');
        expect(localService.onAuthorisedDefaultStrategy).toBeTruthy();
        expect(localService.onAuthorisedDefaultStrategy).toEqual('FUNCTION');
    });
});


describe('Isolated configuration service', () => {
    let localService: Wtf2PermissionsConfigurationService;
    let localStore: Wtf2PermissionsConfigurationStore;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [Wtf2PermissionsModule.forRoot({configurationIsolate: true})],
        });
    });

    beforeEach(inject([Wtf2PermissionsConfigurationService, Wtf2PermissionsConfigurationStore], (service: Wtf2PermissionsConfigurationService, store: Wtf2PermissionsConfigurationStore) => {
        localService = service;
        localStore = store;
        localStore.onAuthorisedDefaultStrategy = 'FUNCTION';
        localStore.onUnAuthorisedDefaultStrategy = 'FUNCTION';
    }));


    it('should create an instance', () => {
        expect(localService).toBeTruthy();
    });

    it ('should set onAuthrisedDefaultStrategy to undefined', () => {
        expect(localService.onAuthorisedDefaultStrategy).toBeFalsy();
    });

    it ('should set onUnAuthorisedDefault strategy to undefined', () => {
        expect(localService.onAuthorisedDefaultStrategy).toBeFalsy();
    });
});
