/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Directionality} from '@angular/cdk/bidi';
import {
  CdkStep,
  CdkStepper,
  StepContentPositionState,
  STEPPER_GLOBAL_OPTIONS,
  StepperOptions
} from '@angular/cdk/stepper';
import {AnimationEvent} from '@angular/animations';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  Optional,
  Output,
  QueryList,
  SkipSelf,
  TemplateRef,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {DOCUMENT} from '@angular/common';
import {ErrorStateMatcher} from '../core';
import {Subject} from 'rxjs';
import {takeUntil, distinctUntilChanged} from 'rxjs/operators';

import {Wtf2StepHeader} from './step-header';
import {Wtf2StepLabel} from './step-label';
import {wtf2StepperAnimations} from './stepper-animations';
import {Wtf2StepperIcon, Wtf2StepperIconContext} from './stepper-icon';

@Component({
  moduleId: module.id,
  selector: 'wtf2-step',
  templateUrl: 'step.html',
  providers: [{provide: ErrorStateMatcher, useExisting: Wtf2Step}],
  encapsulation: ViewEncapsulation.None,
  exportAs: 'wtf2Step',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Wtf2Step extends CdkStep implements ErrorStateMatcher {
  /** Content for step label given by `<ng-template wtf2StepLabel>`. */
  @ContentChild(Wtf2StepLabel, {static: false}) stepLabel: Wtf2StepLabel;

  /** @breaking-change 8.0.0 remove the `?` after `stepperOptions` */
  constructor(@Inject(forwardRef(() => Wtf2Stepper)) stepper: Wtf2Stepper,
              @SkipSelf() private _errorStateMatcher: ErrorStateMatcher,
              @Optional() @Inject(STEPPER_GLOBAL_OPTIONS) stepperOptions?: StepperOptions) {
    super(stepper, stepperOptions);
  }

  /** Custom error state matcher that additionally checks for validity of interacted form. */
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const originalErrorState = this._errorStateMatcher.isErrorState(control, form);

    // Custom error state checks for the validity of form that is not submitted or touched
    // since user can trigger a form change by calling for another step without directly
    // interacting with the current form.
    const customErrorState = !!(control && control.invalid && this.interacted);

    return originalErrorState || customErrorState;
  }
}


@Directive({selector: '[wtf2Stepper]', providers: [{provide: CdkStepper, useExisting: Wtf2Stepper}]})
export class Wtf2Stepper extends CdkStepper implements AfterContentInit {
  /** The list of step headers of the steps in the stepper. */
  @ViewChildren(Wtf2StepHeader) _stepHeader: QueryList<Wtf2StepHeader>;

  /** Steps that the stepper holds. */
  @ContentChildren(Wtf2Step) _steps: QueryList<Wtf2Step>;

  /** Custom icon overrides passed in by the consumer. */
  @ContentChildren(Wtf2StepperIcon) _icons: QueryList<Wtf2StepperIcon>;

  /** Event emitted when the current step is done transitioning in. */
  @Output() readonly animationDone: EventEmitter<void> = new EventEmitter<void>();

  /** Whether ripples should be disabled for the step headers. */
  @Input() disableRipple: boolean;

  /** Consumer-specified template-refs to be used to override the header icons. */
  _iconOverrides: {[key: string]: TemplateRef<Wtf2StepperIconContext>} = {};

  /** Stream of animation `done` events when the body expands/collapses. */
  _animationDone = new Subject<AnimationEvent>();

  ngAfterContentInit() {
    this._icons.forEach(({name, templateRef}) => this._iconOverrides[name] = templateRef);

    // Mark the component for change detection whenever the content children query changes
    this._steps.changes.pipe(takeUntil(this._destroyed)).subscribe(() => this._stateChanged());

    this._animationDone.pipe(
      // This needs a `distinctUntilChanged` in order to avoid emitting the same event twice due
      // to a bug in animations where the `.done` callback gets invoked twice on some browsers.
      // See https://github.com/angular/angular/issues/24084
      distinctUntilChanged((x, y) => x.fromState === y.fromState && x.toState === y.toState),
      takeUntil(this._destroyed)
    ).subscribe(event => {
      if ((event.toState as StepContentPositionState) === 'current') {
        this.animationDone.emit();
      }
    });
  }
}

@Component({
  moduleId: module.id,
  selector: 'wtf2-horizontal-stepper',
  exportAs: 'wtf2HorizontalStepper',
  templateUrl: 'stepper-horizontal.html',
  styleUrls: ['stepper.scss'],
  inputs: ['selectedIndex'],
  host: {
    'class': 'wtf2-stepper-horizontal',
    '[class.wtf2-stepper-label-position-end]': 'labelPosition == "end"',
    '[class.wtf2-stepper-label-position-bottom]': 'labelPosition == "bottom"',
    'aria-orientation': 'horizontal',
    'role': 'tablist',
  },
  animations: [wtf2StepperAnimations.horizontalStepTransition],
  providers: [
    {provide: Wtf2Stepper, useExisting: Wtf2HorizontalStepper},
    {provide: CdkStepper, useExisting: Wtf2HorizontalStepper}
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Wtf2HorizontalStepper extends Wtf2Stepper {
  /** Whether the label should display in bottom or end position. */
  @Input()
  labelPosition: 'bottom' | 'end' = 'end';
}

@Component({
  moduleId: module.id,
  selector: 'wtf2-vertical-stepper',
  exportAs: 'wtf2VerticalStepper',
  templateUrl: 'stepper-vertical.html',
  styleUrls: ['stepper.scss'],
  inputs: ['selectedIndex'],
  host: {
    'class': 'wtf2-stepper-vertical',
    'aria-orientation': 'vertical',
    'role': 'tablist',
  },
  animations: [wtf2StepperAnimations.verticalStepTransition],
  providers: [
    {provide: Wtf2Stepper, useExisting: Wtf2VerticalStepper},
    {provide: CdkStepper, useExisting: Wtf2VerticalStepper}
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Wtf2VerticalStepper extends Wtf2Stepper {
  constructor(
    @Optional() dir: Directionality,
    changeDetectorRef: ChangeDetectorRef,
    // @breaking-change 8.0.0 `elementRef` and `_document` parameters to become required.
    elementRef?: ElementRef<HTMLElement>,
    @Inject(DOCUMENT) _document?: any) {
    super(dir, changeDetectorRef, elementRef, _document);
    this._orientation = 'vertical';
  }
}
