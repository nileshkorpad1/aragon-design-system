/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Injectable, Optional, SkipSelf} from '@angular/core';
import {Subject} from 'rxjs';


/** Stepper data that is required for internationalization. */
@Injectable({providedIn: 'root'})
export class Wtf2StepperIntl {
  /**
   * Stream that emits whenever the labels here are changed. Use this to notify
   * components if the labels have changed after initialization.
   */
  readonly changes: Subject<void> = new Subject<void>();

  /** Label that is rendered below optional steps. */
  optionalLabel: string = 'Optional';
}


/** @docs-private */
export function WTF2_STEPPER_INTL_PROVIDER_FACTORY(parentIntl: Wtf2StepperIntl) {
  return parentIntl || new Wtf2StepperIntl();
}

/** @docs-private */
export const WTF2_STEPPER_INTL_PROVIDER = {
  provide: Wtf2StepperIntl,
  deps: [[new Optional(), new SkipSelf(), Wtf2StepperIntl]],
  useFactory: WTF2_STEPPER_INTL_PROVIDER_FACTORY
};
