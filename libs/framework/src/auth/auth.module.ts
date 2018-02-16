import { Injector, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpRequest } from '@angular/common/http';

import {
  WTF2_AUTH_FALLBACK_TOKEN,
  Wtf2AuthService,
  Wtf2AuthSimpleToken,
  Wtf2AuthTokenClass,
  Wtf2AuthTokenParceler,
  Wtf2TokenLocalStorage,
  Wtf2TokenService,
  Wtf2TokenStorage,
} from './services';
import {
  Wtf2AuthStrategy,
  Wtf2AuthStrategyOptions,
  Wtf2DummyAuthStrategy,
  Wtf2OAuth2AuthStrategy,
  Wtf2PasswordAuthStrategy,
} from './strategies';

import {
  defaultAuthOptions,
  WTF2_AUTH_INTERCEPTOR_HEADER,
  WTF2_AUTH_OPTIONS,
  WTF2_AUTH_STRATEGIES,
  WTF2_AUTH_TOKEN_INTERCEPTOR_FILTER,
  WTF2_AUTH_TOKENS,
  WTF2_AUTH_USER_OPTIONS,
  Wtf2AuthOptions,
  Wtf2AuthStrategyClass,
} from './auth.options';


import { deepExtend } from './helpers';

export function wtf2StrategiesFactory(options: Wtf2AuthOptions, injector: Injector): Wtf2AuthStrategy[] {
  const strategies = [];
  options.strategies
    .forEach(([strategyClass, strategyOptions]: [Wtf2AuthStrategyClass, Wtf2AuthStrategyOptions]) => {
      const strategy: Wtf2AuthStrategy = injector.get(strategyClass);
      strategy.setOptions(strategyOptions);

      strategies.push(strategy);
    });
  return strategies;
}

export function wtf2TokensFactory(strategies: Wtf2AuthStrategy[]): Wtf2AuthTokenClass[] {
  const tokens = [];
  strategies
    .forEach((strategy: Wtf2AuthStrategy) => {
      tokens.push(strategy.getOption('token.class'));
    });
  return tokens;
}

export function wtf2OptionsFactory(options) {
  return deepExtend(defaultAuthOptions, options);
}

export function wtf2NoOpInterceptorFilter(req: HttpRequest<any>): boolean {
  return true;
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
  ],
  declarations: [
  ],
  exports: [
  ],
})
export class Wtf2AuthModule {
  static forRoot(nbAuthOptions?: Wtf2AuthOptions): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: Wtf2AuthModule,
      providers: [
        { provide: WTF2_AUTH_USER_OPTIONS, useValue: nbAuthOptions },
        { provide: WTF2_AUTH_OPTIONS, useFactory: wtf2OptionsFactory, deps: [WTF2_AUTH_USER_OPTIONS] },
        { provide: WTF2_AUTH_STRATEGIES, useFactory: wtf2StrategiesFactory, deps: [WTF2_AUTH_OPTIONS, Injector] },
        { provide: WTF2_AUTH_TOKENS, useFactory: wtf2TokensFactory, deps: [WTF2_AUTH_STRATEGIES] },
        { provide: WTF2_AUTH_FALLBACK_TOKEN, useValue: Wtf2AuthSimpleToken },
        { provide: WTF2_AUTH_INTERCEPTOR_HEADER, useValue: 'Authorization' },
        { provide: WTF2_AUTH_TOKEN_INTERCEPTOR_FILTER, useValue: wtf2NoOpInterceptorFilter },
        { provide: Wtf2TokenStorage, useClass: Wtf2TokenLocalStorage },
        Wtf2AuthTokenParceler,
        Wtf2AuthService,
        Wtf2TokenService,
        Wtf2DummyAuthStrategy,
        Wtf2PasswordAuthStrategy,
        Wtf2OAuth2AuthStrategy,
      ],
    };
  }
}
