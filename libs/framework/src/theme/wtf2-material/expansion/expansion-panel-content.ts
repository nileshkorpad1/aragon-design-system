/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Directive, TemplateRef} from '@angular/core';

/**
 * Expansion panel content that will be rendered lazily
 * after the panel is opened for the first time.
 */
@Directive({
  selector: 'ng-template[wtf2ExpansionPanelContent]'
})
export class Wtf2ExpansionPanelContent {
  constructor(public _template: TemplateRef<any>) {}
}
