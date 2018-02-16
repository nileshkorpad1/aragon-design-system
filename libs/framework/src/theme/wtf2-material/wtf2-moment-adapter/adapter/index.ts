/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {NgModule} from '@angular/core';
import { DateAdapter, WTF2_DATE_LOCALE, WTF2_DATE_FORMATS} from '../../core';
import {WTF2_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from './moment-date-adapter';
import { WTF2_MOMENT_DATE_FORMATS} from './moment-date-formats';

export * from './moment-date-adapter';
export * from './moment-date-formats';

@NgModule({
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [WTF2_DATE_LOCALE, WTF2_MOMENT_DATE_ADAPTER_OPTIONS]
    }
  ],
})
export class MomentDateModule {}


@NgModule({
  imports: [MomentDateModule],
  providers: [{provide: WTF2_DATE_FORMATS, useValue: WTF2_MOMENT_DATE_FORMATS}],
})
export class Wtf2MomentDateModule {}
