/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {NgModule} from '@angular/core';
import {Wtf2LineModule, Wtf2CommonModule} from '../core';
import {
  Wtf2GridTile, Wtf2GridTileText, Wtf2GridTileFooterCssWtf2Styler,
  Wtf2GridTileHeaderCssWtf2Styler, Wtf2GridAvatarCssWtf2Styler
} from './grid-tile';
import {Wtf2GridList} from './grid-list';


@NgModule({
  imports: [Wtf2LineModule, Wtf2CommonModule],
  exports: [
    Wtf2GridList,
    Wtf2GridTile,
    Wtf2GridTileText,
    Wtf2LineModule,
    Wtf2CommonModule,
    Wtf2GridTileHeaderCssWtf2Styler,
    Wtf2GridTileFooterCssWtf2Styler,
    Wtf2GridAvatarCssWtf2Styler
  ],
  declarations: [
    Wtf2GridList,
    Wtf2GridTile,
    Wtf2GridTileText,
    Wtf2GridTileHeaderCssWtf2Styler,
    Wtf2GridTileFooterCssWtf2Styler,
    Wtf2GridAvatarCssWtf2Styler
  ],
})
export class Wtf2GridListModule {}
