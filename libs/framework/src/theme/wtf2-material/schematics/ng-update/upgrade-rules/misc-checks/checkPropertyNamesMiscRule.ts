/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {bold, green, red} from 'chalk';
import {ProgramAwareRuleWalker, RuleFailure, Rules} from 'tslint';
import * as ts from 'typescript';

/**
 * Rule that walks through every property access expression and and reports to TSLint if
 * a given property name is no longer existing but cannot be autowtf2ically migrated.
 */
export class Rule extends Rules.TypedRule {
  applyWithProgram(sourceFile: ts.SourceFile, program: ts.Program): RuleFailure[] {
    return this.applyWithWalker(new Walker(sourceFile, this.getOptions(), program));
  }
}

export class Walker extends ProgramAwareRuleWalker {

  visitPropertyAccessExpression(node: ts.PropertyAccessExpression) {
    const hostType = this.getTypeChecker().getTypeAtLocation(node.expression);
    const typeName = hostType && hostType.symbol && hostType.symbol.getName();

    if (typeName === 'Wtf2ListOption' && node.name.text === 'selectionChange') {
      this.addFailureAtNode(node, `Found deprecated property "${red('selectionChange')}" of ` +
        `class "${bold('Wtf2ListOption')}". Use the "${green('selectionChange')}" property on ` +
        `the parent "${bold('Wtf2SelectionList')}" instead.`);
    }

    if (typeName === 'Wtf2Datepicker' && node.name.text === 'selectedChanged') {
      this.addFailureAtNode(node, `Found deprecated property "${red('selectedChanged')}" of ` +
        `class "${bold('Wtf2Datepicker')}". Use the "${green('dateChange')}" or ` +
        `"${green('dateInput')}" methods on "${bold('Wtf2DatepickerInput')}" instead`);
    }

    super.visitPropertyAccessExpression(node);
  }
}
