/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {CdkTreeNodeToggle} from '@angular/cdk/tree';
import {Directive, Input} from '@angular/core';

/**
 * Wrapper for the CdkTree's toggle with Material design styles.
 */
@Directive({
  selector: '[wtf2TreeNodeToggle]',
  providers: [{provide: CdkTreeNodeToggle, useExisting: Wtf2TreeNodeToggle}]
})
export class Wtf2TreeNodeToggle<T> extends CdkTreeNodeToggle<T> {
  @Input('wtf2TreeNodeToggleRecursive') recursive: boolean = false;
}
