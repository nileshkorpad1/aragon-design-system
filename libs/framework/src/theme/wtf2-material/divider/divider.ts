/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {coerceBooleanProperty} from '@angular/cdk/coercion';

@Component({
  moduleId: module.id,
  selector: 'wtf2-divider',
  host: {
    'role': 'separator',
    '[attr.aria-orientation]': 'vertical ? "vertical" : "horizontal"',
    '[class.wtf2-divider-vertical]': 'vertical',
    '[class.wtf2-divider-horizontal]': '!vertical',
    '[class.wtf2-divider-inset]': 'inset',
    'class': 'wtf2-divider'
  },
  template: '',
  styleUrls: ['divider.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Wtf2Divider {
  /** Whether the divider is vertically aligned. */
  @Input()
  get vertical(): boolean { return this._vertical; }
  set vertical(value: boolean) { this._vertical = coerceBooleanProperty(value); }
  private _vertical: boolean = false;

  /** Whether the divider is an inset divider. */
  @Input()
  get inset(): boolean { return this._inset; }
  set inset(value: boolean) { this._inset = coerceBooleanProperty(value); }
  private _inset: boolean = false;
}
