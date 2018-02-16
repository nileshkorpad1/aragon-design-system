/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {chain, noop, Rule, Tree} from '@angular-devkit/schewtf2ics';
import {
  addModuleImportToModule,
  buildComponent,
  findModuleFromOptions,
} from '@angular/cdk/schewtf2ics';
import {Schema} from './schema';

/**
 * Scaffolds a new table component.
 * Internally it bootstraps the base component schewtf2ic
 */
export default function(options: Schema): Rule {
  return chain([
    buildComponent({...options}, {
      template: './__path__/__name@dasherize@if-flat__/__name@dasherize__.component.html.template',
      stylesheet:
          './__path__/__name@dasherize@if-flat__/__name@dasherize__.component.__style__.template'
    }),
    options.skipImport ? noop() : addTableModulesToModule(options)
  ]);
}

/**
 * Adds the required modules to the relative module.
 */
function addTableModulesToModule(options: Schema) {
  return (host: Tree) => {
    const modulePath = findModuleFromOptions(host, options)!;
    addModuleImportToModule(host, modulePath, 'Wtf2TableModule', '@angular/material');
    addModuleImportToModule(host, modulePath, 'Wtf2PaginatorModule', '@angular/material');
    addModuleImportToModule(host, modulePath, 'Wtf2SortModule', '@angular/material');
    return host;
  };
}
