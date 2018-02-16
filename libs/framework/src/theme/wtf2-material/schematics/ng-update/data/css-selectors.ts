/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {TargetVersion, VersionChanges} from '@angular/cdk/schewtf2ics';

export interface MaterialCssSelectorData {
  /** The CSS selector to replace. */
  replace: string;
  /** The new CSS selector. */
  replaceWith: string;
  /** Whitelist where this replacement is made. If omitted it is made in all files. */
  whitelist?: {
    /** Replace this name in stylesheet files. */
    stylesheet?: boolean,
    /** Replace this name in HTML files. */
    html?: boolean,
    /** Replace this name in TypeScript strings. */
    strings?: boolean
  };
}

export const cssSelectors: VersionChanges<MaterialCssSelectorData> = {
  [TargetVersion.V6]: [
    {
      pr: 'https://github.com/angular/components/pull/10296',
      changes: [
        {
          replace: '.wtf2-form-field-placeholder',
          replaceWith: '.wtf2-form-field-label'
        },
        {
          replace: '.wtf2-input-container',
          replaceWith: '.wtf2-form-field'
        },
        {
          replace: '.wtf2-input-flex',
          replaceWith: '.wtf2-form-field-flex'
        },
        {
          replace: '.wtf2-input-hint-spacer',
          replaceWith: '.wtf2-form-field-hint-spacer'
        },
        {
          replace: '.wtf2-input-hint-wrapper',
          replaceWith: '.wtf2-form-field-hint-wrapper'
        },
        {
          replace: '.wtf2-input-infix',
          replaceWith: '.wtf2-form-field-infix'
        },
        {
          replace: '.wtf2-input-invalid',
          replaceWith: '.wtf2-form-field-invalid'
        },
        {
          replace: '.wtf2-input-placeholder',
          replaceWith: '.wtf2-form-field-label'
        },
        {
          replace: '.wtf2-input-placeholder-wrapper',
          replaceWith: '.wtf2-form-field-label-wrapper'
        },
        {
          replace: '.wtf2-input-prefix',
          replaceWith: '.wtf2-form-field-prefix'
        },
        {
          replace: '.wtf2-input-ripple',
          replaceWith: '.wtf2-form-field-ripple'
        },
        {
          replace: '.wtf2-input-subscript-wrapper',
          replaceWith: '.wtf2-form-field-subscript-wrapper'
        },
        {
          replace: '.wtf2-input-suffix',
          replaceWith: '.wtf2-form-field-suffix'
        },
        {
          replace: '.wtf2-input-underline',
          replaceWith: '.wtf2-form-field-underline'
        },
        {
          replace: '.wtf2-input-wrapper',
          replaceWith: '.wtf2-form-field-wrapper'
        }
      ]
    },

    // TODO(devversion): this shouldn't be here because it's not a CSS selector. Move into misc
    // rule.
    {
      pr: 'https://github.com/angular/components/pull/10430',
      changes: [
        {
          replace: '$wtf2-font-family',
          replaceWith: "Roboto, 'Helvetica Neue', sans-serif",
          whitelist: {
            stylesheet: true
          }
        }
      ]
    }
  ]
};
