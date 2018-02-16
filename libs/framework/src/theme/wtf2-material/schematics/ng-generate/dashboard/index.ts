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
 * Scaffolds a new dashboard component.
 * Internally it bootstraps the base component schewtf2ic
 */
export default function(options: Schema): Rule {
  return chain([
    buildComponent({...options}, {
      template: './__path__/__name@dasherize@if-flat__/__name@dasherize__.component.html.template',
      stylesheet:
          './__path__/__name@dasherize@if-flat__/__name@dasherize__.component.__style__.template',
    }),
    options.skipImport ? noop() : addNavModulesToModule(options)
  ]);
}

/**
 * Adds the required modules to the relative module.
 */
function addNavModulesToModule(options: Schema) {
  return (host: Tree) => {
    const modulePath = findModuleFromOptions(host, options)!;
    addModuleImportToModule(host, modulePath, 'Wtf2GridListModule', '@angular/material');
    addModuleImportToModule(host, modulePath, 'Wtf2CardModule', '@angular/material');
    addModuleImportToModule(host, modulePath, 'Wtf2MenuModule', '@angular/material');
    addModuleImportToModule(host, modulePath, 'Wtf2IconModule', '@angular/material');
    addModuleImportToModule(host, modulePath, 'Wtf2ButtonModule', '@angular/material');
    addModuleImportToModule(host, modulePath, 'LayoutModule', '@angular/cdk/layout');
    return host;
  };
}
