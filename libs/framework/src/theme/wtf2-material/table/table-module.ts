/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {NgModule} from '@angular/core';
import {Wtf2Table} from './table';
import {CdkTableModule} from '@angular/cdk/table';
import {
  Wtf2Cell,
  Wtf2CellDef,
  Wtf2ColumnDef,
  Wtf2FooterCell,
  Wtf2FooterCellDef,
  Wtf2HeaderCell,
  Wtf2HeaderCellDef
} from './cell';
import {
  Wtf2FooterRow,
  Wtf2FooterRowDef,
  Wtf2HeaderRow,
  Wtf2HeaderRowDef,
  Wtf2Row,
  Wtf2RowDef
} from './row';
import {Wtf2TextColumn} from './text-column';
import {CommonModule} from '@angular/common';
import {Wtf2CommonModule} from '../core';

const EXPORTED_DECLARATIONS = [
  // Table
  Wtf2Table,

  // Template defs
  Wtf2HeaderCellDef,
  Wtf2HeaderRowDef,
  Wtf2ColumnDef,
  Wtf2CellDef,
  Wtf2RowDef,
  Wtf2FooterCellDef,
  Wtf2FooterRowDef,

  // Cell directives
  Wtf2HeaderCell,
  Wtf2Cell,
  Wtf2FooterCell,

  // Row directives
  Wtf2HeaderRow,
  Wtf2Row,
  Wtf2FooterRow,

  Wtf2TextColumn,
];

@NgModule({
  imports: [
    CdkTableModule,
    CommonModule,
    Wtf2CommonModule,
  ],
  exports: EXPORTED_DECLARATIONS,
  declarations: EXPORTED_DECLARATIONS,
})
export class Wtf2TableModule {}
