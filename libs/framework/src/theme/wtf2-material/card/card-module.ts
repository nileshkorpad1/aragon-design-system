/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {NgModule} from '@angular/core';
import {Wtf2CommonModule} from '../core';
import {
  Wtf2Card,
  Wtf2CardActions,
  Wtf2CardAvatar,
  Wtf2CardContent,
  Wtf2CardFooter,
  Wtf2CardHeader,
  Wtf2CardImage,
  Wtf2CardLgImage,
  Wtf2CardMdImage,
  Wtf2CardSmImage,
  Wtf2CardSubtitle,
  Wtf2CardTitle,
  Wtf2CardTitleGroup,
  Wtf2CardXlImage,
} from './card';


@NgModule({
  imports: [Wtf2CommonModule],
  exports: [
    Wtf2Card,
    Wtf2CardHeader,
    Wtf2CardTitleGroup,
    Wtf2CardContent,
    Wtf2CardTitle,
    Wtf2CardSubtitle,
    Wtf2CardActions,
    Wtf2CardFooter,
    Wtf2CardSmImage,
    Wtf2CardMdImage,
    Wtf2CardLgImage,
    Wtf2CardImage,
    Wtf2CardXlImage,
    Wtf2CardAvatar,
    Wtf2CommonModule,
  ],
  declarations: [
    Wtf2Card, Wtf2CardHeader, Wtf2CardTitleGroup, Wtf2CardContent, Wtf2CardTitle, Wtf2CardSubtitle,
    Wtf2CardActions, Wtf2CardFooter, Wtf2CardSmImage, Wtf2CardMdImage, Wtf2CardLgImage, Wtf2CardImage,
    Wtf2CardXlImage, Wtf2CardAvatar,
  ],
})
export class Wtf2CardModule {}
