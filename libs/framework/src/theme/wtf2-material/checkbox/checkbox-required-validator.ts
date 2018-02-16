/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
  Directive,
  forwardRef,
  Provider,
} from '@angular/core';
import {
  CheckboxRequiredValidator,
  NG_VALIDATORS,
} from '@angular/forms';

export const WTF2_CHECKBOX_REQUIRED_VALIDATOR: Provider = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => Wtf2CheckboxRequiredValidator),
  multi: true
};

/**
 * Validator for Material checkbox's required attribute in template-driven checkbox.
 * Current CheckboxRequiredValidator only work with `input type=checkbox` and does not
 * work with `wtf2-checkbox`.
 */
@Directive({
  selector: `wtf2-checkbox[required][formControlName],
             wtf2-checkbox[required][formControl], wtf2-checkbox[required][ngModel]`,
  providers: [WTF2_CHECKBOX_REQUIRED_VALIDATOR],
  host: {'[attr.required]': 'required ? "" : null'}
})
export class Wtf2CheckboxRequiredValidator extends CheckboxRequiredValidator {}
