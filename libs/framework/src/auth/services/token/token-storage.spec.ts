/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { async, inject, TestBed } from '@angular/core/testing';

import { Wtf2TokenLocalStorage, Wtf2TokenStorage } from './token-storage';
import { WTF2_AUTH_TOKENS } from '../../auth.options';
import { Wtf2AuthSimpleToken, wtf2AuthCreateToken } from './token';
import { Wtf2AuthJWTToken } from '@nebular/auth/services/token/token';
import { WTF2_AUTH_FALLBACK_TOKEN, Wtf2AuthTokenParceler } from './token-parceler';

describe('token-storage', () => {

  let tokenStorage: Wtf2TokenStorage;
  let tokenParceler: Wtf2AuthTokenParceler;
  const testTokenKey = 'auth_app_token';
  const testTokenValue = 'test-token';
  const ownerStrategyName = 'strategy';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Wtf2TokenStorage, useClass: Wtf2TokenLocalStorage },
        { provide: WTF2_AUTH_FALLBACK_TOKEN, useValue: Wtf2AuthSimpleToken },
        { provide: WTF2_AUTH_TOKENS, useValue: [Wtf2AuthSimpleToken, Wtf2AuthJWTToken] },
        Wtf2AuthTokenParceler,
      ],
    });
  });

    beforeEach(async(inject(
    [Wtf2TokenStorage, Wtf2AuthTokenParceler],
    (_tokenStorage, _tokenParceler) => {
      tokenStorage = _tokenStorage;
      tokenParceler = _tokenParceler;
    },
  )));

  afterEach(() => {
    localStorage.removeItem(testTokenKey);
  });


  it('set test token', () => {
    const token = wtf2AuthCreateToken(Wtf2AuthSimpleToken, testTokenValue, ownerStrategyName);

    tokenStorage.set(token);
    expect(localStorage.getItem(testTokenKey)).toEqual(tokenParceler.wrap(token));
  });

  it('setter set invalid token to localStorage as empty string', () => {
    let token;

    token = wtf2AuthCreateToken(Wtf2AuthSimpleToken, null, ownerStrategyName);
    tokenStorage.set(token);
    expect(localStorage.getItem(testTokenKey)).toEqual(tokenParceler.wrap(token));

    token = wtf2AuthCreateToken(Wtf2AuthSimpleToken, undefined, ownerStrategyName);
    tokenStorage.set(token);
    expect(localStorage.getItem(testTokenKey)).toEqual(tokenParceler.wrap(token));
  });

  it('get return null in case token was not set', () => {
    const token = tokenStorage.get();
    expect(token.getValue()).toBe('');
    expect(token.isValid()).toBe(false);
  });

  it('should return correct value', () => {
    const token = wtf2AuthCreateToken(Wtf2AuthSimpleToken, 'test', ownerStrategyName);
    localStorage.setItem(testTokenKey, tokenParceler.wrap(token));

    expect(tokenStorage.get().getValue()).toEqual(token.getValue());
  });

  it('clear remove token', () => {
    const token = wtf2AuthCreateToken(Wtf2AuthSimpleToken, 'test', ownerStrategyName);
    localStorage.setItem(testTokenKey, tokenParceler.wrap(token));

    tokenStorage.clear();

    expect(localStorage.getItem(testTokenKey)).toBeNull();
  });

  it('clear remove token only', () => {
    const token = wtf2AuthCreateToken(Wtf2AuthSimpleToken, 'test', ownerStrategyName);
    localStorage.setItem(testTokenKey, tokenParceler.wrap(token));
    localStorage.setItem(testTokenKey + '2', tokenParceler.wrap(token));

    tokenStorage.clear();

    expect(localStorage.getItem(testTokenKey + '2')).toEqual(tokenParceler.wrap(token));
    expect(localStorage.getItem(testTokenKey)).toBeNull();
  });
});
