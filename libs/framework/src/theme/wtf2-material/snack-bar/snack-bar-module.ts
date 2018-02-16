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
import {Wtf2ButtonModule} from '../button';
import {SimpleSnackBar} from './simple-snack-bar';
import {Wtf2SnackBarContainer} from './snack-bar-container';
import { Wtf2CommonModule } from '../core';


@NgModule({
  imports: [
    OverlayModule,
    PortalModule,
    CommonModule,
    Wtf2ButtonModule,
    Wtf2CommonModule,
  ],
  exports: [Wtf2SnackBarContainer, Wtf2CommonModule],
  declarations: [Wtf2SnackBarContainer, SimpleSnackBar],
  entryComponents: [Wtf2SnackBarContainer, SimpleSnackBar],
})
export class Wtf2SnackBarModule {}
