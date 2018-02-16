import { Injectable } from '@angular/core';

import { Wtf2AuthToken } from './token';
import { Wtf2AuthTokenParceler } from './token-parceler';

export abstract class Wtf2TokenStorage {

  abstract get(): Wtf2AuthToken;
  abstract set(token: Wtf2AuthToken);
  abstract clear();
}

/**
 * Service that uses browser localStorage as a storage.
 *
 * The token storage is provided into auth module the following way:
 * ```ts
 * { provide: Wtf2TokenStorage, useClass: Wtf2TokenLocalStorage },
 * ```
 *
 * If you need to change the storage behaviour or provide your own - just extend your class from basic `Wtf2TokenStorage`
 * or `Wtf2TokenLocalStorage` and provide in your `app.module`:
 * ```ts
 * { provide: Wtf2TokenStorage, useClass: Wtf2TokenCustomStorage },
 * ```
 *
 */
@Injectable()
export class Wtf2TokenLocalStorage extends Wtf2TokenStorage {

  protected key = 'auth_app_token';

  constructor(private parceler: Wtf2AuthTokenParceler) {
    super();
  }

  /**
   * Returns token from localStorage
   *  {Wtf2AuthToken}
   */
  get(): Wtf2AuthToken {
    const raw = localStorage.getItem(this.key);
    return this.parceler.unwrap(raw);
  }

  /**
   * Sets token to localStorage
   *  {Wtf2AuthToken} token
   */
  set(token: Wtf2AuthToken) {
    const raw = this.parceler.wrap(token);
    localStorage.setItem(this.key, raw);
  }

  /**
   * Clears token from localStorage
   */
  clear() {
    localStorage.removeItem(this.key);
  }
}
