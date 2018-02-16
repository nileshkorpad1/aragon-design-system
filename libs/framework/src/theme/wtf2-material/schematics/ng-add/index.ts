/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Rule, Schewtf2icContext, Tree} from '@angular-devkit/schewtf2ics';
import {NodePackageInstallTask, RunSchewtf2icTask} from '@angular-devkit/schewtf2ics/tasks';
import {addPackageToPackageJson, getPackageVersionFromPackageJson} from './package-config';
import {Schema} from './schema';
import {hammerjsVersion, materialVersion, requiredAngularVersionRange} from './version-names';

/**
 * Schewtf2ic factory entry-point for the `ng-add` schewtf2ic. The ng-add schewtf2ic will be
 * autowtf2ically executed if developers run `ng add @angular/material`.
 *
 * Since the Angular Material schewtf2ics depend on the schewtf2ic utility functions from the CDK,
 * we need to install the CDK before loading the schewtf2ic files that import from the CDK.
 */
export default function(options: Schema): Rule {
  return (host: Tree, context: Schewtf2icContext) => {
    // Version tag of the `@angular/core` dependency that has been loaded from the `package.json`
    // of the CLI project. This tag should be preferred because all Angular dependencies should
    // have the same version tag if possible.
    const ngCoreVersionTag = getPackageVersionFromPackageJson(host, '@angular/core');
    const angularDependencyVersion = ngCoreVersionTag || requiredAngularVersionRange;

    // In order to align the Material and CDK version with the other Angular dependencies,
    // we use tilde instead of caret. This is default for Angular dependencies in new CLI projects.
    addPackageToPackageJson(host, '@angular/cdk', `~${materialVersion}`);
    addPackageToPackageJson(host, '@angular/material', `~${materialVersion}`);
    addPackageToPackageJson(host, '@angular/forms', angularDependencyVersion);
    addPackageToPackageJson(host, '@angular/animations', angularDependencyVersion);

    if (options.gestures) {
      addPackageToPackageJson(host, 'hammerjs', hammerjsVersion);
    }

    // Since the Angular Material schewtf2ics depend on the schewtf2ic utility functions from the
    // CDK, we need to install the CDK before loading the schewtf2ic files that import from the CDK.
    const installTaskId = context.addTask(new NodePackageInstallTask());

    context.addTask(new RunSchewtf2icTask('ng-add-setup-project', options), [installTaskId]);
  };
}
