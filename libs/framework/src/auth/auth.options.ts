import { InjectionToken } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { Wtf2AuthStrategy, Wtf2AuthStrategyOptions } from './strategies';
import { Wtf2AuthToken, Wtf2AuthTokenClass } from './services/token/token';

export type Wtf2AuthStrategyClass = new (...params: any[]) => Wtf2AuthStrategy;

export type Wtf2AuthStrategies  = [Wtf2AuthStrategyClass, Wtf2AuthStrategyOptions][];

export interface Wtf2AuthOptions {
  forms?: any;
  strategies?: Wtf2AuthStrategies;
}

export interface Wtf2AuthSocialLink {
  link?: string;
  url?: string;
  target?: string;
  title?: string;
  icon?: string;
}

const socialLinks: Wtf2AuthSocialLink[] = [];

export const defaultAuthOptions: any = {
  strategies: [],
  forms: {
    login: {
      redirectDelay: 500, // delay before redirect after a successful login, while success message is shown to the user
      strategy: 'email',  // provider id key. If you have multiple strategies, or what to use your own
      rememberMe: true,   // whether to show or not the `rememberMe` checkbox
      showMessages: {     // show/not show success/error messages
        success: true,
        error: true,
      },
      socialLinks: socialLinks, // social links at the bottom of a page
    },
    register: {
      redirectDelay: 500,
      strategy: 'email',
      showMessages: {
        success: true,
        error: true,
      },
      terms: true,
      socialLinks: socialLinks,
    },
    requestPassword: {
      redirectDelay: 500,
      strategy: 'email',
      showMessages: {
        success: true,
        error: true,
      },
      socialLinks: socialLinks,
    },
    resetPassword: {
      redirectDelay: 500,
      strategy: 'email',
      showMessages: {
        success: true,
        error: true,
      },
      socialLinks: socialLinks,
    },
    logout: {
      redirectDelay: 500,
      strategy: 'email',
    },
    validation: {
      password: {
        required: true,
        minLength: 4,
        maxLength: 50,
      },
      email: {
        required: true,
      },
      fullName: {
        required: false,
        minLength: 4,
        maxLength: 50,
      },
    },
  },
};

export const WTF2_AUTH_OPTIONS = new InjectionToken<Wtf2AuthOptions>('Nebular Auth Options');
export const WTF2_AUTH_USER_OPTIONS = new InjectionToken<Wtf2AuthOptions>('Nebular User Auth Options');
export const WTF2_AUTH_STRATEGIES = new InjectionToken<Wtf2AuthStrategies>('Nebular Auth Strategies');
export const WTF2_AUTH_TOKENS = new InjectionToken<Wtf2AuthTokenClass<Wtf2AuthToken>[]>('Nebular Auth Tokens');
export const WTF2_AUTH_INTERCEPTOR_HEADER = new InjectionToken<string>('Nebular Simple Interceptor Header');
export const WTF2_AUTH_TOKEN_INTERCEPTOR_FILTER =
       new InjectionToken<(req: HttpRequest<any>) => boolean>('Nebular Interceptor Filter');

