/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Wtf2AuthSimpleToken, Wtf2AuthTokenClass } from '../../services';
import { Wtf2AuthStrategyOptions } from '../auth-strategy-options';
import { getDeepFromObject } from '../../helpers';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

export interface Wtf2PasswordStrategyModule {
  alwaysFail?: boolean;
  endpoint?: string;
  method?: string;
  redirect?: {
    success?: string | null;
    failure?: string | null;
  };
  requireValidToken?: boolean;
  defaultErrors?: string[];
  defaultMessages?: string[];
}

export interface Wtf2PasswordStrategyReset extends Wtf2PasswordStrategyModule {
  resetPasswordTokenKey?: string;
}

export interface Wtf2PasswordStrategyToken {
  class?: Wtf2AuthTokenClass;
  key?: string;
  getter?: Function;
}

export interface Wtf2PasswordStrategyMessage {
  key?: string;
  getter?: Function;
}

export class Wtf2PasswordAuthStrategyOptions extends Wtf2AuthStrategyOptions {
  baseEndpoint ? = '/api/auth/';
  login?: boolean | Wtf2PasswordStrategyModule = {
    alwaysFail: false,
    endpoint: 'login',
    method: 'post',
    requireValidToken: false,
    redirect: {
      success: '/',
      failure: null,
    },
    defaultErrors: ['Login/Email combination is not correct, please try again.'],
    defaultMessages: ['You have been successfully logged in.'],
  };
  register?: boolean | Wtf2PasswordStrategyModule = {
    alwaysFail: false,
    endpoint: 'register',
    method: 'post',
    requireValidToken: false,
    redirect: {
      success: '/',
      failure: null,
    },
    defaultErrors: ['Something went wrong, please try again.'],
    defaultMessages: ['You have been successfully registered.'],
  };
  requestPass?: boolean | Wtf2PasswordStrategyModule = {
    endpoint: 'request-pass',
    method: 'post',
    redirect: {
      success: '/',
      failure: null,
    },
    defaultErrors: ['Something went wrong, please try again.'],
    defaultMessages: ['Reset password instructions have been sent to your email.'],
  };
  resetPass?: boolean | Wtf2PasswordStrategyReset = {
    endpoint: 'reset-pass',
    method: 'put',
    redirect: {
      success: '/',
      failure: null,
    },
    resetPasswordTokenKey: 'reset_password_token',
    defaultErrors: ['Something went wrong, please try again.'],
    defaultMessages: ['Your password has been successfully changed.'],
  };
  logout?: boolean | Wtf2PasswordStrategyReset = {
    alwaysFail: false,
    endpoint: 'logout',
    method: 'delete',
    redirect: {
      success: '/',
      failure: null,
    },
    defaultErrors: ['Something went wrong, please try again.'],
    defaultMessages: ['You have been successfully logged out.'],
  };
  refreshToken?: boolean | Wtf2PasswordStrategyModule = {
    endpoint: 'refresh-token',
    method: 'post',
    requireValidToken: false,
    redirect: {
      success: null,
      failure: null,
    },
    defaultErrors: ['Something went wrong, please try again.'],
    defaultMessages: ['Your token has been successfully refreshed.'],
  };
  token?: Wtf2PasswordStrategyToken = {
    class: Wtf2AuthSimpleToken,
    key: 'data.token',
    getter: (module: string, res: HttpResponse<Object>, options: Wtf2PasswordAuthStrategyOptions) => getDeepFromObject(
      res.body,
      options.token.key,
    ),
  };
  errors?: Wtf2PasswordStrategyMessage = {
    key: 'data.errors',
    getter: (module: string, res: HttpErrorResponse, options: Wtf2PasswordAuthStrategyOptions) => getDeepFromObject(
      res.error,
      options.errors.key,
      options[module].defaultErrors,
    ),
  };
  messages?: Wtf2PasswordStrategyMessage = {
    key: 'data.messages',
    getter: (module: string, res: HttpResponse<Object>, options: Wtf2PasswordAuthStrategyOptions) => getDeepFromObject(
      res.body,
      options.messages.key,
      options[module].defaultMessages,
    ),
  };
  validation?: {
    password?: {
      required?: boolean;
      minLength?: number | null;
      maxLength?: number | null;
      regexp?: string | null;
    };
    email?: {
      required?: boolean;
      regexp?: string | null;
    };
    fullName?: {
      required?: boolean;
      minLength?: number | null;
      maxLength?: number | null;
      regexp?: string | null;
    };
  };
}

export const passwordStrategyOptions: Wtf2PasswordAuthStrategyOptions = new Wtf2PasswordAuthStrategyOptions();
