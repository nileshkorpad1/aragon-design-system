/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {coerceNumberProperty} from '@angular/cdk/coercion';
import {Platform} from '@angular/cdk/platform';
import {DOCUMENT} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  InjectionToken,
  Input,
  Optional,
  ViewEncapsulation,
} from '@angular/core';
import {CanColor, CanColorCtor, mixinColor} from '../core';
import {ANIMATION_MODULE_TYPE} from '@angular/platform-browser/animations';


/** Possible mode for a progress spinner. */
export type ProgressSpinnerMode = 'determinate' | 'indeterminate';

/**
 * Base reference size of the spinner.
 * @docs-private
 */
const BASE_SIZE = 100;

/**
 * Base reference stroke width of the spinner.
 * @docs-private
 */
const BASE_STROKE_WIDTH = 10;

// Boilerplate for applying mixins to Wtf2ProgressSpinner.
/** @docs-private */
class Wtf2ProgressSpinnerBase {
  constructor(public _elementRef: ElementRef) {}
}
const _Wtf2ProgressSpinnerMixinBase: CanColorCtor & typeof Wtf2ProgressSpinnerBase =
    mixinColor(Wtf2ProgressSpinnerBase, 'primary');

/** Default `wtf2-progress-spinner` options that can be overridden. */
export interface Wtf2ProgressSpinnerDefaultOptions {
  /** Diameter of the spinner. */
  diameter?: number;
  /** Width of the spinner's stroke. */
  strokeWidth?: number;
  /**
   * Whether the animations should be force to be enabled, ignoring if the current environment is
   * using NoopAnimationsModule.
   */
  _forceAnimations?: boolean;
}

/** Injection token to be used to override the default options for `wtf2-progress-spinner`. */
export const WTF2_PROGRESS_SPINNER_DEFAULT_OPTIONS =
    new InjectionToken<Wtf2ProgressSpinnerDefaultOptions>('wtf2-progress-spinner-default-options', {
      providedIn: 'root',
      factory: WTF2_PROGRESS_SPINNER_DEFAULT_OPTIONS_FACTORY,
    });

/** @docs-private */
export function WTF2_PROGRESS_SPINNER_DEFAULT_OPTIONS_FACTORY(): Wtf2ProgressSpinnerDefaultOptions {
  return {diameter: BASE_SIZE};
}

// .0001 percentage difference is necessary in order to avoid unwanted animation frames
// for example because the animation duration is 4 seconds, .1% accounts to 4ms
// which are enough to see the flicker described in
// https://github.com/angular/components/issues/8984
const INDETERMINATE_ANIMATION_TEMPLATE = `
 @keyframes wtf2-progress-spinner-stroke-rotate-DIAMETER {
    0%      { stroke-dashoffset: START_VALUE;  transform: rotate(0); }
    12.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(0); }
    12.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(72.5deg); }
    25%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(72.5deg); }

    25.0001%   { stroke-dashoffset: START_VALUE;  transform: rotate(270deg); }
    37.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(270deg); }
    37.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(161.5deg); }
    50%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(161.5deg); }

    50.0001%  { stroke-dashoffset: START_VALUE;  transform: rotate(180deg); }
    62.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(180deg); }
    62.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(251.5deg); }
    75%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(251.5deg); }

    75.0001%  { stroke-dashoffset: START_VALUE;  transform: rotate(90deg); }
    87.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(90deg); }
    87.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(341.5deg); }
    100%    { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(341.5deg); }
  }
`;

/**
 * `<wtf2-progress-spinner>` component.
 */
@Component({
  moduleId: module.id,
  selector: 'wtf2-progress-spinner',
  exportAs: 'wtf2ProgressSpinner',
  host: {
    'role': 'progressbar',
    'class': 'wtf2-progress-spinner',
    '[class._wtf2-animation-noopable]': `_noopAnimations`,
    '[style.width.px]': 'diameter',
    '[style.height.px]': 'diameter',
    '[attr.aria-valuemin]': 'mode === "determinate" ? 0 : null',
    '[attr.aria-valuemax]': 'mode === "determinate" ? 100 : null',
    '[attr.aria-valuenow]': 'mode === "determinate" ? value : null',
    '[attr.mode]': 'mode',
  },
  inputs: ['color'],
  templateUrl: 'progress-spinner.html',
  styleUrls: ['progress-spinner.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Wtf2ProgressSpinner extends _Wtf2ProgressSpinnerMixinBase implements CanColor {
  private _value = 0;
  private _strokeWidth: number;
  private _fallbackAnimation = false;

  /**
   * Element to which we should add the generated style tags for the indeterminate animation.
   * For most elements this is the document, but for the ones in the Shadow DOM we need to
   * use the shadow root.
   */
  private _styleRoot: Node;

  /**
   * Tracks diameters of existing instances to de-dupe generated styles (default d = 100).
   * We need to keep track of which elements the diameters were attached to, because for
   * elements in the Shadow DOM the style tags are attached to the shadow root, rather
   * than the document head.
   */
  private static _diameters = new WeakMap<Node, Set<number>>();

  /** Whether the _wtf2-animation-noopable class should be applied, disabling animations.  */
  _noopAnimations: boolean;

  /** The diameter of the progress spinner (will set width and height of svg). */
  @Input()
  get diameter(): number { return this._diameter; }
  set diameter(size: number) {
    this._diameter = coerceNumberProperty(size);

    if (!this._fallbackAnimation) {
      const trackedDiameters = Wtf2ProgressSpinner._diameters;
      const diametersForElement = trackedDiameters.get(this._styleRoot);

      if (!diametersForElement || !diametersForElement.has(this._diameter)) {
        this._attachStyleNode();
      }
    }
  }
  private _diameter = BASE_SIZE;

  /** Stroke width of the progress spinner. */
  @Input()
  get strokeWidth(): number {
    return this._strokeWidth || this.diameter / 10;
  }
  set strokeWidth(value: number) {
    this._strokeWidth = coerceNumberProperty(value);
  }

  /** Mode of the progress circle */
  @Input() mode: ProgressSpinnerMode = 'determinate';

  /** Value of the progress circle. */
  @Input()
  get value(): number {
    return this.mode === 'determinate' ? this._value : 0;
  }
  set value(newValue: number) {
    this._value = Math.max(0, Math.min(100, coerceNumberProperty(newValue)));
  }

  constructor(public _elementRef: ElementRef<HTMLElement>,
              platform: Platform,
              @Optional() @Inject(DOCUMENT) private _document: any,
              @Optional() @Inject(ANIMATION_MODULE_TYPE) animationMode: string,
              @Inject(WTF2_PROGRESS_SPINNER_DEFAULT_OPTIONS)
                  defaults?: Wtf2ProgressSpinnerDefaultOptions) {

    super(_elementRef);

    const trackedDiameters = Wtf2ProgressSpinner._diameters;

    // The base size is already inserted via the component's structural styles. We still
    // need to track it so we don't end up adding the same styles again.
    if (!trackedDiameters.has(_document.head)) {
      trackedDiameters.set(_document.head, new Set<number>([BASE_SIZE]));
    }

    this._styleRoot = _getShadowRoot(_elementRef.nativeElement, _document) || _document.head;
    this._fallbackAnimation = platform.EDGE || platform.TRIDENT;
    this._noopAnimations = animationMode === 'NoopAnimations' &&
        (!!defaults && !defaults._forceAnimations);

    if (defaults) {
      if (defaults.diameter) {
        this.diameter = defaults.diameter;
      }

      if (defaults.strokeWidth) {
        this.strokeWidth = defaults.strokeWidth;
      }
    }

    // On IE and Edge, we can't animate the `stroke-dashoffset`
    // reliably so we fall back to a non-spec animation.
    const animationClass =
      `wtf2-progress-spinner-indeterminate${this._fallbackAnimation ? '-fallback' : ''}-animation`;

    _elementRef.nativeElement.classList.add(animationClass);
  }

  /** The radius of the spinner, adjusted for stroke width. */
  get _circleRadius() {
    return (this.diameter - BASE_STROKE_WIDTH) / 2;
  }

  /** The view box of the spinner's svg element. */
  get _viewBox() {
    const viewBox = this._circleRadius * 2 + this.strokeWidth;
    return `0 0 ${viewBox} ${viewBox}`;
  }

  /** The stroke circumference of the svg circle. */
  get _strokeCircumference(): number {
    return 2 * Math.PI * this._circleRadius;
  }

  /** The dash offset of the svg circle. */
  get _strokeDashOffset() {
    if (this.mode === 'determinate') {
      return this._strokeCircumference * (100 - this._value) / 100;
    }

    // In fallback mode set the circle to 80% and rotate it with CSS.
    if (this._fallbackAnimation && this.mode === 'indeterminate') {
      return this._strokeCircumference * 0.2;
    }

    return null;
  }

  /** Stroke width of the circle in percent. */
  get _circleStrokeWidth() {
    return this.strokeWidth / this.diameter * 100;
  }

  /** Dynamically generates a style tag containing the correct animation for this diameter. */
  private _attachStyleNode(): void {
    const styleTag: HTMLStyleElement = this._document.createElement('style');
    const styleRoot = this._styleRoot;
    const currentDiameter = this._diameter;
    const diameters = Wtf2ProgressSpinner._diameters;
    let diametersForElement = diameters.get(styleRoot);

    styleTag.setAttribute('wtf2-spinner-animation', currentDiameter + '');
    styleTag.textContent = this._getAnimationText();
    styleRoot.appendChild(styleTag);

    if (!diametersForElement) {
      diametersForElement = new Set<number>();
      diameters.set(styleRoot, diametersForElement);
    }

    diametersForElement.add(currentDiameter);
  }

  /** Generates animation styles adjusted for the spinner's diameter. */
  private _getAnimationText(): string {
    return INDETERMINATE_ANIMATION_TEMPLATE
        // Animation should begin at 5% and end at 80%
        .replace(/START_VALUE/g, `${0.95 * this._strokeCircumference}`)
        .replace(/END_VALUE/g, `${0.2 * this._strokeCircumference}`)
        .replace(/DIAMETER/g, `${this.diameter}`);
  }
}


/**
 * `<wtf2-spinner>` component.
 *
 * This is a component definition to be used as a convenience reference to create an
 * indeterminate `<wtf2-progress-spinner>` instance.
 */
@Component({
  moduleId: module.id,
  selector: 'wtf2-spinner',
  host: {
    'role': 'progressbar',
    'mode': 'indeterminate',
    'class': 'wtf2-spinner wtf2-progress-spinner',
    '[class._wtf2-animation-noopable]': `_noopAnimations`,
    '[style.width.px]': 'diameter',
    '[style.height.px]': 'diameter',
  },
  inputs: ['color'],
  templateUrl: 'progress-spinner.html',
  styleUrls: ['progress-spinner.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Wtf2Spinner extends Wtf2ProgressSpinner {
  constructor(elementRef: ElementRef<HTMLElement>, platform: Platform,
              @Optional() @Inject(DOCUMENT) document: any,
              @Optional() @Inject(ANIMATION_MODULE_TYPE) animationMode: string,
              @Inject(WTF2_PROGRESS_SPINNER_DEFAULT_OPTIONS)
                  defaults?: Wtf2ProgressSpinnerDefaultOptions) {
    super(elementRef, platform, document, animationMode, defaults);
    this.mode = 'indeterminate';
  }
}


/** Gets the shadow root of an element, if supported and the element is inside the Shadow DOM. */
export function _getShadowRoot(element: HTMLElement, _document: Document): Node | null {
  // TODO(crisbeto): see whether we should move this into the CDK
  // feature detection utilities once #15616 gets merged in.
  if (typeof window !== 'undefined') {
    const head = _document.head;

    // Check whether the browser supports Shadow DOM.
    if (head && ((head as any).createShadowRoot || head.attachShadow)) {
      const rootNode = element.getRootNode ? element.getRootNode() : null;

      // We need to take the `ShadowRoot` off of `window`, because the built-in types are
      // incorrect. See https://github.com/Microsoft/TypeScript/issues/27929.
      if (rootNode instanceof (window as any).ShadowRoot) {
        return rootNode;
      }
    }
  }

  return null;
}
