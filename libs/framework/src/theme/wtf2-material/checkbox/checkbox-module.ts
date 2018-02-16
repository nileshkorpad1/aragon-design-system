/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {ObserversModule} from '@angular/cdk/observers';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {Wtf2CommonModule, Wtf2RippleModule} from '../core';
import {Wtf2Checkbox} from './checkbox';
import {Wtf2CheckboxRequiredValidator} from './checkbox-required-validator';

/** This module is used by both original and MDC-based checkbox implementations. */
@NgModule({
  exports: [Wtf2CheckboxRequiredValidator],
  declarations: [Wtf2CheckboxRequiredValidator],
})
// tslint:disable-next-line:class-name
export class _Wtf2CheckboxRequiredValidatorModule {
}

@NgModule({
  imports: [
    CommonModule, Wtf2RippleModule, Wtf2CommonModule, ObserversModule,
    _Wtf2CheckboxRequiredValidatorModule
  ],
  exports: [Wtf2Checkbox, Wtf2CommonModule, _Wtf2CheckboxRequiredValidatorModule],
  declarations: [Wtf2Checkbox],
})
export class Wtf2CheckboxModule {
}
