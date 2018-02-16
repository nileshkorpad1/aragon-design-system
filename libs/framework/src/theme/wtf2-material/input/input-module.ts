/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {TextFieldModule} from '@angular/cdk/text-field';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ErrorStateMatcher} from '../core';
import {Wtf2FormFieldModule} from '../form-field';
import {Wtf2TextareaAutosize} from './autosize';
import {Wtf2Input} from './input';


@NgModule({
  declarations: [Wtf2Input, Wtf2TextareaAutosize],
  imports: [
    CommonModule,
    TextFieldModule,
    Wtf2FormFieldModule,
  ],
  exports: [
    TextFieldModule,
    // We re-export the `Wtf2FormFieldModule` since `Wtf2Input` will almost always
    // be used together with `Wtf2FormField`.
    Wtf2FormFieldModule,
    Wtf2Input,
    Wtf2TextareaAutosize,
  ],
  providers: [ErrorStateMatcher],
})
export class Wtf2InputModule {}
