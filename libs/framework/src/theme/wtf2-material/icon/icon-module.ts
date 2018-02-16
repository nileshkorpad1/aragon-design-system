/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {NgModule} from '@angular/core';
import {Wtf2CommonModule} from '../core';
import {Wtf2Icon} from './icon';


@NgModule({
  imports: [Wtf2CommonModule],
  exports: [Wtf2Icon, Wtf2CommonModule],
  declarations: [Wtf2Icon],
})
export class Wtf2IconModule {}
