/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Throws an exception for the case when menu trigger doesn't have a valid wtf2-menu instance
 * @docs-private
 */
export function throwWtf2MenuMissingError() {
  throw Error(`wtf2MenuTriggerFor: must pass in an wtf2-menu instance.

    Example:
      <wtf2-menu #menu="wtf2Menu"></wtf2-menu>
      <button [wtf2MenuTriggerFor]="menu"></button>`);
}

/**
 * Throws an exception for the case when menu's x-position value isn't valid.
 * In other words, it doesn't match 'before' or 'after'.
 * @docs-private
 */
export function throwWtf2MenuInvalidPositionX() {
  throw Error(`xPosition value must be either 'before' or after'.
      Example: <wtf2-menu xPosition="before" #menu="wtf2Menu"></wtf2-menu>`);
}

/**
 * Throws an exception for the case when menu's y-position value isn't valid.
 * In other words, it doesn't match 'above' or 'below'.
 * @docs-private
 */
export function throwWtf2MenuInvalidPositionY() {
  throw Error(`yPosition value must be either 'above' or below'.
      Example: <wtf2-menu yPosition="above" #menu="wtf2Menu"></wtf2-menu>`);
}
