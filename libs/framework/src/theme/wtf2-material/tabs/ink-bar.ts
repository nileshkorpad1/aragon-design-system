/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Directive, ElementRef, Inject, InjectionToken, NgZone} from '@angular/core';


/**
 * Interface for a a Wtf2InkBar positioner method, defining the positioning and width of the ink
 * bar in a set of tabs.
 */
// tslint:disable-next-line class-name Using leading underscore to denote internal interface.
export interface _Wtf2InkBarPositioner {
  (element: HTMLElement): { left: string, width: string };
}

/** Injection token for the Wtf2InkBar's Positioner. */
export const _WTF2_INK_BAR_POSITIONER =
  new InjectionToken<_Wtf2InkBarPositioner>('Wtf2InkBarPositioner', {
    providedIn: 'root',
    factory: _WTF2_INK_BAR_POSITIONER_FACTORY
  });

/**
 * The default positioner function for the Wtf2InkBar.
 * @docs-private
 */
export function _WTF2_INK_BAR_POSITIONER_FACTORY(): _Wtf2InkBarPositioner {
  const method = (element: HTMLElement) => ({
    left: element ? (element.offsetLeft || 0) + 'px' : '0',
    width: element ? (element.offsetWidth || 0) + 'px' : '0',
  });

  return method;
}

/**
 * The ink-bar is used to display and animate the line underneath the current active tab label.
 * @docs-private
 */
@Directive({
  selector: 'wtf2-ink-bar',
  host: {
    'class': 'wtf2-ink-bar',
  },
})
export class Wtf2InkBar {
  constructor(
    private _elementRef: ElementRef<HTMLElement>,
    private _ngZone: NgZone,
    @Inject(_WTF2_INK_BAR_POSITIONER) private _inkBarPositioner: _Wtf2InkBarPositioner) { }

  /**
   * Calculates the styles from the provided element in order to align the ink-bar to that element.
   * Shows the ink bar if previously set as hidden.
   * @param element
   */
  alignToElement(element: HTMLElement) {
    this.show();

    if (typeof requestAnimationFrame !== 'undefined') {
      this._ngZone.runOutsideAngular(() => {
        requestAnimationFrame(() => this._setStyles(element));
      });
    } else {
      this._setStyles(element);
    }
  }

  /** Shows the ink bar. */
  show(): void {
    this._elementRef.nativeElement.style.visibility = 'visible';
  }

  /** Hides the ink bar. */
  hide(): void {
    this._elementRef.nativeElement.style.visibility = 'hidden';
  }

  /**
   * Sets the proper styles to the ink bar element.
   * @param element
   */
  private _setStyles(element: HTMLElement) {
    const positions = this._inkBarPositioner(element);
    const inkBar: HTMLElement = this._elementRef.nativeElement;

    inkBar.style.left = positions.left;
    inkBar.style.width = positions.width;
  }
}
