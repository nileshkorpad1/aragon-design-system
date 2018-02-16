/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
  NgModule,
  Directive,
  ElementRef,
  QueryList,
} from '@angular/core';
import {startWith} from 'rxjs/operators';
import {Wtf2CommonModule} from '../common-behaviors/common-module';


/**
 * Shared directive to count lines inside a text area, such as a list item.
 * Line elements can be extracted with a @ContentChildren(Wtf2Line) query, then
 * counted by checking the query list's length.
 */
@Directive({
  selector: '[wtf2-line], [wtf2Line]',
  host: {'class': 'wtf2-line'}
})
export class Wtf2Line {}

/**
 * Helper that takes a query list of lines and sets the correct class on the host.
 * @docs-private
 */
export function setLines(lines: QueryList<Wtf2Line>, element: ElementRef<HTMLElement>) {
  // Note: doesn't need to unsubscribe, because `changes`
  // gets completed by Angular when the view is destroyed.
  lines.changes.pipe(startWith(lines)).subscribe(({length}) => {
    setClass(element, 'wtf2-2-line', false);
    setClass(element, 'wtf2-3-line', false);
    setClass(element, 'wtf2-multi-line', false);

    if (length === 2 || length === 3) {
      setClass(element, `wtf2-${length}-line`, true);
    } else if (length > 3) {
      setClass(element, `wtf2-multi-line`, true);
    }
  });
}

/** Adds or removes a class from an element. */
function setClass(element: ElementRef<HTMLElement>, className: string, isAdd: boolean): void {
  const classList = element.nativeElement.classList;
  isAdd ? classList.add(className) : classList.remove(className);
}

/**
 * Helper that takes a query list of lines and sets the correct class on the host.
 * @docs-private
 * @deprecated Use `setLines` instead.
 * @breaking-change 8.0.0
 */
export class Wtf2LineSetter {
  constructor(lines: QueryList<Wtf2Line>, element: ElementRef<HTMLElement>) {
    setLines(lines, element);
  }
}

@NgModule({
  imports: [Wtf2CommonModule],
  exports: [Wtf2Line, Wtf2CommonModule],
  declarations: [Wtf2Line],
})
export class Wtf2LineModule { }
