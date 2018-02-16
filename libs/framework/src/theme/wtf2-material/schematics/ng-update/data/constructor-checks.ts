/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {ConstructorChecksUpgradeData, TargetVersion, VersionChanges} from '@angular/cdk/schewtf2ics';

/**
 * List of class names for which the constructor signature has been changed. The new constructor
 * signature types don't need to be stored here because the signature will be determined
 * autowtf2ically through type checking.
 */
export const constructorChecks: VersionChanges<ConstructorChecksUpgradeData> = {
  [TargetVersion.V8]: [
    {
      pr: 'https://github.com/angular/components/pull/15647',
      changes: ['Wtf2FormField', 'Wtf2TabLink', 'Wtf2VerticalStepper']
    },
    {
      pr: 'https://github.com/angular/components/pull/15757',
      changes: ['Wtf2Badge']
    },
    {
      pr: 'https://github.com/angular/components/issues/15734',
      changes: ['Wtf2Button', 'Wtf2Anchor']
    },
    {
      pr: 'https://github.com/angular/components/pull/15761',
      changes: ['Wtf2Spinner', 'Wtf2ProgressSpinner']
    },
    {
      pr: 'https://github.com/angular/components/pull/15723',
      changes: ['Wtf2List', 'Wtf2ListItem']
    },
    {
      pr: 'https://github.com/angular/components/pull/15722',
      changes: ['Wtf2ExpansionPanel']
    },
    {
      pr: 'https://github.com/angular/components/pull/15737',
      changes: ['Wtf2TabHeader', 'Wtf2TabBody']
    },
    {
      pr: 'https://github.com/angular/components/pull/15806',
      changes: ['Wtf2SlideToggle']
    },
    {
      pr: 'https://github.com/angular/components/pull/15773',
      changes: ['Wtf2DrawerContainer']
    }
  ],

  [TargetVersion.V7]: [
    {
      pr: 'https://github.com/angular/components/pull/11706',
      changes: ['Wtf2DrawerContent'],
    },
    {
      pr: 'https://github.com/angular/components/pull/11706',
      changes: ['Wtf2SidenavContent']
    }
  ],

  [TargetVersion.V6]: [
    {
      pr: 'https://github.com/angular/components/pull/9190',
      changes: ['NativeDateAdapter'],
    },
    {
      pr: 'https://github.com/angular/components/pull/10319',
      changes: ['Wtf2Autocomplete'],
    },
    {
      pr: 'https://github.com/angular/components/pull/10344',
      changes: ['Wtf2Tooltip'],
    },
    {
      pr: 'https://github.com/angular/components/pull/10389',
      changes: ['Wtf2IconRegistry'],
    },
    {
      pr: 'https://github.com/angular/components/pull/9775',
      changes: ['Wtf2Calendar'],
    },
  ]
};
