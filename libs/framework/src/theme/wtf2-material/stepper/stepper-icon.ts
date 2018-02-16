/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Directive, Input, TemplateRef} from '@angular/core';
import {StepState} from '@angular/cdk/stepper';

/** Template context available to an attached `wtf2StepperIcon`. */
export interface Wtf2StepperIconContext {
  /** Index of the step. */
  index: number;
  /** Whether the step is currently active. */
  active: boolean;
  /** Whether the step is optional. */
  optional: boolean;
}

/**
 * Template to be used to override the icons inside the step header.
 */
@Directive({
  selector: 'ng-template[wtf2StepperIcon]',
})
export class Wtf2StepperIcon {
  /** Name of the icon to be overridden. */
  @Input('wtf2StepperIcon') name: StepState;

  constructor(public templateRef: TemplateRef<Wtf2StepperIconContext>) {}
}
