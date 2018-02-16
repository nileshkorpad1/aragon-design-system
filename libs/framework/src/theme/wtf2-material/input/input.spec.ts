import {Platform, PlatformModule} from '@angular/cdk/platform';
import {
  createFakeEvent,
  dispatchFakeEvent,
  wrappedErrorMessage,
  MockNgZone,
} from '@angular/cdk/testing';
import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  Type,
  Provider,
  NgZone,
  Directive,
} from '@angular/core';
import {ComponentFixture, fakeAsync, flush, TestBed} from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ErrorStateMatcher,
  FloatLabelType,
  WTF2_LABEL_GLOBAL_OPTIONS,
  ShowOnDirtyErrorStateMatcher,
} from '../core';
import {
  getWtf2FormFieldDuplicatedHintError,
  getWtf2FormFieldMissingControlError,
  getWtf2FormFieldPlaceholderConflictError,
  WTF2_FORM_FIELD_DEFAULT_OPTIONS,
  Wtf2FormField,
  Wtf2FormFieldAppearance,
  Wtf2FormFieldModule,
} from '../form-field';
import {By} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Wtf2StepperModule} from '../stepper';
import {Wtf2TabsModule} from '../tabs';
import {Directionality, Direction} from '@angular/cdk/bidi';
import {Subject} from 'rxjs';
import {Wtf2InputModule, Wtf2Input, WTF2_INPUT_VALUE_ACCESSOR} from './index';
import {Wtf2TextareaAutosize} from './autosize';

describe('Wtf2Input without forms', () => {
  it('should default to floating labels', fakeAsync(() => {
    let fixture = createComponent(Wtf2InputWithId);
    fixture.detectChanges();

    let formField = fixture.debugElement.query(By.directive(Wtf2FormField))
        .componentInstance as Wtf2FormField;
    expect(formField.floatLabel).toBe('auto',
        'Expected Wtf2Input to set floatingLabel to auto by default.');
  }));

  it('should default to global floating label type', fakeAsync(() => {
    let fixture = createComponent(Wtf2InputWithId, [{
      provide: WTF2_LABEL_GLOBAL_OPTIONS, useValue: {float: 'always'}
    }]);
    fixture.detectChanges();

    let formField = fixture.debugElement.query(By.directive(Wtf2FormField))
        .componentInstance as Wtf2FormField;
    expect(formField.floatLabel).toBe('always',
      'Expected Wtf2Input to set floatingLabel to always from global option.');
  }));

  it('should not be treated as empty if type is date', fakeAsync(() => {
    const platform = new Platform();

    if (!(platform.TRIDENT || (platform.SAFARI && !platform.IOS))) {
      let fixture = createComponent(Wtf2InputDateTestController);
      fixture.detectChanges();

      let el = fixture.debugElement.query(By.css('label')).nativeElement;
      expect(el).not.toBeNull();
      expect(el.classList.contains('wtf2-form-field-empty')).toBe(false);
    }
  }));

  // Safari Desktop and IE don't support type="date" and fallback to type="text".
  it('should be treated as empty if type is date in Safari Desktop or IE', fakeAsync(() => {
    const platform = new Platform();

    if (platform.TRIDENT || (platform.SAFARI && !platform.IOS)) {
      let fixture = createComponent(Wtf2InputDateTestController);
      fixture.detectChanges();

      let el = fixture.debugElement.query(By.css('label')).nativeElement;
      expect(el).not.toBeNull();
      expect(el.classList.contains('wtf2-form-field-empty')).toBe(true);
    }
  }));

  it('should treat text input type as empty at init', fakeAsync(() => {
    let fixture = createComponent(Wtf2InputTextTestController);
    fixture.detectChanges();

    let el = fixture.debugElement.query(By.css('label')).nativeElement;
    expect(el).not.toBeNull();
    expect(el.classList.contains('wtf2-form-field-empty')).toBe(true);
  }));

  it('should treat password input type as empty at init', fakeAsync(() => {
    let fixture = createComponent(Wtf2InputPasswordTestController);
    fixture.detectChanges();

    let el = fixture.debugElement.query(By.css('label')).nativeElement;
    expect(el).not.toBeNull();
    expect(el.classList.contains('wtf2-form-field-empty')).toBe(true);
  }));

  it('should treat number input type as empty at init', fakeAsync(() => {
    let fixture = createComponent(Wtf2InputNumberTestController);
    fixture.detectChanges();

    let el = fixture.debugElement.query(By.css('label')).nativeElement;
    expect(el).not.toBeNull();
    expect(el.classList.contains('wtf2-form-field-empty')).toBe(true);
  }));

  it('should not be empty after input entered', fakeAsync(() => {
    let fixture = createComponent(Wtf2InputTextTestController);
    fixture.detectChanges();

    let inputEl = fixture.debugElement.query(By.css('input'));
    let el = fixture.debugElement.query(By.css('label')).nativeElement;
    expect(el).not.toBeNull();
    expect(el.classList.contains('wtf2-form-field-empty')).toBe(true, 'should be empty');

    inputEl.nativeElement.value = 'hello';
    // Simulate input event.
    inputEl.triggerEventHandler('input', {target: inputEl.nativeElement});
    fixture.detectChanges();

    el = fixture.debugElement.query(By.css('label')).nativeElement;
    expect(el.classList.contains('wtf2-form-field-empty')).toBe(false, 'should not be empty');
  }));

  it('should update the placeholder when input entered', fakeAsync(() => {
    let fixture = createComponent(Wtf2InputWithStaticLabel);
    fixture.detectChanges();

    let inputEl = fixture.debugElement.query(By.css('input'));
    let labelEl = fixture.debugElement.query(By.css('label')).nativeElement;

    expect(labelEl.classList).toContain('wtf2-form-field-empty');
    expect(labelEl.classList).not.toContain('wtf2-form-field-float');

    // Update the value of the input.
    inputEl.nativeElement.value = 'Text';

    // Fake behavior of the `(input)` event which should trigger a change detection.
    fixture.detectChanges();

    expect(labelEl.classList).not.toContain('wtf2-form-field-empty');
    expect(labelEl.classList).not.toContain('wtf2-form-field-float');
  }));

  it('should not be empty when the value set before view init', fakeAsync(() => {
    let fixture = createComponent(Wtf2InputWithValueBinding);
    fixture.detectChanges();
    let labelEl = fixture.debugElement.query(By.css('.wtf2-form-field-label')).nativeElement;

    expect(labelEl.classList).not.toContain('wtf2-form-field-empty');

    fixture.componentInstance.value = '';
    fixture.detectChanges();

    expect(labelEl.classList).toContain('wtf2-form-field-empty');
  }));

  it('should add id', fakeAsync(() => {
    let fixture = createComponent(Wtf2InputTextTestController);
    fixture.detectChanges();

    const inputElement: HTMLInputElement =
        fixture.debugElement.query(By.css('input')).nativeElement;
    const labelElement: HTMLInputElement =
        fixture.debugElement.query(By.css('label')).nativeElement;

    expect(inputElement.id).toBeTruthy();
    expect(inputElement.id).toEqual(labelElement.getAttribute('for')!);
  }));

  it('should add aria-owns to the label for the associated control', fakeAsync(() => {
    let fixture = createComponent(Wtf2InputTextTestController);
    fixture.detectChanges();

    const inputElement: HTMLInputElement =
        fixture.debugElement.query(By.css('input')).nativeElement;
    const labelElement: HTMLInputElement =
        fixture.debugElement.query(By.css('label')).nativeElement;

    expect(labelElement.getAttribute('aria-owns')).toBe(inputElement.id);
  }));

  it('should add aria-required reflecting the required state', fakeAsync(() => {
    const fixture = createComponent(Wtf2InputWithRequired);
    fixture.detectChanges();

    const inputElement: HTMLInputElement =
        fixture.debugElement.query(By.css('input')).nativeElement;

    expect(inputElement.getAttribute('aria-required'))
        .toBe('false', 'Expected aria-required to reflect required state of false');

    fixture.componentInstance.required = true;
    fixture.detectChanges();

    expect(inputElement.getAttribute('aria-required'))
        .toBe('true', 'Expected aria-required to reflect required state of true');
  }));

  it('should not overwrite existing id', fakeAsync(() => {
    let fixture = createComponent(Wtf2InputWithId);
    fixture.detectChanges();

    const inputElement: HTMLInputElement =
        fixture.debugElement.query(By.css('input')).nativeElement;
    const labelElement: HTMLInputElement =
        fixture.debugElement.query(By.css('label')).nativeElement;

    expect(inputElement.id).toBe('test-id');
    expect(labelElement.getAttribute('for')).toBe('test-id');
  }));

  it('validates there\'s only one hint label per side', fakeAsync(() => {
    let fixture = createComponent(Wtf2InputInvalidHintTestController);

    expect(() => {
      try {
        fixture.detectChanges();
        flush();
      } catch {
        flush();
      }
    }).toThrowError(
        wrappedErrorMessage(getWtf2FormFieldDuplicatedHintError('start')));
  }));

  it('validates there\'s only one hint label per side (attribute)', fakeAsync(() => {
    let fixture = createComponent(Wtf2InputInvalidHint2TestController);

    expect(() => {
      try {
        fixture.detectChanges();
        flush();
      } catch {
        flush();
      }
    }).toThrowError(
        wrappedErrorMessage(getWtf2FormFieldDuplicatedHintError('start')));
  }));

  it('validates there\'s only one placeholder', fakeAsync(() => {
    let fixture = createComponent(Wtf2InputInvalidPlaceholderTestController);

    expect(() => {
      try {
        fixture.detectChanges();
        flush();
      } catch {
        flush();
      }
    }).toThrowError(
        wrappedErrorMessage(getWtf2FormFieldPlaceholderConflictError()));
  }));

  it('validates that wtf2Input child is present', fakeAsync(() => {
    let fixture = createComponent(Wtf2InputMissingWtf2InputTestController);

    expect(() => fixture.detectChanges()).toThrowError(
        wrappedErrorMessage(getWtf2FormFieldMissingControlError()));
  }));

  it('validates that wtf2Input child is present after initialization', fakeAsync(() => {
    let fixture = createComponent(Wtf2InputWithNgIf);

    expect(() => fixture.detectChanges()).not.toThrowError(
        wrappedErrorMessage(getWtf2FormFieldMissingControlError()));

    fixture.componentInstance.renderInput = false;

    expect(() => fixture.detectChanges()).toThrowError(
        wrappedErrorMessage(getWtf2FormFieldMissingControlError()));
  }));

  it('validates the type', fakeAsync(() => {
    let fixture = createComponent(Wtf2InputInvalidTypeTestController);

    // Technically this throws during the OnChanges detection phase,
    // so the error is really a ChangeDetectionError and it becomes
    // hard to build a full exception to compare with.
    // We just check for any exception in this case.
    expect(() => fixture.detectChanges()).toThrow(
        /* new Wtf2InputUnsupportedTypeError('file') */);
  }));

  it('supports hint labels attribute', fakeAsync(() => {
    let fixture = createComponent(Wtf2InputHintLabelTestController);
    fixture.detectChanges();

    // If the hint label is empty, expect no label.
    expect(fixture.debugElement.query(By.css('.wtf2-hint'))).toBeNull();

    fixture.componentInstance.label = 'label';
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.wtf2-hint'))).not.toBeNull();
  }));

  it('sets an id on hint labels', fakeAsync(() => {
    let fixture = createComponent(Wtf2InputHintLabelTestController);

    fixture.componentInstance.label = 'label';
    fixture.detectChanges();

    let hint = fixture.debugElement.query(By.css('.wtf2-hint')).nativeElement;

    expect(hint.getAttribute('id')).toBeTruthy();
  }));

  it('supports hint labels elements', fakeAsync(() => {
    let fixture = createComponent(Wtf2InputHintLabel2TestController);
    fixture.detectChanges();

    // In this case, we should have an empty <wtf2-hint>.
    let el = fixture.debugElement.query(By.css('wtf2-hint')).nativeElement;
    expect(el.textContent).toBeFalsy();

    fixture.componentInstance.label = 'label';
    fixture.detectChanges();
    el = fixture.debugElement.query(By.css('wtf2-hint')).nativeElement;
    expect(el.textContent).toBe('label');
  }));

  it('sets an id on the hint element', fakeAsync(() => {
    let fixture = createComponent(Wtf2InputHintLabel2TestController);

    fixture.componentInstance.label = 'label';
    fixture.detectChanges();

    let hint = fixture.debugElement.query(By.css('wtf2-hint')).nativeElement;

    expect(hint.getAttribute('id')).toBeTruthy();
  }));

  it('supports placeholder attribute', fakeAsync(() => {
    let fixture = createComponent(Wtf2InputPlaceholderAttrTestComponent);
    fixture.detectChanges();

    let inputEl = fixture.debugElement.query(By.css('input')).nativeElement;

    expect(fixture.debugElement.query(By.css('label'))).toBeNull();
    expect(inputEl.placeholder).toBe('');

    fixture.componentInstance.placeholder = 'Other placeholder';
    fixture.detectChanges();

    let labelEl = fixture.debugElement.query(By.css('label'));

    expect(inputEl.placeholder).toBe('Other placeholder');
    expect(labelEl).not.toBeNull();
    expect(labelEl.nativeElement.textContent).toMatch('Other placeholder');
    expect(labelEl.nativeElement.textContent).not.toMatch(/\*/g);
  }));

  it('supports placeholder element', fakeAsync(() => {
    let fixture = createComponent(Wtf2InputPlaceholderElementTestComponent);
    fixture.detectChanges();

    let el = fixture.debugElement.query(By.css('label'));
    expect(el).not.toBeNull();
    expect(el.nativeElement.textContent).toMatch('Default Placeholder');

    fixture.componentInstance.placeholder = 'Other placeholder';
    fixture.detectChanges();

    el = fixture.debugElement.query(By.css('label'));
    expect(el).not.toBeNull();
    expect(el.nativeElement.textContent).toMatch('Other placeholder');
    expect(el.nativeElement.textContent).not.toMatch(/\*/g);
  }));

  it('supports placeholder required star', fakeAsync(() => {
    let fixture = createComponent(Wtf2InputPlaceholderRequiredTestComponent);
    fixture.detectChanges();

    let el = fixture.debugElement.query(By.css('label'));
    expect(el).not.toBeNull();
    expect(el.nativeElement.textContent).toMatch(/hello +\*/g);
  }));

  it('should hide the required star if input is disabled', () => {
    const fixture = createComponent(Wtf2InputPlaceholderRequiredTestComponent);

    fixture.componentInstance.disabled = true;
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css('label'));

    expect(el).not.toBeNull();
    expect(el.nativeElement.textContent!.trim()).toMatch(/^hello$/);
    expect(el.nativeElement.textContent).not.toMatch(/\*/g);
  });

  it('should hide the required star from screen readers', fakeAsync(() => {
    let fixture = createComponent(Wtf2InputPlaceholderRequiredTestComponent);
    fixture.detectChanges();

    let el = fixture.debugElement.query(By.css('.wtf2-form-field-required-marker')).nativeElement;

    expect(el.getAttribute('aria-hidden')).toBe('true');
  }));

  it('hide placeholder required star when set to hide the required marker', fakeAsync(() => {
    let fixture = createComponent(Wtf2InputPlaceholderRequiredTestComponent);
    fixture.detectChanges();

    let el = fixture.debugElement.query(By.css('label'));
    expect(el).not.toBeNull();
    expect(el.nativeElement.textContent).toMatch(/hello +\*/g);

    fixture.componentInstance.hideRequiredMarker = true;
    fixture.detectChanges();

    expect(el.nativeElement.textContent).toMatch(/hello/g);
    expect(el.nativeElement.textContent).not.toMatch(/\*/g);
  }));

  it('supports the disabled attribute as binding', fakeAsync(() => {
    const fixture = createComponent(Wtf2InputWithDisabled);
    fixture.detectChanges();

    const formFieldEl =
        fixture.debugElement.query(By.css('.wtf2-form-field')).nativeElement;
    const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;

    expect(formFieldEl.classList.contains('wtf2-form-field-disabled'))
        .toBe(false, `Expected form field not to start out disabled.`);
    expect(inputEl.disabled).toBe(false);

    fixture.componentInstance.disabled = true;
    fixture.detectChanges();

    expect(formFieldEl.classList.contains('wtf2-form-field-disabled'))
        .toBe(true, `Expected form field to look disabled after property is set.`);
    expect(inputEl.disabled).toBe(true);
  }));

  it('supports the disabled attribute as binding for select', fakeAsync(() => {
    const fixture = createComponent(Wtf2InputSelect);
    fixture.detectChanges();

    const formFieldEl =
        fixture.debugElement.query(By.css('.wtf2-form-field')).nativeElement;
    const selectEl = fixture.debugElement.query(By.css('select')).nativeElement;

    expect(formFieldEl.classList.contains('wtf2-form-field-disabled'))
        .toBe(false, `Expected form field not to start out disabled.`);
    expect(selectEl.disabled).toBe(false);

    fixture.componentInstance.disabled = true;
    fixture.detectChanges();

    expect(formFieldEl.classList.contains('wtf2-form-field-disabled'))
        .toBe(true, `Expected form field to look disabled after property is set.`);
    expect(selectEl.disabled).toBe(true);
  }));

  it('should add a class to the form field if it has a native select', fakeAsync(() => {
    const fixture = createComponent(Wtf2InputSelect);
    fixture.detectChanges();

    const formField = fixture.debugElement.query(By.css('.wtf2-form-field')).nativeElement;

    expect(formField.classList).toContain('wtf2-form-field-type-wtf2-native-select');
  }));

  it('supports the required attribute as binding', fakeAsync(() => {
    let fixture = createComponent(Wtf2InputWithRequired);
    fixture.detectChanges();

    let inputEl = fixture.debugElement.query(By.css('input')).nativeElement;

    expect(inputEl.required).toBe(false);

    fixture.componentInstance.required = true;
    fixture.detectChanges();

    expect(inputEl.required).toBe(true);
  }));

  it('supports the required attribute as binding for select', fakeAsync(() => {
    const fixture = createComponent(Wtf2InputSelect);
    fixture.detectChanges();

    const selectEl = fixture.debugElement.query(By.css('select')).nativeElement;

    expect(selectEl.required).toBe(false);

    fixture.componentInstance.required = true;
    fixture.detectChanges();

    expect(selectEl.required).toBe(true);
  }));

  it('supports the type attribute as binding', fakeAsync(() => {
    let fixture = createComponent(Wtf2InputWithType);
    fixture.detectChanges();

    let inputEl = fixture.debugElement.query(By.css('input')).nativeElement;

    expect(inputEl.type).toBe('text');

    fixture.componentInstance.type = 'password';
    fixture.detectChanges();

    expect(inputEl.type).toBe('password');
  }));

  it('supports textarea', fakeAsync(() => {
    let fixture = createComponent(Wtf2InputTextareaWithBindings);
    fixture.detectChanges();

    const textarea: HTMLTextAreaElement = fixture.nativeElement.querySelector('textarea');
    expect(textarea).not.toBeNull();
  }));

  it('supports select', fakeAsync(() => {
    const fixture = createComponent(Wtf2InputSelect);
    fixture.detectChanges();

    const nativeSelect: HTMLTextAreaElement = fixture.nativeElement.querySelector('select');
    expect(nativeSelect).not.toBeNull();
  }));

  it('sets the aria-describedby when a hintLabel is set', fakeAsync(() => {
    let fixture = createComponent(Wtf2InputHintLabelTestController);

    fixture.componentInstance.label = 'label';
    fixture.detectChanges();

    let hint = fixture.debugElement.query(By.css('.wtf2-hint')).nativeElement;
    let input = fixture.debugElement.query(By.css('input')).nativeElement;

    expect(input.getAttribute('aria-describedby')).toBe(hint.getAttribute('id'));
  }));

  it('sets the aria-describedby to the id of the wtf2-hint', fakeAsync(() => {
    let fixture = createComponent(Wtf2InputHintLabel2TestController);

    fixture.componentInstance.label = 'label';
    fixture.detectChanges();

    let hint = fixture.debugElement.query(By.css('.wtf2-hint')).nativeElement;
    let input = fixture.debugElement.query(By.css('input')).nativeElement;

    expect(input.getAttribute('aria-describedby')).toBe(hint.getAttribute('id'));
  }));

  it('sets the aria-describedby with multiple wtf2-hint instances', fakeAsync(() => {
    let fixture = createComponent(Wtf2InputMultipleHintTestController);

    fixture.componentInstance.startId = 'start';
    fixture.componentInstance.endId = 'end';
    fixture.detectChanges();

    let input = fixture.debugElement.query(By.css('input')).nativeElement;

    expect(input.getAttribute('aria-describedby')).toBe('start end');
  }));

  it('sets the aria-describedby when a hintLabel is set, in addition to a wtf2-hint',
    fakeAsync(() => {
      let fixture = createComponent(Wtf2InputMultipleHintMixedTestController);

      fixture.detectChanges();

      let hintLabel = fixture.debugElement.query(By.css('.wtf2-hint:not(.wtf2-right)')).nativeElement;
      let endLabel = fixture.debugElement.query(By.css('.wtf2-hint.wtf2-right')).nativeElement;
      let input = fixture.debugElement.query(By.css('input')).nativeElement;
      let ariaValue = input.getAttribute('aria-describedby');

      expect(ariaValue).toBe(`${hintLabel.getAttribute('id')} ${endLabel.getAttribute('id')}`);
    }));

  it('should float when floatLabel is set to default and text is entered', fakeAsync(() => {
    let fixture = createComponent(Wtf2InputWithDynamicLabel);
    fixture.detectChanges();

    let inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
    let formFieldEl = fixture.debugElement.query(By.css('.wtf2-form-field')).nativeElement;

    expect(formFieldEl.classList).toContain('wtf2-form-field-can-float');
    expect(formFieldEl.classList).toContain('wtf2-form-field-should-float');

    fixture.componentInstance.shouldFloat = 'auto';
    fixture.detectChanges();

    expect(formFieldEl.classList).toContain('wtf2-form-field-can-float');
    expect(formFieldEl.classList).not.toContain('wtf2-form-field-should-float');

    // Update the value of the input.
    inputEl.value = 'Text';

    // Fake behavior of the `(input)` event which should trigger a change detection.
    fixture.detectChanges();

    expect(formFieldEl.classList).toContain('wtf2-form-field-can-float');
    expect(formFieldEl.classList).toContain('wtf2-form-field-should-float');
  }));

  it('should always float the label when floatLabel is set to true', fakeAsync(() => {
    let fixture = createComponent(Wtf2InputWithDynamicLabel);
    fixture.detectChanges();

    let inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
    let formFieldEl = fixture.debugElement.query(By.css('.wtf2-form-field')).nativeElement;

    expect(formFieldEl.classList).toContain('wtf2-form-field-can-float');
    expect(formFieldEl.classList).toContain('wtf2-form-field-should-float');

    fixture.detectChanges();

    // Update the value of the input.
    inputEl.value = 'Text';

    // Fake behavior of the `(input)` event which should trigger a change detection.
    fixture.detectChanges();

    expect(formFieldEl.classList).toContain('wtf2-form-field-can-float');
    expect(formFieldEl.classList).toContain('wtf2-form-field-should-float');
  }));

  it('should float labels when select has value', fakeAsync(() => {
    const fixture = createComponent(Wtf2InputSelect);
    fixture.detectChanges();

    const formFieldEl = fixture.debugElement.query(By.css('.wtf2-form-field')).nativeElement;
    expect(formFieldEl.classList).toContain('wtf2-form-field-should-float');
  }));

  it('should not float the label if the selectedIndex is negative', fakeAsync(() => {
    const fixture = createComponent(Wtf2InputSelect);
    fixture.detectChanges();

    const formFieldEl = fixture.debugElement.query(By.css('.wtf2-form-field')).nativeElement;
    const selectEl: HTMLSelectElement = formFieldEl.querySelector('select');

    expect(formFieldEl.classList).toContain('wtf2-form-field-should-float');

    selectEl.selectedIndex = -1;
    fixture.detectChanges();

    expect(formFieldEl.classList).not.toContain('wtf2-form-field-should-float');
  }));

  it('should not float labels when select has no value, no option label, ' +
      'no option innerHtml', fakeAsync(() => {
    const fixture = createComponent(Wtf2InputSelectWithNoLabelNoValue);
    fixture.detectChanges();

    const formFieldEl = fixture.debugElement.query(By.css('.wtf2-form-field')).nativeElement;
    expect(formFieldEl.classList).not.toContain('wtf2-form-field-should-float');
  }));

  it('should floating labels when select has no value but has option label',
      fakeAsync(() => {
    const fixture = createComponent(Wtf2InputSelectWithLabel);
    fixture.detectChanges();

    const formFieldEl = fixture.debugElement.query(By.css('.wtf2-form-field')).nativeElement;
    expect(formFieldEl.classList).toContain('wtf2-form-field-should-float');
  }));

  it('should floating labels when select has no value but has option innerHTML',
      fakeAsync(() => {
    const fixture = createComponent(Wtf2InputSelectWithInnerHtml);
    fixture.detectChanges();

    const formFieldEl = fixture.debugElement.query(By.css('.wtf2-form-field'))
        .nativeElement;
    expect(formFieldEl.classList).toContain('wtf2-form-field-should-float');
  }));

  it('should not throw if a native select does not have options', fakeAsync(() => {
    const fixture = createComponent(Wtf2InputSelectWithoutOptions);
    expect(() => fixture.detectChanges()).not.toThrow();
  }));

  it('should never float the label when floatLabel is set to false', fakeAsync(() => {
    let fixture = createComponent(Wtf2InputWithDynamicLabel);

    fixture.componentInstance.shouldFloat = 'never';
    fixture.detectChanges();

    let inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
    let labelEl = fixture.debugElement.query(By.css('label')).nativeElement;

    expect(labelEl.classList).toContain('wtf2-form-field-empty');
    expect(labelEl.classList).not.toContain('wtf2-form-field-float');

    // Update the value of the input.
    inputEl.value = 'Text';

    // Fake behavior of the `(input)` event which should trigger a change detection.
    fixture.detectChanges();

    expect(labelEl.classList).not.toContain('wtf2-form-field-empty');
    expect(labelEl.classList).not.toContain('wtf2-form-field-float');
  }));

  it('should be able to toggle the floating label programwtf2ically', fakeAsync(() => {
    const fixture = createComponent(Wtf2InputWithId);

    fixture.detectChanges();

    const formField = fixture.debugElement.query(By.directive(Wtf2FormField));
    const containerInstance = formField.componentInstance as Wtf2FormField;
    const label = formField.nativeElement.querySelector('.wtf2-form-field-label');

    expect(containerInstance.floatLabel).toBe('auto');
    expect(label.classList)
        .toContain('wtf2-form-field-empty', 'Expected input to be considered empty.');

    containerInstance.floatLabel = 'always';
    fixture.detectChanges();

    expect(label.classList)
        .not.toContain('wtf2-form-field-empty', 'Expected input to be considered not empty.');
  }));

  it('should not have prefix and suffix elements when none are specified', fakeAsync(() => {
    let fixture = createComponent(Wtf2InputWithId);
    fixture.detectChanges();

    let prefixEl = fixture.debugElement.query(By.css('.wtf2-form-field-prefix'));
    let suffixEl = fixture.debugElement.query(By.css('.wtf2-form-field-suffix'));

    expect(prefixEl).toBeNull();
    expect(suffixEl).toBeNull();
  }));

  it('should add prefix and suffix elements when specified', fakeAsync(() => {
    const fixture = createComponent(Wtf2InputWithPrefixAndSuffix);
    fixture.detectChanges();

    const prefixEl = fixture.debugElement.query(By.css('.wtf2-form-field-prefix'));
    const suffixEl = fixture.debugElement.query(By.css('.wtf2-form-field-suffix'));

    expect(prefixEl).not.toBeNull();
    expect(suffixEl).not.toBeNull();
    expect(prefixEl.nativeElement.innerText.trim()).toEqual('Prefix');
    expect(suffixEl.nativeElement.innerText.trim()).toEqual('Suffix');
  }));

  it('should update empty class when value changes programwtf2ically and OnPush', fakeAsync(() => {
    let fixture = createComponent(Wtf2InputOnPush);
    fixture.detectChanges();

    let component = fixture.componentInstance;
    let label = fixture.debugElement.query(By.css('.wtf2-form-field-label')).nativeElement;

    expect(label.classList).toContain('wtf2-form-field-empty', 'Input initially empty');

    component.formControl.setValue('something');
    fixture.detectChanges();

    expect(label.classList).not.toContain('wtf2-form-field-empty', 'Input no longer empty');
  }));

  it('should set the focused class when the input is focused', fakeAsync(() => {
    let fixture = createComponent(Wtf2InputTextTestController);
    fixture.detectChanges();

    let input = fixture.debugElement.query(By.directive(Wtf2Input))
      .injector.get<Wtf2Input>(Wtf2Input);
    let container = fixture.debugElement.query(By.css('wtf2-form-field')).nativeElement;

    // Call the focus handler directly to avoid flakyness where
    // browsers don't focus elements if the window is minimized.
    input._focusChanged(true);
    fixture.detectChanges();

    expect(container.classList).toContain('wtf2-focused');
  }));

  it('should remove the focused class if the input becomes disabled while focused',
    fakeAsync(() => {
      const fixture = createComponent(Wtf2InputTextTestController);
      fixture.detectChanges();

      const input = fixture.debugElement.query(By.directive(Wtf2Input))
          .injector.get<Wtf2Input>(Wtf2Input);
      const container = fixture.debugElement.query(By.css('wtf2-form-field')).nativeElement;

      // Call the focus handler directly to avoid flakyness where
      // browsers don't focus elements if the window is minimized.
      input._focusChanged(true);
      fixture.detectChanges();

      expect(container.classList).toContain('wtf2-focused');

      input.disabled = true;
      fixture.detectChanges();

      expect(container.classList).not.toContain('wtf2-focused');
    }));

  it('should be able to animate the label up and lock it in position', fakeAsync(() => {
    let fixture = createComponent(Wtf2InputTextTestController);
    fixture.detectChanges();

    let inputContainer = fixture.debugElement.query(By.directive(Wtf2FormField))
        .componentInstance as Wtf2FormField;
    let label = fixture.debugElement.query(By.css('.wtf2-form-field-label')).nativeElement;

    expect(inputContainer.floatLabel).toBe('auto');

    inputContainer._animateAndLockLabel();
    fixture.detectChanges();

    expect(inputContainer._shouldAlwaysFloat).toBe(false);
    expect(inputContainer.floatLabel).toBe('always');

    const fakeEvent = Object.assign(createFakeEvent('transitionend'), {propertyName: 'transform'});

    label.dispatchEvent(fakeEvent);
    fixture.detectChanges();

    expect(inputContainer._shouldAlwaysFloat).toBe(true);
    expect(inputContainer.floatLabel).toBe('always');
  }));

  it('should not highlight when focusing a readonly input', fakeAsync(() => {
    let fixture = createComponent(Wtf2InputWithReadonlyInput);
    fixture.detectChanges();

    let input = fixture.debugElement.query(By.directive(Wtf2Input)).injector.get<Wtf2Input>(Wtf2Input);
    let container = fixture.debugElement.query(By.css('wtf2-form-field')).nativeElement;

    // Call the focus handler directly to avoid flakyness where
    // browsers don't focus elements if the window is minimized.
    input._focusChanged(true);
    fixture.detectChanges();

    expect(input.focused).toBe(false);
    expect(container.classList).not.toContain('wtf2-focused');
  }));

  it('should reset the highlight when a readonly input is blurred', fakeAsync(() => {
    const fixture = createComponent(Wtf2InputWithReadonlyInput);
    fixture.detectChanges();

    const inputDebugElement = fixture.debugElement.query(By.directive(Wtf2Input));
    const input = inputDebugElement.injector.get<Wtf2Input>(Wtf2Input);
    const container = fixture.debugElement.query(By.css('wtf2-form-field')).nativeElement;

    fixture.componentInstance.isReadonly = false;
    fixture.detectChanges();

    // Call the focus handler directly to avoid flakyness where
    // browsers don't focus elements if the window is minimized.
    input._focusChanged(true);
    fixture.detectChanges();

    expect(input.focused).toBe(true);
    expect(container.classList).toContain('wtf2-focused');

    fixture.componentInstance.isReadonly = true;
    fixture.detectChanges();

    input._focusChanged(false);
    fixture.detectChanges();

    expect(input.focused).toBe(false);
    expect(container.classList).not.toContain('wtf2-focused');
  }));

  it('should only show the native placeholder, when there is a label, on focus', () => {
    const fixture = createComponent(Wtf2InputWithLabelAndPlaceholder);
    fixture.detectChanges();

    const container = fixture.debugElement.query(By.css('wtf2-form-field')).nativeElement;
    const label = fixture.debugElement.query(By.css('.wtf2-form-field-label')).nativeElement;
    const input = fixture.debugElement.query(By.css('input')).nativeElement;

    expect(container.classList).toContain('wtf2-form-field-hide-placeholder');
    expect(container.classList).not.toContain('wtf2-form-field-should-float');
    expect(label.textContent.trim()).toBe('Label');
    expect(input.getAttribute('placeholder')).toBe('Placeholder');

    input.value = 'Value';
    fixture.detectChanges();

    expect(container.classList).not.toContain('wtf2-form-field-hide-placeholder');
    expect(container.classList).toContain('wtf2-form-field-should-float');
  });

  it('should always show the native placeholder when floatLabel is set to "always"', () => {
    const fixture = createComponent(Wtf2InputWithLabelAndPlaceholder);

    fixture.componentInstance.floatLabel = 'always';
    fixture.detectChanges();

    const container = fixture.debugElement.query(By.css('wtf2-form-field')).nativeElement;

    expect(container.classList).not.toContain('wtf2-form-field-hide-placeholder');
  });

  it('should not add the `placeholder` attribute if there is no placeholder', () => {
    const fixture = createComponent(Wtf2InputWithoutPlaceholder);
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css('input')).nativeElement;

    expect(input.hasAttribute('placeholder')).toBe(false);
  });

  it('should not show the native placeholder when floatLabel is set to "never"', () => {
    const fixture = createComponent(Wtf2InputWithLabelAndPlaceholder);

    fixture.componentInstance.floatLabel = 'never';
    fixture.detectChanges();

    const container = fixture.debugElement.query(By.css('wtf2-form-field')).nativeElement;
    const input = fixture.debugElement.query(By.css('input')).nativeElement;

    expect(container.classList).toContain('wtf2-form-field-hide-placeholder');
    expect(container.classList).not.toContain('wtf2-form-field-should-float');

    input.value = 'Value';
    fixture.detectChanges();

    expect(container.classList).toContain('wtf2-form-field-hide-placeholder');
    expect(container.classList).not.toContain('wtf2-form-field-should-float');
  });

  it('should not add the native select class if the control is not a native select', () => {
    const fixture = createComponent(Wtf2InputWithId);
    fixture.detectChanges();
    const formField = fixture.debugElement.query(By.css('wtf2-form-field')).nativeElement;

    expect(formField.classList).not.toContain('wtf2-form-field-type-wtf2-native-select');
  });

  it('should use the native input value when determining whether ' +
    'the element is empty with a custom accessor', fakeAsync(() => {
      let fixture = createComponent(Wtf2InputWithCustomAccessor, [], [], [CustomWtf2InputAccessor]);
      fixture.detectChanges();
      let label = fixture.debugElement.query(By.css('label')).nativeElement;

      expect(label.classList).toContain('wtf2-form-field-empty');

      fixture.nativeElement.querySelector('input').value = 'abc';
      fixture.detectChanges();

      expect(label.classList).not.toContain('wtf2-form-field-empty');
    }));

});

describe('Wtf2Input with forms', () => {
  describe('error messages', () => {
    let fixture: ComponentFixture<Wtf2InputWithFormErrorMessages>;
    let testComponent: Wtf2InputWithFormErrorMessages;
    let containerEl: HTMLElement;
    let inputEl: HTMLElement;

    beforeEach(fakeAsync(() => {
      fixture = createComponent(Wtf2InputWithFormErrorMessages);
      fixture.detectChanges();
      testComponent = fixture.componentInstance;
      containerEl = fixture.debugElement.query(By.css('wtf2-form-field')).nativeElement;
      inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
    }));

    it('should not show any errors if the user has not interacted', fakeAsync(() => {
      expect(testComponent.formControl.untouched).toBe(true, 'Expected untouched form control');
      expect(containerEl.querySelectorAll('wtf2-error').length).toBe(0, 'Expected no error message');
      expect(inputEl.getAttribute('aria-invalid'))
        .toBe('false', 'Expected aria-invalid to be set to "false".');
    }));

    it('should display an error message when the input is touched and invalid', fakeAsync(() => {
      expect(testComponent.formControl.invalid).toBe(true, 'Expected form control to be invalid');
      expect(containerEl.querySelectorAll('wtf2-error').length).toBe(0, 'Expected no error message');

      testComponent.formControl.markAsTouched();
      fixture.detectChanges();
      flush();

      expect(containerEl.classList)
        .toContain('wtf2-form-field-invalid', 'Expected container to have the invalid CSS class.');
      expect(containerEl.querySelectorAll('wtf2-error').length)
        .toBe(1, 'Expected one error message to have been rendered.');
      expect(inputEl.getAttribute('aria-invalid'))
        .toBe('true', 'Expected aria-invalid to be set to "true".');
    }));

    it('should display an error message when the parent form is submitted', fakeAsync(() => {
      expect(testComponent.form.submitted).toBe(false, 'Expected form not to have been submitted');
      expect(testComponent.formControl.invalid).toBe(true, 'Expected form control to be invalid');
      expect(containerEl.querySelectorAll('wtf2-error').length).toBe(0, 'Expected no error message');

      dispatchFakeEvent(fixture.debugElement.query(By.css('form')).nativeElement, 'submit');
      fixture.detectChanges();
      flush();

      expect(testComponent.form.submitted).toBe(true, 'Expected form to have been submitted');
      expect(containerEl.classList)
        .toContain('wtf2-form-field-invalid', 'Expected container to have the invalid CSS class.');
      expect(containerEl.querySelectorAll('wtf2-error').length)
        .toBe(1, 'Expected one error message to have been rendered.');
      expect(inputEl.getAttribute('aria-invalid'))
        .toBe('true', 'Expected aria-invalid to be set to "true".');
    }));

    it('should display an error message when the parent form group is submitted', fakeAsync(() => {
      fixture.destroy();
      TestBed.resetTestingModule();

      let groupFixture = createComponent(Wtf2InputWithFormGroupErrorMessages);
      let component: Wtf2InputWithFormGroupErrorMessages;

      groupFixture.detectChanges();
      component = groupFixture.componentInstance;
      containerEl = groupFixture.debugElement.query(By.css('wtf2-form-field')).nativeElement;
      inputEl = groupFixture.debugElement.query(By.css('input')).nativeElement;

      expect(component.formGroup.invalid).toBe(true, 'Expected form control to be invalid');
      expect(containerEl.querySelectorAll('wtf2-error').length).toBe(0, 'Expected no error message');
      expect(inputEl.getAttribute('aria-invalid'))
        .toBe('false', 'Expected aria-invalid to be set to "false".');
      expect(component.formGroupDirective.submitted)
        .toBe(false, 'Expected form not to have been submitted');

      dispatchFakeEvent(groupFixture.debugElement.query(By.css('form')).nativeElement, 'submit');
      groupFixture.detectChanges();
      flush();

      expect(component.formGroupDirective.submitted)
        .toBe(true, 'Expected form to have been submitted');
      expect(containerEl.classList)
        .toContain('wtf2-form-field-invalid', 'Expected container to have the invalid CSS class.');
      expect(containerEl.querySelectorAll('wtf2-error').length)
        .toBe(1, 'Expected one error message to have been rendered.');
      expect(inputEl.getAttribute('aria-invalid'))
        .toBe('true', 'Expected aria-invalid to be set to "true".');
    }));

    it('should hide the errors and show the hints once the input becomes valid', fakeAsync(() => {
      testComponent.formControl.markAsTouched();
      fixture.detectChanges();
      flush();

      expect(containerEl.classList)
        .toContain('wtf2-form-field-invalid', 'Expected container to have the invalid CSS class.');
      expect(containerEl.querySelectorAll('wtf2-error').length)
        .toBe(1, 'Expected one error message to have been rendered.');
      expect(containerEl.querySelectorAll('wtf2-hint').length)
        .toBe(0, 'Expected no hints to be shown.');

      testComponent.formControl.setValue('something');
      fixture.detectChanges();
      flush();

      expect(containerEl.classList).not.toContain('wtf2-form-field-invalid',
        'Expected container not to have the invalid class when valid.');
      expect(containerEl.querySelectorAll('wtf2-error').length)
        .toBe(0, 'Expected no error messages when the input is valid.');
      expect(containerEl.querySelectorAll('wtf2-hint').length)
        .toBe(1, 'Expected one hint to be shown once the input is valid.');
    }));

    it('should not hide the hint if there are no error messages', fakeAsync(() => {
      testComponent.renderError = false;
      fixture.detectChanges();

      expect(containerEl.querySelectorAll('wtf2-hint').length)
        .toBe(1, 'Expected one hint to be shown on load.');

      testComponent.formControl.markAsTouched();
      fixture.detectChanges();
      flush();

      expect(containerEl.querySelectorAll('wtf2-hint').length)
        .toBe(1, 'Expected one hint to still be shown.');
    }));

    it('should set the proper role on the error messages', fakeAsync(() => {
      testComponent.formControl.markAsTouched();
      fixture.detectChanges();

      expect(containerEl.querySelector('wtf2-error')!.getAttribute('role')).toBe('alert');
    }));

    it('sets the aria-describedby to reference errors when in error state', fakeAsync(() => {
      let hintId = fixture.debugElement.query(By.css('.wtf2-hint')).nativeElement.getAttribute('id');
      let describedBy = inputEl.getAttribute('aria-describedby');

      expect(hintId).toBeTruthy('hint should be shown');
      expect(describedBy).toBe(hintId);

      fixture.componentInstance.formControl.markAsTouched();
      fixture.detectChanges();

      let errorIds = fixture.debugElement.queryAll(By.css('.wtf2-error'))
          .map(el => el.nativeElement.getAttribute('id')).join(' ');
      describedBy = inputEl.getAttribute('aria-describedby');

      expect(errorIds).toBeTruthy('errors should be shown');
      expect(describedBy).toBe(errorIds);
    }));
  });

  describe('custom error behavior', () => {

    it('should display an error message when a custom error matcher returns true', fakeAsync(() => {
      let fixture = createComponent(Wtf2InputWithCustomErrorStateMatcher);
      fixture.detectChanges();

      let component = fixture.componentInstance;
      let containerEl = fixture.debugElement.query(By.css('wtf2-form-field')).nativeElement;

      const control = component.formGroup.get('name')!;

      expect(control.invalid).toBe(true, 'Expected form control to be invalid');
      expect(containerEl.querySelectorAll('wtf2-error').length)
        .toBe(0, 'Expected no error messages');

      control.markAsTouched();
      fixture.detectChanges();

      expect(containerEl.querySelectorAll('wtf2-error').length)
        .toBe(0, 'Expected no error messages after being touched.');

      component.errorState = true;
      fixture.detectChanges();

      expect(containerEl.querySelectorAll('wtf2-error').length)
        .toBe(1, 'Expected one error messages to have been rendered.');
    }));

    it('should display an error message when global error matcher returns true', fakeAsync(() => {
      let fixture = createComponent(Wtf2InputWithFormErrorMessages, [{
        provide: ErrorStateMatcher, useValue: {isErrorState: () => true}}
      ]);

      fixture.detectChanges();

      let containerEl = fixture.debugElement.query(By.css('wtf2-form-field')).nativeElement;
      let testComponent = fixture.componentInstance;

      // Expect the control to still be untouched but the error to show due to the global setting
      expect(testComponent.formControl.untouched).toBe(true, 'Expected untouched form control');
      expect(containerEl.querySelectorAll('wtf2-error').length).toBe(1, 'Expected an error message');
    }));

    it('should display an error message when using ShowOnDirtyErrorStateMatcher', fakeAsync(() => {
      let fixture = createComponent(Wtf2InputWithFormErrorMessages, [{
        provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher
      }]);
      fixture.detectChanges();

      let containerEl = fixture.debugElement.query(By.css('wtf2-form-field')).nativeElement;
      let testComponent = fixture.componentInstance;

      expect(testComponent.formControl.invalid).toBe(true, 'Expected form control to be invalid');
      expect(containerEl.querySelectorAll('wtf2-error').length).toBe(0, 'Expected no error message');

      testComponent.formControl.markAsTouched();
      fixture.detectChanges();

      expect(containerEl.querySelectorAll('wtf2-error').length)
        .toBe(0, 'Expected no error messages when touched');

      testComponent.formControl.markAsDirty();
      fixture.detectChanges();

      expect(containerEl.querySelectorAll('wtf2-error').length)
        .toBe(1, 'Expected one error message when dirty');
    }));
  });

  it('should update the value when using FormControl.setValue', fakeAsync(() => {
    let fixture = createComponent(Wtf2InputWithFormControl);
    fixture.detectChanges();

    let input = fixture.debugElement.query(By.directive(Wtf2Input))
      .injector.get<Wtf2Input>(Wtf2Input);

    expect(input.value).toBeFalsy();

    fixture.componentInstance.formControl.setValue('something');

    expect(input.value).toBe('something');
  }));

  it('should display disabled styles when using FormControl.disable()', fakeAsync(() => {
    const fixture = createComponent(Wtf2InputWithFormControl);
    fixture.detectChanges();

    const formFieldEl =
        fixture.debugElement.query(By.css('.wtf2-form-field')).nativeElement;
    const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;

    expect(formFieldEl.classList)
      .not.toContain('wtf2-form-field-disabled', `Expected form field not to start out disabled.`);
    expect(inputEl.disabled).toBe(false);

    fixture.componentInstance.formControl.disable();
    fixture.detectChanges();

    expect(formFieldEl.classList).toContain('wtf2-form-field-disabled',
      `Expected form field to look disabled after disable() is called.`);
    expect(inputEl.disabled).toBe(true);
  }));

  it('should not treat the number 0 as empty', fakeAsync(() => {
    let fixture = createComponent(Wtf2InputZeroTestController);
    fixture.detectChanges();
    flush();

    fixture.detectChanges();

    let el = fixture.debugElement.query(By.css('label')).nativeElement;
    expect(el).not.toBeNull();
    expect(el.classList.contains('wtf2-form-field-empty')).toBe(false);
  }));

  it('should update when the form field value is patched without emitting', fakeAsync(() => {
    const fixture = createComponent(Wtf2InputWithFormControl);
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css('label')).nativeElement;

    expect(el.classList).toContain('wtf2-form-field-empty');

    fixture.componentInstance.formControl.patchValue('value', {emitEvent: false});
    fixture.detectChanges();

    expect(el.classList).not.toContain('wtf2-form-field-empty');
  }));

});

describe('Wtf2Input with appearance', () => {
  const nonLegacyAppearances: Wtf2FormFieldAppearance[] = ['standard', 'fill'];
  let fixture: ComponentFixture<Wtf2InputWithAppearance>;
  let testComponent: Wtf2InputWithAppearance;
  let containerEl: HTMLElement;

  beforeEach(fakeAsync(() => {
    fixture = createComponent(Wtf2InputWithAppearance);
    fixture.detectChanges();
    testComponent = fixture.componentInstance;
    containerEl = fixture.debugElement.query(By.css('wtf2-form-field')).nativeElement;
  }));

  it('legacy appearance should promote placeholder to label', fakeAsync(() => {
    testComponent.appearance = 'legacy';
    fixture.detectChanges();

    expect(containerEl.classList).toContain('wtf2-form-field-appearance-legacy');
    expect(testComponent.formField._hasFloatingLabel()).toBe(true);
    expect(testComponent.formField._hideControlPlaceholder()).toBe(true);
  }));

  it('non-legacy appearances should not promote placeholder to label', fakeAsync(() => {
    for (let appearance of nonLegacyAppearances) {
      testComponent.appearance = appearance;
      fixture.detectChanges();

      expect(containerEl.classList).toContain(`wtf2-form-field-appearance-${appearance}`);
      expect(testComponent.formField._hasFloatingLabel()).toBe(false);
      expect(testComponent.formField._hideControlPlaceholder()).toBe(false);
    }
  }));

  it('legacy appearance should respect float never', fakeAsync(() => {
    testComponent.appearance = 'legacy';
    fixture.detectChanges();

    expect(containerEl.classList).toContain('wtf2-form-field-appearance-legacy');
    expect(testComponent.formField.floatLabel).toBe('never');
  }));

  it('non-legacy appearances should not respect float never', fakeAsync(() => {
    for (let appearance of nonLegacyAppearances) {
      testComponent.appearance = appearance;
      fixture.detectChanges();

      expect(containerEl.classList).toContain(`wtf2-form-field-appearance-${appearance}`);
      expect(testComponent.formField.floatLabel).toBe('auto');
    }
  }));

  it('should recalculate gaps when switching to outline appearance after init', fakeAsync(() => {
    fixture.destroy();
    TestBed.resetTestingModule();

    const outlineFixture = createComponent(Wtf2InputWithAppearanceAndLabel);

    outlineFixture.detectChanges();
    outlineFixture.componentInstance.appearance = 'legacy';
    outlineFixture.detectChanges();
    flush();

    outlineFixture.componentInstance.appearance = 'outline';
    outlineFixture.detectChanges();
    flush();
    outlineFixture.detectChanges();

    const wrapperElement = outlineFixture.nativeElement;
    const outlineStart = wrapperElement.querySelector('.wtf2-form-field-outline-start');
    const outlineGap = wrapperElement.querySelector('.wtf2-form-field-outline-gap');

    expect(parseInt(outlineStart.style.width)).toBeGreaterThan(0);
    expect(parseInt(outlineGap.style.width)).toBeGreaterThan(0);
  }));

  it('should not set an outline gap if the label is empty', fakeAsync(() => {
    fixture.destroy();
    TestBed.resetTestingModule();

    const outlineFixture = createComponent(Wtf2InputWithAppearanceAndLabel);

    outlineFixture.componentInstance.labelContent = '';
    outlineFixture.detectChanges();
    outlineFixture.componentInstance.appearance = 'outline';
    outlineFixture.detectChanges();
    flush();
    outlineFixture.detectChanges();

    const outlineGap = outlineFixture.nativeElement.querySelector('.wtf2-form-field-outline-gap');

    expect(parseInt(outlineGap.style.width)).toBeFalsy();
  }));

  it('should calculate the gaps if the default appearance is provided through DI', fakeAsync(() => {
    fixture.destroy();
    TestBed.resetTestingModule();

    let zone: MockNgZone;
    const labelFixture = createComponent(Wtf2InputWithLabel, [
      {
        provide: WTF2_FORM_FIELD_DEFAULT_OPTIONS,
        useValue: {appearance: 'outline'}
      },
      {
        provide: NgZone,
        useFactory: () => zone = new MockNgZone()
      }
    ]);

    labelFixture.detectChanges();
    zone!.simulateZoneExit();
    flush();
    labelFixture.detectChanges();

    const wrapperElement = labelFixture.nativeElement;
    const outlineStart = wrapperElement.querySelector('.wtf2-form-field-outline-start');
    const outlineGap = wrapperElement.querySelector('.wtf2-form-field-outline-gap');

    expect(parseInt(outlineStart.style.width)).toBeGreaterThan(0);
    expect(parseInt(outlineGap.style.width)).toBeGreaterThan(0);
  }));

  it('should update the outline gap when the prefix/suffix is added or removed', fakeAsync(() => {
    fixture.destroy();
    TestBed.resetTestingModule();

    const outlineFixture = createComponent(Wtf2InputWithAppearanceAndLabel);

    outlineFixture.componentInstance.appearance = 'outline';
    outlineFixture.detectChanges();
    flush();
    outlineFixture.detectChanges();

    spyOn(outlineFixture.componentInstance.formField, 'updateOutlineGap');

    outlineFixture.componentInstance.showPrefix = true;
    outlineFixture.detectChanges();
    flush();
    outlineFixture.detectChanges();

    expect(outlineFixture.componentInstance.formField.updateOutlineGap).toHaveBeenCalled();
  }));

  it('should calculate the outline gaps if the element starts off invisible', fakeAsync(() => {
    fixture.destroy();
    TestBed.resetTestingModule();

    let zone: MockNgZone;
    const invisibleFixture = createComponent(Wtf2InputWithOutlineInsideInvisibleElement, [{
      provide: NgZone,
      useFactory: () => zone = new MockNgZone()
    }]);

    invisibleFixture.detectChanges();
    zone!.simulateZoneExit();
    flush();
    invisibleFixture.detectChanges();

    const wrapperElement = invisibleFixture.nativeElement;
    const formField = wrapperElement.querySelector('.wtf2-form-field');
    const outlineStart = wrapperElement.querySelector('.wtf2-form-field-outline-start');
    const outlineGap = wrapperElement.querySelector('.wtf2-form-field-outline-gap');

    formField.style.display = '';
    invisibleFixture.detectChanges();
    zone!.simulateZoneExit();
    flush();
    invisibleFixture.detectChanges();

    expect(parseInt(outlineStart.style.width)).toBeGreaterThan(0);
    expect(parseInt(outlineGap.style.width)).toBeGreaterThan(0);
  }));

  it('should update the outline gap if the direction changes', fakeAsync(() => {
    fixture.destroy();
    TestBed.resetTestingModule();

    const fakeDirectionality = {change: new Subject<Direction>(), value: 'ltr'};
    const outlineFixture = createComponent(Wtf2InputWithAppearanceAndLabel, [{
      provide: Directionality,
      useValue: fakeDirectionality
    }]);

    outlineFixture.componentInstance.appearance = 'outline';
    outlineFixture.detectChanges();
    flush();
    outlineFixture.detectChanges();

    spyOn(outlineFixture.componentInstance.formField, 'updateOutlineGap');

    fakeDirectionality.value = 'rtl';
    fakeDirectionality.change.next('rtl');
    outlineFixture.detectChanges();
    flush();
    outlineFixture.detectChanges();

    expect(outlineFixture.componentInstance.formField.updateOutlineGap).toHaveBeenCalled();
  }));



});

describe('Wtf2FormField default options', () => {
  it('should be legacy appearance if no default options provided', fakeAsync(() => {
    const fixture = createComponent(Wtf2InputWithAppearance);
    fixture.detectChanges();
    flush();
    expect(fixture.componentInstance.formField.appearance).toBe('legacy');
  }));

  it('should be legacy appearance if empty default options provided', fakeAsync(() => {
    const fixture = createComponent(Wtf2InputWithAppearance, [{
      provide: WTF2_FORM_FIELD_DEFAULT_OPTIONS, useValue: {}}
    ]);

    fixture.detectChanges();
    flush();
    expect(fixture.componentInstance.formField.appearance).toBe('legacy');
  }));

  it('should be custom default appearance if custom appearance specified in default options',
      fakeAsync(() => {
        const fixture = createComponent(Wtf2InputWithAppearance, [{
          provide: WTF2_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}
        ]);
        fixture.detectChanges();
        flush();
        expect(fixture.componentInstance.formField.appearance).toBe('fill');
      }));
});

describe('Wtf2Input with textarea autosize', () => {
  it('should not calculate wrong content height due to long placeholders', () => {
    const fixture = createComponent(AutosizeTextareaWithLongPlaceholder);
    fixture.detectChanges();

    const textarea = fixture.nativeElement.querySelector('textarea');
    const autosize = fixture.componentInstance.autosize;

    autosize.resizeToFitContent(true);

    const heightWithLongPlaceholder = textarea.clientHeight;

    fixture.componentInstance.placeholder = 'Short';
    fixture.detectChanges();

    autosize.resizeToFitContent(true);

    expect(textarea.clientHeight).toBe(heightWithLongPlaceholder,
        'Expected the textarea height to be the same with a long placeholder.');
  });

  it('should work in a tab', () => {
    const fixture = createComponent(AutosizeTextareaInATab, [], [Wtf2TabsModule]);
    fixture.detectChanges();
    const textarea = fixture.nativeElement.querySelector('textarea');
    expect(textarea.getBoundingClientRect().height).toBeGreaterThan(1);
  });

  it('should work in a step', () => {
    const fixture = createComponent(AutosizeTextareaInAStep, [], [Wtf2StepperModule]);
    fixture.detectChanges();
    const textarea = fixture.nativeElement.querySelector('textarea');
    expect(textarea.getBoundingClientRect().height).toBeGreaterThan(1);
  });
});


function createComponent<T>(component: Type<T>,
                            providers: Provider[] = [],
                            imports: any[] = [],
                            declarations: any[] = []): ComponentFixture<T> {
  TestBed.configureTestingModule({
    imports: [
      FormsModule,
      Wtf2FormFieldModule,
      Wtf2InputModule,
      BrowserAnimationsModule,
      PlatformModule,
      ReactiveFormsModule,
      ...imports
    ],
    declarations: [component, ...declarations],
    providers,
  }).compileComponents();

  return TestBed.createComponent<T>(component);
}


@Component({
  template: `
    <wtf2-form-field>
      <input wtf2NativeControl id="test-id" placeholder="test">
    </wtf2-form-field>`
})
class Wtf2InputWithId {}

@Component({
  template: `<wtf2-form-field><input wtf2Input [disabled]="disabled"></wtf2-form-field>`
})
class Wtf2InputWithDisabled {
  disabled: boolean;
}

@Component({
  template: `<wtf2-form-field><input wtf2Input [required]="required"></wtf2-form-field>`
})
class Wtf2InputWithRequired {
  required: boolean;
}

@Component({
  template: `<wtf2-form-field><input wtf2Input [type]="type"></wtf2-form-field>`
})
class Wtf2InputWithType {
  type: string;
}

@Component({
  template: `<wtf2-form-field [hideRequiredMarker]="hideRequiredMarker">
                <input wtf2Input required [disabled]="disabled" placeholder="hello">
             </wtf2-form-field>`
})
class Wtf2InputPlaceholderRequiredTestComponent {
  hideRequiredMarker: boolean = false;
  disabled: boolean = false;
}

@Component({
  template: `
    <wtf2-form-field>
      <input wtf2Input>
      <wtf2-placeholder>{{placeholder}}</wtf2-placeholder>
    </wtf2-form-field>`
})
class Wtf2InputPlaceholderElementTestComponent {
  placeholder: string = 'Default Placeholder';
}

@Component({
  template: `
    <wtf2-form-field>
      <input wtf2Input placeholder="Hello" [formControl]="formControl">
    </wtf2-form-field>`
})
class Wtf2InputWithFormControl {
  formControl = new FormControl();
}

@Component({
  template: `<wtf2-form-field><input wtf2Input [placeholder]="placeholder"></wtf2-form-field>`
})
class Wtf2InputPlaceholderAttrTestComponent {
  placeholder: string = '';
}

@Component({
  template: `<wtf2-form-field><input wtf2Input><wtf2-hint>{{label}}</wtf2-hint></wtf2-form-field>`
})
class Wtf2InputHintLabel2TestController {
  label: string = '';
}

@Component({
  template: `<wtf2-form-field [hintLabel]="label"><input wtf2Input></wtf2-form-field>`
})
class Wtf2InputHintLabelTestController {
  label: string = '';
}

@Component({template: `<wtf2-form-field><input wtf2Input [type]="t"></wtf2-form-field>`})
class Wtf2InputInvalidTypeTestController {
  t = 'file';
}

@Component({
  template: `
    <wtf2-form-field>
      <input wtf2Input placeholder="Hello">
      <wtf2-placeholder>World</wtf2-placeholder>
    </wtf2-form-field>`
})
class Wtf2InputInvalidPlaceholderTestController {}

@Component({
  template: `
    <wtf2-form-field hintLabel="Hello">
      <input wtf2Input>
      <wtf2-hint>World</wtf2-hint>
    </wtf2-form-field>`
})
class Wtf2InputInvalidHint2TestController {}

@Component({
  template: `
    <wtf2-form-field>
      <input wtf2Input>
      <wtf2-hint>Hello</wtf2-hint>
      <wtf2-hint>World</wtf2-hint>
    </wtf2-form-field>`
})
class Wtf2InputInvalidHintTestController {}

@Component({
  template: `
    <wtf2-form-field>
      <input wtf2Input>
      <wtf2-hint align="start" [id]="startId">Hello</wtf2-hint>
      <wtf2-hint align="end" [id]="endId">World</wtf2-hint>
    </wtf2-form-field>`
})
class Wtf2InputMultipleHintTestController {
  startId: string;
  endId: string;
}

@Component({
  template: `
    <wtf2-form-field hintLabel="Hello">
      <input wtf2Input>
      <wtf2-hint align="end">World</wtf2-hint>
    </wtf2-form-field>`
})
class Wtf2InputMultipleHintMixedTestController {}

@Component({
  template: `
    <wtf2-form-field>
      <input wtf2Input type="date" placeholder="Placeholder">
    </wtf2-form-field>`
})
class Wtf2InputDateTestController {}

@Component({
  template: `
    <wtf2-form-field>
      <input wtf2Input type="text" placeholder="Placeholder">
    </wtf2-form-field>`
})
class Wtf2InputTextTestController {}

@Component({
  template: `
    <wtf2-form-field>
      <input wtf2Input type="password" placeholder="Placeholder">
    </wtf2-form-field>`
})
class Wtf2InputPasswordTestController {}

@Component({
  template: `
    <wtf2-form-field>
      <input wtf2Input type="number" placeholder="Placeholder">
    </wtf2-form-field>`
})
class Wtf2InputNumberTestController {}

@Component({
  template: `
    <wtf2-form-field>
      <input wtf2Input type="number" placeholder="Placeholder" [(ngModel)]="value">
    </wtf2-form-field>`
})
class Wtf2InputZeroTestController {
  value = 0;
}

@Component({
  template: `
    <wtf2-form-field>
      <input wtf2Input placeholder="Label" [value]="value">
    </wtf2-form-field>`
})
class Wtf2InputWithValueBinding {
  value: string = 'Initial';
}

@Component({
  template: `
    <wtf2-form-field floatLabel="never">
      <input wtf2Input placeholder="Label">
    </wtf2-form-field>
  `
})
class Wtf2InputWithStaticLabel {}

@Component({
  template: `
    <wtf2-form-field [floatLabel]="shouldFloat">
      <input wtf2Input placeholder="Label">
    </wtf2-form-field>`
})
class Wtf2InputWithDynamicLabel {
  shouldFloat: string = 'always';
}

@Component({
  template: `
    <wtf2-form-field>
      <textarea wtf2NativeControl [rows]="rows" [cols]="cols" [wrap]="wrap" placeholder="Snacks">
      </textarea>
    </wtf2-form-field>`
})
class Wtf2InputTextareaWithBindings {
  rows: number = 4;
  cols: number = 8;
  wrap: string = 'hard';
}

@Component({
  template: `<wtf2-form-field><input></wtf2-form-field>`
})
class Wtf2InputMissingWtf2InputTestController {}

@Component({
  template: `
    <form #form="ngForm" novalidate>
      <wtf2-form-field>
        <input wtf2Input [formControl]="formControl">
        <wtf2-hint>Please type something</wtf2-hint>
        <wtf2-error *ngIf="renderError">This field is required</wtf2-error>
      </wtf2-form-field>
    </form>
  `
})
class Wtf2InputWithFormErrorMessages {
  @ViewChild('form', {static: false}) form: NgForm;
  formControl = new FormControl('', Validators.required);
  renderError = true;
}

@Component({
  template: `
    <form [formGroup]="formGroup">
      <wtf2-form-field>
        <input wtf2Input
            formControlName="name"
            [errorStateMatcher]="customErrorStateMatcher">
        <wtf2-hint>Please type something</wtf2-hint>
        <wtf2-error>This field is required</wtf2-error>
      </wtf2-form-field>
    </form>
  `
})
class Wtf2InputWithCustomErrorStateMatcher {
  formGroup = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  errorState = false;

  customErrorStateMatcher = {
    isErrorState: () => this.errorState
  };
}

@Component({
  template: `
    <form [formGroup]="formGroup" novalidate>
      <wtf2-form-field>
        <input wtf2Input formControlName="name">
        <wtf2-hint>Please type something</wtf2-hint>
        <wtf2-error>This field is required</wtf2-error>
      </wtf2-form-field>
    </form>
  `
})
class Wtf2InputWithFormGroupErrorMessages {
  @ViewChild(FormGroupDirective, {static: false}) formGroupDirective: FormGroupDirective;
  formGroup = new FormGroup({
    name: new FormControl('', Validators.required)
  });
}

@Component({
  template: `
    <wtf2-form-field>
      <div wtf2Prefix>Prefix</div>
      <input wtf2Input>
      <div wtf2Suffix>Suffix</div>
    </wtf2-form-field>
  `
})
class Wtf2InputWithPrefixAndSuffix {}

@Component({
  template: `
    <wtf2-form-field>
      <input wtf2Input *ngIf="renderInput">
    </wtf2-form-field>
  `
})
class Wtf2InputWithNgIf {
  renderInput = true;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <wtf2-form-field>
      <input wtf2Input placeholder="Label" [formControl]="formControl">
    </wtf2-form-field>
  `
})
class Wtf2InputOnPush {
  formControl = new FormControl('');
}

@Component({
  template: `
    <wtf2-form-field>
      <input wtf2Input [readonly]="isReadonly" value="Only for reading">
    </wtf2-form-field>
  `
})
class Wtf2InputWithReadonlyInput {
  isReadonly = true;
}

@Component({
  template: `
    <wtf2-form-field>
      <wtf2-label>Label</wtf2-label>
      <input wtf2Input>
    </wtf2-form-field>
  `
})
class Wtf2InputWithLabel {}

@Component({
  template: `
    <wtf2-form-field [floatLabel]="floatLabel">
      <wtf2-label>Label</wtf2-label>
      <input wtf2Input placeholder="Placeholder">
    </wtf2-form-field>
  `
})
class Wtf2InputWithLabelAndPlaceholder {
  floatLabel: FloatLabelType;
}

@Component({
  template: `
    <wtf2-form-field [appearance]="appearance" floatLabel="never">
      <input wtf2Input placeholder="Placeholder">
    </wtf2-form-field>
  `
})
class Wtf2InputWithAppearance {
  @ViewChild(Wtf2FormField, {static: false}) formField: Wtf2FormField;
  appearance: Wtf2FormFieldAppearance;
}

@Component({
  template: `
    <wtf2-form-field [appearance]="appearance">
      <span wtf2Prefix *ngIf="showPrefix">Somewhat long prefix</span>
      <wtf2-label>{{labelContent}}</wtf2-label>
      <input wtf2Input>
    </wtf2-form-field>
  `
})
class Wtf2InputWithAppearanceAndLabel {
  @ViewChild(Wtf2FormField, {static: false}) formField: Wtf2FormField;
  appearance: Wtf2FormFieldAppearance;
  showPrefix: boolean;
  labelContent = 'Label';
}

@Component({
  template: `
    <wtf2-form-field>
      <input wtf2Input>
    </wtf2-form-field>
  `
})
class Wtf2InputWithoutPlaceholder {
}

@Component({
  template: `
    <wtf2-form-field appearance="outline" style="display: none;">
      <wtf2-label>Label</wtf2-label>
      <input wtf2Input>
    </wtf2-form-field>
  `
})
class Wtf2InputWithOutlineInsideInvisibleElement {}


// Styles to reset padding and border to make measurement comparisons easier.
const textareaStyleReset = `
    textarea {
      padding: 0;
      border: none;
      overflow: auto;
    }`;

@Component({
  template: `
    <wtf2-form-field style="width: 100px">
      <textarea wtf2Input wtf2TextareaAutosize [placeholder]="placeholder"></textarea>
    </wtf2-form-field>`,
  styles: [textareaStyleReset],
})
class AutosizeTextareaWithLongPlaceholder {
  placeholder = 'Long Long Long Long Long Long Long Long Placeholder';
  @ViewChild(Wtf2TextareaAutosize, {static: false}) autosize: Wtf2TextareaAutosize;
}

@Component({
  template: `
    <wtf2-tab-group>
      <wtf2-tab label="Tab 1">
        <wtf2-form-field>
          <textarea wtf2Input wtf2TextareaAutosize>
            Blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah
          </textarea>
        </wtf2-form-field>
      </wtf2-tab>
    </wtf2-tab-group>
  `
})
class AutosizeTextareaInATab {}

@Component({
  template: `
    <wtf2-horizontal-stepper>
      <wtf2-step label="Step 1">
        <wtf2-form-field>
          <textarea wtf2Input wtf2TextareaAautosize>
            Blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah
          </textarea>
        </wtf2-form-field>
      </wtf2-step>
    </wtf2-horizontal-stepper>
  `
})
class AutosizeTextareaInAStep {}

@Component({
  template: `
    <wtf2-form-field>
      <select wtf2NativeControl id="test-id" [disabled]="disabled" [required]="required">
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </select>
    </wtf2-form-field>`
})
class Wtf2InputSelect {
  disabled: boolean;
  required: boolean;
}

@Component({
  template: `
    <wtf2-form-field>
      <select wtf2NativeControl>
        <option value="" disabled selected></option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </select>
    </wtf2-form-field>`
})
class Wtf2InputSelectWithNoLabelNoValue {}

@Component({
  template: `
    <wtf2-form-field>
      <select wtf2NativeControl>
        <option value="" label="select a car"></option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </select>
    </wtf2-form-field>`
})
class Wtf2InputSelectWithLabel {}

@Component({
  template: `
    <wtf2-form-field>
      <select wtf2NativeControl>
        <option value="">select a car</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </select>
    </wtf2-form-field>`
})
class Wtf2InputSelectWithInnerHtml {}

@Component({
  template: `
    <wtf2-form-field floatLabel="never">
      <input wtf2Input customInputAccessor placeholder="Placeholder">
    </wtf2-form-field>`
})
class Wtf2InputWithCustomAccessor {}

@Component({
  template: `
    <wtf2-form-field>
      <select wtf2NativeControl>
      </select>
    </wtf2-form-field>`
})
class Wtf2InputSelectWithoutOptions {}


/** Custom component that never has a value. Used for testing the `WTF2_INPUT_VALUE_ACCESSOR`. */
@Directive({
  selector: 'input[customInputAccessor]',
  providers: [{
    provide: WTF2_INPUT_VALUE_ACCESSOR,
    useExisting: CustomWtf2InputAccessor
  }]
})
class CustomWtf2InputAccessor {
  get value() { return this._value; }
  set value(_value: any) {}
  private _value = null;
}
