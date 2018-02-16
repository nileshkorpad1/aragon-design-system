/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {OverlayModule} from '@angular/cdk/overlay';
import {A11yModule} from '@angular/cdk/a11y';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {GestureConfig, Wtf2CommonModule} from '../core';
import {HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {
  Wtf2Tooltip,
  TooltipComponent,
  WTF2_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER,
} from './tooltip';

@NgModule({
  imports: [
    A11yModule,
    CommonModule,
    OverlayModule,
    Wtf2CommonModule,
  ],
  exports: [Wtf2Tooltip, TooltipComponent, Wtf2CommonModule],
  declarations: [Wtf2Tooltip, TooltipComponent],
  entryComponents: [TooltipComponent],
  providers: [
    WTF2_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER,
    {provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig},
  ]
})
export class Wtf2TooltipModule {}
