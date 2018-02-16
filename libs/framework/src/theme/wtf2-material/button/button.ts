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
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  ViewEncapsulation,
  Optional,
  Inject,
  Input,
} from '@angular/core';
import {
  CanColor,
  CanDisable,
  CanDisableRipple,
  CanColorCtor,
  CanDisableCtor,
  CanDisableRippleCtor,
  Wtf2Ripple,
  mixinColor,
  mixinDisabled,
  mixinDisableRipple,
} from '../core';
import {ANIMATION_MODULE_TYPE} from '@angular/platform-browser/animations';

/** Default color palette for round buttons (wtf2-fab and wtf2-mini-fab) */
const DEFAULT_ROUND_BUTTON_COLOR = 'accent';

/**
 * List of classes to add to Wtf2Button instances based on host attributes to
 * style as different variants.
 */
const BUTTON_HOST_ATTRIBUTES = [
  'wtf2-button',
  'wtf2-flat-button',
  'wtf2-icon-button',
  'wtf2-raised-button',
  'wtf2-stroked-button',
  'wtf2-mini-fab',
  'wtf2-fab',
];

// Boilerplate for applying mixins to Wtf2Button.
/** @docs-private */
class Wtf2ButtonBase {
  constructor(public _elementRef: ElementRef) {}
}

const _Wtf2ButtonMixinBase: CanDisableRippleCtor & CanDisableCtor & CanColorCtor &
    typeof Wtf2ButtonBase = mixinColor(mixinDisabled(mixinDisableRipple(Wtf2ButtonBase)));

/**
 * Material design button.
 */
@Component({
  moduleId: module.id,
  selector: `button[wtf2-button], button[wtf2-raised-button], button[wtf2-icon-button],
             button[wtf2-fab], button[wtf2-mini-fab], button[wtf2-stroked-button],
             button[wtf2-flat-button]`,
  exportAs: 'wtf2Button',
  host: {
    '[attr.disabled]': 'disabled || null',
    '[class._wtf2-animation-noopable]': '_animationMode === "NoopAnimations"',
  },
  templateUrl: 'button.html',
  styleUrls: ['button.scss'],
  inputs: ['disabled', 'disableRipple', 'color'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Wtf2Button extends _Wtf2ButtonMixinBase
    implements OnDestroy, CanDisable, CanColor, CanDisableRipple {

  /** Whether the button is round. */
  readonly isRoundButton: boolean = this._hasHostAttributes('wtf2-fab', 'wtf2-mini-fab');

  /** Whether the button is icon button. */
  readonly isIconButton: boolean = this._hasHostAttributes('wtf2-icon-button');

  /** Reference to the Wtf2Ripple instance of the button. */
  @ViewChild(Wtf2Ripple, {static: false}) ripple: Wtf2Ripple;

  constructor(elementRef: ElementRef,
              private _focusMonitor: FocusMonitor,
              @Optional() @Inject(ANIMATION_MODULE_TYPE) public _animationMode: string) {
    super(elementRef);

    // For each of the variant selectors that is prevent in the button's host
    // attributes, add the correct corresponding class.
    for (const attr of BUTTON_HOST_ATTRIBUTES) {
      if (this._hasHostAttributes(attr)) {
        (elementRef.nativeElement as HTMLElement).classList.add(attr);
      }
    }

    this._focusMonitor.monitor(this._elementRef, true);

    if (this.isRoundButton) {
      this.color = DEFAULT_ROUND_BUTTON_COLOR;
    }
  }

  ngOnDestroy() {
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  /** Focuses the button. */
  focus(): void {
    this._getHostElement().focus();
  }

  _getHostElement() {
    return this._elementRef.nativeElement;
  }

  _isRippleDisabled() {
    return this.disableRipple || this.disabled;
  }

  /** Gets whether the button has one of the given attributes. */
  _hasHostAttributes(...attributes: string[]) {
    return attributes.some(attribute => this._getHostElement().hasAttribute(attribute));
  }
}

/**
 * Material design anchor button.
 */
@Component({
  moduleId: module.id,
  selector: `a[wtf2-button], a[wtf2-raised-button], a[wtf2-icon-button], a[wtf2-fab],
             a[wtf2-mini-fab], a[wtf2-stroked-button], a[wtf2-flat-button]`,
  exportAs: 'wtf2Button, wtf2Anchor',
  host: {
    // Note that we ignore the user-specified tabindex when it's disabled for
    // consistency with the `wtf2-button` applied on native buttons where even
    // though they have an index, they're not tabbable.
    '[attr.tabindex]': 'disabled ? -1 : (tabIndex || 0)',
    '[attr.disabled]': 'disabled || null',
    '[attr.aria-disabled]': 'disabled.toString()',
    '(click)': '_haltDisabledEvents($event)',
    '[class._wtf2-animation-noopable]': '_animationMode === "NoopAnimations"',
  },
  inputs: ['disabled', 'disableRipple', 'color'],
  templateUrl: 'button.html',
  styleUrls: ['button.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Wtf2Anchor extends Wtf2Button {
  /** Tabindex of the button. */
  @Input() tabIndex: number;

  constructor(
    focusMonitor: FocusMonitor,
    elementRef: ElementRef,
    @Optional() @Inject(ANIMATION_MODULE_TYPE) animationMode: string) {
    super(elementRef, focusMonitor, animationMode);
  }

  _haltDisabledEvents(event: Event) {
    // A disabled button shouldn't apply any actions
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }
}
