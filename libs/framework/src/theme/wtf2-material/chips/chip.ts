/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {FocusableOption} from '@angular/cdk/a11y';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {BACKSPACE, DELETE, SPACE} from '@angular/cdk/keycodes';
import {Platform} from '@angular/cdk/platform';
import {
  ContentChild,
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  NgZone,
  OnDestroy,
  Optional,
  Output,
} from '@angular/core';
import {
  CanColor,
  CanColorCtor,
  CanDisable,
  CanDisableCtor,
  CanDisableRipple,
  CanDisableRippleCtor,
  WTF2_RIPPLE_GLOBAL_OPTIONS,
  mixinColor,
  mixinDisabled,
  mixinDisableRipple,
  RippleConfig,
  RippleGlobalOptions,
  RippleRenderer,
  RippleTarget,
} from '../core';
import {Subject} from 'rxjs';
import {take} from 'rxjs/operators';


/** Represents an event fired on an individual `wtf2-chip`. */
export interface Wtf2ChipEvent {
  /** The chip the event was fired on. */
  chip: Wtf2Chip;
}

/** Event object emitted by Wtf2Chip when selected or deselected. */
export class Wtf2ChipSelectionChange {
  constructor(
    /** Reference to the chip that emitted the event. */
    public source: Wtf2Chip,
    /** Whether the chip that emitted the event is selected. */
    public selected: boolean,
    /** Whether the selection change was a result of a user interaction. */
    public isUserInput = false) { }
}


// Boilerplate for applying mixins to Wtf2Chip.
/** @docs-private */
class Wtf2ChipBase {
  constructor(public _elementRef: ElementRef) {}
}

const _Wtf2ChipMixinBase: CanColorCtor & CanDisableRippleCtor & CanDisableCtor & typeof Wtf2ChipBase =
    mixinColor(mixinDisableRipple(mixinDisabled(Wtf2ChipBase)), 'primary');

/**
 * Dummy directive to add CSS class to chip avatar.
 * @docs-private
 */
@Directive({
  selector: 'wtf2-chip-avatar, [wtf2ChipAvatar]',
  host: {'class': 'wtf2-chip-avatar'}
})
export class Wtf2ChipAvatar {}

/**
 * Dummy directive to add CSS class to chip trailing icon.
 * @docs-private
 */
@Directive({
  selector: 'wtf2-chip-trailing-icon, [wtf2ChipTrailingIcon]',
  host: {'class': 'wtf2-chip-trailing-icon'}
})
export class Wtf2ChipTrailingIcon {}

/**
 * Material design styled Chip component. Used inside the Wtf2ChipList component.
 */
@Directive({
  selector: `wtf2-basic-chip, [wtf2-basic-chip], wtf2-chip, [wtf2-chip]`,
  inputs: ['color', 'disabled', 'disableRipple'],
  exportAs: 'wtf2Chip',
  host: {
    'class': 'wtf2-chip',
    '[attr.tabindex]': 'disabled ? null : -1',
    'role': 'option',
    '[class.wtf2-chip-selected]': 'selected',
    '[class.wtf2-chip-with-avatar]': 'avatar',
    '[class.wtf2-chip-with-trailing-icon]': 'trailingIcon || removeIcon',
    '[class.wtf2-chip-disabled]': 'disabled',
    '[attr.disabled]': 'disabled || null',
    '[attr.aria-disabled]': 'disabled.toString()',
    '[attr.aria-selected]': 'ariaSelected',
    '(click)': '_handleClick($event)',
    '(keydown)': '_handleKeydown($event)',
    '(focus)': 'focus()',
    '(blur)': '_blur()',
  },
})
export class Wtf2Chip extends _Wtf2ChipMixinBase implements FocusableOption, OnDestroy, CanColor,
    CanDisable, CanDisableRipple, RippleTarget {

  /** Reference to the RippleRenderer for the chip. */
  private _chipRipple: RippleRenderer;

  /**
   * Ripple configuration for ripples that are launched on pointer down. The ripple config
   * is set to the global ripple options since we don't have any configurable options for
   * the chip ripples.
   * @docs-private
   */
  rippleConfig: RippleConfig & RippleGlobalOptions;

  /**
   * Whether ripples are disabled on interaction
   * @docs-private
   */
  get rippleDisabled(): boolean {
    return this.disabled || this.disableRipple || !!this.rippleConfig.disabled;
  }

  /** Whether the chip has focus. */
  _hasFocus: boolean = false;

  /** Whether the chip list is selectable */
  chipListSelectable: boolean = true;

  /** Whether the chip list is in multi-selection mode. */
  _chipListMultiple: boolean = false;

  /** The chip avatar */
  @ContentChild(Wtf2ChipAvatar, {static: false}) avatar: Wtf2ChipAvatar;

  /** The chip's trailing icon. */
  @ContentChild(Wtf2ChipTrailingIcon, {static: false}) trailingIcon: Wtf2ChipTrailingIcon;

  /** The chip's remove toggler. */
  @ContentChild(forwardRef(() => Wtf2ChipRemove), {static: false}) removeIcon: Wtf2ChipRemove;

  /** Whether the chip is selected. */
  @Input()
  get selected(): boolean { return this._selected; }
  set selected(value: boolean) {
    const coercedValue = coerceBooleanProperty(value);

    if (coercedValue !== this._selected) {
      this._selected = coercedValue;
      this._dispatchSelectionChange();
    }
  }
  protected _selected: boolean = false;

  /** The value of the chip. Defaults to the content inside `<wtf2-chip>` tags. */
  @Input()
  get value(): any {
    return this._value != undefined
      ? this._value
      : this._elementRef.nativeElement.textContent;
  }
  set value(value: any) { this._value = value; }
  protected _value: any;

  /**
   * Whether or not the chip is selectable. When a chip is not selectable,
   * changes to its selected state are always ignored. By default a chip is
   * selectable, and it becomes non-selectable if its parent chip list is
   * not selectable.
   */
  @Input()
  get selectable(): boolean { return this._selectable && this.chipListSelectable; }
  set selectable(value: boolean) {
    this._selectable = coerceBooleanProperty(value);
  }
  protected _selectable: boolean = true;

  /**
   * Determines whether or not the chip displays the remove styling and emits (removed) events.
   */
  @Input()
  get removable(): boolean { return this._removable; }
  set removable(value: boolean) {
    this._removable = coerceBooleanProperty(value);
  }
  protected _removable: boolean = true;

  /** Emits when the chip is focused. */
  readonly _onFocus = new Subject<Wtf2ChipEvent>();

  /** Emits when the chip is blured. */
  readonly _onBlur = new Subject<Wtf2ChipEvent>();

  /** Emitted when the chip is selected or deselected. */
  @Output() readonly selectionChange: EventEmitter<Wtf2ChipSelectionChange> =
      new EventEmitter<Wtf2ChipSelectionChange>();

  /** Emitted when the chip is destroyed. */
  @Output() readonly destroyed: EventEmitter<Wtf2ChipEvent> = new EventEmitter<Wtf2ChipEvent>();

  /** Emitted when a chip is to be removed. */
  @Output() readonly removed: EventEmitter<Wtf2ChipEvent> = new EventEmitter<Wtf2ChipEvent>();

  /** The ARIA selected applied to the chip. */
  get ariaSelected(): string | null {
    // Remove the `aria-selected` when the chip is deselected in single-selection mode, because
    // it adds noise to NVDA users where "not selected" will be read out for each chip.
    return this.selectable && (this._chipListMultiple || this.selected) ?
        this.selected.toString() : null;
  }

  constructor(public _elementRef: ElementRef,
              private _ngZone: NgZone,
              platform: Platform,
              @Optional() @Inject(WTF2_RIPPLE_GLOBAL_OPTIONS)
              globalRippleOptions: RippleGlobalOptions | null) {
    super(_elementRef);

    this._addHostClassName();

    this._chipRipple = new RippleRenderer(this, _ngZone, _elementRef, platform);
    this._chipRipple.setupTriggerEvents(_elementRef.nativeElement);
    this.rippleConfig = globalRippleOptions || {};
  }

  _addHostClassName() {
    const basicChipAttrName = 'wtf2-basic-chip';
    const element = this._elementRef.nativeElement as HTMLElement;

    if (element.hasAttribute(basicChipAttrName) ||
        element.tagName.toLowerCase() === basicChipAttrName) {
      element.classList.add(basicChipAttrName);
      return;
    } else {
      element.classList.add('wtf2-standard-chip');
    }
  }

  ngOnDestroy() {
    this.destroyed.emit({chip: this});
    this._chipRipple._removeTriggerEvents();
  }

  /** Selects the chip. */
  select(): void {
    if (!this._selected) {
      this._selected = true;
      this._dispatchSelectionChange();
    }
  }

  /** Deselects the chip. */
  deselect(): void {
    if (this._selected) {
      this._selected = false;
      this._dispatchSelectionChange();
    }
  }

  /** Select this chip and emit selected event */
  selectViaInteraction(): void {
    if (!this._selected) {
      this._selected = true;
      this._dispatchSelectionChange(true);
    }
  }

  /** Toggles the current selected state of this chip. */
  toggleSelected(isUserInput: boolean = false): boolean {
    this._selected = !this.selected;
    this._dispatchSelectionChange(isUserInput);
    return this.selected;
  }

  /** Allows for programwtf2ic focusing of the chip. */
  focus(): void {
    if (!this._hasFocus) {
      this._elementRef.nativeElement.focus();
      this._onFocus.next({chip: this});
    }
    this._hasFocus = true;
  }

  /**
   * Allows for programwtf2ic removal of the chip. Called by the Wtf2ChipList when the DELETE or
   * BACKSPACE keys are pressed.
   *
   * Informs any listeners of the removal request. Does not remove the chip from the DOM.
   */
  remove(): void {
    if (this.removable) {
      this.removed.emit({chip: this});
    }
  }

  /** Handles click events on the chip. */
  _handleClick(event: Event) {
    if (this.disabled) {
      event.preventDefault();
    } else {
      event.stopPropagation();
    }
  }

  /** Handle custom key presses. */
  _handleKeydown(event: KeyboardEvent): void {
    if (this.disabled) {
      return;
    }

    switch (event.keyCode) {
      case DELETE:
      case BACKSPACE:
        // If we are removable, remove the focused chip
        this.remove();
        // Always prevent so page navigation does not occur
        event.preventDefault();
        break;
      case SPACE:
        // If we are selectable, toggle the focused chip
        if (this.selectable) {
          this.toggleSelected(true);
        }

        // Always prevent space from scrolling the page since the list has focus
        event.preventDefault();
        break;
    }
  }

  _blur(): void {
    // When animations are enabled, Angular may end up removing the chip from the DOM a little
    // earlier than usual, causing it to be blurred and throwing off the logic in the chip list
    // that moves focus not the next item. To work around the issue, we defer marking the chip
    // as not focused until the next time the zone stabilizes.
    this._ngZone.onStable
      .asObservable()
      .pipe(take(1))
      .subscribe(() => {
        this._ngZone.run(() => {
          this._hasFocus = false;
          this._onBlur.next({chip: this});
        });
      });
  }

  private _dispatchSelectionChange(isUserInput = false) {
    this.selectionChange.emit({
      source: this,
      isUserInput,
      selected: this._selected
    });
  }
}


/**
 * Applies proper (click) support and adds styling for use with the Material Design "cancel" icon
 * available at https://material.io/icons/#ic_cancel.
 *
 * Example:
 *
 *     `<wtf2-chip>
 *       <wtf2-icon wtf2ChipRemove>cancel</wtf2-icon>
 *     </wtf2-chip>`
 *
 * You *may* use a custom icon, but you may need to override the `wtf2-chip-remove` positioning
 * styles to properly center the icon within the chip.
 */
@Directive({
  selector: '[wtf2ChipRemove]',
  host: {
    'class': 'wtf2-chip-remove wtf2-chip-trailing-icon',
    '(click)': '_handleClick($event)',
  }
})
export class Wtf2ChipRemove {
  constructor(protected _parentChip: Wtf2Chip) {}

  /** Calls the parent chip's public `remove()` method if applicable. */
  _handleClick(event: Event): void {
    const parentChip = this._parentChip;

    if (parentChip.removable && !parentChip.disabled) {
      parentChip.remove();
    }

    // We need to stop event propagation because otherwise the event will bubble up to the
    // form field and cause the `onContainerClick` method to be invoked. This method would then
    // reset the focused chip that has been focused after chip removal. Usually the parent
    // the parent click listener of the `Wtf2Chip` would prevent propagation, but it can happen
    // that the chip is being removed before the event bubbles up.
    event.stopPropagation();
  }
}
