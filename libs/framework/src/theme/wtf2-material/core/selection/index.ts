/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {NgModule} from '@angular/core';
import {Wtf2PseudoCheckbox} from './pseudo-checkbox/pseudo-checkbox';


@NgModule({
  exports: [Wtf2PseudoCheckbox],
  declarations: [Wtf2PseudoCheckbox]
})
export class Wtf2PseudoCheckboxModule { }


export * from './pseudo-checkbox/pseudo-checkbox';
