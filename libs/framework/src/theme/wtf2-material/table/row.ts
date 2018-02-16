/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
  CDK_ROW_TEMPLATE,
  CdkFooterRow,
  CdkFooterRowDef,
  CdkHeaderRow,
  CdkHeaderRowDef,
  CdkRow,
  CdkRowDef
} from '@angular/cdk/table';
import {ChangeDetectionStrategy, Component, Directive, ViewEncapsulation} from '@angular/core';

/**
 * Header row definition for the wtf2-table.
 * Captures the header row's template and other header properties such as the columns to display.
 */
@Directive({
  selector: '[wtf2HeaderRowDef]',
  providers: [{provide: CdkHeaderRowDef, useExisting: Wtf2HeaderRowDef}],
  inputs: ['columns: wtf2HeaderRowDef', 'sticky: wtf2HeaderRowDefSticky'],
})
export class Wtf2HeaderRowDef extends CdkHeaderRowDef {
}

/**
 * Footer row definition for the wtf2-table.
 * Captures the footer row's template and other footer properties such as the columns to display.
 */
@Directive({
  selector: '[wtf2FooterRowDef]',
  providers: [{provide: CdkFooterRowDef, useExisting: Wtf2FooterRowDef}],
  inputs: ['columns: wtf2FooterRowDef', 'sticky: wtf2FooterRowDefSticky'],
})
export class Wtf2FooterRowDef extends CdkFooterRowDef {
}

/**
 * Data row definition for the wtf2-table.
 * Captures the data row's template and other properties such as the columns to display and
 * a when predicate that describes when this row should be used.
 */
@Directive({
  selector: '[wtf2RowDef]',
  providers: [{provide: CdkRowDef, useExisting: Wtf2RowDef}],
  inputs: ['columns: wtf2RowDefColumns', 'when: wtf2RowDefWhen'],
})
export class Wtf2RowDef<T> extends CdkRowDef<T> {
}

/** Footer template container that contains the cell outlet. Adds the right class and role. */
@Component({
  moduleId: module.id,
  selector: 'wtf2-header-row, tr[wtf2-header-row]',
  template: CDK_ROW_TEMPLATE,
  host: {
    'class': 'wtf2-header-row',
    'role': 'row',
  },
  // See note on CdkTable for explanation on why this uses the default change detection strategy.
  // tslint:disable-next-line:validate-decorators
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'wtf2HeaderRow',
  providers: [{provide: CdkHeaderRow, useExisting: Wtf2HeaderRow}],
})
export class Wtf2HeaderRow extends CdkHeaderRow {
}

/** Footer template container that contains the cell outlet. Adds the right class and role. */
@Component({
  moduleId: module.id,
  selector: 'wtf2-footer-row, tr[wtf2-footer-row]',
  template: CDK_ROW_TEMPLATE,
  host: {
    'class': 'wtf2-footer-row',
    'role': 'row',
  },
  // See note on CdkTable for explanation on why this uses the default change detection strategy.
  // tslint:disable-next-line:validate-decorators
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'wtf2FooterRow',
  providers: [{provide: CdkFooterRow, useExisting: Wtf2FooterRow}],
})
export class Wtf2FooterRow extends CdkFooterRow {
}

/** Data row template container that contains the cell outlet. Adds the right class and role. */
@Component({
  moduleId: module.id,
  selector: 'wtf2-row, tr[wtf2-row]',
  template: CDK_ROW_TEMPLATE,
  host: {
    'class': 'wtf2-row',
    'role': 'row',
  },
  // See note on CdkTable for explanation on why this uses the default change detection strategy.
  // tslint:disable-next-line:validate-decorators
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'wtf2Row',
  providers: [{provide: CdkRow, useExisting: Wtf2Row}],
})
export class Wtf2Row extends CdkRow {
}
