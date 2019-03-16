/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {FocusMonitor} from '@angular/cdk/a11y';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {SelectionModel} from '@angular/cdk/collections';
import {
  AfterContentInit,
  Attribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  ViewChild,
  ViewEncapsulation,
  InjectionToken,
  Inject,
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {
  CanDisableRipple,
  mixinDisableRipple,
  CanDisableRippleCtor,
} from '../core';


/** Acceptable types for a button toggle. */
export type ToggleType = 'checkbox' | 'radio';

/** Possible appearance styles for the button toggle. */
export type Wtf2ButtonToggleAppearance = 'legacy' | 'standard';

/**
 * Represents the default options for the button toggle that can be configured
 * using the `WTF2_BUTTON_TOGGLE_DEFAULT_OPTIONS` injection token.
 */
export interface Wtf2ButtonToggleDefaultOptions {
  appearance?: Wtf2ButtonToggleAppearance;
}

/**
 * Injection token that can be used to configure the
 * default options for all button toggles within an app.
 */
export const WTF2_BUTTON_TOGGLE_DEFAULT_OPTIONS =
    new InjectionToken<Wtf2ButtonToggleDefaultOptions>('WTF2_BUTTON_TOGGLE_DEFAULT_OPTIONS');



/**
 * Provider Expression that allows wtf2-button-toggle-group to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
export const WTF2_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Wtf2ButtonToggleGroup),
  multi: true
};

/**
 * @deprecated Use `Wtf2ButtonToggleGroup` instead.
 * @breaking-change 8.0.0
 */
export class Wtf2ButtonToggleGroupMultiple {}

let _uniqueIdCounter = 0;

/** Change event object emitted by Wtf2ButtonToggle. */
export class Wtf2ButtonToggleChange {
  constructor(
    /** The Wtf2ButtonToggle that emits the event. */
    public source: Wtf2ButtonToggle,

    /** The value assigned to the Wtf2ButtonToggle. */
    public value: any) {}
}

/** Exclusive selection button toggle group that behaves like a radio-button group. */
@Directive({
  selector: 'wtf2-button-toggle-group',
  providers: [
    WTF2_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR,
    {provide: Wtf2ButtonToggleGroupMultiple, useExisting: Wtf2ButtonToggleGroup},
  ],
  host: {
    'role': 'group',
    'class': 'wtf2-button-toggle-group',
    '[attr.aria-disabled]': 'disabled',
    '[class.wtf2-button-toggle-vertical]': 'vertical',
    '[class.wtf2-button-toggle-group-appearance-standard]': 'appearance === "standard"',
  },
  exportAs: 'wtf2ButtonToggleGroup',
})
export class Wtf2ButtonToggleGroup implements ControlValueAccessor, OnInit, AfterContentInit {
  private _vertical = false;
  private _multiple = false;
  private _disabled = false;
  private _selectionModel: SelectionModel<Wtf2ButtonToggle>;

  /**
   * Reference to the raw value that the consumer tried to assign. The real
   * value will exclude any values from this one that don't correspond to a
   * toggle. Useful for the cases where the value is assigned before the toggles
   * have been initialized or at the same that they're being swapped out.
   */
  private _rawValue: any;

  /**
   * The method to be called in order to update ngModel.
   * Now `ngModel` binding is not supported in multiple selection mode.
   */
  _controlValueAccessorChangeFn: (value: any) => void = () => {};

  /** onTouch function registered via registerOnTouch (ControlValueAccessor). */
  _onTouched: () => any = () => {};

  /** Child button toggle buttons. */
  @ContentChildren(forwardRef(() => Wtf2ButtonToggle)) _buttonToggles: QueryList<Wtf2ButtonToggle>;

  /** The appearance for all the buttons in the group. */
  @Input() appearance: Wtf2ButtonToggleAppearance;

  /** `name` attribute for the underlying `input` element. */
  @Input()
  get name(): string { return this._name; }
  set name(value: string) {
    this._name = value;

    if (this._buttonToggles) {
      this._buttonToggles.forEach(toggle => {
        toggle.name = this._name;
        toggle._markForCheck();
      });
    }
  }
  private _name = `wtf2-button-toggle-group-${_uniqueIdCounter++}`;

  /** Whether the toggle group is vertical. */
  @Input()
  get vertical(): boolean { return this._vertical; }
  set vertical(value: boolean) {
    this._vertical = coerceBooleanProperty(value);
  }

  /** Value of the toggle group. */
  @Input()
  get value(): any {
    const selected = this._selectionModel ? this._selectionModel.selected : [];

    if (this.multiple) {
      return selected.map(toggle => toggle.value);
    }

    return selected[0] ? selected[0].value : undefined;
  }
  set value(newValue: any) {
    this._setSelectionByValue(newValue);
    this.valueChange.emit(this.value);
  }

  /**
   * Event that emits whenever the value of the group changes.
   * Used to facilitate two-way data binding.
   * @docs-private
   */
  @Output() readonly valueChange = new EventEmitter<any>();

  /** Selected button toggles in the group. */
  get selected() {
    const selected = this._selectionModel.selected;
    return this.multiple ? selected : (selected[0] || null);
  }

  /** Whether multiple button toggles can be selected. */
  @Input()
  get multiple(): boolean { return this._multiple; }
  set multiple(value: boolean) {
    this._multiple = coerceBooleanProperty(value);
  }

  /** Whether multiple button toggle group is disabled. */
  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);

    if (this._buttonToggles) {
      this._buttonToggles.forEach(toggle => toggle._markForCheck());
    }
  }

  /** Event emitted when the group's value changes. */
  @Output() readonly change: EventEmitter<Wtf2ButtonToggleChange> =
      new EventEmitter<Wtf2ButtonToggleChange>();

  constructor(
    private _changeDetector: ChangeDetectorRef,
    @Optional() @Inject(WTF2_BUTTON_TOGGLE_DEFAULT_OPTIONS)
        defaultOptions?: Wtf2ButtonToggleDefaultOptions) {

      this.appearance =
          defaultOptions && defaultOptions.appearance ? defaultOptions.appearance : 'standard';
    }

  ngOnInit() {
    this._selectionModel = new SelectionModel<Wtf2ButtonToggle>(this.multiple, undefined, false);
  }

  ngAfterContentInit() {
    this._selectionModel.select(...this._buttonToggles.filter(toggle => toggle.checked));
  }

  /**
   * Sets the model value. Implemented as part of ControlValueAccessor.
   * @param value Value to be set to the model.
   */
  writeValue(value: any) {
    this.value = value;
    this._changeDetector.markForCheck();
  }

  // Implemented as part of ControlValueAccessor.
  registerOnChange(fn: (value: any) => void) {
    this._controlValueAccessorChangeFn = fn;
  }

  // Implemented as part of ControlValueAccessor.
  registerOnTouched(fn: any) {
    this._onTouched = fn;
  }

  // Implemented as part of ControlValueAccessor.
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /** Dispatch change event with current selection and group value. */
  _emitChangeEvent(): void {
    const selected = this.selected;
    const source = Array.isArray(selected) ? selected[selected.length - 1] : selected;
    const event = new Wtf2ButtonToggleChange(source!, this.value);
    this._controlValueAccessorChangeFn(event.value);
    this.change.emit(event);
  }

  /**
   * Syncs a button toggle's selected state with the model value.
   * @param toggle Toggle to be synced.
   * @param select Whether the toggle should be selected.
   * @param isUserInput Whether the change was a result of a user interaction.
   * @param deferEvents Whether to defer emitting the change events.
   */
  _syncButtonToggle(toggle: Wtf2ButtonToggle,
                    select: boolean,
                    isUserInput = false,
                    deferEvents = false) {
    // Deselect the currently-selected toggle, if we're in single-selection
    // mode and the button being toggled isn't selected at the moment.
    if (!this.multiple && this.selected && !toggle.checked) {
      (this.selected as Wtf2ButtonToggle).checked = false;
    }

    if (select) {
      this._selectionModel.select(toggle);
    } else {
      this._selectionModel.deselect(toggle);
    }

    // We need to defer in some cases in order to avoid "changed after checked errors", however
    // the side-effect is that we may end up updating the model value out of sequence in others
    // The `deferEvents` flag allows us to decide whether to do it on a case-by-case basis.
    if (deferEvents) {
      Promise.resolve(() => this._updateModelValue(isUserInput));
    } else {
      this._updateModelValue(isUserInput);
    }
  }

  /** Checks whether a button toggle is selected. */
  _isSelected(toggle: Wtf2ButtonToggle) {
    return this._selectionModel.isSelected(toggle);
  }

  /** Determines whether a button toggle should be checked on init. */
  _isPrechecked(toggle: Wtf2ButtonToggle) {
    if (typeof this._rawValue === 'undefined') {
      return false;
    }

    if (this.multiple && Array.isArray(this._rawValue)) {
      return this._rawValue.some(value => toggle.value != null && value === toggle.value);
    }

    return toggle.value === this._rawValue;
  }

  /** Updates the selection state of the toggles in the group based on a value. */
  private _setSelectionByValue(value: any|any[]) {
    this._rawValue = value;

    if (!this._buttonToggles) {
      return;
    }

    if (this.multiple && value) {
      if (!Array.isArray(value)) {
        throw Error('Value must be an array in multiple-selection mode.');
      }

      this._clearSelection();
      value.forEach((currentValue: any) => this._selectValue(currentValue));
    } else {
      this._clearSelection();
      this._selectValue(value);
    }
  }

  /** Clears the selected toggles. */
  private _clearSelection() {
    this._selectionModel.clear();
    this._buttonToggles.forEach(toggle => toggle.checked = false);
  }

  /** Selects a value if there's a toggle that corresponds to it. */
  private _selectValue(value: any) {
    const correspondingOption = this._buttonToggles.find(toggle => {
      return toggle.value != null && toggle.value === value;
    });

    if (correspondingOption) {
      correspondingOption.checked = true;
      this._selectionModel.select(correspondingOption);
    }
  }

  /** Syncs up the group's value with the model and emits the change event. */
  private _updateModelValue(isUserInput: boolean) {
    // Only emit the change event for user input.
    if (isUserInput) {
      this._emitChangeEvent();
    }

    // Note: we emit this one no wtf2ter whether it was a user interaction, because
    // it is used by Angular to sync up the two-way data binding.
    this.valueChange.emit(this.value);
  }
}

// Boilerplate for applying mixins to the Wtf2ButtonToggle class.
/** @docs-private */
class Wtf2ButtonToggleBase {}
const _Wtf2ButtonToggleMixinBase: CanDisableRippleCtor & typeof Wtf2ButtonToggleBase =
    mixinDisableRipple(Wtf2ButtonToggleBase);

/** Single button inside of a toggle group. */
@Component({
  moduleId: module.id,
  selector: 'wtf2-button-toggle',
  templateUrl: 'button-toggle.html',
  styleUrls: ['button-toggle.scss'],
  encapsulation: ViewEncapsulation.None,
  exportAs: 'wtf2ButtonToggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: ['disableRipple'],
  host: {
    '[class.wtf2-button-toggle-standalone]': '!buttonToggleGroup',
    '[class.wtf2-button-toggle-checked]': 'checked',
    '[class.wtf2-button-toggle-disabled]': 'disabled',
    '[class.wtf2-button-toggle-appearance-standard]': 'appearance === "standard"',
    'class': 'wtf2-button-toggle',
    // Always reset the tabindex to -1 so it doesn't conflict with the one on the `button`,
    // but can still receive focus from things like cdkFocusInitial.
    '[attr.tabindex]': '-1',
    '[attr.id]': 'id',
    '[attr.name]': 'null',
    '(focus)': 'focus()',
  }
})
export class Wtf2ButtonToggle extends _Wtf2ButtonToggleMixinBase implements OnInit,
  CanDisableRipple, OnDestroy {

  private _isSingleSelector = false;
  private _checked = false;

  /**
   * Attached to the aria-label attribute of the host element. In most cases, arial-labelledby will
   * take precedence so this may be omitted.
   */
  @Input('aria-label') ariaLabel: string;

  /**
   * Users can specify the `aria-labelledby` attribute which will be forwarded to the input element
   */
  @Input('aria-labelledby') ariaLabelledby: string | null = null;

  /** Type of the button toggle. Either 'radio' or 'checkbox'. */
  _type: ToggleType;

  @ViewChild('button', {static: false}) _buttonElement: ElementRef<HTMLButtonElement>;

  /** The parent button toggle group (exclusive selection). Optional. */
  buttonToggleGroup: Wtf2ButtonToggleGroup;

  /** Unique ID for the underlying `button` element. */
  get buttonId(): string { return `${this.id}-button`; }

  /** The unique ID for this button toggle. */
  @Input() id: string;

  /** HTML's 'name' attribute used to group radios for unique selection. */
  @Input() name: string;

  /** Wtf2ButtonToggleGroup reads this to assign its own value. */
  @Input() value: any;

  /** Tabindex for the toggle. */
  @Input() tabIndex: number | null;

  /** The appearance style of the button. */
  @Input()
  get appearance(): Wtf2ButtonToggleAppearance {
    return this.buttonToggleGroup ? this.buttonToggleGroup.appearance : this._appearance;
  }
  set appearance(value: Wtf2ButtonToggleAppearance) {
    this._appearance = value;
  }
  private _appearance: Wtf2ButtonToggleAppearance;

  /** Whether the button is checked. */
  @Input()
  get checked(): boolean {
    return this.buttonToggleGroup ? this.buttonToggleGroup._isSelected(this) : this._checked;
  }
  set checked(value: boolean) {
    const newValue = coerceBooleanProperty(value);

    if (newValue !== this._checked) {
      this._checked = newValue;

      if (this.buttonToggleGroup) {
        this.buttonToggleGroup._syncButtonToggle(this, this._checked);
      }

      this._changeDetectorRef.markForCheck();
    }
  }

  /** Whether the button is disabled. */
  @Input()
  get disabled(): boolean {
    return this._disabled || (this.buttonToggleGroup && this.buttonToggleGroup.disabled);
  }
  set disabled(value: boolean) { this._disabled = coerceBooleanProperty(value); }
  private _disabled: boolean = false;

  /** Event emitted when the group value changes. */
  @Output() readonly change: EventEmitter<Wtf2ButtonToggleChange> =
      new EventEmitter<Wtf2ButtonToggleChange>();

  constructor(@Optional() toggleGroup: Wtf2ButtonToggleGroup,
              private _changeDetectorRef: ChangeDetectorRef,
              private _elementRef: ElementRef<HTMLElement>,
              private _focusMonitor: FocusMonitor,
              // @breaking-change 8.0.0 `defaultTabIndex` to be made a required parameter.
              @Attribute('tabindex') defaultTabIndex: string,
              @Optional() @Inject(WTF2_BUTTON_TOGGLE_DEFAULT_OPTIONS)
                  defaultOptions?: Wtf2ButtonToggleDefaultOptions) {
    super();

    const parsedTabIndex = Number(defaultTabIndex);
    this.tabIndex = (parsedTabIndex || parsedTabIndex === 0) ? parsedTabIndex : null;
    this.buttonToggleGroup = toggleGroup;
    this.appearance =
        defaultOptions && defaultOptions.appearance ? defaultOptions.appearance : 'standard';
  }

  ngOnInit() {
    this._isSingleSelector = this.buttonToggleGroup && !this.buttonToggleGroup.multiple;
    this._type = this._isSingleSelector ? 'radio' : 'checkbox';
    this.id = this.id || `wtf2-button-toggle-${_uniqueIdCounter++}`;

    if (this._isSingleSelector) {
      this.name = this.buttonToggleGroup.name;
    }

    if (this.buttonToggleGroup && this.buttonToggleGroup._isPrechecked(this)) {
      this.checked = true;
    }

    this._focusMonitor.monitor(this._elementRef, true);
  }

  ngOnDestroy() {
    const group = this.buttonToggleGroup;

    this._focusMonitor.stopMonitoring(this._elementRef);

    // Remove the toggle from the selection once it's destroyed. Needs to happen
    // on the next tick in order to avoid "changed after checked" errors.
    if (group && group._isSelected(this)) {
      group._syncButtonToggle(this, false, false, true);
    }
  }

  /** Focuses the button. */
  focus(): void {
    this._buttonElement.nativeElement.focus();
  }

  /** Checks the button toggle due to an interaction with the underlying native button. */
  _onButtonClick() {
    const newChecked = this._isSingleSelector ? true : !this._checked;

    if (newChecked !== this._checked) {
      this._checked = newChecked;
      if (this.buttonToggleGroup) {
        this.buttonToggleGroup._syncButtonToggle(this, this._checked, true);
        this.buttonToggleGroup._onTouched();
      }
    }
    // Emit a change event when it's the single selector
    this.change.emit(new Wtf2ButtonToggleChange(this, this.value));
  }

  /**
   * Marks the button toggle as needing checking for change detection.
   * This method is exposed because the parent button toggle group will directly
   * update bound properties of the radio button.
   */
  _markForCheck() {
    // When the group value changes, the button will not be notified.
    // Use `markForCheck` to explicit update button toggle's status.
    this._changeDetectorRef.markForCheck();
  }
}
