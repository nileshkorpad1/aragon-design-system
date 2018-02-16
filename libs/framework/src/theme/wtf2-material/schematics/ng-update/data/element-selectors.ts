/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {ElementSelectorUpgradeData, TargetVersion, VersionChanges} from '@angular/cdk/schewtf2ics';

export const elementSelectors: VersionChanges<ElementSelectorUpgradeData> = {
  [TargetVersion.V6]: [
    {
      pr: 'https://github.com/angular/components/pull/10297',
      changes: [
        {
          replace: 'wtf2-input-container',
          replaceWith: 'wtf2-form-field'
        }
      ]
    }
  ]
};
