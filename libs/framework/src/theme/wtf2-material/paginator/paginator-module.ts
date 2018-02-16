/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {Wtf2ButtonModule} from '../button';
import {Wtf2SelectModule} from '../select';
import {Wtf2TooltipModule} from '../tooltip';
import {Wtf2Paginator} from './paginator';
import {WTF2_PAGINATOR_INTL_PROVIDER} from './paginator-intl';


@NgModule({
  imports: [
    CommonModule,
    Wtf2ButtonModule,
    Wtf2SelectModule,
    Wtf2TooltipModule,
  ],
  exports: [Wtf2Paginator],
  declarations: [Wtf2Paginator],
  providers: [WTF2_PAGINATOR_INTL_PROVIDER],
})
export class Wtf2PaginatorModule {}
