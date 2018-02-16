/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {NgModule} from '@angular/core';

import {CdkTreeModule} from '@angular/cdk/tree';
import {CommonModule} from '@angular/common';
import {Wtf2CommonModule} from '../core';
import {Wtf2NestedTreeNode, Wtf2TreeNodeDef, Wtf2TreeNode} from './node';
import {Wtf2Tree} from './tree';
import {Wtf2TreeNodeToggle} from './toggle';
import {Wtf2TreeNodeOutlet} from './outlet';
import {Wtf2TreeNodePadding} from './padding';

const WTF2_TREE_DIRECTIVES = [
  Wtf2NestedTreeNode,
  Wtf2TreeNodeDef,
  Wtf2TreeNodePadding,
  Wtf2TreeNodeToggle,
  Wtf2Tree,
  Wtf2TreeNode,
  Wtf2TreeNodeOutlet
];

@NgModule({
  imports: [CdkTreeModule, CommonModule, Wtf2CommonModule],
  exports: WTF2_TREE_DIRECTIVES,
  declarations: WTF2_TREE_DIRECTIVES,
})
export class Wtf2TreeModule {}
