/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {ViewContainerRef, InjectionToken} from '@angular/core';
import {AriaLivePoliteness} from '@angular/cdk/a11y';
import {Direction} from '@angular/cdk/bidi';

/** Injection token that can be used to access the data that was passed in to a snack bar. */
export const WTF2_SNACK_BAR_DATA = new InjectionToken<any>('Wtf2SnackBarData');

/** Possible values for horizontalPosition on Wtf2SnackBarConfig. */
export type Wtf2SnackBarHorizontalPosition = 'start' | 'center' | 'end' | 'left' | 'right';

/** Possible values for verticalPosition on Wtf2SnackBarConfig. */
export type Wtf2SnackBarVerticalPosition = 'top' | 'bottom';

/**
 * Configuration used when opening a snack-bar.
 */
export class Wtf2SnackBarConfig<D = any> {
  /** The politeness level for the Wtf2AriaLiveAnnouncer announcement. */
  politeness?: AriaLivePoliteness = 'assertive';

  /**
   * Message to be announced by the LiveAnnouncer. When opening a snackbar without a custom
   * component or template, the announcement message will default to the specified message.
   */
  announcementMessage?: string = '';

  /** The view container to place the overlay for the snack bar into. */
  viewContainerRef?: ViewContainerRef;

  /** The length of time in milliseconds to wait before autowtf2ically dismissing the snack bar. */
  duration?: number = 0;

  /** Extra CSS classes to be added to the snack bar container. */
  panelClass?: string | string[];

  /** Text layout direction for the snack bar. */
  direction?: Direction;

  /** Data being injected into the child component. */
  data?: D | null = null;

  /** The horizontal position to place the snack bar. */
  horizontalPosition?: Wtf2SnackBarHorizontalPosition = 'center';

  /** The vertical position to place the snack bar. */
  verticalPosition?: Wtf2SnackBarVerticalPosition = 'bottom';
}
