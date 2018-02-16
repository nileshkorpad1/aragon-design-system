/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {InjectionToken} from '@angular/core';


/**
 * This token is used to inject the object whose value should be set into `Wtf2Input`. If none is
 * provided, the native `HTMLInputElement` is used. Directives like `Wtf2DatepickerInput` can provide
 * themselves for this token, in order to make `Wtf2Input` delegate the getting and setting of the
 * value to them.
 */
export const WTF2_INPUT_VALUE_ACCESSOR =
    new InjectionToken<{value: any}>('WTF2_INPUT_VALUE_ACCESSOR');
