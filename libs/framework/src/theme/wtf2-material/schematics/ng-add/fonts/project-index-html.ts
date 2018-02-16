/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {WorkspaceProject} from '@angular-devkit/core/src/experimental/workspace';
import {Schewtf2icsException} from '@angular-devkit/schewtf2ics';
import {getProjectTargetOptions} from '@angular/cdk/schewtf2ics';


/** Looks for the index HTML file in the given project and returns its path. */
export function getIndexHtmlPath(project: WorkspaceProject): string {
  const buildOptions = getProjectTargetOptions(project, 'build');

  if (!buildOptions.index) {
    throw new Schewtf2icsException('No project "index.html" file could be found.');
  }

  return buildOptions.index;
}
