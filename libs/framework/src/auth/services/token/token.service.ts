import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of as observableOf } from 'rxjs';
import { filter, share } from 'rxjs/operators';

import { Wtf2TokenStorage } from './token-storage';
import { Wtf2AuthToken } from './token';

/**
 * Service that allows you to manage authentication token - get, set, clear and also listen to token changes over time.
 */
@Injectable()
export class Wtf2TokenService {

  protected token$: BehaviorSubject<Wtf2AuthToken> = new BehaviorSubject(null);

  constructor(protected tokenStorage: Wtf2TokenStorage) {
    this.publishStoredToken();
  }

  /**
   * Publishes token when it changes.
   *  {Observable<Wtf2AuthToken>}
   */
  tokenChange(): Observable<Wtf2AuthToken> {
    return this.token$
      .pipe(
        filter(value => !!value),
        share(),
      );
  }

  /**
   * Sets a token into the storage. This method is used by the Wtf2AuthService automatically.
   *
   *  {Wtf2AuthToken} token
   *  {Observable<any>}
   */
  set(token: Wtf2AuthToken): Observable<null> {
    this.tokenStorage.set(token);
    this.publishStoredToken();
    return observableOf(null);
  }

  /**
   * Returns observable of current token
   *  {Observable<Wtf2AuthToken>}
   */
  get(): Observable<Wtf2AuthToken> {
    const token = this.tokenStorage.get();
    return observableOf(token);
  }

  /**
   * Removes the token and published token value
   *
   *  {Observable<any>}
   */
  clear(): Observable<null> {
    this.tokenStorage.clear();
    this.publishStoredToken();
    return observableOf(null);
  }

  protected publishStoredToken() {
    this.token$.next(this.tokenStorage.get());
  }
}
