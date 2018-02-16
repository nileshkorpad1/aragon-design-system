/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {CanDisable, CanDisableCtor, mixinDisabled} from '../common-behaviors/disabled';


// Boilerplate for applying mixins to Wtf2Optgroup.
/** @docs-private */
class Wtf2OptgroupBase { }
const _Wtf2OptgroupMixinBase: CanDisableCtor & typeof Wtf2OptgroupBase =
    mixinDisabled(Wtf2OptgroupBase);

// Counter for unique group ids.
let _uniqueOptgroupIdCounter = 0;

/**
 * Component that is used to group instances of `wtf2-option`.
 */
@Component({
  moduleId: module.id,
  selector: 'wtf2-optgroup',
  exportAs: 'wtf2Optgroup',
  templateUrl: 'optgroup.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: ['disabled'],
  styleUrls: ['optgroup.scss'],
  host: {
    'class': 'wtf2-optgroup',
    'role': 'group',
    '[class.wtf2-optgroup-disabled]': 'disabled',
    '[attr.aria-disabled]': 'disabled.toString()',
    '[attr.aria-labelledby]': '_labelId',
  }
})
export class Wtf2Optgroup extends _Wtf2OptgroupMixinBase implements CanDisable {
  /** Label for the option group. */
  @Input() label: string;

  /** Unique id for the underlying label. */
  _labelId: string = `wtf2-optgroup-label-${_uniqueOptgroupIdCounter++}`;
}
