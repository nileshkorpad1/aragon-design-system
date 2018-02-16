/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {InjectionToken} from '@angular/core';


/** Default `wtf2-slide-toggle` options that can be overridden. */
export interface Wtf2SlideToggleDefaultOptions {
  /** Whether toggle action triggers value changes in slide toggle. */
  disableToggleValue?: boolean;
  /** Whether drag action triggers value changes in slide toggle. */
  disableDragValue?: boolean;
}

/** Injection token to be used to override the default options for `wtf2-slide-toggle`. */
export const WTF2_SLIDE_TOGGLE_DEFAULT_OPTIONS =
  new InjectionToken<Wtf2SlideToggleDefaultOptions>('wtf2-slide-toggle-default-options', {
    providedIn: 'root',
    factory: () => ({disableToggleValue: false, disableDragValue: false})
  });
