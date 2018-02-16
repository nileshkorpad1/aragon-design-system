/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Wtf2DateFormat} from '../../core';


export const WTF2_MOMENT_DATE_FORMATS: Wtf2DateFormat = {
  parse: {
    dateInput: 'l',
  },
  display: {
    dateInput: 'l',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
