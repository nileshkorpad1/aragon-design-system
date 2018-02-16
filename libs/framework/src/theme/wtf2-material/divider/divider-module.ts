/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {Wtf2CommonModule} from '../core';
import {Wtf2Divider} from './divider';


@NgModule({
  imports: [Wtf2CommonModule, CommonModule],
  exports: [Wtf2Divider, Wtf2CommonModule],
  declarations: [Wtf2Divider],
})
export class Wtf2DividerModule {}
