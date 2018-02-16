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
import {Wtf2CommonModule, Wtf2RippleModule} from '../core';
import {Wtf2MenuContent} from './menu-content';
import {_Wtf2Menu} from './menu';
import {Wtf2MenuItem} from './menu-item';
import {
  Wtf2MenuTrigger,
  WTF2_MENU_SCROLL_STRATEGY_FACTORY_PROVIDER,
} from './menu-trigger';

/**
 * Used by both the current `Wtf2MenuModule` and the MDC `Wtf2MenuModule`
 * to declare the menu-related directives.
 */
@NgModule({
  exports: [Wtf2MenuTrigger, Wtf2MenuContent, Wtf2CommonModule],
  declarations: [Wtf2MenuTrigger, Wtf2MenuContent],
  providers: [WTF2_MENU_SCROLL_STRATEGY_FACTORY_PROVIDER]
})
// tslint:disable-next-line:class-name
export class _Wtf2MenuDirectivesModule {}

@NgModule({
  imports: [
    CommonModule,
    Wtf2CommonModule,
    Wtf2RippleModule,
    OverlayModule,
    _Wtf2MenuDirectivesModule,
  ],
  exports: [_Wtf2Menu, Wtf2MenuItem, _Wtf2MenuDirectivesModule],
  declarations: [_Wtf2Menu, Wtf2MenuItem],
  providers: [WTF2_MENU_SCROLL_STRATEGY_FACTORY_PROVIDER]
})
export class Wtf2MenuModule {}
