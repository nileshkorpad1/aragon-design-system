/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {DOWN_ARROW} from '@angular/cdk/keycodes';
import {
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  OnDestroy,
  Optional,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {DateAdapter, WTF2_DATE_FORMATS, Wtf2DateFormat, ThemePalette} from '../core';
import {Wtf2FormField} from '../form-field';
import {WTF2_INPUT_VALUE_ACCESSOR} from '../input';
import {Subscription} from 'rxjs';
import {Wtf2Datepicker} from './datepicker';
import {createMissingDateImplError} from './datepicker-errors';

/** @docs-private */
export const WTF2_DATEPICKER_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Wtf2DatepickerInput),
  multi: true
};

/** @docs-private */
export const WTF2_DATEPICKER_VALIDATORS: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => Wtf2DatepickerInput),
  multi: true
};


/**
 * An event used for datepicker input and change events. We don't always have access to a native
 * input or change event because the event may have been triggered by the user clicking on the
 * calendar popup. For consistency, we always use Wtf2DatepickerInputEvent instead.
 */
export class Wtf2DatepickerInputEvent<D> {
  /** The new value for the target datepicker input. */
  value: D | null;

  constructor(
    /** Reference to the datepicker input component that emitted the event. */
    public target: Wtf2DatepickerInput<D>,
    /** Reference to the native input element associated with the datepicker input. */
    public targetElement: HTMLElement) {
    this.value = this.target.value;
  }
}


/** Directive used to connect an input to a Wtf2Datepicker. */
@Directive({
  selector: 'input[wtf2Datepicker]',
  providers: [
    WTF2_DATEPICKER_VALUE_ACCESSOR,
    WTF2_DATEPICKER_VALIDATORS,
    {provide: WTF2_INPUT_VALUE_ACCESSOR, useExisting: Wtf2DatepickerInput},
  ],
  host: {
    'aria-haspopup': 'dialog',
    '[attr.aria-owns]': '(_datepicker?.opened && _datepicker.id) || null',
    '[attr.min]': 'min ? _dateAdapter.toIso8601(min) : null',
    '[attr.max]': 'max ? _dateAdapter.toIso8601(max) : null',
    '[disabled]': 'disabled',
    '(input)': '_onInput($event.target.value)',
    '(change)': '_onChange()',
    '(blur)': '_onBlur()',
    '(keydown)': '_onKeydown($event)',
  },
  exportAs: 'wtf2DatepickerInput',
})
export class Wtf2DatepickerInput<D> implements ControlValueAccessor, OnDestroy, Validator {
  /** The datepicker that this input is associated with. */
  @Input()
  set wtf2Datepicker(value: Wtf2Datepicker<D>) {
    if (!value) {
      return;
    }

    this._datepicker = value;
    this._datepicker._registerInput(this);
    this._datepickerSubscription.unsubscribe();

    this._datepickerSubscription = this._datepicker._selectedChanged.subscribe((selected: D) => {
      this.value = selected;
      this._cvaOnChange(selected);
      this._onTouched();
      this.dateInput.emit(new Wtf2DatepickerInputEvent(this, this._elementRef.nativeElement));
      this.dateChange.emit(new Wtf2DatepickerInputEvent(this, this._elementRef.nativeElement));
    });
  }
  _datepicker: Wtf2Datepicker<D>;

  /** Function that can be used to filter out dates within the datepicker. */
  @Input()
  set wtf2DatepickerFilter(value: (date: D | null) => boolean) {
    this._dateFilter = value;
    this._validatorOnChange();
  }
  _dateFilter: (date: D | null) => boolean;

  /** The value of the input. */
  @Input()
  get value(): D | null { return this._value; }
  set value(value: D | null) {
    value = this._dateAdapter.deserialize(value);
    this._lastValueValid = !value || this._dateAdapter.isValid(value);
    value = this._getValidDateOrNull(value);
    const oldDate = this.value;
    this._value = value;
    this._FormatValue(value);

    if (!this._dateAdapter.sameDate(oldDate, value)) {
      this._valueChange.emit(value);
    }
  }
  private _value: D | null;

  /** The minimum valid date. */
  @Input()
  get min(): D | null { return this._min; }
  set min(value: D | null) {
    this._min = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
    this._validatorOnChange();
  }
  private _min: D | null;

  /** The maximum valid date. */
  @Input()
  get max(): D | null { return this._max; }
  set max(value: D | null) {
    this._max = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
    this._validatorOnChange();
  }
  private _max: D | null;

  /** Whether the datepicker-input is disabled. */
  @Input()
  get disabled(): boolean { return !!this._disabled; }
  set disabled(value: boolean) {
    const newValue = coerceBooleanProperty(value);
    const element = this._elementRef.nativeElement;

    if (this._disabled !== newValue) {
      this._disabled = newValue;
      this._disabledChange.emit(newValue);
    }

    // We need to null check the `blur` method, because it's undefined during SSR.
    if (newValue && element.blur) {
      // Normally, native input elements autowtf2ically blur if they turn disabled. This behavior
      // is problewtf2ic, because it would mean that it triggers another change detection cycle,
      // which then causes a changed after checked error if the input element was focused before.
      element.blur();
    }
  }
  private _disabled: boolean;

  /** Emits when a `change` event is fired on this `<input>`. */
  @Output() readonly dateChange: EventEmitter<Wtf2DatepickerInputEvent<D>> =
      new EventEmitter<Wtf2DatepickerInputEvent<D>>();

  /** Emits when an `input` event is fired on this `<input>`. */
  @Output() readonly dateInput: EventEmitter<Wtf2DatepickerInputEvent<D>> =
      new EventEmitter<Wtf2DatepickerInputEvent<D>>();

  /** Emits when the value changes (either due to user input or programwtf2ic change). */
  _valueChange = new EventEmitter<D | null>();

  /** Emits when the disabled state has changed */
  _disabledChange = new EventEmitter<boolean>();

  _onTouched = () => {};

  private _cvaOnChange: (value: any) => void = () => {};

  private _validatorOnChange = () => {};

  private _datepickerSubscription = Subscription.EMPTY;

  private _localeSubscription = Subscription.EMPTY;

  /** The form control validator for whether the input parses. */
  private _parseValidator: ValidatorFn = (): ValidationErrors | null => {
    return this._lastValueValid ?
        null : {'wtf2DatepickerParse': {'text': this._elementRef.nativeElement.value}};
  }

  /** The form control validator for the min date. */
  private _minValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const controlValue = this._getValidDateOrNull(this._dateAdapter.deserialize(control.value));
    return (!this.min || !controlValue ||
        this._dateAdapter.compareDate(this.min, controlValue) <= 0) ?
        null : {'wtf2DatepickerMin': {'min': this.min, 'actual': controlValue}};
  }

  /** The form control validator for the max date. */
  private _maxValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const controlValue = this._getValidDateOrNull(this._dateAdapter.deserialize(control.value));
    return (!this.max || !controlValue ||
        this._dateAdapter.compareDate(this.max, controlValue) >= 0) ?
        null : {'wtf2DatepickerMax': {'max': this.max, 'actual': controlValue}};
  }

  /** The form control validator for the date filter. */
  private _filterValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const controlValue = this._getValidDateOrNull(this._dateAdapter.deserialize(control.value));
    return !this._dateFilter || !controlValue || this._dateFilter(controlValue) ?
        null : {'wtf2DatepickerFilter': true};
  }

  /** The combined form control validator for this input. */
  private _validator: ValidatorFn | null =
      Validators.compose(
          [this._parseValidator, this._minValidator, this._maxValidator, this._filterValidator]);

  /** Whether the last value set on the input was valid. */
  private _lastValueValid = false;

  constructor(
      private _elementRef: ElementRef<HTMLInputElement>,
      @Optional() public _dateAdapter: DateAdapter<D>,
      @Optional() @Inject(WTF2_DATE_FORMATS) private _dateFormat: Wtf2DateFormat,
      @Optional() private _formField: Wtf2FormField) {
    if (!this._dateAdapter) {
      throw createMissingDateImplError('DateAdapter');
    }
    if (!this._dateFormat) {
      throw createMissingDateImplError('WTF2_DATE_FORMATS');
    }

    // Update the displayed date when the locale changes.
    this._localeSubscription = _dateAdapter.localeChanges.subscribe(() => {
      this.value = this.value;
    });
  }

  ngOnDestroy() {
    this._datepickerSubscription.unsubscribe();
    this._localeSubscription.unsubscribe();
    this._valueChange.complete();
    this._disabledChange.complete();
  }

  /** @docs-private */
  registerOnValidatorChange(fn: () => void): void {
    this._validatorOnChange = fn;
  }

  /** @docs-private */
  validate(c: AbstractControl): ValidationErrors | null {
    return this._validator ? this._validator(c) : null;
  }

  /**
   * @deprecated
   * @breaking-change 8.0.0 Use `getConnectedOverlayOrigin` instead
   */
  getPopupConnectionElementRef(): ElementRef {
    return this.getConnectedOverlayOrigin();
  }

  /**
   * Gets the element that the datepicker popup should be connected to.
   * @return The element to connect the popup to.
   */
  getConnectedOverlayOrigin(): ElementRef {
    return this._formField ? this._formField.getConnectedOverlayOrigin() : this._elementRef;
  }

  // Implemented as part of ControlValueAccessor.
  writeValue(value: D): void {
    this.value = value;
  }

  // Implemented as part of ControlValueAccessor.
  registerOnChange(fn: (value: any) => void): void {
    this._cvaOnChange = fn;
  }

  // Implemented as part of ControlValueAccessor.
  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  // Implemented as part of ControlValueAccessor.
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  _onKeydown(event: KeyboardEvent) {
    const isAltDownArrow = event.altKey && event.keyCode === DOWN_ARROW;

    if (this._datepicker && isAltDownArrow && !this._elementRef.nativeElement.readOnly) {
      this._datepicker.open();
      event.preventDefault();
    }
  }

  _onInput(value: string) {
    let date = this._dateAdapter.parse(value, this._dateFormat.parse.dateInput);
    this._lastValueValid = !date || this._dateAdapter.isValid(date);
    date = this._getValidDateOrNull(date);

    if (!this._dateAdapter.sameDate(date, this._value)) {
      this._value = date;
      this._cvaOnChange(date);
      this._valueChange.emit(date);
      this.dateInput.emit(new Wtf2DatepickerInputEvent(this, this._elementRef.nativeElement));
    } else {
      this._validatorOnChange();
    }
  }

  _onChange() {
    this.dateChange.emit(new Wtf2DatepickerInputEvent(this, this._elementRef.nativeElement));
  }

  /** Returns the palette used by the input's form field, if any. */
  _getThemePalette(): ThemePalette {
    return this._formField ? this._formField.color : undefined;
  }

  /** Handles blur events on the input. */
  _onBlur() {
    // ReFormat the input only if we have a valid value.
    if (this.value) {
      this._FormatValue(this.value);
    }

    this._onTouched();
  }

  /** Format a value and sets it on the input element. */
  private _FormatValue(value: D | null) {
    this._elementRef.nativeElement.value =
        value ? this._dateAdapter.Format(value, this._dateFormat.display.dateInput) : '';
  }

  /**
   * @param obj The object to check.
   * @returns The given object if it is both a date instance and valid, otherwise null.
   */
  private _getValidDateOrNull(obj: any): D | null {
    return (this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj)) ? obj : null;
  }
}
