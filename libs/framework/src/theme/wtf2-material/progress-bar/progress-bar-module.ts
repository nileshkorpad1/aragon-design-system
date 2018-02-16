/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Wtf2CommonModule} from '../core';
import {Wtf2ProgressBar} from './progress-bar';


@NgModule({
  imports: [CommonModule, Wtf2CommonModule],
  exports: [Wtf2ProgressBar, Wtf2CommonModule],
  declarations: [Wtf2ProgressBar],
})
export class Wtf2ProgressBarModule {}
