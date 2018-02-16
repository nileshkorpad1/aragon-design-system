/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Wtf2AuthStrategyOptions } from '../auth-strategy-options';
import { Wtf2AuthSimpleToken } from '../../services/';

export class Wtf2DummyAuthStrategyOptions extends Wtf2AuthStrategyOptions {
  token ? = {
    class: Wtf2AuthSimpleToken,
  };
  delay ? = 1000;
  alwaysFail ? = false;
}

export const dummyStrategyOptions: Wtf2DummyAuthStrategyOptions = new Wtf2DummyAuthStrategyOptions();
