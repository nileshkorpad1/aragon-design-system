/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {NgModule} from '@angular/core';
import {Wtf2CommonModule} from '../core';
import {A11yModule} from '@angular/cdk/a11y';
import {Wtf2Badge} from './badge';


@NgModule({
  imports: [
    A11yModule,
    Wtf2CommonModule
  ],
  exports: [Wtf2Badge],
  declarations: [Wtf2Badge],
})
export class Wtf2BadgeModule {}
