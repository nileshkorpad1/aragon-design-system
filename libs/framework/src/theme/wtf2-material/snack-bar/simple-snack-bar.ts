/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Component, ViewEncapsulation, Inject, ChangeDetectionStrategy} from '@angular/core';
import {Wtf2SnackBarRef} from './snack-bar-ref';
import {WTF2_SNACK_BAR_DATA} from './snack-bar-config';


/**
 * A component used to open as the default snack bar, matching material spec.
 * This should only be used internally by the snack bar service.
 */
@Component({
  moduleId: module.id,
  selector: 'simple-snack-bar',
  templateUrl: 'simple-snack-bar.html',
  styleUrls: ['simple-snack-bar.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'wtf2-simple-snackbar',
  }
})
export class SimpleSnackBar {
  /** Data that was injected into the snack bar. */
  data: {message: string, action: string};

  constructor(
    public snackBarRef: Wtf2SnackBarRef<SimpleSnackBar>,
    @Inject(WTF2_SNACK_BAR_DATA) data: any) {
    this.data = data;
  }

  /** Performs the action on the snack bar. */
  action(): void {
    this.snackBarRef.dismissWithAction();
  }

  /** If the action button should be shown. */
  get hasAction(): boolean {
    return !!this.data.action;
  }
}
