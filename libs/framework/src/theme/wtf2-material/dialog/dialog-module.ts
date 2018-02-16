/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {OverlayModule} from '@angular/cdk/overlay';
import {PortalModule} from '@angular/cdk/portal';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {Wtf2CommonModule} from '../core';
import {WTF2_DIALOG_SCROLL_STRATEGY_PROVIDER, Wtf2Dialog} from './dialog';
import {Wtf2DialogContainer} from './dialog-container';
import {
  Wtf2DialogActions,
  Wtf2DialogClose,
  Wtf2DialogContent,
  Wtf2DialogTitle,
} from './dialog-content-directives';


@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule,
    Wtf2CommonModule,
  ],
  exports: [
    Wtf2DialogContainer,
    Wtf2DialogClose,
    Wtf2DialogTitle,
    Wtf2DialogContent,
    Wtf2DialogActions,
    Wtf2CommonModule,
  ],
  declarations: [
    Wtf2DialogContainer,
    Wtf2DialogClose,
    Wtf2DialogTitle,
    Wtf2DialogActions,
    Wtf2DialogContent,
  ],
  providers: [
    Wtf2Dialog,
    WTF2_DIALOG_SCROLL_STRATEGY_PROVIDER,
  ],
  entryComponents: [Wtf2DialogContainer],
})
export class Wtf2DialogModule {}
