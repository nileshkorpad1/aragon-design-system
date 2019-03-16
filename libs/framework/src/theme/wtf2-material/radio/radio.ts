/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {FocusMonitor} from '@angular/cdk/a11y';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {UniqueSelectionDispatcher} from '@angular/cdk/collections';
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {
  CanDisableRipple,
  CanDisableRippleCtor,
  HasTabIndex,
  HasTabIndexCtor,
  mixinDisableRipple,
  mixinTabIndex,
  ThemePalette,
} from '../core';
import {ANIMATION_MODULE_TYPE} from '@angular/platform-browser/animations';


// Increasing integer for generating unique ids for radio components.
let nextUniqueId = 0;

/**
 * Provider Expression that allows wtf2-radio-group to register as a ControlValueAccessor. This
 * allows it to support [(ngModel)] and ngControl.
 * @docs-private
 */
export const WTF2_RADIO_GROUP_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Wtf2RadioGroup),
  multi: true
};

/** Change event object emitted by Wtf2Radio and Wtf2RadioGroup. */
export class Wtf2RadioChange {
  constructor(
    /** The Wtf2RadioButton that emits the change event. */
    public source: Wtf2RadioButton,
    /** The value of the Wtf2RadioButton. */
    public value: any) {}
}

/**
 * A group of radio buttons. May contain one or more `<wtf2-radio-button>` elements.
 */
@Directive({
  selector: 'wtf2-radio-group',
  exportAs: 'wtf2RadioGroup',
  providers: [WTF2_RADIO_GROUP_CONTROL_VALUE_ACCESSOR],
  host: {
    'role': 'radiogroup',
    'class': 'wtf2-radio-group',
  },
})
export class Wtf2RadioGroup implements AfterContentInit, ControlValueAccessor {
  /** Selected value for the radio group. */
  private _value: any = null;

  /** The HTML name attribute applied to radio buttons in this group. */
  private _name: string = `wtf2-radio-group-${nextUniqueId++}`;

  /** The currently selected radio button. Should match value. */
  private _selected: Wtf2RadioButton | null = null;

  /** Whether the `value` has been set to its initial value. */
  private _isInitialized: boolean = false;

  /** Whether the labels should appear after or before the radio-buttons. Defaults to 'after' */
  private _labelPosition: 'before' | 'after' = 'after';

  /** Whether the radio group is disabled. */
  private _disabled: boolean = false;

  /** Whether the radio group is required. */
  private _required: boolean = false;

  /** The method to be called in order to update ngModel */
  _controlValueAccessorChangeFn: (value: any) => void = () => {};

  /**
   * onTouch function registered via registerOnTouch (ControlValueAccessor).
   * @docs-private
   */
  onTouched: () => any = () => {};

  /**
   * Event emitted when the group value changes.
   * Change events are only emitted when the value changes due to user interaction with
   * a radio button (the same behavior as `<input type-"radio">`).
   */
  @Output() readonly change: EventEmitter<Wtf2RadioChange> = new EventEmitter<Wtf2RadioChange>();

  /** Child radio buttons. */
  @ContentChildren(forwardRef(() => Wtf2RadioButton), { descendants: true })
  _radios: QueryList<Wtf2RadioButton>;

  /** Theme color for all of the radio buttons in the group. */
  @Input() color: ThemePalette;

  /** Name of the radio button group. All radio buttons inside this group will use this name. */
  @Input()
  get name(): string { return this._name; }
  set name(value: string) {
    this._name = value;
    this._updateRadioButtonNames();
  }

  /** Whether the labels should appear after or before the radio-buttons. Defaults to 'after' */
  @Input()
  get labelPosition(): 'before' | 'after' {
    return this._labelPosition;
  }
  set labelPosition(v) {
    this._labelPosition = v === 'before' ? 'before' : 'after';
    this._markRadiosForCheck();
  }

  /**
   * Value for the radio-group. Should equal the value of the selected radio button if there is
   * a corresponding radio button with a matching value. If there is not such a corresponding
   * radio button, this value persists to be applied in case a new radio button is added with a
   * matching value.
   */
  @Input()
  get value(): any { return this._value; }
  set value(newValue: any) {
    if (this._value !== newValue) {
      // Set this before proceeding to ensure no circular loop occurs with selection.
      this._value = newValue;

      this._updateSelectedRadioFromValue();
      this._checkSelectedRadioButton();
    }
  }

  _checkSelectedRadioButton() {
    if (this._selected && !this._selected.checked) {
      this._selected.checked = true;
    }
  }

  /**
   * The currently selected radio button. If set to a new radio button, the radio group value
   * will be updated to match the new selected button.
   */
  @Input()
  get selected() { return this._selected; }
  set selected(selected: Wtf2RadioButton | null) {
    this._selected = selected;
    this.value = selected ? selected.value : null;
    this._checkSelectedRadioButton();
  }

  /** Whether the radio group is disabled */
  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value) {
    this._disabled = coerceBooleanProperty(value);
    this._markRadiosForCheck();
  }

  /** Whether the radio group is required */
  @Input()
  get required(): boolean { return this._required; }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this._markRadiosForCheck();
  }

  constructor(private _changeDetector: ChangeDetectorRef) { }

  /**
   * Initialize properties once content children are available.
   * This allows us to propagate relevant attributes to associated buttons.
   */
  ngAfterContentInit() {
    // Mark this component as initialized in AfterContentInit because the initial value can
    // possibly be set by NgModel on Wtf2RadioGroup, and it is possible that the OnInit of the
    // NgModel occurs *after* the OnInit of the Wtf2RadioGroup.
    this._isInitialized = true;
  }

  /**
   * Mark this group as being "touched" (for ngModel). Meant to be called by the contained
   * radio buttons upon their blur.
   */
  _touch() {
    if (this.onTouched) {
      this.onTouched();
    }
  }

  private _updateRadioButtonNames(): void {
    if (this._radios) {
      this._radios.forEach(radio => {
        radio.name = this.name;
        radio._markForCheck();
      });
    }
  }

  /** Updates the `selected` radio button from the internal _value state. */
  private _updateSelectedRadioFromValue(): void {
    // If the value already matches the selected radio, do nothing.
    const isAlreadySelected = this._selected !== null && this._selected.value === this._value;

    if (this._radios && !isAlreadySelected) {
      this._selected = null;
      this._radios.forEach(radio => {
        radio.checked = this.value === radio.value;
        if (radio.checked) {
          this._selected = radio;
        }
      });
    }
  }

  /** Dispatch change event with current selection and group value. */
  _emitChangeEvent(): void {
    if (this._isInitialized) {
      this.change.emit(new Wtf2RadioChange(this._selected!, this._value));
    }
  }

  _markRadiosForCheck() {
    if (this._radios) {
      this._radios.forEach(radio => radio._markForCheck());
    }
  }

  /**
   * Sets the model value. Implemented as part of ControlValueAccessor.
   * @param value
   */
  writeValue(value: any) {
    this.value = value;
    this._changeDetector.markForCheck();
  }

  /**
   * Registers a callback to be triggered when the model value changes.
   * Implemented as part of ControlValueAccessor.
   * @param fn Callback to be registered.
   */
  registerOnChange(fn: (value: any) => void) {
    this._controlValueAccessorChangeFn = fn;
  }

  /**
   * Registers a callback to be triggered when the control is touched.
   * Implemented as part of ControlValueAccessor.
   * @param fn Callback to be registered.
   */
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  /**
   * Sets the disabled state of the control. Implemented as a part of ControlValueAccessor.
   * @param isDisabled Whether the control should be disabled.
   */
  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
    this._changeDetector.markForCheck();
  }
}

// Boilerplate for applying mixins to Wtf2RadioButton.
/** @docs-private */
class Wtf2RadioButtonBase {
  // Since the disabled property is manually defined for the Wtf2RadioButton and isn't set up in
  // the mixin base class. To be able to use the tabindex mixin, a disabled property must be
  // defined to properly work.
  disabled: boolean;

  constructor(public _elementRef: ElementRef) {}
}
// As per Material design specifications the selection control radio should use the accent color
// palette by default. https://material.io/guidelines/components/selection-controls.html
const _Wtf2RadioButtonMixinBase:
    CanDisableRippleCtor & HasTabIndexCtor & typeof Wtf2RadioButtonBase =
        mixinDisableRipple(mixinTabIndex(Wtf2RadioButtonBase));

/**
 * A Material design radio-button. Typically placed inside of `<wtf2-radio-group>` elements.
 */
@Component({
  moduleId: module.id,
  selector: 'wtf2-radio-button',
  templateUrl: 'radio.html',
  styleUrls: ['radio.scss'],
  inputs: ['disableRipple', 'tabIndex'],
  encapsulation: ViewEncapsulation.None,
  exportAs: 'wtf2RadioButton',
  host: {
    'class': 'wtf2-radio-button',
    '[class.wtf2-radio-checked]': 'checked',
    '[class.wtf2-radio-disabled]': 'disabled',
    '[class._wtf2-animation-noopable]': '_animationMode === "NoopAnimations"',
    '[class.wtf2-primary]': 'color === "primary"',
    '[class.wtf2-accent]': 'color === "accent"',
    '[class.wtf2-warn]': 'color === "warn"',
    // Needs to be -1 so the `focus` event still fires.
    '[attr.tabindex]': '-1',
    '[attr.id]': 'id',
    // Note: under normal conditions focus shouldn't land on this element, however it may be
    // programwtf2ically set, for example inside of a focus trap, in this case we want to forward
    // the focus to the native element.
    '(focus)': '_inputElement.nativeElement.focus()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Wtf2RadioButton extends _Wtf2RadioButtonMixinBase
    implements OnInit, AfterViewInit, OnDestroy, CanDisableRipple, HasTabIndex {

  private _uniqueId: string = `wtf2-radio-${++nextUniqueId}`;

  /** The unique ID for the radio button. */
  @Input() id: string = this._uniqueId;

  /** Analog to HTML 'name' attribute used to group radios for unique selection. */
  @Input() name: string;

  /** Used to set the 'aria-label' attribute on the underlying input element. */
  @Input('aria-label') ariaLabel: string;

  /** The 'aria-labelledby' attribute takes precedence as the element's text alternative. */
  @Input('aria-labelledby') ariaLabelledby: string;

  /** The 'aria-describedby' attribute is read after the element's label and field type. */
  @Input('aria-describedby') ariaDescribedby: string;

  /** Whether this radio button is checked. */
  @Input()
  get checked(): boolean { return this._checked; }
  set checked(value: boolean) {
    const newCheckedState = coerceBooleanProperty(value);
    if (this._checked !== newCheckedState) {
      this._checked = newCheckedState;
      if (newCheckedState && this.radioGroup && this.radioGroup.value !== this.value) {
        this.radioGroup.selected = this;
      } else if (!newCheckedState && this.radioGroup && this.radioGroup.value === this.value) {

        // When unchecking the selected radio button, update the selected radio
        // property on the group.
        this.radioGroup.selected = null;
      }

      if (newCheckedState) {
        // Notify all radio buttons with the same name to un-check.
        this._radioDispatcher.notify(this.id, this.name);
      }
      this._changeDetector.markForCheck();
    }
  }

  /** The value of this radio button. */
  @Input()
  get value(): any { return this._value; }
  set value(value: any) {
    if (this._value !== value) {
      this._value = value;
      if (this.radioGroup !== null) {
        if (!this.checked) {
          // Update checked when the value changed to match the radio group's value
          this.checked = this.radioGroup.value === value;
        }
        if (this.checked) {
          this.radioGroup.selected = this;
        }
      }
    }
  }

  /** Whether the label should appear after or before the radio button. Defaults to 'after' */
  @Input()
  get labelPosition(): 'before' | 'after' {
    return this._labelPosition || (this.radioGroup && this.radioGroup.labelPosition) || 'after';
  }
  set labelPosition(value) {
    this._labelPosition = value;
  }
  private _labelPosition: 'before' | 'after';

  /** Whether the radio button is disabled. */
  @Input()
  get disabled(): boolean {
    return this._disabled || (this.radioGroup !== null && this.radioGroup.disabled);
  }
  set disabled(value: boolean) {
    const newDisabledState = coerceBooleanProperty(value);
    if (this._disabled !== newDisabledState) {
      this._disabled = newDisabledState;
      this._changeDetector.markForCheck();
    }
  }

  /** Whether the radio button is required. */
  @Input()
  get required(): boolean {
    return this._required || (this.radioGroup && this.radioGroup.required);
  }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
  }

  /** Theme color of the radio button. */
  @Input()
  get color(): ThemePalette {
    return this._color || (this.radioGroup && this.radioGroup.color) || 'accent';
  }
  set color(newValue: ThemePalette) { this._color = newValue; }
  private _color: ThemePalette;

  /**
   * Event emitted when the checked state of this radio button changes.
   * Change events are only emitted when the value changes due to user interaction with
   * the radio button (the same behavior as `<input type-"radio">`).
   */
  @Output() readonly change: EventEmitter<Wtf2RadioChange> = new EventEmitter<Wtf2RadioChange>();

  /** The parent radio group. May or may not be present. */
  radioGroup: Wtf2RadioGroup;

  /** ID of the native input element inside `<wtf2-radio-button>` */
  get inputId(): string { return `${this.id || this._uniqueId}-input`; }

  /** Whether this radio is checked. */
  private _checked: boolean = false;

  /** Whether this radio is disabled. */
  private _disabled: boolean;

  /** Whether this radio is required. */
  private _required: boolean;

  /** Value assigned to this radio. */
  private _value: any = null;

  /** Unregister function for _radioDispatcher */
  private _removeUniqueSelectionListener: () => void = () => {};

  /** The native `<input type=radio>` element */
  @ViewChild('input', {static: false}) _inputElement: ElementRef<HTMLInputElement>;

  constructor(@Optional() radioGroup: Wtf2RadioGroup,
              elementRef: ElementRef,
              private _changeDetector: ChangeDetectorRef,
              private _focusMonitor: FocusMonitor,
              private _radioDispatcher: UniqueSelectionDispatcher,
              @Optional() @Inject(ANIMATION_MODULE_TYPE) public _animationMode?: string) {
    super(elementRef);

    // Assertions. Ideally these should be stripped out by the compiler.
    // TODO(jelbourn): Assert that there's no name binding AND a parent radio group.
    this.radioGroup = radioGroup;

    this._removeUniqueSelectionListener =
      _radioDispatcher.listen((id: string, name: string) => {
        if (id !== this.id && name === this.name) {
          this.checked = false;
        }
      });
  }

  /** Focuses the radio button. */
  focus(): void {
    this._focusMonitor.focusVia(this._inputElement, 'keyboard');
  }

  /**
   * Marks the radio button as needing checking for change detection.
   * This method is exposed because the parent radio group will directly
   * update bound properties of the radio button.
   */
  _markForCheck() {
    // When group value changes, the button will not be notified. Use `markForCheck` to explicit
    // update radio button's status
    this._changeDetector.markForCheck();
  }

  ngOnInit() {
    if (this.radioGroup) {
      // If the radio is inside a radio group, determine if it should be checked
      this.checked = this.radioGroup.value === this._value;
      // Copy name from parent radio group
      this.name = this.radioGroup.name;
    }
  }

  ngAfterViewInit() {
    this._focusMonitor
      .monitor(this._elementRef, true)
      .subscribe(focusOrigin => {
        if (!focusOrigin && this.radioGroup) {
          this.radioGroup._touch();
        }
      });
  }

  ngOnDestroy() {
    this._focusMonitor.stopMonitoring(this._elementRef);
    this._removeUniqueSelectionListener();
  }

  /** Dispatch change event with current value. */
  private _emitChangeEvent(): void {
    this.change.emit(new Wtf2RadioChange(this, this._value));
  }

  _isRippleDisabled() {
    return this.disableRipple || this.disabled;
  }

  _onInputClick(event: Event) {
    // We have to stop propagation for click events on the visual hidden input element.
    // By default, when a user clicks on a label element, a generated click event will be
    // dispatched on the associated input element. Since we are using a label element as our
    // root container, the click event on the `radio-button` will be executed twice.
    // The real click event will bubble up, and the generated click event also tries to bubble up.
    // This will lead to multiple click events.
    // Preventing bubbling for the second event will solve that issue.
    event.stopPropagation();
  }

  /**
   * Triggered when the radio button received a click or the input recognized any change.
   * Clicking on a label element, will trigger a change event on the associated input.
   */
  _onInputChange(event: Event) {
    // We always have to stop propagation on the change event.
    // Otherwise the change event, from the input element, will bubble up and
    // emit its event object to the `change` output.
    event.stopPropagation();

    const groupValueChanged = this.radioGroup && this.value !== this.radioGroup.value;
    this.checked = true;
    this._emitChangeEvent();

    if (this.radioGroup) {
      this.radioGroup._controlValueAccessorChangeFn(this.value);
      if (groupValueChanged) {
        this.radioGroup._emitChangeEvent();
      }
    }
  }

}
