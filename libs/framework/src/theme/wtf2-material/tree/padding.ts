/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {CdkTreeNodePadding} from '@angular/cdk/tree';
import {Directive, Input} from '@angular/core';

/**
 * Wrapper for the CdkTree padding with Material design styles.
 */
@Directive({
  selector: '[wtf2TreeNodePadding]',
  providers: [{provide: CdkTreeNodePadding, useExisting: Wtf2TreeNodePadding}]
})
export class Wtf2TreeNodePadding<T> extends CdkTreeNodePadding<T> {

  /** The level of depth of the tree node. The padding will be `level * indent` pixels. */
  @Input('wtf2TreeNodePadding') level: number;

  /** The indent for each level. Default number 40px from material design menu sub-menu spec. */
  @Input('wtf2TreeNodePaddingIndent') indent: number;
}
