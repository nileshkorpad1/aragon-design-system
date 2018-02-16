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
import {Wtf2Anchor, Wtf2Button} from './button';


@NgModule({
  imports: [
    CommonModule,
    Wtf2RippleModule,
    Wtf2CommonModule,
  ],
  exports: [
    Wtf2Button,
    Wtf2Anchor,
    Wtf2CommonModule,
  ],
  declarations: [
    Wtf2Button,
    Wtf2Anchor,
  ],
})
export class Wtf2ButtonModule {}
