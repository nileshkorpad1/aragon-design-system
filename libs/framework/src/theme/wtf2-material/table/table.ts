/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {CDK_TABLE_TEMPLATE, CdkTable} from '@angular/cdk/table';
import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

/**
 * Wrapper for the CdkTable with Material design styles.
 */
@Component({
  moduleId: module.id,
  selector: 'wtf2-table, table[wtf2-table]',
  exportAs: 'wtf2Table',
  template: CDK_TABLE_TEMPLATE,
  styleUrls: ['table.scss'],
  host: {
    'class': 'wtf2-table',
  },
  providers: [{provide: CdkTable, useExisting: Wtf2Table}],
  encapsulation: ViewEncapsulation.None,
  // See note on CdkTable for explanation on why this uses the default change detection strategy.
  // tslint:disable-next-line:validate-decorators
  changeDetection: ChangeDetectionStrategy.Default,
})
export class Wtf2Table<T> extends CdkTable<T> {
  /** Overrides the sticky CSS class set by the `CdkTable`. */
  protected stickyCssClass = 'wtf2-table-sticky';
}
