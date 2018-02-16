/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OverlayModule} from '@angular/cdk/overlay';
import {Wtf2OptionModule, Wtf2CommonModule} from '../core';
import {Wtf2Autocomplete} from './autocomplete';
import {
  Wtf2AutocompleteTrigger,
  WTF2_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER,
} from './autocomplete-trigger';
import {Wtf2AutocompleteOrigin} from './autocomplete-origin';

@NgModule({
  imports: [Wtf2OptionModule, OverlayModule, Wtf2CommonModule, CommonModule],
  exports: [
    Wtf2Autocomplete,
    Wtf2OptionModule,
    Wtf2AutocompleteTrigger,
    Wtf2AutocompleteOrigin,
    Wtf2CommonModule
  ],
  declarations: [Wtf2Autocomplete, Wtf2AutocompleteTrigger, Wtf2AutocompleteOrigin],
  providers: [WTF2_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER],
})
export class Wtf2AutocompleteModule {}
