/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { async, inject, TestBed } from '@angular/core/testing';

import { WTF2_AUTH_FALLBACK_TOKEN, Wtf2AuthTokenParceler } from './token-parceler';
import { WTF2_AUTH_TOKENS } from '../../auth.options';
import { Wtf2AuthSimpleToken, wtf2AuthCreateToken, Wtf2AuthJWTToken } from './token';

describe('token-parceler', () => {

  let tokenParceler: Wtf2AuthTokenParceler;

  const createdAt = new Date(1532350800000);
  const simpleToken = wtf2AuthCreateToken(Wtf2AuthSimpleToken, 'test value', 'strategy', createdAt);
  // tslint:disable-next-line
  const wrappedSimple = `{"name":"${Wtf2AuthSimpleToken.NAME}","ownerStrategyName":"${simpleToken.getOwnerStrategyName()}","createdAt":${simpleToken.getCreatedAt().getTime()},"value":"${simpleToken.getValue()}"}`;
  // tslint:disable-next-line
  const jwtToken = wtf2AuthCreateToken(Wtf2AuthJWTToken, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjZXJlbWEuZnIiLCJpYXQiOjE1MzIzNTA4MDAsImV4cCI6MTUzMjQzNzIwMCwic3ViIjoiQWxhaW4gQ0hBUkxFUyIsImFkbWluIjp0cnVlfQ.iICwNqhvg9KPv3_MSg3HCydyAgAYI9mL3ZejLkY11Ck', 'strategy', createdAt);
  // tslint:disable-next-line
  const wrappedJWT = `{"name":"${Wtf2AuthJWTToken.NAME}","ownerStrategyName":"${jwtToken.getOwnerStrategyName()}","createdAt":${jwtToken.getCreatedAt().getTime()},"value":"${jwtToken.getValue()}"}`;
  // tslint:disable-next-line
  const wrappedNonExisting = `{"name":"non-existing","value":"${simpleToken.getValue()}","ownerStrategyName":"${simpleToken.getOwnerStrategyName()}","createdAt":"${createdAt.getTime()}"}`;
  const wrappedInvalid = `{"name":"non-existing"`;

  describe('default configuration', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          { provide: WTF2_AUTH_FALLBACK_TOKEN, useValue: WTF2AuthSimpleToken },
          { provide: WTF2_AUTH_TOKENS, useValue: [WTF2AuthSimpleToken, Wtf2AuthJWTToken] },
          Wtf2AuthTokenParceler,
        ],
      });
    });

    beforeEach(async(inject(
      [Wtf2AuthTokenParceler],
      (_tokenParceler) => {
        tokenParceler = _tokenParceler;
      },
    )));

    it('wraps simple', () => {
      expect(tokenParceler.wrap(simpleToken))
        .toEqual(wrappedSimple);
    });

    it('wraps jwt', () => {
      expect(tokenParceler.wrap(jwtToken))
        .toEqual(wrappedJWT);
    });

    it('unwraps simple', () => {
      expect(tokenParceler.unwrap(wrappedSimple))
        .toEqual(simpleToken);
    });

    it('unwraps jwt', () => {
      expect(tokenParceler.unwrap(wrappedJWT))
        .toEqual(jwtToken);
    });

    it('unwraps non existing', () => {
      expect(tokenParceler.unwrap(wrappedNonExisting))
        .toEqual(simpleToken);
    });

    it('unwraps invalid', () => {
      const token = tokenParceler.unwrap(wrappedInvalid);
      expect(token.getName())
        .toEqual(simpleToken.getName());
      expect(token.getValue())
        .toEqual('');
    });
  });

  describe('fail configuration', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          { provide: WTF2_AUTH_FALLBACK_TOKEN, useValue: WTF2AuthSimpleToken },
          { provide: WTF2_AUTH_TOKENS, useValue: [] },
          Wtf2AuthTokenParceler,
        ],
      });
    });

    beforeEach(async(inject(
      [Wtf2AuthTokenParceler],
      (_tokenParceler) => {
        tokenParceler = _tokenParceler;
      },
    )));

    it('unwraps jwt to fallback simple as none provided', () => {

      const token = tokenParceler.unwrap(wrappedJWT);
      expect(token.getName())
        .toEqual(simpleToken.getName());

      expect(token.getValue())
        .toEqual(jwtToken.getValue());
    });

  });
});
