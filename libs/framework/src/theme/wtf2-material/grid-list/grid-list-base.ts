/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {InjectionToken} from '@angular/core';

/**
 * Injection token used to provide a grid list to a tile and to avoid circular imports.
 * @docs-private
 */
export const WTF2_GRID_LIST = new InjectionToken<Wtf2GridListBase>('WTF2_GRID_LIST');

/**
 * Base interface for a `Wtf2GridList`.
 * @docs-private
 */
export interface Wtf2GridListBase {
  cols: number;
  gutterSize: string;
  rowHeight: number | string;
}
