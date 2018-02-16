import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Wtf2AuthResult } from '../services/auth-result';
import { Wtf2AuthStrategyOptions } from './auth-strategy-options';
import { deepExtend, getDeepFromObject } from '../helpers';
import {
  Wtf2AuthToken,
  wtf2AuthCreateToken,
  Wtf2AuthIllegalTokenError,
} from '../services/token/token';

export abstract class Wtf2AuthStrategy {

  protected defaultOptions: Wtf2AuthStrategyOptions;
  protected options: Wtf2AuthStrategyOptions;

  // we should keep this any and validation should be done in `register` method instead
  // otherwise it won't be possible to pass an empty object
  setOptions(options: any): void {
    this.options = deepExtend({}, this.defaultOptions, options);
  }

  getOption(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  createToken<T extends Wtf2AuthToken>(value: any, failWhenInvalidToken?: boolean): T {
    const token =  wtf2AuthCreateToken<T>(this.getOption('token.class'), value, this.getName());
    // At this point, wtf2AuthCreateToken failed with Wtf2AuthIllegalTokenError which MUST be intercepted by strategies
    // Or token is created. It MAY be created even if backend did not return any token, in this case it is !Valid
    if (failWhenInvalidToken && !token.isValid()) {
      // If we require a valid token (i.e. isValid), then we MUST throw Wtf2AuthIllegalTokenError so that the strategies
      // intercept it
      throw new Wtf2AuthIllegalTokenError('Token is empty or invalid.');
    }
    return token;
  }

  getName(): string {
    return this.getOption('name');
  }

  abstract authenticate(data?: any): Observable<Wtf2AuthResult>;

  abstract register(data?: any): Observable<Wtf2AuthResult>;

  abstract requestPassword(data?: any): Observable<Wtf2AuthResult>;

  abstract resetPassword(data?: any): Observable<Wtf2AuthResult>;

  abstract logout(): Observable<Wtf2AuthResult>;

  abstract refreshToken(data?: any): Observable<Wtf2AuthResult>;

  protected createFailResponse(data?: any): HttpResponse<Object> {
    return new HttpResponse<Object>({ body: {}, status: 401 });
  }

  protected createSuccessResponse(data?: any): HttpResponse<Object> {
    return new HttpResponse<Object>({ body: {}, status: 200 });
  }

  protected getActionEndpoint(action: string): string {
    const actionEndpoint: string = this.getOption(`${action}.endpoint`);
    const baseEndpoint: string = this.getOption('baseEndpoint');
    return baseEndpoint + actionEndpoint;
  }
}
