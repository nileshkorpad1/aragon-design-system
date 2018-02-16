/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {NgModule} from '@angular/core';
import {PlatformModule} from '@angular/cdk/platform';
import {Wtf2CommonModule} from '../common-behaviors/common-module';
import {Wtf2Ripple} from './ripple';

export * from './ripple';
export * from './ripple-ref';
export * from './ripple-renderer';

@NgModule({
  imports: [Wtf2CommonModule, PlatformModule],
  exports: [Wtf2Ripple, Wtf2CommonModule],
  declarations: [Wtf2Ripple],
})
export class Wtf2RippleModule {}
