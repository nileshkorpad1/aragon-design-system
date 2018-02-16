/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {OutputNameUpgradeData, TargetVersion, VersionChanges} from '@angular/cdk/schewtf2ics';

export const outputNames: VersionChanges<OutputNameUpgradeData> = {
  [TargetVersion.V6]: [
    {
      pr: 'https://github.com/angular/components/pull/10163',
      changes: [
        {
          replace: 'change',
          replaceWith: 'selectionChange',
          whitelist: {
            elements: ['wtf2-select'],
          },
        },
        {
          replace: 'onClose',
          replaceWith: 'closed',
          whitelist: {
            elements: ['wtf2-select'],
          },
        },
        {
          replace: 'onOpen',
          replaceWith: 'opened',
          whitelist: {
            elements: ['wtf2-select'],
          },
        },
      ],
    },

    {
      pr: 'https://github.com/angular/components/pull/10279',
      changes: [
        {
          replace: 'align-changed',
          replaceWith: 'positionChanged',
          whitelist: {
            elements: ['wtf2-drawer', 'wtf2-sidenav'],
          },
        },
        {
          replace: 'close',
          replaceWith: 'closed',
          whitelist: {
            elements: ['wtf2-drawer', 'wtf2-sidenav'],
          },
        },
        {
          replace: 'open',
          replaceWith: 'opened',
          whitelist: {
            elements: ['wtf2-drawer', 'wtf2-sidenav'],
          },
        },
      ],
    },

    {
      pr: 'https://github.com/angular/components/pull/10309',
      changes: [
        {
          replace: 'selectChange',
          replaceWith: 'selectedTabChange',
          whitelist: {
            elements: ['wtf2-tab-group'],
          },
        },
      ],
    },

    {
      pr: 'https://github.com/angular/components/pull/10311',
      changes: [
        {
          replace: 'remove',
          replaceWith: 'removed',
          whitelist: {
            attributes: ['wtf2-chip', 'wtf2-basic-chip'],
            elements: ['wtf2-chip', 'wtf2-basic-chip'],
          },
        },
        {
          replace: 'destroy',
          replaceWith: 'destroyed',
          whitelist: {
            attributes: ['wtf2-chip', 'wtf2-basic-chip'],
            elements: ['wtf2-chip', 'wtf2-basic-chip'],
          },
        },
      ],
    },
  ],
};
