/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
  CDK_TREE_NODE_OUTLET_NODE,
  CdkNestedTreeNode,
  CdkTree,
  CdkTreeNode,
  CdkTreeNodeDef,
} from '@angular/cdk/tree';
import {
  AfterContentInit,
  Attribute,
  ContentChildren,
  Directive,
  ElementRef,
  Input,
  IterableDiffers,
  OnDestroy,
  QueryList,
} from '@angular/core';
import {
  CanDisable,
  CanDisableCtor,
  HasTabIndex,
  HasTabIndexCtor,
  mixinDisabled,
  mixinTabIndex,
} from '../core';

import {Wtf2TreeNodeOutlet} from './outlet';

const _Wtf2TreeNodeMixinBase: HasTabIndexCtor & CanDisableCtor & typeof CdkTreeNode =
    mixinTabIndex(mixinDisabled(CdkTreeNode));

const _Wtf2NestedTreeNodeMixinBase:
    HasTabIndexCtor & CanDisableCtor & typeof CdkNestedTreeNode =
        mixinTabIndex(mixinDisabled(CdkNestedTreeNode));

/**
 * Wrapper for the CdkTree node with Material design styles.
 */
@Directive({
  selector: 'wtf2-tree-node',
  exportAs: 'wtf2TreeNode',
  inputs: ['disabled', 'tabIndex'],
  host: {
    '[attr.aria-expanded]': 'isExpanded',
    '[attr.aria-level]': 'role === "treeitem" ? level : null',
    '[attr.role]': 'role',
    'class': 'wtf2-tree-node'
  },
  providers: [{provide: CdkTreeNode, useExisting: Wtf2TreeNode}]
})
export class Wtf2TreeNode<T> extends _Wtf2TreeNodeMixinBase<T>
    implements CanDisable, HasTabIndex {
  @Input() role: 'treeitem' | 'group' = 'treeitem';

  constructor(protected _elementRef: ElementRef<HTMLElement>,
              protected _tree: CdkTree<T>,
              @Attribute('tabindex') tabIndex: string) {
    super(_elementRef, _tree);

    this.tabIndex = Number(tabIndex) || 0;
  }
}

/**
 * Wrapper for the CdkTree node definition with Material design styles.
 */
@Directive({
  selector: '[wtf2TreeNodeDef]',
  inputs: [
    'when: wtf2TreeNodeDefWhen'
  ],
  providers: [{provide: CdkTreeNodeDef, useExisting: Wtf2TreeNodeDef}]
})
export class Wtf2TreeNodeDef<T> extends CdkTreeNodeDef<T> {
  @Input('wtf2TreeNode') data: T;
}

/**
 * Wrapper for the CdkTree nested node with Material design styles.
 */
@Directive({
  selector: 'wtf2-nested-tree-node',
  exportAs: 'wtf2NestedTreeNode',
  host: {
    '[attr.aria-expanded]': 'isExpanded',
    '[attr.role]': 'role',
    'class': 'wtf2-nested-tree-node',
  },
  inputs: ['disabled', 'tabIndex'],
  providers: [
    {provide: CdkNestedTreeNode, useExisting: Wtf2NestedTreeNode},
    {provide: CdkTreeNode, useExisting: Wtf2NestedTreeNode},
    {provide: CDK_TREE_NODE_OUTLET_NODE, useExisting: Wtf2NestedTreeNode}
  ]
})
export class Wtf2NestedTreeNode<T> extends _Wtf2NestedTreeNodeMixinBase<T> implements
    AfterContentInit, CanDisable, HasTabIndex, OnDestroy {
  @Input('wtf2NestedTreeNode') node: T;

  /** The children node placeholder. */
  @ContentChildren(Wtf2TreeNodeOutlet, {
    // We need to use `descendants: true`, because Ivy will no longer match
    // indirect descendants if it's left as false.
    descendants: true
  })
  nodeOutlet: QueryList<Wtf2TreeNodeOutlet>;

  constructor(protected _elementRef: ElementRef<HTMLElement>,
              protected _tree: CdkTree<T>,
              protected _differs: IterableDiffers,
              @Attribute('tabindex') tabIndex: string) {
    super(_elementRef, _tree, _differs);

    this.tabIndex = Number(tabIndex) || 0;
  }

  // This is a workaround for https://github.com/angular/angular/issues/23091
  // In aot mode, the lifecycle hooks from parent class are not called.
  // TODO(tinayuangao): Remove when the angular issue #23091 is fixed
  ngAfterContentInit() {
    super.ngAfterContentInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
