/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {FocusMonitor} from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewEncapsulation,
  TemplateRef,
} from '@angular/core';
import {Subscription} from 'rxjs';
import {Wtf2StepLabel} from './step-label';
import {Wtf2StepperIntl} from './stepper-intl';
import {Wtf2StepperIconContext} from './stepper-icon';
import {CdkStepHeader, StepState} from '@angular/cdk/stepper';


@Component({
  moduleId: module.id,
  selector: 'wtf2-step-header',
  templateUrl: 'step-header.html',
  styleUrls: ['step-header.scss'],
  host: {
    'class': 'wtf2-step-header',
    'role': 'tab',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Wtf2StepHeader extends CdkStepHeader implements OnDestroy {
  private _intlSubscription: Subscription;

  /** State of the given step. */
  @Input() state: StepState;

  /** Label of the given step. */
  @Input() label: Wtf2StepLabel | string;

  /** Error message to display when there's an error. */
  @Input() errorMessage: string;

  /** Overrides for the header icons, passed in via the stepper. */
  @Input() iconOverrides: {[key: string]: TemplateRef<Wtf2StepperIconContext>};

  /** Index of the given step. */
  @Input() index: number;

  /** Whether the given step is selected. */
  @Input() selected: boolean;

  /** Whether the given step label is active. */
  @Input() active: boolean;

  /** Whether the given step is optional. */
  @Input() optional: boolean;

  /** Whether the ripple should be disabled. */
  @Input() disableRipple: boolean;

  constructor(
    public _intl: Wtf2StepperIntl,
    private _focusMonitor: FocusMonitor,
    _elementRef: ElementRef<HTMLElement>,
    changeDetectorRef: ChangeDetectorRef) {
    super(_elementRef);
    _focusMonitor.monitor(_elementRef, true);
    this._intlSubscription = _intl.changes.subscribe(() => changeDetectorRef.markForCheck());
  }

  ngOnDestroy() {
    this._intlSubscription.unsubscribe();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  /** Focuses the step header. */
  focus() {
    this._focusMonitor.focusVia(this._elementRef, 'program');
  }

  /** Returns string label of given step if it is a text label. */
  _stringLabel(): string | null {
    return this.label instanceof Wtf2StepLabel ? null : this.label;
  }

  /** Returns Wtf2StepLabel if the label of given step is a template label. */
  _templateLabel(): Wtf2StepLabel | null {
    return this.label instanceof Wtf2StepLabel ? this.label : null;
  }

  /** Returns the host HTML element. */
  _getHostElement() {
    return this._elementRef.nativeElement;
  }

  /** Template context variables that are exposed to the `wtf2StepperIcon` instances. */
  _getIconContext(): Wtf2StepperIconContext {
    return {
      index: this.index,
      active: this.active,
      optional: this.optional
    };
  }

  _getDefaultTextForState(state: StepState): string {
    if (state == 'number') {
      return `${this.index + 1}`;
    }
    if (state == 'edit') {
      return 'create';
    }
    if (state == 'error') {
      return 'warning';
    }
    return state;
  }
}
