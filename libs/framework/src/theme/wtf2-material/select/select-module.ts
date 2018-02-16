/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {OverlayModule} from '@angular/cdk/overlay';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {Wtf2CommonModule, Wtf2OptionModule} from '../core';
import {Wtf2FormFieldModule} from '../form-field';
import {WTF2_SELECT_SCROLL_STRATEGY_PROVIDER, Wtf2Select, Wtf2SelectTrigger} from './select';


@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    Wtf2OptionModule,
    Wtf2CommonModule,
  ],
  exports: [Wtf2FormFieldModule, Wtf2Select, Wtf2SelectTrigger, Wtf2OptionModule, Wtf2CommonModule],
  declarations: [Wtf2Select, Wtf2SelectTrigger],
  providers: [WTF2_SELECT_SCROLL_STRATEGY_PROVIDER]
})
export class Wtf2SelectModule {}
