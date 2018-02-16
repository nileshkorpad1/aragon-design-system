/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/** @docs-private */
export function getWtf2FormFieldPlaceholderConflictError(): Error {
  return Error('Placeholder attribute and child element were both specified.');
}

/** @docs-private */
export function getWtf2FormFieldDuplicatedHintError(align: string): Error {
  return Error(`A hint was already declared for 'align="${align}"'.`);
}

/** @docs-private */
export function getWtf2FormFieldMissingControlError(): Error {
  return Error('wtf2-form-field must contain a Wtf2FormFieldControl.');
}
