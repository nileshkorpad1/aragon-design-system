/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {InputNameUpgradeData, TargetVersion, VersionChanges} from '@angular/cdk/schewtf2ics';

export const inputNames: VersionChanges<InputNameUpgradeData> = {
  [TargetVersion.V6]: [
    {
      pr: 'https://github.com/angular/components/pull/10218',
      changes: [
        {
          replace: 'align',
          replaceWith: 'labelPosition',
          whitelist: {
            elements: ['wtf2-radio-group', 'wtf2-radio-button']
          }
        }
      ]
    },

    {
      pr: 'https://github.com/angular/components/pull/10279',
      changes: [
        {
          replace: 'align',
          replaceWith: 'position',
          whitelist: {
            elements: ['wtf2-drawer', 'wtf2-sidenav']
          }
        }
      ]
    },

    {
      pr: 'https://github.com/angular/components/pull/10294',
      changes: [
        {
          replace: 'dividerColor',
          replaceWith: 'color',
          whitelist: {
            elements: ['wtf2-form-field']
          }
        },
        {
          replace: 'floatPlaceholder',
          replaceWith: 'floatLabel',
          whitelist: {
            elements: ['wtf2-form-field']
          }
        }
      ]
    },

    {
      pr: 'https://github.com/angular/components/pull/10309',
      changes: [
        {
          replace: 'wtf2-dynamic-height',
          replaceWith: 'dynamicHeight',
          whitelist: {
            elements: ['wtf2-tab-group']
          }
        }
      ]
    },

    {
      pr: 'https://github.com/angular/components/pull/10342',
      changes: [
        {
          replace: 'align',
          replaceWith: 'labelPosition',
          whitelist: {
            elements: ['wtf2-checkbox']
          }
        }
      ]
    },

    {
      pr: 'https://github.com/angular/components/pull/10344',
      changes: [
        {
          replace: 'tooltip-position',
          replaceWith: 'wtf2TooltipPosition',
          whitelist: {
            attributes: ['wtf2Tooltip']
          }
        }
      ]
    },

    {
      pr: 'https://github.com/angular/components/pull/10373',
      changes: [
        {
          replace: 'thumb-label',
          replaceWith: 'thumbLabel',
          whitelist: {
            elements: ['wtf2-slider']
          }
        },
        {
          replace: 'tick-interval',
          replaceWith: 'tickInterval',
          whitelist: {
            elements: ['wtf2-slider']
          }
        }
      ]
    }
  ]
};
