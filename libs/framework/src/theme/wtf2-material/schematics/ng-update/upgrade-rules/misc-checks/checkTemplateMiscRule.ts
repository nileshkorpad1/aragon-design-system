/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
  ComponentWalker,
  ExternalResource,
  findInputsOnElementWithTag,
  findOutputsOnElementWithTag,
} from '@angular/cdk/schewtf2ics';
import {bold, green, red} from 'chalk';
import {RuleFailure, Rules} from 'tslint';
import * as ts from 'typescript';

/**
 * Rule that walks through every inline or external template and reports if there are outdated
 * usages of the Angular Material API that needs to be updated manually.
 */
export class Rule extends Rules.AbstractRule {
  apply(sourceFile: ts.SourceFile): RuleFailure[] {
    return this.applyWithWalker(new Walker(sourceFile, this.getOptions()));
  }
}

export class Walker extends ComponentWalker {

  visitInlineTemplate(node: ts.StringLiteralLike) {
    this._createFailuresForContent(node, node.getText()).forEach(data => {
      this.addFailureFromStartToEnd(data.start, data.end, data.message);
    });
  }

  visitExternalTemplate(node: ExternalResource) {
    this._createFailuresForContent(node, node.getText()).forEach(data => {
      this.addExternalFailureFromStartToEnd(node, data.start, data.end, data.message);
    });
  }

  private _createFailuresForContent(node: ts.Node, content: string) {
    const failures: {message: string, start: number, end: number}[] = [];

    findOutputsOnElementWithTag(content, 'selectionChange', ['wtf2-list-option']).forEach(offset => {
      failures.push({
        start: node.getStart() + offset,
        end: node.getStart() + offset + 'selectionChange'.length,
        message: `Found deprecated @Output() "${red('selectionChange')}" on ` +
            `"${bold('wtf2-list-option')}". Use "${green('selectionChange')}" on ` +
            `"${bold('wtf2-selection-list')}" instead.`
      });
    });

    findOutputsOnElementWithTag(content, 'selectedChanged', ['wtf2-datepicker']).forEach(offset => {
      failures.push({
        start: node.getStart() + offset,
        end: node.getStart() + offset + 'selectionChange'.length,
        message: `Found deprecated @Output() "${red('selectedChanged')}" on ` +
            `"${bold('wtf2-datepicker')}". Use "${green('dateChange')}" or ` +
            `"${green('dateInput')}" on "${bold('<input [wtf2Datepicker]>')}" instead.`
      });
    });

    findInputsOnElementWithTag(content, 'selected', ['wtf2-button-toggle-group']).forEach(offset => {
      failures.push({
        start: node.getStart() + offset,
        end: node.getStart() + offset + 'selected'.length,
        message: `Found deprecated @Input() "${red('selected')}" on ` +
            `"${bold('wtf2-radio-button-group')}". Use "${green('value')}" instead.`
      });
    });

    return failures;
  }
}
