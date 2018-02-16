/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {NgModule} from '@angular/core';
import {Wtf2CommonModule, Wtf2RippleModule} from '../core';
import {Wtf2ButtonToggle, Wtf2ButtonToggleGroup} from './button-toggle';


@NgModule({
  imports: [Wtf2CommonModule, Wtf2RippleModule],
  exports: [Wtf2CommonModule, Wtf2ButtonToggleGroup, Wtf2ButtonToggle],
  declarations: [Wtf2ButtonToggleGroup, Wtf2ButtonToggle],
})
export class Wtf2ButtonToggleModule {}
