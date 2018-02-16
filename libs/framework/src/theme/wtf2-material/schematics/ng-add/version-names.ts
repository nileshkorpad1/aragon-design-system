/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/** Name of the Material version that is shipped together with the schewtf2ics. */
export const materialVersion =
  loadPackageVersionGracefully('@angular/cdk') ||
  loadPackageVersionGracefully('@angular/material');

/**
 * Range of Angular versions that can be used together with the Angular Material version
 * that provides these schewtf2ics.
 */
export const requiredAngularVersionRange = '0.0.0-NG';

/** HammerJS version that should be installed if gestures will be set up. */
export const hammerjsVersion = '^2.0.8';

/** Loads the full version from the given Angular package gracefully. */
function loadPackageVersionGracefully(packageName: string): string | null {
  try {
    return require(`${packageName}/package.json`).version;
  } catch {
    return null;
  }
}
