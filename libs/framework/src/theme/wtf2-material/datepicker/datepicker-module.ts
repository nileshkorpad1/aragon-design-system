/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {A11yModule} from '@angular/cdk/a11y';
import {OverlayModule} from '@angular/cdk/overlay';
import {PortalModule} from '@angular/cdk/portal';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {Wtf2Calendar, Wtf2CalendarHeader} from './calendar';
import {Wtf2CalendarBody} from './calendar-body';
import {
  Wtf2Datepicker,
  Wtf2DatepickerContent,
  WTF2_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER,
} from './datepicker';
import {Wtf2DatepickerInput} from './datepicker-input';
import {Wtf2DatepickerIntl} from './datepicker-intl';
import {Wtf2DatepickerToggle, Wtf2DatepickerToggleIcon} from './datepicker-toggle';
import {Wtf2MonthView} from './month-view';
import {Wtf2MultiYearView} from './multi-year-view';
import {Wtf2YearView} from './year-view';
import { Wtf2DialogModule } from '../dialog';
import { Wtf2ButtonModule } from '../button';


@NgModule({
  imports: [
    CommonModule,
    Wtf2ButtonModule,
    Wtf2DialogModule,
    OverlayModule,
    A11yModule,
    PortalModule,
  ],
  exports: [
    Wtf2Calendar,
    Wtf2CalendarBody,
    Wtf2Datepicker,
    Wtf2DatepickerContent,
    Wtf2DatepickerInput,
    Wtf2DatepickerToggle,
    Wtf2DatepickerToggleIcon,
    Wtf2MonthView,
    Wtf2YearView,
    Wtf2MultiYearView,
    Wtf2CalendarHeader,
  ],
  declarations: [
    Wtf2Calendar,
    Wtf2CalendarBody,
    Wtf2Datepicker,
    Wtf2DatepickerContent,
    Wtf2DatepickerInput,
    Wtf2DatepickerToggle,
    Wtf2DatepickerToggleIcon,
    Wtf2MonthView,
    Wtf2YearView,
    Wtf2MultiYearView,
    Wtf2CalendarHeader,
  ],
  providers: [
    Wtf2DatepickerIntl,
    WTF2_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER,
  ],
  entryComponents: [
    Wtf2DatepickerContent,
    Wtf2CalendarHeader,
  ]
})
export class Wtf2DatepickerModule {}
