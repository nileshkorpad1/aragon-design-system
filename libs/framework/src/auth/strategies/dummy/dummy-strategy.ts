import { Injectable } from '@angular/core';

import { Observable, of as observableOf } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Wtf2AuthStrategy } from '../auth-strategy';
import { Wtf2AuthResult } from '../../services/auth-result';
import { Wtf2DummyAuthStrategyOptions, dummyStrategyOptions } from './dummy-strategy-options';
import { Wtf2AuthStrategyClass } from '../../auth.options';


/**
 * Dummy auth strategy. Could be useful for auth setup when backend is not available yet.
 *
 *
 * Strategy settings.
 *
 * ```ts
 * export class Wtf2DummyAuthStrategyOptions extends Wtf2AuthStrategyOptions {
 *   name = 'dummy';
 *   token = {
 *     class: Wtf2AuthSimpleToken,
 *   };
 *   delay? = 1000;
 *   alwaysFail? = false;
 * }
 * ```
 */
@Injectable()
export class Wtf2DummyAuthStrategy extends Wtf2AuthStrategy {

  protected defaultOptions: Wtf2DummyAuthStrategyOptions = dummyStrategyOptions;

  static setup(options: Wtf2DummyAuthStrategyOptions): [Wtf2AuthStrategyClass, Wtf2DummyAuthStrategyOptions] {
    return [Wtf2DummyAuthStrategy, options];
  }

  authenticate(data?: any): Observable<Wtf2AuthResult> {
    return observableOf(this.createDummyResult(data))
      .pipe(
        delay(this.getOption('delay')),
      );
  }

  register(data?: any): Observable<Wtf2AuthResult> {
    return observableOf(this.createDummyResult(data))
      .pipe(
        delay(this.getOption('delay')),
      );
  }

  requestPassword(data?: any): Observable<Wtf2AuthResult> {
    return observableOf(this.createDummyResult(data))
      .pipe(
        delay(this.getOption('delay')),
      );
  }

  resetPassword(data?: any): Observable<Wtf2AuthResult> {
    return observableOf(this.createDummyResult(data))
      .pipe(
        delay(this.getOption('delay')),
      );
  }

  logout(data?: any): Observable<Wtf2AuthResult> {
    return observableOf(this.createDummyResult(data))
      .pipe(
        delay(this.getOption('delay')),
      );
  }

  refreshToken(data?: any): Observable<Wtf2AuthResult> {
    return observableOf(this.createDummyResult(data))
      .pipe(
        delay(this.getOption('delay')),
      );
  }

  protected createDummyResult(data?: any): Wtf2AuthResult {

    if (this.getOption('alwaysFail')) {
      return new Wtf2AuthResult(
        false,
        this.createFailResponse(data),
        null,
        ['Something went wrong.'],
      );
    }

    try {
      const token = this.createToken('test token', true);
      return new Wtf2AuthResult(
        true,
        this.createSuccessResponse(data),
        '/',
        [],
        ['Successfully logged in.'],
        token,
      );
    } catch (err) {
      return new Wtf2AuthResult(
        false,
        this.createFailResponse(data),
        null,
        [err.message],
      );
    }


  }
}
