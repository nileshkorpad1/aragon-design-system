/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {ObserversModule} from '@angular/cdk/observers';
import {NgModule} from '@angular/core';
import {GestureConfig, Wtf2CommonModule, Wtf2RippleModule} from '../core';
import {HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {Wtf2SlideToggle} from './slide-toggle';


@NgModule({
  imports: [Wtf2RippleModule, Wtf2CommonModule, ObserversModule],
  exports: [Wtf2SlideToggle, Wtf2CommonModule],
  declarations: [Wtf2SlideToggle],
  providers: [
    {provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig}
  ],
})
export class Wtf2SlideToggleModule {}
