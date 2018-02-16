/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {CdkTree} from '@angular/cdk/tree';
import {ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {Wtf2TreeNodeOutlet} from './outlet';

/**
 * Wrapper for the CdkTable with Material design styles.
 */
@Component({
  moduleId: module.id,
  selector: 'wtf2-tree',
  exportAs: 'wtf2Tree',
  template: `<ng-container wtf2TreeNodeOutlet></ng-container>`,
  host: {
    'class': 'wtf2-tree',
    'role': 'tree',
  },
  styleUrls: ['tree.scss'],
  encapsulation: ViewEncapsulation.None,
  // See note on CdkTree for explanation on why this uses the default change detection strategy.
  // tslint:disable-next-line:validate-decorators
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [{provide: CdkTree, useExisting: Wtf2Tree}]
})
export class Wtf2Tree<T> extends CdkTree<T> {
  // Outlets within the tree's template where the dataNodes will be inserted.
  @ViewChild(Wtf2TreeNodeOutlet, {static: true}) _nodeOutlet: Wtf2TreeNodeOutlet;
}
