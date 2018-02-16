/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {OverlayModule} from '@angular/cdk/overlay';
import {PortalModule} from '@angular/cdk/portal';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {Wtf2CommonModule} from '../core';
import {Wtf2BottomSheetContainer} from './bottom-sheet-container';


@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    Wtf2CommonModule,
    PortalModule,
  ],
  exports: [Wtf2BottomSheetContainer, Wtf2CommonModule],
  declarations: [Wtf2BottomSheetContainer],
  entryComponents: [Wtf2BottomSheetContainer],
})
export class Wtf2BottomSheetModule {}
