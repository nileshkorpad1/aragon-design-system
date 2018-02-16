/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {NgModule} from '@angular/core';
import {Wtf2SortHeader} from './sort-header';
import {Wtf2Sort} from './sort';
import {WTF2_SORT_HEADER_INTL_PROVIDER} from './sort-header-intl';
import {CommonModule} from '@angular/common';


@NgModule({
  imports: [CommonModule],
  exports: [Wtf2Sort, Wtf2SortHeader],
  declarations: [Wtf2Sort, Wtf2SortHeader],
  providers: [WTF2_SORT_HEADER_INTL_PROVIDER]
})
export class Wtf2SortModule {}
