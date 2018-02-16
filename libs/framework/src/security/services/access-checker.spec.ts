/**
* @license
* Copyright Akveo. All Rights Reserved.
* Licensed under the MIT License. See License.txt in the project root for license information.
*/
import { async, TestBed, inject } from '@angular/core/testing';
import { of as observableOf } from 'rxjs';

import { Wtf2RoleProvider } from './role.provider';
import { Wtf2AclService } from './acl.service';
import { Wtf2AccessChecker } from './access-checker.service';

let accessChecker: Wtf2AccessChecker;

function setupAcl(can, roles: string | string[]) {
  beforeEach(() => {
    // Configure testbed to prepare services
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Wtf2RoleProvider,
          useValue: {
            getRole: () => {
              return observableOf(roles);
            },
          },
        },
        {
          provide: Wtf2AclService,
          useValue: {
            can: (role, permission, resource) => {
              return can[role]; // this is a simple mocked ACL implementation
            },
          },
        },
        Wtf2AccessChecker,
      ],
    });
  });

  // Single async inject to save references; which are used in all tests below
  beforeEach(async(inject(
    [Wtf2AccessChecker],
    (_accessChecker) => {
      accessChecker = _accessChecker;
    },
  )));
}

describe('authorization checker', () => {

  describe('acl returns true', () => {
    setupAcl({ admin: true }, 'admin');

    it(`checks against provided role`, (done) => {
      accessChecker.isGranted('delete', 'users').subscribe((result: boolean) => {
        expect(result).toBe(true);
        done();
      });
    });
  });

  describe('acl returns false', () => {
    setupAcl({ admin: false }, 'admin');

    it(`checks against provided role`, (done) => {
      accessChecker.isGranted('delete', 'users').subscribe((result: boolean) => {
        expect(result).toBe(false);
        done();
      });
    });
  });

  describe('acl returns false (both roles return false)', () => {
    setupAcl({ admin: false, user: false }, ['user', 'admin']);

    it(`checks against provided roles`, (done) => {
      accessChecker.isGranted('delete', 'users').subscribe((result: boolean) => {
        expect(result).toBe(false);
        done();
      });
    });
  });

  describe('acl returns true (both roles return true)', () => {
    setupAcl({ admin: true, user: true }, ['user', 'admin']);

    it(`checks against provided roles`, (done) => {
      accessChecker.isGranted('delete', 'users').subscribe((result: boolean) => {
        expect(result).toBe(true);
        done();
      });
    });
  });

  describe('acl returns true (one of the roles return true)', () => {
    setupAcl({ admin: true, user: false }, ['user', 'admin']);

    it(`checks against provided roles`, (done) => {
      accessChecker.isGranted('delete', 'users').subscribe((result: boolean) => {
        expect(result).toBe(true);
        done();
      });
    });
  });
});
