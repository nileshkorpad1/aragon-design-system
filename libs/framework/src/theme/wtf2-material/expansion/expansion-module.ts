/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {CdkAccordionModule} from '@angular/cdk/accordion';
import {PortalModule} from '@angular/cdk/portal';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {Wtf2Accordion} from './accordion';
import {Wtf2ExpansionPanel, Wtf2ExpansionPanelActionRow} from './expansion-panel';
import {Wtf2ExpansionPanelContent} from './expansion-panel-content';
import {
  Wtf2ExpansionPanelDescription,
  Wtf2ExpansionPanelHeader,
  Wtf2ExpansionPanelTitle,
} from './expansion-panel-header';


@NgModule({
  imports: [CommonModule, CdkAccordionModule, PortalModule],
  exports: [
    Wtf2Accordion,
    Wtf2ExpansionPanel,
    Wtf2ExpansionPanelActionRow,
    Wtf2ExpansionPanelHeader,
    Wtf2ExpansionPanelTitle,
    Wtf2ExpansionPanelDescription,
    Wtf2ExpansionPanelContent,
  ],
  declarations: [
    Wtf2Accordion,
    Wtf2ExpansionPanel,
    Wtf2ExpansionPanelActionRow,
    Wtf2ExpansionPanelHeader,
    Wtf2ExpansionPanelTitle,
    Wtf2ExpansionPanelDescription,
    Wtf2ExpansionPanelContent,
  ],
})
export class Wtf2ExpansionModule {}
