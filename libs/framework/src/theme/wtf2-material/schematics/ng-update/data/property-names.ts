/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {PropertyNameUpgradeData, TargetVersion, VersionChanges} from '@angular/cdk/schewtf2ics';

export const propertyNames: VersionChanges<PropertyNameUpgradeData> = {
  [TargetVersion.V6]: [
    {
      pr: 'https://github.com/angular/components/pull/10163',
      changes: [
        {
          replace: 'change',
          replaceWith: 'selectionChange',
          whitelist: {
            classes: ['Wtf2Select']
          }
        },
        {
          replace: 'onOpen',
          replaceWith: 'openedChange.pipe(filter(isOpen => isOpen))',
          whitelist: {
            classes: ['Wtf2Select']
          }
        },
        {
          replace: 'onClose',
          replaceWith: 'openedChange.pipe(filter(isOpen => !isOpen))',
          whitelist: {
            classes: ['Wtf2Select']
          }
        }
      ]
    },

    {
      pr: 'https://github.com/angular/components/pull/10218',
      changes: [
        {
          replace: 'align',
          replaceWith: 'labelPosition',
          whitelist: {
            classes: ['Wtf2RadioGroup', 'Wtf2RadioButton']
          }
        }
      ]
    },

    {
      pr: 'https://github.com/angular/components/pull/10253',
      changes: [
        {
          replace: 'extraClasses',
          replaceWith: 'panelClass',
          whitelist: {
            classes: ['Wtf2SnackBarConfig']
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
            classes: ['Wtf2Drawer', 'Wtf2Sidenav']
          }
        },
        {
          replace: 'onAlignChanged',
          replaceWith: 'onPositionChanged',
          whitelist: {
            classes: ['Wtf2Drawer', 'Wtf2Sidenav']
          }
        },
        {
          replace: 'onOpen',
          replaceWith: 'openedChange.pipe(filter(isOpen => isOpen))',
          whitelist: {
            classes: ['Wtf2Drawer', 'Wtf2Sidenav']
          }
        },
        {
          replace: 'onClose',
          replaceWith: 'openedChange.pipe(filter(isOpen => !isOpen))',
          whitelist: {
            classes: ['Wtf2Drawer', 'Wtf2Sidenav']
          }
        }
      ]
    },

    {
      pr: 'https://github.com/angular/components/pull/10293',
      changes: [
        {
          replace: 'shouldPlaceholderFloat',
          replaceWith: 'shouldLabelFloat',
          whitelist: {
            classes: ['Wtf2FormFieldControl', 'Wtf2Select']
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
            classes: ['Wtf2FormField']
          }
        },
        {
          replace: 'floatPlaceholder',
          replaceWith: 'floatLabel',
          whitelist: {
            classes: ['Wtf2FormField']
          }
        }
      ]
    },

    {
      pr: 'https://github.com/angular/components/pull/10309',
      changes: [
        {
          replace: 'selectChange',
          replaceWith: 'selectedTabChange',
          whitelist: {
            classes: ['Wtf2TabGroup']
          }
        },
        {
          replace: '_dynamicHeightDeprecated',
          replaceWith: 'dynamicHeight',
          whitelist: {
            classes: ['Wtf2TabGroup']
          }
        }
      ]
    },

    {
      pr: 'https://github.com/angular/components/pull/10311',
      changes: [
        {
          replace: 'destroy',
          replaceWith: 'destroyed',
          whitelist: {
            classes: ['Wtf2Chip']
          }
        },
        {
          replace: 'onRemove',
          replaceWith: 'removed',
          whitelist: {
            classes: ['Wtf2Chip']
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
            classes: ['Wtf2Checkbox']
          }
        }
      ]
    },

    {
      pr: 'https://github.com/angular/components/pull/10344',
      changes: [
        {
          replace: '_positionDeprecated',
          replaceWith: 'position',
          whitelist: {
            classes: ['Wtf2Tooltip']
          }
        }
      ]
    },

    {
      pr: 'https://github.com/angular/components/pull/10373',
      changes: [
        {
          replace: '_thumbLabelDeprecated',
          replaceWith: 'thumbLabel',
          whitelist: {
            classes: ['Wtf2Slider']
          }
        },
        {
          replace: '_tickIntervalDeprecated',
          replaceWith: 'tickInterval',
          whitelist: {
            classes: ['Wtf2Slider']
          }
        }
      ]
    },
  ]
};
