/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Inject, Injectable } from '@angular/core';

import { Observable, of as observableOf } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { Wtf2AuthStrategy } from '../strategies/auth-strategy';
import { WTF2_AUTH_STRATEGIES } from '../auth.options';
import { Wtf2AuthResult } from './auth-result';
import { Wtf2TokenService } from './token/token.service';
import { Wtf2AuthToken } from './token/token';

/**
 * Common authentication service.
 * Should be used to as an interlayer between UI Components and Auth Strategy.
 */
@Injectable()
export class Wtf2AuthService {

  constructor(protected tokenService: Wtf2TokenService,
              @Inject(WTF2_AUTH_STRATEGIES) protected strategies) {
  }

  /**
   * Retrieves current authenticated token stored
   *  {Observable<any>}
   */
  getToken(): Observable<Wtf2AuthToken> {
    return this.tokenService.get();
  }

  /**
   * Returns true if auth token is present in the token storage
   *  {Observable<boolean>}
   */
  isAuthenticated(): Observable<boolean> {
    return this.getToken()
      .pipe(map((token: Wtf2AuthToken) => token.isValid()));
  }

  /**
   * Returns true if valid auth token is present in the token storage.
   * If not, calls the strategy refreshToken, and returns isAuthenticated() if success, false otherwise
   *  {Observable<boolean>}
   */
  isAuthenticatedOrRefresh(): Observable<boolean> {
    return this.getToken()
      .pipe(
        switchMap(token => {
        if (token.getValue() && !token.isValid()) {
          return this.refreshToken(token.getOwnerStrategyName(), token)
            .pipe(
              switchMap(res => {
                if (res.isSuccess()) {
                  return this.isAuthenticated();
                } else {
                  return observableOf(false);
                }
              }),
            );
        } else {
          return observableOf(token.isValid());
        }
    }));
  }

  /**
   * Returns tokens stream
   *  {Observable<WTF2AuthSimpleToken>}
   */
  onTokenChange(): Observable<Wtf2AuthToken> {
    return this.tokenService.tokenChange();
  }

  /**
   * Returns authentication status stream
   *  {Observable<boolean>}
   */
  onAuthenticationChange(): Observable<boolean> {
    return this.onTokenChange()
      .pipe(map((token: Wtf2AuthToken) => token.isValid()));
  }

  /**
   * Authenticates with the selected strategy
   * Stores received token in the token storage
   *
   * Example:
   * authenticate('email', {email: 'email@example.com', password: 'test'})
   *
   *  strategyName
   *  data
   *  {Observable<Wtf2AuthResult>}
   */
  authenticate(strategyName: string, data?: any): Observable<Wtf2AuthResult> {
    return this.getStrategy(strategyName).authenticate(data)
      .pipe(
        switchMap((result: Wtf2AuthResult) => {
          return this.processResultToken(result);
        }),
      );
  }

  /**
   * Registers with the selected strategy
   * Stores received token in the token storage
   *
   * Example:
   * register('email', {email: 'email@example.com', name: 'Some Name', password: 'test'})
   *
   *  strategyName
   *  data
   *  {Observable<Wtf2AuthResult>}
   */
  register(strategyName: string, data?: any): Observable<Wtf2AuthResult> {
    return this.getStrategy(strategyName).register(data)
      .pipe(
        switchMap((result: Wtf2AuthResult) => {
          return this.processResultToken(result);
        }),
      );
  }

  /**
   * Sign outs with the selected strategy
   * Removes token from the token storage
   *
   * Example:
   * logout('email')
   *
   *  strategyName
   *  {Observable<Wtf2AuthResult>}
   */
  logout(strategyName: string): Observable<Wtf2AuthResult> {
    return this.getStrategy(strategyName).logout()
      .pipe(
        switchMap((result: Wtf2AuthResult) => {
          if (result.isSuccess()) {
            this.tokenService.clear()
              .pipe(map(() => result));
          }
          return observableOf(result);
        }),
      );
  }

  /**
   * Sends forgot password request to the selected strategy
   *
   * Example:
   * requestPassword('email', {email: 'email@example.com'})
   *
   *  strategyName
   *  data
   *  {Observable<Wtf2AuthResult>}
   */
  requestPassword(strategyName: string, data?: any): Observable<Wtf2AuthResult> {
    return this.getStrategy(strategyName).requestPassword(data);
  }

  /**
   * Tries to reset password with the selected strategy
   *
   * Example:
   * resetPassword('email', {newPassword: 'test'})
   *
   *  strategyName
   *  data
   *  {Observable<Wtf2AuthResult>}
   */
  resetPassword(strategyName: string, data?: any): Observable<Wtf2AuthResult> {
    return this.getStrategy(strategyName).resetPassword(data);
  }

  /**
   * Sends a refresh token request
   * Stores received token in the token storage
   *
   * Example:
   * refreshToken('email', {token: token})
   *
   *  {string} strategyName
   *  data
   *  {Observable<Wtf2AuthResult>}
   */
  refreshToken(strategyName: string, data?: any): Observable<Wtf2AuthResult> {
    return this.getStrategy(strategyName).refreshToken(data)
      .pipe(
        switchMap((result: Wtf2AuthResult) => {
          return this.processResultToken(result);
        }),
      );
  }

  /**
   * Get registered strategy by name
   *
   * Example:
   * getStrategy('email')
   *
   *  {string} provider
   *  {Wtf2AbstractAuthProvider}
   */
  protected getStrategy(strategyName: string): Wtf2AuthStrategy {
    const found = this.strategies.find((strategy: Wtf2AuthStrategy) => strategy.getName() === strategyName);

    if (!found) {
      throw new TypeError(`There is no Auth Strategy registered under '${strategyName}' name`);
    }

    return found;
  }

  private processResultToken(result: Wtf2AuthResult) {
    if (result.isSuccess() && result.getToken()) {
      return this.tokenService.set(result.getToken())
        .pipe(
          map((token: Wtf2AuthToken) => {
            return result;
          }),
        );
    }

    return observableOf(result);
  }
}
