/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Wtf2AuthOAuth2Token, Wtf2AuthTokenClass } from '../../services';
import { Wtf2AuthStrategyOptions } from '../auth-strategy-options';

export enum Wtf2OAuth2ResponseType {
  CODE = 'code',
  TOKEN = 'token',
}

// TODO: client_credentials
export enum Wtf2OAuth2GrantType {
  AUTHORIZATION_CODE = 'authorization_code',
  PASSWORD = 'password',
  REFRESH_TOKEN = 'refresh_token',
}

export enum Wtf2OAuth2ClientAuthMethod {
  NONE = 'none',
  BASIC = 'basic',
  REQUEST_BODY = 'request-body',
}

export class Wtf2OAuth2AuthStrategyOptions extends Wtf2AuthStrategyOptions {
  baseEndpoint = '';
  clientId = '';
  clientSecret = '';
  clientAuthMethod?: string = Wtf2OAuth2ClientAuthMethod.NONE;
  redirect?: { success?: string; failure?: string } = {
    success: '/',
    failure: null,
  };
  defaultErrors?: any[] = ['Something went wrong, please try again.'];
  defaultMessages?: any[] = ['You have been successfully authenticated.'];
  authorize?: {
    endpoint?: string;
    redirectUri?: string;
    responseType?: string;
    requireValidToken?: boolean; // used only with Wtf2OAuth2ResponseType.TOKEN
    scope?: string;
    state?: string;
    params?: { [key: string]: string };
  } = {
    endpoint: 'authorize',
    responseType: Wtf2OAuth2ResponseType.CODE,
  };
  token?: {
    endpoint?: string;
    grantType?: string;
    redirectUri?: string;
    scope?: string; // Used only with 'password' grantType
    requireValidToken?: boolean;
    class: Wtf2AuthTokenClass,
  } = {
    endpoint: 'token',
    grantType: Wtf2OAuth2GrantType.AUTHORIZATION_CODE,
    requireValidToken: false,
    class: Wtf2AuthOAuth2Token,
  };
  refresh?: {
    endpoint?: string;
    grantType?: string;
    scope?: string;
    requireValidToken?: boolean;
  } = {
    endpoint: 'token',
    grantType: Wtf2OAuth2GrantType.REFRESH_TOKEN,
  };
}

export const auth2StrategyOptions: Wtf2OAuth2AuthStrategyOptions = new Wtf2OAuth2AuthStrategyOptions();
