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
import {Wtf2ProgressSpinner, Wtf2Spinner} from './progress-spinner';


@NgModule({
  imports: [Wtf2CommonModule, CommonModule],
  exports: [
    Wtf2ProgressSpinner,
    Wtf2Spinner,
    Wtf2CommonModule
  ],
  declarations: [
    Wtf2ProgressSpinner,
    Wtf2Spinner
  ],
})
class Wtf2ProgressSpinnerModule {}

export {Wtf2ProgressSpinnerModule};
