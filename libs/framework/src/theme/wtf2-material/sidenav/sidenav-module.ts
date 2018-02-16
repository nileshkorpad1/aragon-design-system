/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {PlatformModule} from '@angular/cdk/platform';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {Wtf2CommonModule} from '../core';
import {Wtf2Drawer, Wtf2DrawerContainer, Wtf2DrawerContent} from './drawer';
import {Wtf2Sidenav, Wtf2SidenavContainer, Wtf2SidenavContent} from './sidenav';


@NgModule({
  imports: [
    CommonModule,
    Wtf2CommonModule,
    ScrollingModule,
    PlatformModule,
  ],
  exports: [
    Wtf2CommonModule,
    Wtf2Drawer,
    Wtf2DrawerContainer,
    Wtf2DrawerContent,
    Wtf2Sidenav,
    Wtf2SidenavContainer,
    Wtf2SidenavContent,
  ],
  declarations: [
    Wtf2Drawer,
    Wtf2DrawerContainer,
    Wtf2DrawerContent,
    Wtf2Sidenav,
    Wtf2SidenavContainer,
    Wtf2SidenavContent,
  ],
})
export class Wtf2SidenavModule {}
