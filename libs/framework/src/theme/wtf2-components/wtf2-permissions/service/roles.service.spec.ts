import { Wtf2RolesService } from './roles.service';
import { fakeAsync, inject, TestBed } from '@angular/core/testing';
import { Wtf2RolesStore } from '../store/roles.store';
import { Wtf2PermissionsModule } from '../index';
import { Wtf2Role } from '../model/role.model';
import { Wtf2PermissionsService } from './permissions.service';

enum RoleNamesEnum {
    ADMIN = <any>'ADMIN',
    GUEST = <any>'GUEST',
}

describe('Roles Service', () => {
    let localService: Wtf2RolesService;
    let permissionsService: Wtf2PermissionsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [Wtf2PermissionsModule.forRoot()],
        });
    });

    beforeEach(inject([Wtf2RolesService, Wtf2PermissionsService], (service: Wtf2RolesService, ps: Wtf2PermissionsService) => {
        localService = service;
        permissionsService = ps;
    }));

    it('should create an instance', () => {
        expect(localService).toBeTruthy();
    });

    it ('should add role to role object', () => {
        expect(localService.getRoles()[RoleNamesEnum.ADMIN]).toBeFalsy();
        localService.addRole(<any>RoleNamesEnum.ADMIN, ['edit', 'remove']);
        expect(localService.getRoles()[RoleNamesEnum.ADMIN]).toBeTruthy();
        expect(localService.getRoles()).toEqual(
            {ADMIN: {name: 'ADMIN', validationFunction: ['edit', 'remove']}},
            );
    });

    it ('should remove role from role object', () => {
        expect(localService.getRoles()[RoleNamesEnum.ADMIN]).toBeFalsy();
        localService.addRole(<any>RoleNamesEnum.ADMIN, ['edit', 'remove']);
        expect(localService.getRoles()[RoleNamesEnum.ADMIN]).toBeTruthy();
        localService.removeRole(<any>RoleNamesEnum.ADMIN);
        expect(localService.getRoles()[RoleNamesEnum.ADMIN]).toBeFalsy();
    });

    it ('should remove all roles from object', () => {
        expect(Object.keys(localService.getRoles()).length).toEqual(0);
        localService.addRole(<any>RoleNamesEnum.ADMIN, ['edit', 'remove']);
        localService.addRole(<any>RoleNamesEnum.GUEST, ['edit', 'remove']);
        expect(Object.keys(localService.getRoles()).length).toEqual(2);
        localService.flushRoles();
        expect(Object.keys(localService.getRoles()).length).toEqual(0);
    });

    it ('should add multiple roles', () => {
        expect(Object.keys(localService.getRoles()).length).toEqual(0);
        localService.addRoles({
          ADMIN: ['Nice'],
          GUEST: ['Awesome'],
        });

        expect(Object.keys(localService.getRoles()).length).toEqual(2);
        expect(localService.getRoles()).toEqual(
            {
                ADMIN: {name: 'ADMIN', validationFunction: ['Nice']},
                GUEST: {name: 'GUEST', validationFunction: ['Awesome']}});
    });

    it ('return true when role name is present in Roles object', fakeAsync(() => {
        expect(Object.keys(localService.getRoles()).length).toEqual(0);
        localService.addRoles({
            ADMIN: ['Nice'],
            GUEST: ['Awesome'],
        });

        expect(Object.keys(localService.getRoles()).length).toEqual(2);
        localService.hasOnlyRoles('ADMIN').then((data) => {
            expect(data).toEqual(false);
        });

        permissionsService.addPermission('Nice');
        localService.hasOnlyRoles('ADMIN').then((data) => {
            expect(data).toEqual(true);
        });

        localService.hasOnlyRoles('SHOULDNOTHAVEROLE').then(data => {
            expect(data).toEqual(false);
        });

        localService.hasOnlyRoles(['ADMIN']).then((data) => {
            expect(data).toEqual(true);
        });
        localService.hasOnlyRoles(['ADMIN', 'IRIISISTABLE']).then((data) => {
            expect(data).toEqual(true);
        });
    }));

    it ('return true when role permission name is present in Roles object', fakeAsync(() => {
        expect(Object.keys(localService.getRoles()).length).toEqual(0);
        permissionsService.addPermission(['Nice', 'Awesome']);
        localService.addRoles({
            ADMIN: ['Nice'],
            GUEST: ['Awesome'],
        });



        expect(Object.keys(localService.getRoles()).length).toEqual(2);
        localService.hasOnlyRoles('ADMIN').then((data) => {
            expect(data).toEqual(true);
        });
        localService.hasOnlyRoles(['ADMIN']).then((data) => {
            expect(data).toEqual(true);
        });
        localService.hasOnlyRoles(['ADMIN', 'IRRISISTABLE']).then((data) => {
            expect(data).toEqual(true);
        });
        localService.hasOnlyRoles('SHOULDNOTHAVEROLE').then((data) => {
            expect(data).toEqual(false);
        });
        localService.hasOnlyRoles(['SHOULDNOTHAVEROLE']).then((data) => {
            expect(data).toEqual(false);
        });

    }));

    it('should return role when requested with has role', fakeAsync(() => {
        localService.addRole('role', () => true);
        const role = localService.getRole('role');
        expect(role.name).toBe('role');
        expect((role.validationFunction as Function)()).toEqual(true);
    }));

    it ('should return true when checking with empty permisssion(not specified)', fakeAsync(() => {
        localService.hasOnlyRoles('').then((data) => {
            expect(data).toEqual(true);
        });
    }));

    it ('should return false when permission array is empty', fakeAsync(() => {
        localService.hasOnlyRoles('Empty').then((data) => {
            expect(data).toEqual(false);
        });
    }));

    it('should return false when role is not specified in the list', fakeAsync(() => {
        localService.addRole('test', ['One']);
        localService.hasOnlyRoles('nice').then((data) => {
            expect(data).toBe(false);
        });
    }));

    it('should return false when role deosnt have permissions', fakeAsync(() => {
        localService.addRole('test', ['One']);
        localService.hasOnlyRoles('test').then((data) => {
            expect(data).toBe(false);
        });
    }));

    it('should return true when passing empty array', fakeAsync(() => {
        localService.addRole('test', ['One']);
        localService.hasOnlyRoles([]).then((data) => {
            expect(data).toBe(true);
        });
    }));

    it('should check role permissions with "and" operator', fakeAsync(() => {
        permissionsService.addPermission(['one', 'two']);
        localService.addRole('test', ['one', 'two']);
        localService.hasOnlyRoles('test').then((data) => {
            expect(data).toBe(true);
        });
    }));


    it('should not show role with one role', fakeAsync(() => {
        permissionsService.addPermission(['one']);
        localService.addRole('test', ['one', 'two']);
        localService.hasOnlyRoles('test').then((data) => {
            expect(data).toBe(false);
        });
    }));

    xit('maybe add functionality when function returns array', fakeAsync(() => {
        localService.addRole('test', () => ['nice']);
        localService.hasOnlyRoles(['nice']).then((data) => {
            expect(data).toBe(true);
        });
    }));
});

describe('Roles Service model', () => {
   it('should create role mode', () => {
       const roleModel = new Wtf2Role('role', () => true);
       expect(roleModel.name).toBe('role');
       expect((roleModel.validationFunction as Function)()).toBe(true);
   });
});
