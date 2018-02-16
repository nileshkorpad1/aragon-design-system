import {Direction, Directionality} from '@angular/cdk/bidi';
import {
  DOWN_ARROW,
  END,
  ENTER,
  HOME,
  LEFT_ARROW,
  RIGHT_ARROW,
  SPACE,
  UP_ARROW,
} from '@angular/cdk/keycodes';
import {
  StepperOrientation,
  STEPPER_GLOBAL_OPTIONS,
  STEP_STATE,
  CdkStep
} from '@angular/cdk/stepper';
import {dispatchKeyboardEvent, createKeyboardEvent, dispatchEvent} from '@angular/cdk/testing';
import {Component, DebugElement, EventEmitter, OnInit, Type, Provider} from '@angular/core';
import {ComponentFixture, fakeAsync, flush, inject, TestBed} from '@angular/core/testing';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
  FormBuilder
} from '@angular/forms';
import {Wtf2Ripple} from '../core';
import {By} from '@angular/platform-browser';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Observable, Subject} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {Wtf2StepHeader, Wtf2StepperModule} from './index';
import {Wtf2HorizontalStepper, Wtf2Step, Wtf2Stepper, Wtf2VerticalStepper} from './stepper';
import {Wtf2StepperNext, Wtf2StepperPrevious} from './stepper-button';
import {Wtf2StepperIntl} from './stepper-intl';
import {Wtf2FormFieldModule} from '../form-field';
import {Wtf2InputModule} from '../input/input-module';


const VALID_REGEX = /valid/;
let dir: {value: Direction, change: EventEmitter<Direction>};

describe('Wtf2Stepper', () => {
  beforeEach(() => {
    dir = {
      value: 'ltr',
      change: new EventEmitter()
    };
  });

  describe('basic stepper', () => {
    let fixture: ComponentFixture<SimpleWtf2VerticalStepperApp>;

    beforeEach(() => {
      fixture = createComponent(SimpleWtf2VerticalStepperApp);
      fixture.detectChanges();
    });

    it('should default to the first step', () => {
      let stepperComponent = fixture.debugElement
          .query(By.css('wtf2-vertical-stepper')).componentInstance;
      expect(stepperComponent.selectedIndex).toBe(0);
    });

    it('should throw when a negative `selectedIndex` is assigned', () => {
      const stepperComponent: Wtf2VerticalStepper = fixture.debugElement
          .query(By.css('wtf2-vertical-stepper')).componentInstance;

      expect(() => {
        stepperComponent.selectedIndex = -10;
        fixture.detectChanges();
      }).toThrowError(/Cannot assign out-of-bounds/);
    });

    it('should throw when an out-of-bounds `selectedIndex` is assigned', () => {
      const stepperComponent: Wtf2VerticalStepper = fixture.debugElement
          .query(By.css('wtf2-vertical-stepper')).componentInstance;

      expect(() => {
        stepperComponent.selectedIndex = 1337;
        fixture.detectChanges();
      }).toThrowError(/Cannot assign out-of-bounds/);
    });

    it('should change selected index on header click', () => {
      let stepHeaders = fixture.debugElement.queryAll(By.css('.wtf2-vertical-stepper-header'));
      let stepperComponent = fixture.debugElement.query(By.directive(Wtf2Stepper)).componentInstance;

      expect(stepperComponent.selectedIndex).toBe(0);
      expect(stepperComponent.selected instanceof Wtf2Step).toBe(true);

      // select the second step
      let stepHeaderEl = stepHeaders[1].nativeElement;
      stepHeaderEl.click();
      fixture.detectChanges();

      expect(stepperComponent.selectedIndex).toBe(1);
      expect(stepperComponent.selected instanceof Wtf2Step).toBe(true);

      // select the third step
      stepHeaderEl = stepHeaders[2].nativeElement;
      stepHeaderEl.click();
      fixture.detectChanges();

      expect(stepperComponent.selectedIndex).toBe(2);
      expect(stepperComponent.selected instanceof Wtf2Step).toBe(true);
    });

    it('should set the "tablist" role on stepper', () => {
      let stepperEl = fixture.debugElement.query(By.css('wtf2-vertical-stepper')).nativeElement;
      expect(stepperEl.getAttribute('role')).toBe('tablist');
    });

    it('should set aria-expanded of content correctly', () => {
      let stepContents = fixture.debugElement.queryAll(By.css(`.wtf2-vertical-stepper-content`));
      let stepperComponent = fixture.debugElement.query(By.directive(Wtf2Stepper)).componentInstance;
      let firstStepContentEl = stepContents[0].nativeElement;
      expect(firstStepContentEl.getAttribute('aria-expanded')).toBe('true');

      stepperComponent.selectedIndex = 1;
      fixture.detectChanges();

      expect(firstStepContentEl.getAttribute('aria-expanded')).toBe('false');
      let secondStepContentEl = stepContents[1].nativeElement;
      expect(secondStepContentEl.getAttribute('aria-expanded')).toBe('true');
    });

    it('should display the correct label', () => {
      let stepperComponent = fixture.debugElement.query(By.directive(Wtf2Stepper)).componentInstance;
      let selectedLabel = fixture.nativeElement.querySelector('[aria-selected="true"]');
      expect(selectedLabel.textContent).toMatch('Step 1');

      stepperComponent.selectedIndex = 2;
      fixture.detectChanges();

      selectedLabel = fixture.nativeElement.querySelector('[aria-selected="true"]');
      expect(selectedLabel.textContent).toMatch('Step 3');

      fixture.componentInstance.inputLabel = 'New Label';
      fixture.detectChanges();

      selectedLabel = fixture.nativeElement.querySelector('[aria-selected="true"]');
      expect(selectedLabel.textContent).toMatch('New Label');
    });

    it('should go to next available step when the next button is clicked', () => {
      let stepperComponent = fixture.debugElement.query(By.directive(Wtf2Stepper)).componentInstance;

      expect(stepperComponent.selectedIndex).toBe(0);

      let nextButtonNativeEl = fixture.debugElement
          .queryAll(By.directive(Wtf2StepperNext))[0].nativeElement;
      nextButtonNativeEl.click();
      fixture.detectChanges();

      expect(stepperComponent.selectedIndex).toBe(1);

      nextButtonNativeEl = fixture.debugElement
          .queryAll(By.directive(Wtf2StepperNext))[1].nativeElement;
      nextButtonNativeEl.click();
      fixture.detectChanges();

      expect(stepperComponent.selectedIndex).toBe(2);

      nextButtonNativeEl = fixture.debugElement
          .queryAll(By.directive(Wtf2StepperNext))[2].nativeElement;
      nextButtonNativeEl.click();
      fixture.detectChanges();

      expect(stepperComponent.selectedIndex).toBe(2);
    });

    it('should set the next stepper button type to "submit"', () => {
      const button = fixture.debugElement.query(By.directive(Wtf2StepperNext)).nativeElement;
      expect(button.type).toBe('submit', `Expected the button to have "submit" set as type.`);
    });

    it('should go to previous available step when the previous button is clicked', () => {
      let stepperComponent = fixture.debugElement.query(By.directive(Wtf2Stepper)).componentInstance;

      expect(stepperComponent.selectedIndex).toBe(0);

      stepperComponent.selectedIndex = 2;
      let previousButtonNativeEl = fixture.debugElement
          .queryAll(By.directive(Wtf2StepperPrevious))[2].nativeElement;
      previousButtonNativeEl.click();
      fixture.detectChanges();

      expect(stepperComponent.selectedIndex).toBe(1);

      previousButtonNativeEl = fixture.debugElement
          .queryAll(By.directive(Wtf2StepperPrevious))[1].nativeElement;
      previousButtonNativeEl.click();
      fixture.detectChanges();

      expect(stepperComponent.selectedIndex).toBe(0);

      previousButtonNativeEl = fixture.debugElement
          .queryAll(By.directive(Wtf2StepperPrevious))[0].nativeElement;
      previousButtonNativeEl.click();
      fixture.detectChanges();

      expect(stepperComponent.selectedIndex).toBe(0);
    });

    it('should set the previous stepper button type to "button"', () => {
      const button = fixture.debugElement.query(By.directive(Wtf2StepperPrevious)).nativeElement;
      expect(button.type).toBe('button', `Expected the button to have "button" set as type.`);
    });

    it('should set the correct step position for animation', () => {
      let stepperComponent = fixture.debugElement.query(By.directive(Wtf2Stepper)).componentInstance;

      expect(stepperComponent._getAnimationDirection(0)).toBe('current');
      expect(stepperComponent._getAnimationDirection(1)).toBe('next');
      expect(stepperComponent._getAnimationDirection(2)).toBe('next');

      stepperComponent.selectedIndex = 1;
      fixture.detectChanges();

      expect(stepperComponent._getAnimationDirection(0)).toBe('previous');
      expect(stepperComponent._getAnimationDirection(2)).toBe('next');
      expect(stepperComponent._getAnimationDirection(1)).toBe('current');

      stepperComponent.selectedIndex = 2;
      fixture.detectChanges();

      expect(stepperComponent._getAnimationDirection(0)).toBe('previous');
      expect(stepperComponent._getAnimationDirection(1)).toBe('previous');
      expect(stepperComponent._getAnimationDirection(2)).toBe('current');
    });

    it('should not set focus on header of selected step if header is not clicked', () => {
      let stepperComponent = fixture.debugElement.query(By.directive(Wtf2Stepper)).componentInstance;
      let stepHeaderEl = fixture.debugElement.queryAll(By.css('wtf2-step-header'))[1].nativeElement;
      let nextButtonNativeEl = fixture.debugElement
          .queryAll(By.directive(Wtf2StepperNext))[0].nativeElement;
      spyOn(stepHeaderEl, 'focus');
      nextButtonNativeEl.click();
      fixture.detectChanges();

      expect(stepperComponent.selectedIndex).toBe(1);
      expect(stepHeaderEl.focus).not.toHaveBeenCalled();
    });

    it('should focus next step header if focus is inside the stepper', () => {
      let stepperComponent = fixture.debugElement.query(By.directive(Wtf2Stepper)).componentInstance;
      let stepHeaderEl = fixture.debugElement.queryAll(By.css('wtf2-step-header'))[1].nativeElement;
      let nextButtonNativeEl = fixture.debugElement
          .queryAll(By.directive(Wtf2StepperNext))[0].nativeElement;
      spyOn(stepHeaderEl, 'focus');
      nextButtonNativeEl.focus();
      nextButtonNativeEl.click();
      fixture.detectChanges();

      expect(stepperComponent.selectedIndex).toBe(1);
      expect(stepHeaderEl.focus).toHaveBeenCalled();
    });

    it('should only be able to return to a previous step if it is editable', () => {
      let stepperComponent = fixture.debugElement.query(By.directive(Wtf2Stepper)).componentInstance;

      stepperComponent.selectedIndex = 1;
      stepperComponent.steps.toArray()[0].editable = false;
      let previousButtonNativeEl = fixture.debugElement
          .queryAll(By.directive(Wtf2StepperPrevious))[1].nativeElement;
      previousButtonNativeEl.click();
      fixture.detectChanges();

      expect(stepperComponent.selectedIndex).toBe(1);

      stepperComponent.steps.toArray()[0].editable = true;
      previousButtonNativeEl.click();
      fixture.detectChanges();

      expect(stepperComponent.selectedIndex).toBe(0);
    });

    it('should set create icon if step is editable and completed', () => {
      let stepperComponent = fixture.debugElement.query(By.directive(Wtf2Stepper)).componentInstance;
      let nextButtonNativeEl = fixture.debugElement
          .queryAll(By.directive(Wtf2StepperNext))[0].nativeElement;
      expect(stepperComponent._getIndicatorType(0)).toBe('number');
      stepperComponent.steps.toArray()[0].editable = true;
      nextButtonNativeEl.click();
      fixture.detectChanges();

      expect(stepperComponent._getIndicatorType(0)).toBe('edit');
    });

    it('should set done icon if step is not editable and is completed', () => {
      let stepperComponent = fixture.debugElement.query(By.directive(Wtf2Stepper)).componentInstance;
      let nextButtonNativeEl = fixture.debugElement
          .queryAll(By.directive(Wtf2StepperNext))[0].nativeElement;
      expect(stepperComponent._getIndicatorType(0)).toBe('number');
      stepperComponent.steps.toArray()[0].editable = false;
      nextButtonNativeEl.click();
      fixture.detectChanges();

      expect(stepperComponent._getIndicatorType(0)).toBe('done');
    });

    it('should emit an event when the enter animation is done', fakeAsync(() => {
      let stepper = fixture.debugElement.query(By.directive(Wtf2Stepper)).componentInstance;
      let selectionChangeSpy = jasmine.createSpy('selectionChange spy');
      let animationDoneSpy = jasmine.createSpy('animationDone spy');
      let selectionChangeSubscription = stepper.selectionChange.subscribe(selectionChangeSpy);
      let animationDoneSubscription = stepper.animationDone.subscribe(animationDoneSpy);

      stepper.selectedIndex = 1;
      fixture.detectChanges();

      expect(selectionChangeSpy).toHaveBeenCalledTimes(1);
      expect(animationDoneSpy).not.toHaveBeenCalled();

      flush();

      expect(selectionChangeSpy).toHaveBeenCalledTimes(1);
      expect(animationDoneSpy).toHaveBeenCalledTimes(1);

      selectionChangeSubscription.unsubscribe();
      animationDoneSubscription.unsubscribe();
    }));

    it('should set the correct aria-posinset and aria-setsize', () => {
      const headers =
          Array.from<HTMLElement>(fixture.nativeElement.querySelectorAll('.wtf2-step-header'));

      expect(headers.map(header => header.getAttribute('aria-posinset'))).toEqual(['1', '2', '3']);
      expect(headers.every(header => header.getAttribute('aria-setsize') === '3')).toBe(true);
    });

    it('should adjust the index when removing a step before the current one', () => {
      const stepperComponent: Wtf2VerticalStepper = fixture.debugElement
          .query(By.css('wtf2-vertical-stepper')).componentInstance;

      stepperComponent.selectedIndex = 2;
      fixture.detectChanges();

      // Re-assert since the setter has some extra logic.
      expect(stepperComponent.selectedIndex).toBe(2);

      expect(() => {
        fixture.componentInstance.showStepTwo = false;
        fixture.detectChanges();
      }).not.toThrow();

      expect(stepperComponent.selectedIndex).toBe(1);
    });

    it('should not do anything when pressing the ENTER key with a modifier', () => {
      const stepHeaders = fixture.debugElement.queryAll(By.css('.wtf2-vertical-stepper-header'));
      assertSelectKeyWithModifierInteraction(fixture, stepHeaders, 'vertical', ENTER);
    });

    it('should not do anything when pressing the SPACE key with a modifier', () => {
      const stepHeaders = fixture.debugElement.queryAll(By.css('.wtf2-vertical-stepper-header'));
      assertSelectKeyWithModifierInteraction(fixture, stepHeaders, 'vertical', SPACE);
    });

    it('should set the proper tabindex', () => {
      let stepContents = fixture.debugElement.queryAll(By.css(`.wtf2-vertical-stepper-content`));
      let stepperComponent = fixture.debugElement.query(By.directive(Wtf2Stepper)).componentInstance;
      let firstStepContentEl = stepContents[0].nativeElement;
      let secondStepContentEl = stepContents[1].nativeElement;

      expect(firstStepContentEl.getAttribute('tabindex')).toBe('0');
      expect(secondStepContentEl.getAttribute('tabindex')).toBeFalsy();

      stepperComponent.selectedIndex = 1;
      fixture.detectChanges();

      expect(firstStepContentEl.getAttribute('tabindex')).toBeFalsy();
      expect(secondStepContentEl.getAttribute('tabindex')).toBe('0');
    });

  });

  describe('basic stepper when attempting to set the selected step too early', () => {
    it('should not throw', () => {
      const fixture = createComponent(SimpleWtf2VerticalStepperApp);
      const stepperComponent: Wtf2VerticalStepper = fixture.debugElement
          .query(By.css('wtf2-vertical-stepper')).componentInstance;

      expect(() => stepperComponent.selected).not.toThrow();
    });
  });

  describe('basic stepper when attempting to set the selected step too early', () => {
    it('should not throw', () => {
      const fixture = createComponent(SimpleWtf2VerticalStepperApp);
      const stepperComponent: Wtf2VerticalStepper = fixture.debugElement
          .query(By.css('wtf2-vertical-stepper')).componentInstance;

      expect(() => stepperComponent.selected = null!).not.toThrow();
      expect(stepperComponent.selectedIndex).toBe(-1);
    });
  });

  describe('basic stepper with i18n label change', () => {
    let i18nFixture: ComponentFixture<SimpleWtf2HorizontalStepperApp>;

    beforeEach(() => {
      i18nFixture = createComponent(SimpleWtf2HorizontalStepperApp);
      i18nFixture.detectChanges();
    });

    it('should re-render when the i18n labels change', inject([Wtf2StepperIntl],
      (intl: Wtf2StepperIntl) => {
        const header =
            i18nFixture.debugElement.queryAll(By.css('wtf2-step-header'))[2].nativeElement;
        const optionalLabel = header.querySelector('.wtf2-step-optional');

        expect(optionalLabel).toBeTruthy();
        expect(optionalLabel.textContent).toBe('Optional');

        intl.optionalLabel = 'Valgfri';
        intl.changes.next();
        i18nFixture.detectChanges();

        expect(optionalLabel.textContent).toBe('Valgfri');
    }));
  });

  describe('icon overrides', () => {
    let fixture: ComponentFixture<IconOverridesStepper>;

    beforeEach(() => {
      fixture = createComponent(IconOverridesStepper);
      fixture.detectChanges();
    });

    it('should allow for the `edit` icon to be overridden', () => {
      const stepperDebugElement = fixture.debugElement.query(By.directive(Wtf2Stepper));
      const stepperComponent: Wtf2Stepper = stepperDebugElement.componentInstance;

      stepperComponent.steps.toArray()[0].editable = true;
      stepperComponent.next();
      fixture.detectChanges();

      const header = stepperDebugElement.nativeElement.querySelector('wtf2-step-header');

      expect(header.textContent).toContain('Custom edit');
    });

    it('should allow for the `done` icon to be overridden', () => {
      const stepperDebugElement = fixture.debugElement.query(By.directive(Wtf2Stepper));
      const stepperComponent: Wtf2Stepper = stepperDebugElement.componentInstance;

      stepperComponent.steps.toArray()[0].editable = false;
      stepperComponent.next();
      fixture.detectChanges();

      const header = stepperDebugElement.nativeElement.querySelector('wtf2-step-header');

      expect(header.textContent).toContain('Custom done');
    });

    it('should allow for the `number` icon to be overridden with context', () => {
      const stepperDebugElement = fixture.debugElement.query(By.directive(Wtf2Stepper));
      const headers = stepperDebugElement.nativeElement.querySelectorAll('wtf2-step-header');

      expect(headers[2].textContent).toContain('III');
    });
  });

  describe('RTL', () => {
    let fixture: ComponentFixture<SimpleWtf2VerticalStepperApp>;

    beforeEach(() => {
      dir.value = 'rtl';
      fixture = createComponent(SimpleWtf2VerticalStepperApp);
      fixture.detectChanges();
    });

    it('should reverse animation in RTL mode', () => {
      let stepperComponent = fixture.debugElement.query(By.directive(Wtf2Stepper)).componentInstance;

      expect(stepperComponent._getAnimationDirection(0)).toBe('current');
      expect(stepperComponent._getAnimationDirection(1)).toBe('previous');
      expect(stepperComponent._getAnimationDirection(2)).toBe('previous');

      stepperComponent.selectedIndex = 1;
      fixture.detectChanges();

      expect(stepperComponent._getAnimationDirection(0)).toBe('next');
      expect(stepperComponent._getAnimationDirection(2)).toBe('previous');
      expect(stepperComponent._getAnimationDirection(1)).toBe('current');

      stepperComponent.selectedIndex = 2;
      fixture.detectChanges();

      expect(stepperComponent._getAnimationDirection(0)).toBe('next');
      expect(stepperComponent._getAnimationDirection(1)).toBe('next');
      expect(stepperComponent._getAnimationDirection(2)).toBe('current');
    });
  });

  describe('linear stepper', () => {
    let fixture: ComponentFixture<LinearWtf2VerticalStepperApp>;
    let testComponent: LinearWtf2VerticalStepperApp;
    let stepperComponent: Wtf2VerticalStepper;

    beforeEach(() => {
      fixture = createComponent(LinearWtf2VerticalStepperApp);
      fixture.detectChanges();

      testComponent = fixture.componentInstance;
      stepperComponent = fixture.debugElement
          .query(By.css('wtf2-vertical-stepper')).componentInstance;
    });

    it('should have true linear attribute', () => {
      expect(stepperComponent.linear).toBe(true);
    });

    it('should not move to next step if current step is invalid', () => {
      expect(testComponent.oneGroup.get('oneCtrl')!.value).toBe('');
      expect(testComponent.oneGroup.get('oneCtrl')!.valid).toBe(false);
      expect(testComponent.oneGroup.valid).toBe(false);
      expect(testComponent.oneGroup.invalid).toBe(true);
      expect(stepperComponent.selectedIndex).toBe(0);

      let stepHeaderEl = fixture.debugElement
          .queryAll(By.css('.wtf2-vertical-stepper-header'))[1].nativeElement;

      stepHeaderEl.click();
      fixture.detectChanges();

      expect(stepperComponent.selectedIndex).toBe(0);

      let nextButtonNativeEl = fixture.debugElement
          .queryAll(By.directive(Wtf2StepperNext))[0].nativeElement;
      nextButtonNativeEl.click();
      fixture.detectChanges();

      expect(stepperComponent.selectedIndex).toBe(0);

      testComponent.oneGroup.get('oneCtrl')!.setValue('answer');
      stepHeaderEl.click();
      fixture.detectChanges();

      expect(testComponent.oneGroup.valid).toBe(true);
      expect(stepperComponent.selectedIndex).toBe(1);
    });

    it('should not move to next step if current step is pending', () => {
      let stepHeaderEl = fixture.debugElement
          .queryAll(By.css('.wtf2-vertical-stepper-header'))[2].nativeElement;

      let nextButtonNativeEl = fixture.debugElement
          .queryAll(By.directive(Wtf2StepperNext))[1].nativeElement;

      testComponent.oneGroup.get('oneCtrl')!.setValue('input');
      testComponent.twoGroup.get('twoCtrl')!.setValue('input');
      stepperComponent.selectedIndex = 1;
      fixture.detectChanges();
      expect(stepperComponent.selectedIndex).toBe(1);

      // Step status = PENDING
      // Assert that linear stepper does not allow step selection change
      expect(testComponent.twoGroup.pending).toBe(true);

      stepHeaderEl.click();
      fixture.detectChanges();

      expect(stepperComponent.selectedIndex).toBe(1);

      nextButtonNativeEl.click();
      fixture.detectChanges();

      expect(stepperComponent.selectedIndex).toBe(1);

      // Trigger asynchronous validation
      testComponent.validationTrigger.next();
      // Asynchronous validation completed:
      // Step status = VALID
      expect(testComponent.twoGroup.pending).toBe(false);
      expect(testComponent.twoGroup.valid).toBe(true);

      stepHeaderEl.click();
      fixture.detectChanges();

      expect(stepperComponent.selectedIndex).toBe(2);

      stepperComponent.selectedIndex = 1;
      fixture.detectChanges();
      expect(stepperComponent.selectedIndex).toBe(1);

      nextButtonNativeEl.click();
      fixture.detectChanges();

      expect(stepperComponent.selectedIndex).toBe(2);
    });

    it('should be able to focus step header upon click if it is unable to be selected', () => {
      let stepHeaderEl = fixture.debugElement.queryAll(By.css('wtf2-step-header'))[1].nativeElement;

      fixture.detectChanges();

      expect(stepHeaderEl.getAttribute('tabindex')).toBe('-1');
    });

    it('should be able to move to next step even when invalid if current step is optional', () => {
      testComponent.oneGroup.get('oneCtrl')!.setValue('input');
      testComponent.twoGroup.get('twoCtrl')!.setValue('input');
      testComponent.validationTrigger.next();
      stepperComponent.selectedIndex = 1;
      fixture.detectChanges();
      stepperComponent.selectedIndex = 2;
      fixture.detectChanges();

      expect(stepperComponent.steps.toArray()[2].optional).toBe(true);
      expect(stepperComponent.selectedIndex).toBe(2);
      expect(testComponent.threeGroup.get('threeCtrl')!.valid).toBe(true);

      const nextButtonNativeEl = fixture.debugElement
          .queryAll(By.directive(Wtf2StepperNext))[2].nativeElement;
      nextButtonNativeEl.click();
      fixture.detectChanges();

      expect(stepperComponent.selectedIndex)
          .toBe(3, 'Expected selectedIndex to change when optional step input is empty.');

      stepperComponent.selectedIndex = 2;
      testComponent.threeGroup.get('threeCtrl')!.setValue('input');
      nextButtonNativeEl.click();
      fixture.detectChanges();

      expect(testComponent.threeGroup.get('threeCtrl')!.valid).toBe(false);
      expect(stepperComponent.selectedIndex)
          .toBe(3, 'Expected selectedIndex to change when optional step input is invalid.');
    });

    it('should be able to reset the stepper to its initial state', () => {
      const steps = stepperComponent.steps.toArray();

      testComponent.oneGroup.get('oneCtrl')!.setValue('value');
      fixture.detectChanges();

      stepperComponent.next();
      fixture.detectChanges();

      stepperComponent.next();
      fixture.detectChanges();

      expect(stepperComponent.selectedIndex).toBe(1);
      expect(steps[0].interacted).toBe(true);
      expect(steps[0].completed).toBe(true);
      expect(testComponent.oneGroup.get('oneCtrl')!.valid).toBe(true);
      expect(testComponent.oneGroup.get('oneCtrl')!.value).toBe('value');

      expect(steps[1].interacted).toBe(true);
      expect(steps[1].completed).toBe(false);
      expect(testComponent.twoGroup.get('twoCtrl')!.valid).toBe(false);

      stepperComponent.reset();
      fixture.detectChanges();

      expect(stepperComponent.selectedIndex).toBe(0);
      expect(steps[0].interacted).toBe(false);
      expect(steps[0].completed).toBe(false);
      expect(testComponent.oneGroup.get('oneCtrl')!.valid).toBe(false);
      expect(testComponent.oneGroup.get('oneCtrl')!.value).toBeFalsy();

      expect(steps[1].interacted).toBe(false);
      expect(steps[1].completed).toBe(false);
      expect(testComponent.twoGroup.get('twoCtrl')!.valid).toBe(false);
    });

    it('should reset back to the first step when some of the steps are not editable', () => {
      const steps = stepperComponent.steps.toArray();

      steps[0].editable = false;

      testComponent.oneGroup.get('oneCtrl')!.setValue('value');
      fixture.detectChanges();

      stepperComponent.next();
      fixture.detectChanges();

      expect(stepperComponent.selectedIndex).toBe(1);

      stepperComponent.reset();
      fixture.detectChanges();

      expect(stepperComponent.selectedIndex).toBe(0);
    });

    it('should not clobber the `complete` binding when resetting', () => {
      const steps: CdkStep[] = stepperComponent.steps.toArray();
      const fillOutStepper = () => {
        testComponent.oneGroup.get('oneCtrl')!.setValue('input');
        testComponent.twoGroup.get('twoCtrl')!.setValue('input');
        testComponent.threeGroup.get('threeCtrl')!.setValue('valid');
        testComponent.validationTrigger.next();
        stepperComponent.selectedIndex = 1;
        fixture.detectChanges();
        stepperComponent.selectedIndex = 2;
        fixture.detectChanges();
        stepperComponent.selectedIndex = 3;
        fixture.detectChanges();
      };

      fillOutStepper();

      expect(steps[2].completed)
          .toBe(true, 'Expected third step to be considered complete after the first run through.');

      stepperComponent.reset();
      fixture.detectChanges();
      fillOutStepper();

      expect(steps[2].completed).toBe(true,
          'Expected third step to be considered complete when doing a run after a reset.');
    });
  });

  describe('linear stepper with a pre-defined selectedIndex', () => {
    let preselectedFixture: ComponentFixture<SimplePreselectedWtf2HorizontalStepperApp>;
    let stepper: Wtf2HorizontalStepper;

    beforeEach(() => {
      preselectedFixture = createComponent(SimplePreselectedWtf2HorizontalStepperApp);
      preselectedFixture.detectChanges();
      stepper = preselectedFixture.debugElement
          .query(By.directive(Wtf2HorizontalStepper)).componentInstance;
    });

    it('should not throw', () => {
      expect(() => preselectedFixture.detectChanges()).not.toThrow();
    });

    it('selectedIndex should be typeof number', () => {
      expect(typeof stepper.selectedIndex).toBe('number');
    });

    it('value of selectedIndex should be the pre-defined value', () => {
      expect(stepper.selectedIndex).toBe(0);
    });
  });

  describe('linear stepper with no `stepControl`', () => {
    let noStepControlFixture: ComponentFixture<SimpleStepperWithoutStepControl>;
    beforeEach(() => {
      noStepControlFixture = createComponent(SimpleStepperWithoutStepControl);
      noStepControlFixture.detectChanges();
    });
    it('should not move to the next step if the current one is not completed ', () => {
      const stepper: Wtf2HorizontalStepper = noStepControlFixture.debugElement
          .query(By.directive(Wtf2HorizontalStepper)).componentInstance;

      const headers = noStepControlFixture.debugElement
          .queryAll(By.css('.wtf2-horizontal-stepper-header'));

      expect(stepper.selectedIndex).toBe(0);

      headers[1].nativeElement.click();
      noStepControlFixture.detectChanges();

      expect(stepper.selectedIndex).toBe(0);
    });
  });

  describe('linear stepper with `stepControl`', () => {
    let controlAndBindingFixture: ComponentFixture<SimpleStepperWithStepControlAndCompletedBinding>;
    beforeEach(() => {
      controlAndBindingFixture =
      createComponent(SimpleStepperWithStepControlAndCompletedBinding);
      controlAndBindingFixture.detectChanges();
    });

    it('should have the `stepControl` take precedence when `completed` is set', () => {
        expect(controlAndBindingFixture.componentInstance.steps[0].control.valid).toBe(true);
        expect(controlAndBindingFixture.componentInstance.steps[0].completed).toBe(false);

        const stepper: Wtf2HorizontalStepper = controlAndBindingFixture.debugElement
            .query(By.directive(Wtf2HorizontalStepper)).componentInstance;

        const headers = controlAndBindingFixture.debugElement
            .queryAll(By.css('.wtf2-horizontal-stepper-header'));

        expect(stepper.selectedIndex).toBe(0);

        headers[1].nativeElement.click();
        controlAndBindingFixture.detectChanges();

        expect(stepper.selectedIndex).toBe(1);
      });
  });

  describe('vertical stepper', () => {
    it('should set the aria-orientation to "vertical"', () => {
      let fixture = createComponent(SimpleWtf2VerticalStepperApp);
      fixture.detectChanges();

      let stepperEl = fixture.debugElement.query(By.css('wtf2-vertical-stepper')).nativeElement;
      expect(stepperEl.getAttribute('aria-orientation')).toBe('vertical');
    });

    it('should support using the left/right arrows to move focus', () => {
      let fixture = createComponent(SimpleWtf2VerticalStepperApp);
      fixture.detectChanges();

      let stepHeaders = fixture.debugElement.queryAll(By.css('.wtf2-vertical-stepper-header'));
      assertCorrectKeyboardInteraction(fixture, stepHeaders, 'horizontal');
    });

    it('should support using the up/down arrows to move focus', () => {
      let fixture = createComponent(SimpleWtf2VerticalStepperApp);
      fixture.detectChanges();

      let stepHeaders = fixture.debugElement.queryAll(By.css('.wtf2-vertical-stepper-header'));
      assertCorrectKeyboardInteraction(fixture, stepHeaders, 'vertical');
    });

    it('should reverse arrow key focus in RTL mode', () => {
      dir.value = 'rtl';
      let fixture = createComponent(SimpleWtf2VerticalStepperApp);
      fixture.detectChanges();

      let stepHeaders = fixture.debugElement.queryAll(By.css('.wtf2-vertical-stepper-header'));
      assertArrowKeyInteractionInRtl(fixture, stepHeaders);
    });

    it('should be able to disable ripples', () => {
      const fixture = createComponent(SimpleWtf2VerticalStepperApp);
      fixture.detectChanges();

      const stepHeaders = fixture.debugElement.queryAll(By.directive(Wtf2StepHeader));
      const headerRipples = stepHeaders.map(headerDebugEl =>
        headerDebugEl.query(By.directive(Wtf2Ripple)).injector.get(Wtf2Ripple));

      expect(headerRipples.every(ripple => ripple.disabled)).toBe(false);

      fixture.componentInstance.disableRipple = true;
      fixture.detectChanges();

      expect(headerRipples.every(ripple => ripple.disabled)).toBe(true);
    });
  });

  describe('horizontal stepper', () => {
    it('should set the aria-orientation to "horizontal"', () => {
      let fixture = createComponent(SimpleWtf2HorizontalStepperApp);
      fixture.detectChanges();

      let stepperEl = fixture.debugElement.query(By.css('wtf2-horizontal-stepper')).nativeElement;
      expect(stepperEl.getAttribute('aria-orientation')).toBe('horizontal');
    });

    it('should support using the left/right arrows to move focus', () => {
      let fixture = createComponent(SimpleWtf2HorizontalStepperApp);
      fixture.detectChanges();

      let stepHeaders = fixture.debugElement.queryAll(By.css('.wtf2-horizontal-stepper-header'));
      assertCorrectKeyboardInteraction(fixture, stepHeaders, 'horizontal');
    });

    it('should reverse arrow key focus in RTL mode', () => {
      dir.value = 'rtl';
      let fixture = createComponent(SimpleWtf2HorizontalStepperApp);
      fixture.detectChanges();

      let stepHeaders = fixture.debugElement.queryAll(By.css('.wtf2-horizontal-stepper-header'));
      assertArrowKeyInteractionInRtl(fixture, stepHeaders);
    });

    it('should reverse arrow key focus when switching into RTL after init', () => {
      let fixture = createComponent(SimpleWtf2HorizontalStepperApp);
      fixture.detectChanges();

      let stepHeaders = fixture.debugElement.queryAll(By.css('.wtf2-horizontal-stepper-header'));
      assertCorrectKeyboardInteraction(fixture, stepHeaders, 'horizontal');

      dir.value = 'rtl';
      dir.change.emit('rtl');
      fixture.detectChanges();

      assertArrowKeyInteractionInRtl(fixture, stepHeaders);
    });

    it('should be able to disable ripples', () => {
      const fixture = createComponent(SimpleWtf2HorizontalStepperApp);
      fixture.detectChanges();

      const stepHeaders = fixture.debugElement.queryAll(By.directive(Wtf2StepHeader));
      const headerRipples = stepHeaders.map(headerDebugEl =>
          headerDebugEl.query(By.directive(Wtf2Ripple)).injector.get(Wtf2Ripple));

      expect(headerRipples.every(ripple => ripple.disabled)).toBe(false);

      fixture.componentInstance.disableRipple = true;
      fixture.detectChanges();

      expect(headerRipples.every(ripple => ripple.disabled)).toBe(true);
    });
  });

  describe('linear stepper with valid step', () => {
    let fixture: ComponentFixture<LinearStepperWithValidOptionalStep>;
    let testComponent: LinearStepperWithValidOptionalStep;
    let stepper: Wtf2Stepper;

    beforeEach(() => {
      fixture = createComponent(LinearStepperWithValidOptionalStep);
      fixture.detectChanges();

      testComponent = fixture.componentInstance;
      stepper = fixture.debugElement
          .query(By.css('wtf2-horizontal-stepper')).componentInstance;
    });

    it('must be visited if not optional', () => {
      stepper.selectedIndex = 2;
      fixture.detectChanges();
      expect(stepper.selectedIndex).toBe(0);

      stepper.selectedIndex = 1;
      fixture.detectChanges();
      expect(stepper.selectedIndex).toBe(1);

      stepper.selectedIndex = 2;
      fixture.detectChanges();
      expect(stepper.selectedIndex).toBe(2);
    });

    it('can be skipped entirely if optional', () => {
      testComponent.step2Optional = true;
      fixture.detectChanges();
      stepper.selectedIndex = 2;
      fixture.detectChanges();
      expect(stepper.selectedIndex).toBe(2);
    });
  });

  describe('aria labelling', () => {
    let fixture: ComponentFixture<StepperWithAriaInputs>;
    let stepHeader: HTMLElement;

    beforeEach(() => {
      fixture = createComponent(StepperWithAriaInputs);
      fixture.detectChanges();
      stepHeader = fixture.nativeElement.querySelector('.wtf2-step-header');
    });

    it('should not set aria-label or aria-labelledby attributes if they are not passed in', () => {
      expect(stepHeader.hasAttribute('aria-label')).toBe(false);
      expect(stepHeader.hasAttribute('aria-labelledby')).toBe(false);
    });

    it('should set the aria-label attribute', () => {
      fixture.componentInstance.ariaLabel = 'First step';
      fixture.detectChanges();

      expect(stepHeader.getAttribute('aria-label')).toBe('First step');
    });

    it('should set the aria-labelledby attribute', () => {
      fixture.componentInstance.ariaLabelledby = 'first-step-label';
      fixture.detectChanges();

      expect(stepHeader.getAttribute('aria-labelledby')).toBe('first-step-label');
    });

    it('should not be able to set both an aria-label and aria-labelledby', () => {
      fixture.componentInstance.ariaLabel = 'First step';
      fixture.componentInstance.ariaLabelledby = 'first-step-label';
      fixture.detectChanges();

      expect(stepHeader.getAttribute('aria-label')).toBe('First step');
      expect(stepHeader.hasAttribute('aria-labelledby')).toBe(false);
    });

  });

  describe('stepper with error state', () => {
    let fixture: ComponentFixture<Wtf2HorizontalStepperWithErrorsApp>;
    let stepper: Wtf2Stepper;

    beforeEach(() => {
      fixture = createComponent(
        Wtf2HorizontalStepperWithErrorsApp,
        [{
          provide: STEPPER_GLOBAL_OPTIONS,
          useValue: {showError: true}
        }],
        [Wtf2FormFieldModule, Wtf2InputModule]
      );
      fixture.detectChanges();
      stepper = fixture.debugElement
          .query(By.css('wtf2-horizontal-stepper')).componentInstance;
    });

    it('should show error state', () => {
      const nextButtonNativeEl = fixture.debugElement
          .queryAll(By.directive(Wtf2StepperNext))[0].nativeElement;

      stepper.selectedIndex = 1;
      stepper.steps.first.hasError = true;
      nextButtonNativeEl.click();
      fixture.detectChanges();

      expect(stepper._getIndicatorType(0)).toBe(STEP_STATE.ERROR);
    });

    it('should respect a custom falsy hasError value', () => {
      const nextButtonNativeEl = fixture.debugElement
          .queryAll(By.directive(Wtf2StepperNext))[0].nativeElement;

      stepper.selectedIndex = 1;
      nextButtonNativeEl.click();
      fixture.detectChanges();

      expect(stepper._getIndicatorType(0)).toBe(STEP_STATE.ERROR);

      stepper.steps.first.hasError = false;
      fixture.detectChanges();

      expect(stepper._getIndicatorType(0)).not.toBe(STEP_STATE.ERROR);
    });

  });

  describe('stepper using Material UI Guideline logic', () => {
    let fixture: ComponentFixture<Wtf2HorizontalStepperWithErrorsApp>;
    let stepper: Wtf2Stepper;

    beforeEach(() => {
      fixture = createComponent(
        Wtf2HorizontalStepperWithErrorsApp,
        [{
          provide: STEPPER_GLOBAL_OPTIONS,
          useValue: {displayDefaultIndicatorType: false}
        }],
        [Wtf2FormFieldModule, Wtf2InputModule]
      );
      fixture.detectChanges();
      stepper = fixture.debugElement
          .query(By.css('wtf2-horizontal-stepper')).componentInstance;
    });

    it('should show done state when step is completed and its not the current step', () => {
      let nextButtonNativeEl = fixture.debugElement
          .queryAll(By.directive(Wtf2StepperNext))[0].nativeElement;

      stepper.selectedIndex = 1;
      stepper.steps.first.completed = true;
      nextButtonNativeEl.click();
      fixture.detectChanges();

      expect(stepper._getIndicatorType(0)).toBe(STEP_STATE.DONE);
    });

    it('should show edit state when step is editable and its the current step', () => {
      stepper.selectedIndex = 1;
      stepper.steps.toArray()[1].editable = true;
      fixture.detectChanges();

      expect(stepper._getIndicatorType(1)).toBe(STEP_STATE.EDIT);
    });
  });
});

/** Asserts that keyboard interaction works correctly. */
function assertCorrectKeyboardInteraction(fixture: ComponentFixture<any>,
                                          stepHeaders: DebugElement[],
                                          orientation: StepperOrientation) {
  let stepperComponent = fixture.debugElement.query(By.directive(Wtf2Stepper)).componentInstance;
  let nextKey = orientation === 'vertical' ? DOWN_ARROW : RIGHT_ARROW;
  let prevKey = orientation === 'vertical' ? UP_ARROW : LEFT_ARROW;

  expect(stepperComponent._getFocusIndex()).toBe(0);
  expect(stepperComponent.selectedIndex).toBe(0);

  let stepHeaderEl = stepHeaders[0].nativeElement;
  dispatchKeyboardEvent(stepHeaderEl, 'keydown', nextKey);
  fixture.detectChanges();

  expect(stepperComponent._getFocusIndex())
      .toBe(1, 'Expected index of focused step to increase by 1 after pressing the next key.');
  expect(stepperComponent.selectedIndex)
      .toBe(0, 'Expected index of selected step to remain unchanged after pressing the next key.');

  stepHeaderEl = stepHeaders[1].nativeElement;
  dispatchKeyboardEvent(stepHeaderEl, 'keydown', ENTER);
  fixture.detectChanges();

  expect(stepperComponent._getFocusIndex())
      .toBe(1, 'Expected index of focused step to remain unchanged after ENTER event.');
  expect(stepperComponent.selectedIndex)
      .toBe(1,
          'Expected index of selected step to change to index of focused step after ENTER event.');

  stepHeaderEl = stepHeaders[1].nativeElement;
  dispatchKeyboardEvent(stepHeaderEl, 'keydown', prevKey);
  fixture.detectChanges();

  expect(stepperComponent._getFocusIndex())
      .toBe(0, 'Expected index of focused step to decrease by 1 after pressing the previous key.');
  expect(stepperComponent.selectedIndex).toBe(1,
      'Expected index of selected step to remain unchanged after pressing the previous key.');

  // When the focus is on the last step and right arrow key is pressed, the focus should cycle
  // through to the first step.
  stepperComponent._keyManager.updateActiveItemIndex(2);
  stepHeaderEl = stepHeaders[2].nativeElement;
  dispatchKeyboardEvent(stepHeaderEl, 'keydown', nextKey);
  fixture.detectChanges();

  expect(stepperComponent._getFocusIndex()).toBe(0,
      'Expected index of focused step to cycle through to index 0 after pressing the next key.');
  expect(stepperComponent.selectedIndex)
      .toBe(1, 'Expected index of selected step to remain unchanged after pressing the next key.');

  stepHeaderEl = stepHeaders[0].nativeElement;
  dispatchKeyboardEvent(stepHeaderEl, 'keydown', SPACE);
  fixture.detectChanges();

  expect(stepperComponent._getFocusIndex())
      .toBe(0, 'Expected index of focused to remain unchanged after SPACE event.');
  expect(stepperComponent.selectedIndex)
      .toBe(0,
          'Expected index of selected step to change to index of focused step after SPACE event.');

  const endEvent = dispatchKeyboardEvent(stepHeaderEl, 'keydown', END);
  expect(stepperComponent._getFocusIndex())
      .toBe(stepHeaders.length - 1, 'Expected last step to be focused when pressing END.');
  expect(endEvent.defaultPrevented).toBe(true, 'Expected default END action to be prevented.');

  const homeEvent = dispatchKeyboardEvent(stepHeaderEl, 'keydown', HOME);
  expect(stepperComponent._getFocusIndex())
      .toBe(0, 'Expected first step to be focused when pressing HOME.');
  expect(homeEvent.defaultPrevented).toBe(true, 'Expected default HOME action to be prevented.');
}

/** Asserts that arrow key direction works correctly in RTL mode. */
function assertArrowKeyInteractionInRtl(fixture: ComponentFixture<any>,
                                        stepHeaders: DebugElement[]) {
  let stepperComponent = fixture.debugElement.query(By.directive(Wtf2Stepper)).componentInstance;

  expect(stepperComponent._getFocusIndex()).toBe(0);

  let stepHeaderEl = stepHeaders[0].nativeElement;
  dispatchKeyboardEvent(stepHeaderEl, 'keydown', LEFT_ARROW);
  fixture.detectChanges();

  expect(stepperComponent._getFocusIndex()).toBe(1);

  stepHeaderEl = stepHeaders[1].nativeElement;
  dispatchKeyboardEvent(stepHeaderEl, 'keydown', RIGHT_ARROW);
  fixture.detectChanges();

  expect(stepperComponent._getFocusIndex()).toBe(0);
}

/** Asserts that keyboard interaction works correctly when the user is pressing a modifier key. */
function assertSelectKeyWithModifierInteraction(fixture: ComponentFixture<any>,
                                                stepHeaders: DebugElement[],
                                                orientation: StepperOrientation,
                                                selectionKey: number) {
  const stepperComponent = fixture.debugElement.query(By.directive(Wtf2Stepper)).componentInstance;
  const modifiers = ['altKey', 'shiftKey', 'ctrlKey', 'metaKey'];

  expect(stepperComponent._getFocusIndex()).toBe(0);
  expect(stepperComponent.selectedIndex).toBe(0);

  dispatchKeyboardEvent(stepHeaders[0].nativeElement, 'keydown',
      orientation === 'vertical' ? DOWN_ARROW : RIGHT_ARROW);
  fixture.detectChanges();

  expect(stepperComponent._getFocusIndex())
      .toBe(1, 'Expected index of focused step to increase by 1 after pressing the next key.');
  expect(stepperComponent.selectedIndex)
      .toBe(0, 'Expected index of selected step to remain unchanged after pressing the next key.');

  modifiers.forEach(modifier => {
    const event: KeyboardEvent = createKeyboardEvent('keydown', selectionKey);
    Object.defineProperty(event, modifier, {get: () => true});
    dispatchEvent(stepHeaders[1].nativeElement, event);
    fixture.detectChanges();

    expect(stepperComponent.selectedIndex).toBe(0, `Expected selected index to remain unchanged ` +
        `when pressing the selection key with ${modifier} modifier.`);
    expect(event.defaultPrevented).toBe(false);
  });
}

function asyncValidator(minLength: number, validationTrigger: Subject<void>): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return validationTrigger.pipe(
      map(() => control.value && control.value.length >= minLength ? null : {asyncValidation: {}}),
      take(1)
    );
  };
}

function createComponent<T>(component: Type<T>,
  providers: Provider[] = [],
  imports: any[] = []): ComponentFixture<T> {
  TestBed.configureTestingModule({
    imports: [
      Wtf2StepperModule,
      NoopAnimationsModule,
      ReactiveFormsModule,
      ...imports
    ],
    declarations: [component],
    providers: [
      {provide: Directionality, useFactory: () => dir},
      ...providers
    ],
  }).compileComponents();

  return TestBed.createComponent<T>(component);
}

@Component({
  template: `
  <form [formGroup]="formGroup">
    <wtf2-horizontal-stepper>
      <wtf2-step errorMessage="This field is required"
        [stepControl]="formGroup.get('firstNameCtrl')">
        <ng-template wtf2StepLabel>Step 1</ng-template>
        <wtf2-form-field>
          <wtf2-label>First name</wtf2-label>
          <input wtf2Input formControlName="firstNameCtrl" required>
          <wtf2-error>This field is required</wtf2-error>
        </wtf2-form-field>
        <div>
          <button wtf2-button wtf2StepperPrevious>Back</button>
          <button wtf2-button wtf2StepperNext>Next</button>
        </div>
      </wtf2-step>
      <wtf2-step>
        <ng-template wtf2StepLabel>Step 2</ng-template>
        Content 2
        <div>
          <button wtf2-button wtf2StepperPrevious>Back</button>
          <button wtf2-button wtf2StepperNext>Next</button>
        </div>
      </wtf2-step>
    </wtf2-horizontal-stepper>
  </form>
  `
})
class Wtf2HorizontalStepperWithErrorsApp implements OnInit {
  formGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formGroup = this._formBuilder.group({
      firstNameCtrl: ['', Validators.required],
      lastNameCtrl: ['', Validators.required],
    });
  }
}

@Component({
  template: `
    <wtf2-horizontal-stepper [disableRipple]="disableRipple">
      <wtf2-step>
        <ng-template wtf2StepLabel>Step 1</ng-template>
        Content 1
        <div>
          <button wtf2-button wtf2StepperPrevious>Back</button>
          <button wtf2-button wtf2StepperNext>Next</button>
        </div>
      </wtf2-step>
      <wtf2-step>
        <ng-template wtf2StepLabel>Step 2</ng-template>
        Content 2
        <div>
          <button wtf2-button wtf2StepperPrevious>Back</button>
          <button wtf2-button wtf2StepperNext>Next</button>
        </div>
      </wtf2-step>
      <wtf2-step [label]="inputLabel" optional>
        Content 3
        <div>
          <button wtf2-button wtf2StepperPrevious>Back</button>
          <button wtf2-button wtf2StepperNext>Next</button>
        </div>
      </wtf2-step>
    </wtf2-horizontal-stepper>
  `
})
class SimpleWtf2HorizontalStepperApp {
  inputLabel = 'Step 3';
  disableRipple = false;
}

@Component({
  template: `
    <wtf2-vertical-stepper [disableRipple]="disableRipple">
      <wtf2-step>
        <ng-template wtf2StepLabel>Step 1</ng-template>
        Content 1
        <div>
          <button wtf2-button wtf2StepperPrevious>Back</button>
          <button wtf2-button wtf2StepperNext>Next</button>
        </div>
      </wtf2-step>
      <wtf2-step *ngIf="showStepTwo">
        <ng-template wtf2StepLabel>Step 2</ng-template>
        Content 2
        <div>
          <button wtf2-button wtf2StepperPrevious>Back</button>
          <button wtf2-button wtf2StepperNext>Next</button>
        </div>
      </wtf2-step>
      <wtf2-step [label]="inputLabel">
        Content 3
        <div>
          <button wtf2-button wtf2StepperPrevious>Back</button>
          <button wtf2-button wtf2StepperNext>Next</button>
        </div>
      </wtf2-step>
    </wtf2-vertical-stepper>
  `
})
class SimpleWtf2VerticalStepperApp {
  inputLabel = 'Step 3';
  showStepTwo = true;
  disableRipple = false;
}

@Component({
  template: `
    <wtf2-vertical-stepper linear>
      <wtf2-step [stepControl]="oneGroup">
        <form [formGroup]="oneGroup">
          <ng-template wtf2StepLabel>Step one</ng-template>
          <input formControlName="oneCtrl" required>
          <div>
            <button wtf2-button wtf2StepperPrevious>Back</button>
            <button wtf2-button wtf2StepperNext>Next</button>
          </div>
        </form>
      </wtf2-step>
      <wtf2-step [stepControl]="twoGroup">
        <form [formGroup]="twoGroup">
          <ng-template wtf2StepLabel>Step two</ng-template>
          <input formControlName="twoCtrl" required>
          <div>
            <button wtf2-button wtf2StepperPrevious>Back</button>
            <button wtf2-button wtf2StepperNext>Next</button>
          </div>
        </form>
      </wtf2-step>
      <wtf2-step [stepControl]="threeGroup" optional>
        <form [formGroup]="threeGroup">
          <ng-template wtf2StepLabel>Step two</ng-template>
          <input formControlName="threeCtrl">
          <div>
            <button wtf2-button wtf2StepperPrevious>Back</button>
            <button wtf2-button wtf2StepperNext>Next</button>
          </div>
        </form>
      </wtf2-step>
      <wtf2-step>
        Done
      </wtf2-step>
    </wtf2-vertical-stepper>
  `
})
class LinearWtf2VerticalStepperApp implements OnInit {
  oneGroup: FormGroup;
  twoGroup: FormGroup;
  threeGroup: FormGroup;

  validationTrigger = new Subject<void>();

  ngOnInit() {
    this.oneGroup = new FormGroup({
      oneCtrl: new FormControl('', Validators.required)
    });
    this.twoGroup = new FormGroup({
      twoCtrl: new FormControl('', Validators.required, asyncValidator(3, this.validationTrigger))
    });
    this.threeGroup = new FormGroup({
      threeCtrl: new FormControl('', Validators.pattern(VALID_REGEX))
    });
  }
}

@Component({
  template: `
    <wtf2-horizontal-stepper [linear]="true" [selectedIndex]="index">
      <wtf2-step label="One"></wtf2-step>
      <wtf2-step label="Two"></wtf2-step>
      <wtf2-step label="Three"></wtf2-step>
    </wtf2-horizontal-stepper>
  `
})
class SimplePreselectedWtf2HorizontalStepperApp {
  index = 0;
}

@Component({
  template: `
    <wtf2-horizontal-stepper linear>
      <wtf2-step
        *ngFor="let step of steps"
        [label]="step.label"
        [completed]="step.completed"></wtf2-step>
    </wtf2-horizontal-stepper>
  `
})
class SimpleStepperWithoutStepControl {
  steps = [
    {label: 'One', completed: false},
    {label: 'Two', completed: false},
    {label: 'Three', completed: false}
  ];
}

@Component({
  template: `
    <wtf2-horizontal-stepper linear>
      <wtf2-step
        *ngFor="let step of steps"
        [label]="step.label"
        [stepControl]="step.control"
        [completed]="step.completed"></wtf2-step>
    </wtf2-horizontal-stepper>
  `
})
class SimpleStepperWithStepControlAndCompletedBinding {
  steps = [
    {label: 'One', completed: false, control: new FormControl()},
    {label: 'Two', completed: false, control: new FormControl()},
    {label: 'Three', completed: false, control: new FormControl()}
  ];
}

@Component({
  template: `
    <wtf2-horizontal-stepper>
      <ng-template wtf2StepperIcon="edit">Custom edit</ng-template>
      <ng-template wtf2StepperIcon="done">Custom done</ng-template>
      <ng-template wtf2StepperIcon="number" let-index="index">
        {{getRomanNumeral(index + 1)}}
      </ng-template>

      <wtf2-step>Content 1</wtf2-step>
      <wtf2-step>Content 2</wtf2-step>
      <wtf2-step>Content 3</wtf2-step>
    </wtf2-horizontal-stepper>
`
})
class IconOverridesStepper {
  getRomanNumeral(value: number) {
    const numberMap: {[key: number]: string} = {
      1: 'I',
      2: 'II',
      3: 'III',
      4: 'IV',
      5: 'V',
      6: 'VI',
      7: 'VII',
      8: 'VIII',
      9: 'IX'
    };

    return numberMap[value];
  }
}

@Component({
  template: `
    <wtf2-horizontal-stepper linear>
      <wtf2-step label="Step 1" [stepControl]="controls[0]"></wtf2-step>
      <wtf2-step label="Step 2" [stepControl]="controls[1]" [optional]="step2Optional"></wtf2-step>
      <wtf2-step label="Step 3" [stepControl]="controls[2]"></wtf2-step>
    </wtf2-horizontal-stepper>
  `
})
class LinearStepperWithValidOptionalStep {
  controls = [0, 0, 0].map(() => new FormControl());
  step2Optional = false;
}


@Component({
  template: `
    <wtf2-horizontal-stepper>
      <wtf2-step [aria-label]="ariaLabel" [aria-labelledby]="ariaLabelledby" label="One"></wtf2-step>
    </wtf2-horizontal-stepper>
  `
})
class StepperWithAriaInputs {
  ariaLabel: string;
  ariaLabelledby: string;
}
