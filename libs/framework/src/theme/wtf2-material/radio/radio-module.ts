/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {Wtf2CommonModule, Wtf2RippleModule} from '../core';
import {Wtf2RadioButton, Wtf2RadioGroup} from './radio';


@NgModule({
  imports: [CommonModule, Wtf2RippleModule, Wtf2CommonModule],
  exports: [Wtf2RadioGroup, Wtf2RadioButton, Wtf2CommonModule],
  declarations: [Wtf2RadioGroup, Wtf2RadioButton],
})
export class Wtf2RadioModule {}
