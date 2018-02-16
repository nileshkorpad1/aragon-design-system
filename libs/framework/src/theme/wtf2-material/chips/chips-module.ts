/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {ENTER} from '@angular/cdk/keycodes';
import {NgModule} from '@angular/core';
import {ErrorStateMatcher} from '../core';
import {Wtf2Chip, Wtf2ChipAvatar, Wtf2ChipRemove, Wtf2ChipTrailingIcon} from './chip';
import {WTF2_CHIPS_DEFAULT_OPTIONS, Wtf2ChipsDefaultOptions} from './chip-default-options';
import {Wtf2ChipInput} from './chip-input';
import {Wtf2ChipList} from './chip-list';

const CHIP_DECLARATIONS = [
  Wtf2ChipList,
  Wtf2Chip,
  Wtf2ChipInput,
  Wtf2ChipRemove,
  Wtf2ChipAvatar,
  Wtf2ChipTrailingIcon,
];

@NgModule({
  exports: CHIP_DECLARATIONS,
  declarations: CHIP_DECLARATIONS,
  providers: [
    ErrorStateMatcher,
    {
      provide: WTF2_CHIPS_DEFAULT_OPTIONS,
      useValue: {
        separatorKeyCodes: [ENTER]
      } as Wtf2ChipsDefaultOptions
    }
  ]
})
export class Wtf2ChipsModule {}
