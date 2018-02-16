/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Directive, Input} from '@angular/core';


let nextUniqueId = 0;


/** Single error message to be shown underneath the form field. */
@Directive({
  selector: 'wtf2-error',
  host: {
    'class': 'wtf2-error',
    'role': 'alert',
    '[attr.id]': 'id',
  }
})
export class Wtf2Error {
  @Input() id: string = `wtf2-error-${nextUniqueId++}`;
}
