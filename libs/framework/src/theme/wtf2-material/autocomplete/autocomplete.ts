/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {ActiveDescendantKeyManager} from '@angular/cdk/a11y';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Inject,
  InjectionToken,
  Input,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  CanDisableRipple,
  CanDisableRippleCtor,
  WTF2_OPTION_PARENT_COMPONENT,
  Wtf2Optgroup,
  Wtf2Option,
  mixinDisableRipple,
} from '../core';


/**
 * Autocomplete IDs need to be unique across components, so this counter exists outside of
 * the component definition.
 */
let _uniqueAutocompleteIdCounter = 0;

/** Event object that is emitted when an autocomplete option is selected. */
export class Wtf2AutocompleteSelectedEvent {
  constructor(
    /** Reference to the autocomplete panel that emitted the event. */
    public source: Wtf2Autocomplete,
    /** Option that was selected. */
    public option: Wtf2Option) { }
}


// Boilerplate for applying mixins to Wtf2Autocomplete.
/** @docs-private */
class Wtf2AutocompleteBase {}
const _Wtf2AutocompleteMixinBase: CanDisableRippleCtor & typeof Wtf2AutocompleteBase =
    mixinDisableRipple(Wtf2AutocompleteBase);

/** Default `wtf2-autocomplete` options that can be overridden. */
export interface Wtf2AutocompleteDefaultOptions {
  /** Whether the first option should be highlighted when an autocomplete panel is opened. */
  autoActiveFirstOption?: boolean;
}

/** Injection token to be used to override the default options for `wtf2-autocomplete`. */
export const WTF2_AUTOCOMPLETE_DEFAULT_OPTIONS =
    new InjectionToken<Wtf2AutocompleteDefaultOptions>('wtf2-autocomplete-default-options', {
      providedIn: 'root',
      factory: WTF2_AUTOCOMPLETE_DEFAULT_OPTIONS_FACTORY,
    });

/** @docs-private */
export function WTF2_AUTOCOMPLETE_DEFAULT_OPTIONS_FACTORY(): Wtf2AutocompleteDefaultOptions {
  return {autoActiveFirstOption: false};
}

@Component({
  moduleId: module.id,
  selector: 'wtf2-autocomplete',
  templateUrl: 'autocomplete.html',
  styleUrls: ['autocomplete.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'wtf2Autocomplete',
  inputs: ['disableRipple'],
  host: {
    'class': 'wtf2-autocomplete'
  },
  providers: [
    {provide: WTF2_OPTION_PARENT_COMPONENT, useExisting: Wtf2Autocomplete}
  ]
})
export class Wtf2Autocomplete extends _Wtf2AutocompleteMixinBase implements AfterContentInit,
  CanDisableRipple {

  /** Manages active item in option list based on key events. */
  _keyManager: ActiveDescendantKeyManager<Wtf2Option>;

  /** Whether the autocomplete panel should be visible, depending on option length. */
  showPanel: boolean = false;

  /** Whether the autocomplete panel is open. */
  get isOpen(): boolean { return this._isOpen && this.showPanel; }
  _isOpen: boolean = false;

  // The @ViewChild query for TemplateRef here needs to be static because some code paths
  // lead to the overlay being created before change detection has finished for this component.
  // Notably, another component may trigger `focus` on the autocomplete-trigger.

  /** @docs-private */
  @ViewChild(TemplateRef, {static: true}) template: TemplateRef<any>;

  /** Element for the panel containing the autocomplete options. */
  @ViewChild('panel', {static: false}) panel: ElementRef;

  /** @docs-private */
  @ContentChildren(Wtf2Option, {descendants: true}) options: QueryList<Wtf2Option>;

  /** @docs-private */
  @ContentChildren(Wtf2Optgroup) optionGroups: QueryList<Wtf2Optgroup>;

  /** Function that maps an option's control value to its display value in the trigger. */
  @Input() displayWith: ((value: any) => string) | null = null;

  /**
   * Whether the first option should be highlighted when the autocomplete panel is opened.
   * Can be configured globally through the `WTF2_AUTOCOMPLETE_DEFAULT_OPTIONS` token.
   */
  @Input()
  get autoActiveFirstOption(): boolean { return this._autoActiveFirstOption; }
  set autoActiveFirstOption(value: boolean) {
    this._autoActiveFirstOption = coerceBooleanProperty(value);
  }
  private _autoActiveFirstOption: boolean;

  /**
   * Specify the width of the autocomplete panel.  Can be any CSS sizing value, otherwise it will
   * match the width of its host.
   */
  @Input() panelWidth: string | number;

  /** Event that is emitted whenever an option from the list is selected. */
  @Output() readonly optionSelected: EventEmitter<Wtf2AutocompleteSelectedEvent> =
      new EventEmitter<Wtf2AutocompleteSelectedEvent>();

  /** Event that is emitted when the autocomplete panel is opened. */
  @Output() readonly opened: EventEmitter<void> = new EventEmitter<void>();

  /** Event that is emitted when the autocomplete panel is closed. */
  @Output() readonly closed: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Takes classes set on the host wtf2-autocomplete element and applies them to the panel
   * inside the overlay container to allow for easy styling.
   */
  @Input('class')
  set classList(value: string) {
    if (value && value.length) {
      this._classList = value.split(' ').reduce((classList, className) => {
        classList[className.trim()] = true;
        return classList;
      }, {} as {[key: string]: boolean});
    } else {
      this._classList = {};
    }

    this._setVisibilityClasses(this._classList);
    this._elementRef.nativeElement.className = '';
  }
  _classList: {[key: string]: boolean} = {};

  /** Unique ID to be used by autocomplete trigger's "aria-owns" property. */
  id: string = `wtf2-autocomplete-${_uniqueAutocompleteIdCounter++}`;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _elementRef: ElementRef<HTMLElement>,
    @Inject(WTF2_AUTOCOMPLETE_DEFAULT_OPTIONS) defaults: Wtf2AutocompleteDefaultOptions) {
    super();

    this._autoActiveFirstOption = !!defaults.autoActiveFirstOption;
  }

  ngAfterContentInit() {
    this._keyManager = new ActiveDescendantKeyManager<Wtf2Option>(this.options).withWrap();
    // Set the initial visibility state.
    this._setVisibility();
  }

  /**
   * Sets the panel scrollTop. This allows us to manually scroll to display options
   * above or below the fold, as they are not actually being focused when active.
   */
  _setScrollTop(scrollTop: number): void {
    if (this.panel) {
      this.panel.nativeElement.scrollTop = scrollTop;
    }
  }

  /** Returns the panel's scrollTop. */
  _getScrollTop(): number {
    return this.panel ? this.panel.nativeElement.scrollTop : 0;
  }

  /** Panel should hide itself when the option list is empty. */
  _setVisibility() {
    this.showPanel = !!this.options.length;
    this._setVisibilityClasses(this._classList);
    this._changeDetectorRef.markForCheck();
  }

  /** Emits the `select` event. */
  _emitSelectEvent(option: Wtf2Option): void {
    const event = new Wtf2AutocompleteSelectedEvent(this, option);
    this.optionSelected.emit(event);
  }

  /** Sets the autocomplete visibility classes on a classlist based on the panel is visible. */
  private _setVisibilityClasses(classList: {[key: string]: boolean}) {
    classList['wtf2-autocomplete-visible'] = this.showPanel;
    classList['wtf2-autocomplete-hidden'] = !this.showPanel;
  }
}

