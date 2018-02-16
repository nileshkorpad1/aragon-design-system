/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
  Component,
  ViewEncapsulation,
  Input,
  ChangeDetectionStrategy,
  Inject,
  Optional,
} from '@angular/core';
import {ANIMATION_MODULE_TYPE} from '@angular/platform-browser/animations';

/**
 * Possible states for a pseudo checkbox.
 * @docs-private
 */
export type Wtf2PseudoCheckboxState = 'unchecked' | 'checked' | 'indeterminate';

/**
 * Component that shows a simplified checkbox without including any kind of "real" checkbox.
 * Meant to be used when the checkbox is purely decorative and a large number of them will be
 * included, such as for the options in a multi-select. Uses no SVGs or complex animations.
 * Note that theming is meant to be handled by the parent element, e.g.
 * `wtf2-primary .wtf2-pseudo-checkbox`.
 *
 * Note that this component will be completely invisible to screen-reader users. This is *not*
 * interchangeable with `<wtf2-checkbox>` and should *not* be used if the user would directly
 * interact with the checkbox. The pseudo-checkbox should only be used as an implementation detail
 * of more complex components that appropriately handle selected / checked state.
 * @docs-private
 */
@Component({
  moduleId: module.id,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wtf2-pseudo-checkbox',
  styleUrls: ['pseudo-checkbox.scss'],
  template: '',
  host: {
    'class': 'wtf2-pseudo-checkbox',
    '[class.wtf2-pseudo-checkbox-indeterminate]': 'state === "indeterminate"',
    '[class.wtf2-pseudo-checkbox-checked]': 'state === "checked"',
    '[class.wtf2-pseudo-checkbox-disabled]': 'disabled',
    '[class._wtf2-animation-noopable]': '_animationMode === "NoopAnimations"',
  },
})
export class Wtf2PseudoCheckbox {
  /** Display state of the checkbox. */
  @Input() state: Wtf2PseudoCheckboxState = 'unchecked';

  /** Whether the checkbox is disabled. */
  @Input() disabled: boolean = false;

  constructor(@Optional() @Inject(ANIMATION_MODULE_TYPE) public _animationMode?: string) { }
}
