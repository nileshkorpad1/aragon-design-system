/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Directive} from '@angular/core';
import {CdkStepLabel} from '@angular/cdk/stepper';

@Directive({
  selector: '[wtf2StepLabel]',
})
export class Wtf2StepLabel extends CdkStepLabel {}
