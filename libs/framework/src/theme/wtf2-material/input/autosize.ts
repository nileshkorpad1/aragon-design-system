/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {Directive, Input} from '@angular/core';

/**
 * Directive to autowtf2ically resize a textarea to fit its content.
 * @deprecated Use `cdkTextareaAutosize` from `@angular/cdk/text-field` instead.
 * @breaking-change 8.0.0
 */
@Directive({
  selector: 'textarea[wtf2-autosize], textarea[wtf2TextareaAutosize]',
  exportAs: 'wtf2TextareaAutosize',
  inputs: ['cdkAutosizeMinRows', 'cdkAutosizeMaxRows'],
  host: {
    'class': 'cdk-textarea-autosize wtf2-autosize',
    // Textarea elements that have the directive applied should have a single row by default.
    // Browsers normally show two rows by default and therefore this limits the minRows binding.
    'rows': '1',
    '(input)': '_noopInputHandler()',
  },
})
export class Wtf2TextareaAutosize extends CdkTextareaAutosize {
  @Input()
  get wtf2AutosizeMinRows(): number { return this.minRows; }
  set wtf2AutosizeMinRows(value: number) { this.minRows = value; }

  @Input()
  get wtf2AutosizeMaxRows(): number { return this.maxRows; }
  set wtf2AutosizeMaxRows(value: number) { this.maxRows = value; }

  @Input('wtf2-autosize')
  get wtf2Autosize(): boolean { return this.enabled; }
  set wtf2Autosize(value: boolean) { this.enabled = value; }

  @Input()
  get wtf2TextareaAutosize(): boolean { return this.enabled; }
  set wtf2TextareaAutosize(value: boolean) { this.enabled = value; }
}
