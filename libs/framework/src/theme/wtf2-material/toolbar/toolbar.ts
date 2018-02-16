/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Platform} from '@angular/cdk/platform';
import {DOCUMENT} from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  Inject,
  isDevMode,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';
import {CanColor, CanColorCtor, mixinColor} from '../core';


// Boilerplate for applying mixins to Wtf2Toolbar.
/** @docs-private */
class Wtf2ToolbarBase {
  constructor(public _elementRef: ElementRef) {}
}
const _Wtf2ToolbarMixinBase: CanColorCtor & typeof Wtf2ToolbarBase = mixinColor(Wtf2ToolbarBase);

@Directive({
  selector: 'wtf2-toolbar-row',
  exportAs: 'wtf2ToolbarRow',
  host: {'class': 'wtf2-toolbar-row'},
})
export class Wtf2ToolbarRow {}

@Component({
  moduleId: module.id,
  selector: 'wtf2-toolbar',
  exportAs: 'wtf2Toolbar',
  templateUrl: 'toolbar.html',
  styleUrls: ['toolbar.scss'],
  inputs: ['color'],
  host: {
    'class': 'wtf2-toolbar',
    '[class.wtf2-toolbar-multiple-rows]': '_toolbarRows.length > 0',
    '[class.wtf2-toolbar-single-row]': '_toolbarRows.length === 0',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Wtf2Toolbar extends _Wtf2ToolbarMixinBase implements CanColor, AfterViewInit {
  private _document: Document;

  /** Reference to all toolbar row elements that have been projected. */
  @ContentChildren(Wtf2ToolbarRow) _toolbarRows: QueryList<Wtf2ToolbarRow>;

  constructor(
    elementRef: ElementRef,
    private _platform: Platform,
    @Inject(DOCUMENT) document?: any) {
    super(elementRef);

    // TODO: make the document a required param when doing breaking changes.
    this._document = document;
  }

  ngAfterViewInit() {
    if (!isDevMode() || !this._platform.isBrowser) {
      return;
    }

    this._checkToolbarMixedModes();
    this._toolbarRows.changes.subscribe(() => this._checkToolbarMixedModes());
  }

  /**
   * Throws an exception when developers are attempting to combine the different toolbar row modes.
   */
  private _checkToolbarMixedModes() {
    if (!this._toolbarRows.length) {
      return;
    }

    // Check if there are any other DOM nodes that can display content but aren't inside of
    // a <wtf2-toolbar-row> element.
    const isCombinedUsage = Array.from<HTMLElement>(this._elementRef.nativeElement.childNodes)
      .filter(node => !(node.classList && node.classList.contains('wtf2-toolbar-row')))
      .filter(node => node.nodeType !== (this._document ? this._document.COMMENT_NODE : 8))
      .some(node => !!(node.textContent && node.textContent.trim()));

    if (isCombinedUsage) {
      throwToolbarMixedModesError();
    }
  }
}

/**
 * Throws an exception when attempting to combine the different toolbar row modes.
 * @docs-private
 */
export function throwToolbarMixedModesError() {
  throw Error('Wtf2Toolbar: Attempting to combine different toolbar modes. ' +
    'Either specify multiple `<wtf2-toolbar-row>` elements explicitly or just place content ' +
    'inside of a `<wtf2-toolbar>` for a single row.');
}
