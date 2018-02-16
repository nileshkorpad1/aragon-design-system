/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {
  Wtf2CommonModule,
  Wtf2LineModule,
  Wtf2PseudoCheckboxModule,
  Wtf2RippleModule,
} from '../core';
import {
  Wtf2List,
  Wtf2NavList,
  Wtf2ListAvatarCssWtf2Styler,
  Wtf2ListIconCssWtf2Styler,
  Wtf2ListItem,
  Wtf2ListSubheaderCssWtf2Styler,
} from './list';
import {Wtf2ListOption, Wtf2SelectionList} from './selection-list';
import {Wtf2DividerModule} from '../divider';


@NgModule({
  imports: [Wtf2LineModule, Wtf2RippleModule, Wtf2CommonModule, Wtf2PseudoCheckboxModule, CommonModule],
  exports: [
    Wtf2List,
    Wtf2NavList,
    Wtf2ListItem,
    Wtf2ListAvatarCssWtf2Styler,
    Wtf2LineModule,
    Wtf2CommonModule,
    Wtf2ListIconCssWtf2Styler,
    Wtf2ListSubheaderCssWtf2Styler,
    Wtf2PseudoCheckboxModule,
    Wtf2SelectionList,
    Wtf2ListOption,
    Wtf2DividerModule
  ],
  declarations: [
    Wtf2List,
    Wtf2NavList,
    Wtf2ListItem,
    Wtf2ListAvatarCssWtf2Styler,
    Wtf2ListIconCssWtf2Styler,
    Wtf2ListSubheaderCssWtf2Styler,
    Wtf2SelectionList,
    Wtf2ListOption
  ],
})
export class Wtf2ListModule {}
