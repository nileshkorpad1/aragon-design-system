/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {PortalModule} from '@angular/cdk/portal';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {Wtf2ButtonModule} from '../button';
import {ErrorStateMatcher, Wtf2CommonModule, Wtf2RippleModule} from '../core';
import {Wtf2IconModule} from '../icon';
import {Wtf2StepHeader} from './step-header';
import {Wtf2StepLabel} from './step-label';
import {Wtf2HorizontalStepper, Wtf2Step, Wtf2Stepper, Wtf2VerticalStepper} from './stepper';
import {Wtf2StepperNext, Wtf2StepperPrevious} from './stepper-button';
import {Wtf2StepperIcon} from './stepper-icon';
import {WTF2_STEPPER_INTL_PROVIDER} from './stepper-intl';


@NgModule({
  imports: [
    Wtf2CommonModule,
    CommonModule,
    PortalModule,
    Wtf2ButtonModule,
    CdkStepperModule,
    Wtf2IconModule,
    Wtf2RippleModule,
  ],
  exports: [
    Wtf2CommonModule,
    Wtf2HorizontalStepper,
    Wtf2VerticalStepper,
    Wtf2Step,
    Wtf2StepLabel,
    Wtf2Stepper,
    Wtf2StepperNext,
    Wtf2StepperPrevious,
    Wtf2StepHeader,
    Wtf2StepperIcon,
  ],
  declarations: [
    Wtf2HorizontalStepper,
    Wtf2VerticalStepper,
    Wtf2Step,
    Wtf2StepLabel,
    Wtf2Stepper,
    Wtf2StepperNext,
    Wtf2StepperPrevious,
    Wtf2StepHeader,
    Wtf2StepperIcon,
  ],
  providers: [WTF2_STEPPER_INTL_PROVIDER, ErrorStateMatcher],
})
export class Wtf2StepperModule {}
