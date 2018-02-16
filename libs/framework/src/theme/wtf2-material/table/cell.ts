/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Directive, ElementRef, Input} from '@angular/core';
import {
  CdkCell,
  CdkCellDef,
  CdkColumnDef, CdkFooterCell, CdkFooterCellDef,
  CdkHeaderCell,
  CdkHeaderCellDef,
} from '@angular/cdk/table';

/**
 * Cell definition for the wtf2-table.
 * Captures the template of a column's data row cell as well as cell-specific properties.
 */
@Directive({
  selector: '[wtf2CellDef]',
  providers: [{provide: CdkCellDef, useExisting: Wtf2CellDef}]
})
export class Wtf2CellDef extends CdkCellDef {}

/**
 * Header cell definition for the wtf2-table.
 * Captures the template of a column's header cell and as well as cell-specific properties.
 */
@Directive({
  selector: '[wtf2HeaderCellDef]',
  providers: [{provide: CdkHeaderCellDef, useExisting: Wtf2HeaderCellDef}]
})
export class Wtf2HeaderCellDef extends CdkHeaderCellDef {}

/**
 * Footer cell definition for the wtf2-table.
 * Captures the template of a column's footer cell and as well as cell-specific properties.
 */
@Directive({
  selector: '[wtf2FooterCellDef]',
  providers: [{provide: CdkFooterCellDef, useExisting: Wtf2FooterCellDef}]
})
export class Wtf2FooterCellDef extends CdkFooterCellDef {}

/**
 * Column definition for the wtf2-table.
 * Defines a set of cells available for a table column.
 */
@Directive({
  selector: '[wtf2ColumnDef]',
  providers: [
    {provide: CdkColumnDef, useExisting: Wtf2ColumnDef},
    {provide: 'WTF2_SORT_HEADER_COLUMN_DEF', useExisting: Wtf2ColumnDef}
  ],
})
export class Wtf2ColumnDef extends CdkColumnDef {
  /** Unique name for this column. */
  @Input('wtf2ColumnDef') name: string;

  /** Whether this column should be sticky positioned at the start of the row */
  @Input() sticky: boolean;

  /** Whether this column should be sticky positioned on the end of the row */
  @Input() stickyEnd: boolean;
}

/** Header cell template container that adds the right classes and role. */
@Directive({
  selector: 'wtf2-header-cell, th[wtf2-header-cell]',
  host: {
    'class': 'wtf2-header-cell',
    'role': 'columnheader',
  },
})
export class Wtf2HeaderCell extends CdkHeaderCell {
  constructor(columnDef: CdkColumnDef,
              elementRef: ElementRef<HTMLElement>) {
    super(columnDef, elementRef);
    elementRef.nativeElement.classList.add(`wtf2-column-${columnDef.cssClassFriendlyName}`);
  }
}

/** Footer cell template container that adds the right classes and role. */
@Directive({
  selector: 'wtf2-footer-cell, td[wtf2-footer-cell]',
  host: {
    'class': 'wtf2-footer-cell',
    'role': 'gridcell',
  },
})
export class Wtf2FooterCell extends CdkFooterCell {
  constructor(columnDef: CdkColumnDef,
              elementRef: ElementRef) {
    super(columnDef, elementRef);
    elementRef.nativeElement.classList.add(`wtf2-column-${columnDef.cssClassFriendlyName}`);
  }
}

/** Cell template container that adds the right classes and role. */
@Directive({
  selector: 'wtf2-cell, td[wtf2-cell]',
  host: {
    'class': 'wtf2-cell',
    'role': 'gridcell',
  },
})
export class Wtf2Cell extends CdkCell {
  constructor(columnDef: CdkColumnDef,
              elementRef: ElementRef<HTMLElement>) {
    super(columnDef, elementRef);
    elementRef.nativeElement.classList.add(`wtf2-column-${columnDef.cssClassFriendlyName}`);
  }
}
