/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Injectable, Optional, SkipSelf} from '@angular/core';
import {Subject} from 'rxjs';


/**
 * To modify the labels and text displayed, create a new instance of Wtf2PaginatorIntl and
 * include it in a custom provider
 */
@Injectable({providedIn: 'root'})
export class Wtf2PaginatorIntl {
  /**
   * Stream to emit from when labels are changed. Use this to notify components when the labels have
   * changed after initialization.
   */
  readonly changes: Subject<void> = new Subject<void>();

  /** A label for the page size selector. */
  itemsPerPageLabel: string = 'Items per page:';

  /** A label for the button that increments the current page. */
  nextPageLabel: string = 'Next page';

  /** A label for the button that decrements the current page. */
  previousPageLabel: string = 'Previous page';

  /** A label for the button that moves to the first page. */
  firstPageLabel: string = 'First page';

  /** A label for the button that moves to the last page. */
  lastPageLabel: string = 'Last page';

  /** A label for the range of items within the current page and the length of the whole list. */
  getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length == 0 || pageSize == 0) { return `0 of ${length}`; }

    length = Math.max(length, 0);

    const startIndex = page * pageSize;

    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;

    return `${startIndex + 1} - ${endIndex} of ${length}`;
  }
}

/** @docs-private */
export function WTF2_PAGINATOR_INTL_PROVIDER_FACTORY(parentIntl: Wtf2PaginatorIntl) {
  return parentIntl || new Wtf2PaginatorIntl();
}

/** @docs-private */
export const WTF2_PAGINATOR_INTL_PROVIDER = {
  // If there is already an Wtf2PaginatorIntl available, use that. Otherwise, provide a new one.
  provide: Wtf2PaginatorIntl,
  deps: [[new Optional(), new SkipSelf(), Wtf2PaginatorIntl]],
  useFactory: WTF2_PAGINATOR_INTL_PROVIDER_FACTORY
};
