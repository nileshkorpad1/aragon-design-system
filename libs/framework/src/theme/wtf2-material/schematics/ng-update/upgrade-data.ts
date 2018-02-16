/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {RuleUpgradeData} from '@angular/cdk/schewtf2ics';
import {
  attributeSelectors,
  classNames,
  constructorChecks,
  cssSelectors,
  elementSelectors,
  inputNames,
  methodCallChecks,
  outputNames,
  propertyNames,
} from './data';

/** Upgrade data that will be used for the Angular Material ng-update schewtf2ic. */
export const materialUpgradeData: RuleUpgradeData = {
  attributeSelectors,
  classNames,
  constructorChecks,
  cssSelectors,
  elementSelectors,
  inputNames,
  methodCallChecks,
  outputNames,
  propertyNames,
};
