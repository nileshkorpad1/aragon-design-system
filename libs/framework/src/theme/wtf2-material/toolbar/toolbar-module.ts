/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {NgModule} from '@angular/core';
import {Wtf2CommonModule} from '../core';
import {Wtf2Toolbar, Wtf2ToolbarRow} from './toolbar';


@NgModule({
  imports: [Wtf2CommonModule],
  exports: [Wtf2Toolbar, Wtf2ToolbarRow, Wtf2CommonModule],
  declarations: [Wtf2Toolbar, Wtf2ToolbarRow],
})
export class Wtf2ToolbarModule {}
