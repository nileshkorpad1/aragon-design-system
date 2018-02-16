/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {GestureConfig, Wtf2CommonModule} from '../core';
import {HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {Wtf2Slider} from './slider';


@NgModule({
  imports: [CommonModule, Wtf2CommonModule],
  exports: [Wtf2Slider, Wtf2CommonModule],
  declarations: [Wtf2Slider],
  providers: [{provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig}]
})
export class Wtf2SliderModule {}
