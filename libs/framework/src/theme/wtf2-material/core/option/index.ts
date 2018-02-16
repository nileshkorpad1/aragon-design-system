/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Wtf2RippleModule} from '../ripple/index';
import {Wtf2PseudoCheckboxModule} from '../selection/index';
import {Wtf2Option} from './option';
import {Wtf2Optgroup} from './optgroup';


@NgModule({
  imports: [Wtf2RippleModule, CommonModule, Wtf2PseudoCheckboxModule],
  exports: [Wtf2Option, Wtf2Optgroup],
  declarations: [Wtf2Option, Wtf2Optgroup]
})
export class Wtf2OptionModule {}


export * from './option';
export * from './optgroup';
