/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {ObserversModule} from '@angular/cdk/observers';
import {PortalModule} from '@angular/cdk/portal';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {Wtf2CommonModule, Wtf2RippleModule} from '../core';
import {Wtf2InkBar} from './ink-bar';
import {Wtf2Tab} from './tab';
import {Wtf2TabBody, Wtf2TabBodyPortal} from './tab-body';
import {Wtf2TabContent} from './tab-content';
import {Wtf2TabGroup} from './tab-group';
import {Wtf2TabHeader} from './tab-header';
import {Wtf2TabLabel} from './tab-label';
import {Wtf2TabLabelWrapper} from './tab-label-wrapper';
import {Wtf2TabLink, Wtf2TabNav} from './tab-nav-bar/tab-nav-bar';
import {A11yModule} from '@angular/cdk/a11y';


@NgModule({
  imports: [
    CommonModule,
    Wtf2CommonModule,
    PortalModule,
    Wtf2RippleModule,
    ObserversModule,
    A11yModule,
  ],
  // Don't export all components because some are only to be used internally.
  exports: [
    Wtf2CommonModule,
    Wtf2TabGroup,
    Wtf2TabLabel,
    Wtf2Tab,
    Wtf2TabNav,
    Wtf2TabLink,
    Wtf2TabContent,
  ],
  declarations: [
    Wtf2TabGroup,
    Wtf2TabLabel,
    Wtf2Tab,
    Wtf2InkBar,
    Wtf2TabLabelWrapper,
    Wtf2TabNav,
    Wtf2TabLink,
    Wtf2TabBody,
    Wtf2TabBodyPortal,
    Wtf2TabHeader,
    Wtf2TabContent,
  ],
})
export class Wtf2TabsModule {}
