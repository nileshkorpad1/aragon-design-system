import { Inject, Injectable, InjectionToken } from '@angular/core';

import { wtf2AuthCreateToken, Wtf2AuthToken, Wtf2AuthTokenClass } from './token';
import { WTF2_AUTH_TOKENS } from '../../auth.options';

export interface Wtf2TokenPack {
  name: string;
  ownerStrategyName: string;
  createdAt: Number;
  value: string;
}

export const WTF2_AUTH_FALLBACK_TOKEN = new InjectionToken<Wtf2AuthTokenClass>('WTF2 Auth Options');

/**
 * Creates a token parcel which could be stored/restored
 */
@Injectable()
export class Wtf2AuthTokenParceler {

  constructor(@Inject(WTF2_AUTH_FALLBACK_TOKEN) private fallbackClass: Wtf2AuthTokenClass,
              @Inject(WTF2_AUTH_TOKENS) private tokenClasses: Wtf2AuthTokenClass[]) {
  }

  wrap(token: Wtf2AuthToken): string {
    return JSON.stringify({
      name: token.getName(),
      ownerStrategyName: token.getOwnerStrategyName(),
      createdAt: token.getCreatedAt().getTime(),
      value: token.toString(),
    });
  }

  unwrap(value: string): Wtf2AuthToken {
    let tokenClass: Wtf2AuthTokenClass = this.fallbackClass;
    let tokenValue = '';
    let tokenOwnerStrategyName = '';
    let tokenCreatedAt: Date = null;

    const tokenPack: Wtf2TokenPack = this.parseTokenPack(value);
    if (tokenPack) {
      tokenClass = this.getClassByName(tokenPack.name) || this.fallbackClass;
      tokenValue = tokenPack.value;
      tokenOwnerStrategyName = tokenPack.ownerStrategyName;
      tokenCreatedAt = new Date(Number(tokenPack.createdAt));
    }

    return wtf2AuthCreateToken(tokenClass, tokenValue, tokenOwnerStrategyName, tokenCreatedAt);

  }

  // TODO: this could be moved to a separate token registry
  protected getClassByName(name): Wtf2AuthTokenClass {
    return this.tokenClasses.find((tokenClass: Wtf2AuthTokenClass) => tokenClass.NAME === name);
  }

  protected parseTokenPack(value): Wtf2TokenPack {
    try {
      return JSON.parse(value);
    } catch (e) { }
    return null;
  }
}
