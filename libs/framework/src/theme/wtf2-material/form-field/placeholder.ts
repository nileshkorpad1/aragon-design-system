/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Directive} from '@angular/core';


/**
 * The placeholder text for an `Wtf2FormField`.
 * @deprecated Use `<wtf2-label>` to specify the label and the `placeholder` attribute to specify the
 *     placeholder.
 * @breaking-change 8.0.0
 */
@Directive({
  selector: 'wtf2-placeholder'
})
export class Wtf2Placeholder {}
