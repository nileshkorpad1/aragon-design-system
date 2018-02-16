/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ObserversModule} from '@angular/cdk/observers';
import {Wtf2Error} from './error';
import {Wtf2FormField} from './form-field';
import {Wtf2Hint} from './hint';
import {Wtf2Label} from './label';
import {Wtf2Placeholder} from './placeholder';
import {Wtf2Prefix} from './prefix';
import {Wtf2Suffix} from './suffix';


@NgModule({
  declarations: [
    Wtf2Error,
    Wtf2FormField,
    Wtf2Hint,
    Wtf2Label,
    Wtf2Placeholder,
    Wtf2Prefix,
    Wtf2Suffix,
  ],
  imports: [
    CommonModule,
    ObserversModule,
  ],
  exports: [
    Wtf2Error,
    Wtf2FormField,
    Wtf2Hint,
    Wtf2Label,
    Wtf2Placeholder,
    Wtf2Prefix,
    Wtf2Suffix,
  ],
})
export class Wtf2FormFieldModule {}
