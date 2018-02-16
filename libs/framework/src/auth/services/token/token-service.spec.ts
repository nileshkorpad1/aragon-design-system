/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { async, inject, TestBed } from '@angular/core/testing';
import { take } from 'rxjs/operators';

import { Wtf2TokenLocalStorage, Wtf2TokenStorage } from './token-storage';
import { Wtf2AuthSimpleToken, Wtf2AuthToken, wtf2AuthCreateToken } from './token';
import { Wtf2TokenService } from './token.service';
import { Wtf2AuthJWTToken } from '@nebular/auth/services/token/token';
import { WTF2_AUTH_FALLBACK_TOKEN, Wtf2AuthTokenParceler } from './token-parceler';
import { WTF2_AUTH_TOKENS } from '../../auth.options';

const noop = () => {};
const ownerStrategyName = 'strategy';

describe('token-service', () => {

  let tokenService: Wtf2TokenService;
  let tokenStorage: Wtf2TokenLocalStorage;
  const simpleToken = wtf2AuthCreateToken(Wtf2AuthSimpleToken, 'test value', ownerStrategyName);
  const emptyToken = wtf2AuthCreateToken(Wtf2AuthSimpleToken, '', ownerStrategyName);
  const testTokenKey = 'auth_app_token';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Wtf2TokenStorage, useClass: Wtf2TokenLocalStorage },
        { provide: WTF2_AUTH_FALLBACK_TOKEN, useValue: WTF2AuthSimpleToken },
        { provide: WTF2_AUTH_TOKENS, useValue: [WTF2AuthSimpleToken, Wtf2AuthJWTToken] },
        Wtf2AuthTokenParceler,
        Wtf2TokenService,
      ],
    });
  });

    beforeEach(async(inject(
    [Wtf2TokenService, Wtf2TokenStorage],
    (_tokenService, _tokenStorage) => {
      tokenService = _tokenService;
      tokenStorage = _tokenStorage;
    },
  )));

  afterEach(() => {
    localStorage.removeItem(testTokenKey);
  });

  it('set calls storage set', () => {

    const spy = spyOn(tokenStorage, 'set')
      .and
      .returnValue(null);

    tokenService.set(simpleToken).subscribe(() => {
      expect(spy).toHaveBeenCalled();
    });
  });

  it('get return null in case token was not set', () => {

    const spy = spyOn(tokenStorage, 'get')
      .and
      .returnValue(emptyToken);

    tokenService.get()
      .subscribe((token: Wtf2AuthToken) => {
        expect(spy).toHaveBeenCalled();
        expect(token.getValue()).toEqual('');
        expect(token.isValid()).toBe(false);
      });
  });

  it('should return correct value', () => {
    tokenService.set(simpleToken).subscribe(noop);

    tokenService.get()
      .subscribe((token: Wtf2AuthToken) => {
        expect(token.getValue()).toEqual(simpleToken.getValue());
      });
  });

  it('clear remove token', () => {

    const spy = spyOn(tokenStorage, 'clear')
      .and
      .returnValue(null);

    tokenService.set(simpleToken).subscribe(noop);

    tokenService.clear().subscribe(() => {
      expect(spy).toHaveBeenCalled();
    });
  });

  it('token should be published', (done) => {
    tokenService.tokenChange()
      .pipe(take(1))
      .subscribe((token: Wtf2AuthToken) => {
        expect(token.getValue()).toEqual('');
      });
    tokenService.set(simpleToken).subscribe(noop);
    tokenService.tokenChange()
      .subscribe((token: Wtf2AuthToken) => {
        expect(token.getValue()).toEqual(simpleToken.getValue());
        done();
      });
  });

  it('clear should be published', (done) => {
    tokenService.tokenChange()
      .pipe(take(1))
      .subscribe((token: Wtf2AuthToken) => {
        expect(token.getValue()).toEqual('');
      });
    tokenService.set(simpleToken).subscribe(noop);
    tokenService.tokenChange()
      .pipe(take(1))
      .subscribe((token: Wtf2AuthToken) => {
        expect(token.getValue()).toEqual(simpleToken.getValue());
      });
    tokenService.clear().subscribe(noop);
    tokenService.tokenChange()
      .subscribe((token: Wtf2AuthToken) => {
        expect(token.getValue()).toEqual('');
        done();
      });
  });
});
