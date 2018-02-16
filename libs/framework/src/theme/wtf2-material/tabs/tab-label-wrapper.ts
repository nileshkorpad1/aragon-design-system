/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Directive, ElementRef} from '@angular/core';
import {CanDisable, CanDisableCtor, mixinDisabled} from '../core';


// Boilerplate for applying mixins to Wtf2TabLabelWrapper.
/** @docs-private */
class Wtf2TabLabelWrapperBase {}
const _Wtf2TabLabelWrapperMixinBase: CanDisableCtor & typeof Wtf2TabLabelWrapperBase =
    mixinDisabled(Wtf2TabLabelWrapperBase);

/**
 * Used in the `wtf2-tab-group` view to display tab labels.
 * @docs-private
 */
@Directive({
  selector: '[wtf2TabLabelWrapper]',
  inputs: ['disabled'],
  host: {
    '[class.wtf2-tab-disabled]': 'disabled',
    '[attr.aria-disabled]': '!!disabled',
  }
})
export class Wtf2TabLabelWrapper extends _Wtf2TabLabelWrapperMixinBase implements CanDisable {
  constructor(public elementRef: ElementRef) {
    super();
  }

  /** Sets focus on the wrapper element */
  focus(): void {
    this.elementRef.nativeElement.focus();
  }

  getOffsetLeft(): number {
    return this.elementRef.nativeElement.offsetLeft;
  }

  getOffsetWidth(): number {
    return this.elementRef.nativeElement.offsetWidth;
  }
}
