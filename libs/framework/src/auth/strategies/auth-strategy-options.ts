/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Wtf2AuthTokenClass } from '../services/';

export class Wtf2AuthStrategyOptions {
  name: string;
  token?: {
    class?: Wtf2AuthTokenClass;
    [key: string]: any;
  };
}
