/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Directionality} from '@angular/cdk/bidi';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  Inject,
  InjectionToken,
  Input,
  NgZone,
  Optional,
  QueryList,
  ViewChild,
  ViewEncapsulation,
  OnDestroy,
} from '@angular/core';
import {
  CanColor, CanColorCtor,
  FloatLabelType,
  LabelOptions,
  WTF2_LABEL_GLOBAL_OPTIONS,
  mixinColor,
} from '../core';
import {fromEvent, merge, Subject} from 'rxjs';
import {startWith, take, takeUntil} from 'rxjs/operators';
import {Wtf2Error} from './error';
import {wtf2FormFieldAnimations} from './form-field-animations';
import {Wtf2FormFieldControl} from './form-field-control';
import {
  getWtf2FormFieldDuplicatedHintError,
  getWtf2FormFieldMissingControlError,
  getWtf2FormFieldPlaceholderConflictError,
} from './form-field-errors';
import {Wtf2Hint} from './hint';
import {Wtf2Label} from './label';
import {Wtf2Placeholder} from './placeholder';
import {Wtf2Prefix} from './prefix';
import {Wtf2Suffix} from './suffix';
import {Platform} from '@angular/cdk/platform';
import {NgControl} from '@angular/forms';
import {ANIMATION_MODULE_TYPE} from '@angular/platform-browser/animations';


let nextUniqueId = 0;
const floatingLabelScale = 0.75;
const outlineGapPadding = 5;


/**
 * Boilerplate for applying mixins to Wtf2FormField.
 * @docs-private
 */
class Wtf2FormFieldBase {
  constructor(public _elementRef: ElementRef) { }
}

/**
 * Base class to which we're applying the form field mixins.
 * @docs-private
 */
const _Wtf2FormFieldMixinBase: CanColorCtor & typeof Wtf2FormFieldBase =
    mixinColor(Wtf2FormFieldBase, 'primary');

/** Possible appearance styles for the form field. */
export type Wtf2FormFieldAppearance = 'legacy' | 'standard' | 'fill' | 'outline';

/**
 * Represents the default options for the form field that can be configured
 * using the `WTF2_FORM_FIELD_DEFAULT_OPTIONS` injection token.
 */
export interface Wtf2FormFieldDefaultOptions {
  appearance?: Wtf2FormFieldAppearance;
}

/**
 * Injection token that can be used to configure the
 * default options for all form field within an app.
 */
export const WTF2_FORM_FIELD_DEFAULT_OPTIONS =
    new InjectionToken<Wtf2FormFieldDefaultOptions>('WTF2_FORM_FIELD_DEFAULT_OPTIONS');


/** Container for form controls that applies Material Design styling and behavior. */
@Component({
  moduleId: module.id,
  selector: 'wtf2-form-field',
  exportAs: 'wtf2FormField',
  templateUrl: 'form-field.html',
  // Wtf2Input is a directive and can't have styles, so we need to include its styles here
  // in form-field-input.scss. The Wtf2Input styles are fairly minimal so it shouldn't be a
  // big deal for people who aren't using Wtf2Input.
  styleUrls: [
    'form-field.scss',
    'form-field-fill.scss',
    'form-field-input.scss',
    'form-field-legacy.scss',
    'form-field-outline.scss',
    'form-field-standard.scss',
  ],
  animations: [wtf2FormFieldAnimations.transitionMessages],
  host: {
    'class': 'wtf2-form-field',
    '[class.wtf2-form-field-appearance-standard]': 'appearance == "standard"',
    '[class.wtf2-form-field-appearance-fill]': 'appearance == "fill"',
    '[class.wtf2-form-field-appearance-outline]': 'appearance == "outline"',
    '[class.wtf2-form-field-appearance-legacy]': 'appearance == "legacy"',
    '[class.wtf2-form-field-invalid]': '_control.errorState',
    '[class.wtf2-form-field-can-float]': '_canLabelFloat',
    '[class.wtf2-form-field-should-float]': '_shouldLabelFloat()',
    '[class.wtf2-form-field-has-label]': '_hasFloatingLabel()',
    '[class.wtf2-form-field-hide-placeholder]': '_hideControlPlaceholder()',
    '[class.wtf2-form-field-disabled]': '_control.disabled',
    '[class.wtf2-form-field-autofilled]': '_control.autofilled',
    '[class.wtf2-focused]': '_control.focused',
    '[class.wtf2-accent]': 'color == "accent"',
    '[class.wtf2-warn]': 'color == "warn"',
    '[class.ng-untouched]': '_shouldForward("untouched")',
    '[class.ng-touched]': '_shouldForward("touched")',
    '[class.ng-pristine]': '_shouldForward("pristine")',
    '[class.ng-dirty]': '_shouldForward("dirty")',
    '[class.ng-valid]': '_shouldForward("valid")',
    '[class.ng-invalid]': '_shouldForward("invalid")',
    '[class.ng-pending]': '_shouldForward("pending")',
    '[class._wtf2-animation-noopable]': '!_animationsEnabled',
  },
  inputs: ['color'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class Wtf2FormField extends _Wtf2FormFieldMixinBase
    implements AfterContentInit, AfterContentChecked, AfterViewInit, OnDestroy, CanColor {
  private _labelOptions: LabelOptions;

  /**
   * Whether the outline gap needs to be calculated
   * immediately on the next change detection run.
   */
  private _outlineGapCalculationNeededImmediately = false;

  /** Whether the outline gap needs to be calculated next time the zone has stabilized. */
  private _outlineGapCalculationNeededOnStable = false;

  private _destroyed = new Subject<void>();

  /** The form-field appearance style. */
  @Input()
  get appearance(): Wtf2FormFieldAppearance { return this._appearance; }
  set appearance(value: Wtf2FormFieldAppearance) {
    const oldValue = this._appearance;

    this._appearance = value || (this._defaults && this._defaults.appearance) || 'legacy';

    if (this._appearance === 'outline' && oldValue !== value) {
      this._outlineGapCalculationNeededOnStable = true;
    }
  }
  _appearance: Wtf2FormFieldAppearance;

  /** Whether the required marker should be hidden. */
  @Input()
  get hideRequiredMarker(): boolean { return this._hideRequiredMarker; }
  set hideRequiredMarker(value: boolean) {
    this._hideRequiredMarker = coerceBooleanProperty(value);
  }
  private _hideRequiredMarker: boolean;

  /** Override for the logic that disables the label animation in certain cases. */
  private _showAlwaysAniwtf2e = false;

  /** Whether the floating label should always float or not. */
  get _shouldAlwaysFloat(): boolean {
    return this.floatLabel === 'always' && !this._showAlwaysAniwtf2e;
  }

  /** Whether the label can float or not. */
  get _canLabelFloat(): boolean { return this.floatLabel !== 'never'; }

  /** State of the wtf2-hint and wtf2-error animations. */
  _subscriptAnimationState: string = '';

  /** Text for the form field hint. */
  @Input()
  get hintLabel(): string { return this._hintLabel; }
  set hintLabel(value: string) {
    this._hintLabel = value;
    this._processHints();
  }
  private _hintLabel = '';

  // Unique id for the hint label.
  _hintLabelId: string = `wtf2-hint-${nextUniqueId++}`;

  // Unique id for the internal form field label.
  _labelId = `wtf2-form-field-label-${nextUniqueId++}`;

  /**
   * Whether the label should always float, never float or float as the user types.
   *
   * Note: only the legacy appearance supports the `never` option. `never` was originally added as a
   * way to make the floating label emulate the behavior of a standard input placeholder. However
   * the form field now supports both floating labels and placeholders. Therefore in the non-legacy
   * appearances the `never` option has been disabled in favor of just using the placeholder.
   */
  @Input()
  get floatLabel(): FloatLabelType {
    return this.appearance !== 'legacy' && this._floatLabel === 'never' ? 'auto' : this._floatLabel;
  }
  set floatLabel(value: FloatLabelType) {
    if (value !== this._floatLabel) {
      this._floatLabel = value || this._labelOptions.float || 'auto';
      this._changeDetectorRef.markForCheck();
    }
  }
  private _floatLabel: FloatLabelType;

  /** Whether the Angular animations are enabled. */
  _animationsEnabled: boolean;

  /**
   * @deprecated
   * @breaking-change 8.0.0
   */
  @ViewChild('underline', {static: false}) underlineRef: ElementRef;

  @ViewChild('connectionContainer', {static: true}) _connectionContainerRef: ElementRef;
  @ViewChild('inputContainer', {static: false}) _inputContainerRef: ElementRef;
  @ViewChild('label', {static: false}) private _label: ElementRef;

  @ContentChild(Wtf2FormFieldControl, {static: false}) _controlNonStatic: Wtf2FormFieldControl<any>;
  @ContentChild(Wtf2FormFieldControl, {static: true}) _controlStatic: Wtf2FormFieldControl<any>;
  get _control() {
    // TODO(crisbeto): we need this hacky workaround in order to support both Ivy
    // and ViewEngine. We should clean this up once Ivy is the default renderer.
    return this._explicitFormFieldControl || this._controlNonStatic || this._controlStatic;
  }
  set _control(value) {
    this._explicitFormFieldControl = value;
  }
  private _explicitFormFieldControl: Wtf2FormFieldControl<any>;

  @ContentChild(Wtf2Label, {static: false}) _labelChildNonStatic: Wtf2Label;
  @ContentChild(Wtf2Label, {static: true}) _labelChildStatic: Wtf2Label;
  get _labelChild() {
    return this._labelChildNonStatic || this._labelChildStatic;
  }

  @ContentChild(Wtf2Placeholder, {static: false}) _placeholderChild: Wtf2Placeholder;
  @ContentChildren(Wtf2Error) _errorChildren: QueryList<Wtf2Error>;
  @ContentChildren(Wtf2Hint) _hintChildren: QueryList<Wtf2Hint>;
  @ContentChildren(Wtf2Prefix) _prefixChildren: QueryList<Wtf2Prefix>;
  @ContentChildren(Wtf2Suffix) _suffixChildren: QueryList<Wtf2Suffix>;

  constructor(
      public _elementRef: ElementRef, private _changeDetectorRef: ChangeDetectorRef,
      @Optional() @Inject(WTF2_LABEL_GLOBAL_OPTIONS) labelOptions: LabelOptions,
      @Optional() private _dir: Directionality,
      @Optional() @Inject(WTF2_FORM_FIELD_DEFAULT_OPTIONS) private _defaults:
          Wtf2FormFieldDefaultOptions, private _platform: Platform, private _ngZone: NgZone,
      @Optional() @Inject(ANIMATION_MODULE_TYPE) _animationMode: string) {
    super(_elementRef);

    this._labelOptions = labelOptions ? labelOptions : {};
    this.floatLabel = this._labelOptions.float || 'auto';
    this._animationsEnabled = _animationMode !== 'NoopAnimations';

    // Set the default through here so we invoke the setter on the first run.
    this.appearance = (_defaults && _defaults.appearance) ? _defaults.appearance : 'legacy';
  }

  /**
   * Gets an ElementRef for the element that a overlay attached to the form-field should be
   * positioned relative to.
   */
  getConnectedOverlayOrigin(): ElementRef {
    return this._connectionContainerRef || this._elementRef;
  }

  ngAfterContentInit() {
    this._validateControlChild();

    const control = this._control;

    if (control.controlType) {
      this._elementRef.nativeElement.classList.add(`wtf2-form-field-type-${control.controlType}`);
    }

    // Subscribe to changes in the child control state in order to update the form field UI.
    control.stateChanges.pipe(startWith(null!)).subscribe(() => {
      this._validatePlaceholders();
      this._syncDescribedByIds();
      this._changeDetectorRef.markForCheck();
    });

    // Run change detection if the value changes.
    if (control.ngControl && control.ngControl.valueChanges) {
      control.ngControl.valueChanges
        .pipe(takeUntil(this._destroyed))
        .subscribe(() => this._changeDetectorRef.markForCheck());
    }

    // Note that we have to run outside of the `NgZone` explicitly,
    // in order to avoid throwing users into an infinite loop
    // if `zone-patch-rxjs` is included.
    this._ngZone.runOutsideAngular(() => {
      this._ngZone.onStable.asObservable().pipe(takeUntil(this._destroyed)).subscribe(() => {
        if (this._outlineGapCalculationNeededOnStable) {
          this.updateOutlineGap();
        }
      });
    });

    // Run change detection and update the outline if the suffix or prefix changes.
    merge(this._prefixChildren.changes, this._suffixChildren.changes).subscribe(() => {
      this._outlineGapCalculationNeededOnStable = true;
      this._changeDetectorRef.markForCheck();
    });

    // Re-validate when the number of hints changes.
    this._hintChildren.changes.pipe(startWith(null)).subscribe(() => {
      this._processHints();
      this._changeDetectorRef.markForCheck();
    });

    // Update the aria-described by when the number of errors changes.
    this._errorChildren.changes.pipe(startWith(null)).subscribe(() => {
      this._syncDescribedByIds();
      this._changeDetectorRef.markForCheck();
    });

    if (this._dir) {
      this._dir.change.pipe(takeUntil(this._destroyed)).subscribe(() => this.updateOutlineGap());
    }
  }

  ngAfterContentChecked() {
    this._validateControlChild();
    if (this._outlineGapCalculationNeededImmediately) {
      this.updateOutlineGap();
    }
  }

  ngAfterViewInit() {
    // Avoid animations on load.
    this._subscriptAnimationState = 'enter';
    this._changeDetectorRef.detectChanges();
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }

  /** Determines whether a class from the NgControl should be forwarded to the host element. */
  _shouldForward(prop: keyof NgControl): boolean {
    const ngControl = this._control ? this._control.ngControl : null;
    return ngControl && ngControl[prop];
  }

  _hasPlaceholder() {
    return !!(this._control && this._control.placeholder || this._placeholderChild);
  }

  _hasLabel() {
    return !!this._labelChild;
  }

  _shouldLabelFloat() {
    return this._canLabelFloat && (this._control.shouldLabelFloat || this._shouldAlwaysFloat);
  }

  _hideControlPlaceholder() {
    // In the legacy appearance the placeholder is promoted to a label if no label is given.
    return this.appearance === 'legacy' && !this._hasLabel() ||
        this._hasLabel() && !this._shouldLabelFloat();
  }

  _hasFloatingLabel() {
    // In the legacy appearance the placeholder is promoted to a label if no label is given.
    return this._hasLabel() || this.appearance === 'legacy' && this._hasPlaceholder();
  }

  /** Determines whether to display hints or errors. */
  _getDisplayedMessages(): 'error' | 'hint' {
    return (this._errorChildren && this._errorChildren.length > 0 &&
        this._control.errorState) ? 'error' : 'hint';
  }

  /** Aniwtf2es the placeholder up and locks it in position. */
  _animateAndLockLabel(): void {
    if (this._hasFloatingLabel() && this._canLabelFloat) {
      // If animations are disabled, we shouldn't go in here,
      // because the `transitionend` will never fire.
      if (this._animationsEnabled) {
        this._showAlwaysAniwtf2e = true;

        fromEvent(this._label.nativeElement, 'transitionend').pipe(take(1)).subscribe(() => {
          this._showAlwaysAniwtf2e = false;
        });
      }

      this.floatLabel = 'always';
      this._changeDetectorRef.markForCheck();
    }
  }

  /**
   * Ensure that there is only one placeholder (either `placeholder` attribute on the child control
   * or child element with the `wtf2-placeholder` directive).
   */
  private _validatePlaceholders() {
    if (this._control.placeholder && this._placeholderChild) {
      throw getWtf2FormFieldPlaceholderConflictError();
    }
  }

  /** Does any extra processing that is required when handling the hints. */
  private _processHints() {
    this._validateHints();
    this._syncDescribedByIds();
  }

  /**
   * Ensure that there is a maximum of one of each `<wtf2-hint>` alignment specified, with the
   * attribute being considered as `align="start"`.
   */
  private _validateHints() {
    if (this._hintChildren) {
      let startHint: Wtf2Hint;
      let endHint: Wtf2Hint;
      this._hintChildren.forEach((hint: Wtf2Hint) => {
        if (hint.align === 'start') {
          if (startHint || this.hintLabel) {
            throw getWtf2FormFieldDuplicatedHintError('start');
          }
          startHint = hint;
        } else if (hint.align === 'end') {
          if (endHint) {
            throw getWtf2FormFieldDuplicatedHintError('end');
          }
          endHint = hint;
        }
      });
    }
  }

  /**
   * Sets the list of element IDs that describe the child control. This allows the control to update
   * its `aria-describedby` attribute accordingly.
   */
  private _syncDescribedByIds() {
    if (this._control) {
      let ids: string[] = [];

      if (this._getDisplayedMessages() === 'hint') {
        const startHint = this._hintChildren ?
            this._hintChildren.find(hint => hint.align === 'start') : null;
        const endHint = this._hintChildren ?
            this._hintChildren.find(hint => hint.align === 'end') : null;

        if (startHint) {
          ids.push(startHint.id);
        } else if (this._hintLabel) {
          ids.push(this._hintLabelId);
        }

        if (endHint) {
          ids.push(endHint.id);
        }
      } else if (this._errorChildren) {
        ids = this._errorChildren.map(error => error.id);
      }

      this._control.setDescribedByIds(ids);
    }
  }

  /** Throws an error if the form field's control is missing. */
  protected _validateControlChild() {
    if (!this._control) {
      throw getWtf2FormFieldMissingControlError();
    }
  }

  /**
   * Updates the width and position of the gap in the outline. Only relevant for the outline
   * appearance.
   */
  updateOutlineGap() {
    const labelEl = this._label ? this._label.nativeElement : null;

    if (this.appearance !== 'outline' || !labelEl || !labelEl.children.length ||
        !labelEl.textContent.trim()) {
      return;
    }

    if (!this._platform.isBrowser) {
      // getBoundingClientRect isn't available on the server.
      return;
    }
    // If the element is not present in the DOM, the outline gap will need to be calculated
    // the next time it is checked and in the DOM.
    if (!document.documentElement!.contains(this._elementRef.nativeElement)) {
      this._outlineGapCalculationNeededImmediately = true;
      return;
    }

    let startWidth = 0;
    let gapWidth = 0;

    const container = this._connectionContainerRef.nativeElement;
    const startEls = container.querySelectorAll('.wtf2-form-field-outline-start');
    const gapEls = container.querySelectorAll('.wtf2-form-field-outline-gap');

    if (this._label && this._label.nativeElement.children.length) {
      const containerRect = container.getBoundingClientRect();

      // If the container's width and height are zero, it means that the element is
      // invisible and we can't calculate the outline gap. Mark the element as needing
      // to be checked the next time the zone stabilizes. We can't do this immediately
      // on the next change detection, because even if the element becomes visible,
      // the `ClientRect` won't be reclaculated immediately. We reset the
      // `_outlineGapCalculationNeededImmediately` flag some we don't run the checks twice.
      if (containerRect.width === 0 && containerRect.height === 0) {
        this._outlineGapCalculationNeededOnStable = true;
        this._outlineGapCalculationNeededImmediately = false;
        return;
      }

      const containerStart = this._getStartEnd(containerRect);
      const labelStart = this._getStartEnd(labelEl.children[0].getBoundingClientRect());
      let labelWidth = 0;

      for (const child of labelEl.children) {
        labelWidth += child.offsetWidth;
      }
      startWidth = labelStart - containerStart - outlineGapPadding;
      gapWidth = labelWidth > 0 ? labelWidth * floatingLabelScale + outlineGapPadding * 2 : 0;
    }

    for (let i = 0; i < startEls.length; i++) {
      startEls.item(i).style.width = `${startWidth}px`;
    }
    for (let i = 0; i < gapEls.length; i++) {
      gapEls.item(i).style.width = `${gapWidth}px`;
    }

    this._outlineGapCalculationNeededOnStable =
        this._outlineGapCalculationNeededImmediately = false;
  }

  /** Gets the start end of the rect considering the current directionality. */
  private _getStartEnd(rect: ClientRect): number {
    return this._dir && this._dir.value === 'rtl' ? rect.right : rect.left;
  }
}
