/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Directive, ElementRef} from '@angular/core';

/**
 * Directive applied to an element to make it usable
 * as a connection point for an autocomplete panel.
 */
@Directive({
  selector: '[wtf2AutocompleteOrigin]',
  exportAs: 'wtf2AutocompleteOrigin',
})
export class Wtf2AutocompleteOrigin {
  constructor(
      /** Reference to the element on which the directive is applied. */
      public elementRef: ElementRef<HTMLElement>) { }
}
