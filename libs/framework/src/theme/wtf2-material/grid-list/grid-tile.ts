/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
  Component,
  ViewEncapsulation,
  ElementRef,
  Input,
  Optional,
  ContentChildren,
  QueryList,
  AfterContentInit,
  Directive,
  ChangeDetectionStrategy,
  Inject,
} from '@angular/core';
import {Wtf2Line, setLines} from '../core';
import {coerceNumberProperty} from '@angular/cdk/coercion';
import {WTF2_GRID_LIST, Wtf2GridListBase} from './grid-list-base';

@Component({
  moduleId: module.id,
  selector: 'wtf2-grid-tile',
  exportAs: 'wtf2GridTile',
  host: {
    'class': 'wtf2-grid-tile',
  },
  templateUrl: 'grid-tile.html',
  styleUrls: ['grid-list.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Wtf2GridTile {
  _rowspan: number = 1;
  _colspan: number = 1;

  constructor(
    private _element: ElementRef<HTMLElement>,
    @Optional() @Inject(WTF2_GRID_LIST) public _gridList?: Wtf2GridListBase) {}

  /** Amount of rows that the grid tile takes up. */
  @Input()
  get rowspan(): number { return this._rowspan; }
  set rowspan(value: number) { this._rowspan = Math.round(coerceNumberProperty(value)); }

  /** Amount of columns that the grid tile takes up. */
  @Input()
  get colspan(): number { return this._colspan; }
  set colspan(value: number) { this._colspan = Math.round(coerceNumberProperty(value)); }

  /**
   * Sets the style of the grid-tile element.  Needs to be set manually to avoid
   * "Changed after checked" errors that would occur with HostBinding.
   */
  _setStyle(property: string, value: any): void {
    (this._element.nativeElement.style as any)[property] = value;
  }
}

@Component({
  moduleId: module.id,
  selector: 'wtf2-grid-tile-header, wtf2-grid-tile-footer',
  templateUrl: 'grid-tile-text.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Wtf2GridTileText implements AfterContentInit {
  @ContentChildren(Wtf2Line) _lines: QueryList<Wtf2Line>;

  constructor(private _element: ElementRef<HTMLElement>) {}

  ngAfterContentInit() {
    setLines(this._lines, this._element);
  }
}

/**
 * Directive whose purpose is to add the wtf2- CSS styling to this selector.
 * @docs-private
 */
@Directive({
  selector: '[wtf2-grid-avatar], [wtf2GridAvatar]',
  host: {'class': 'wtf2-grid-avatar'}
})
export class Wtf2GridAvatarCssWtf2Styler {}

/**
 * Directive whose purpose is to add the wtf2- CSS styling to this selector.
 * @docs-private
 */
@Directive({
  selector: 'wtf2-grid-tile-header',
  host: {'class': 'wtf2-grid-tile-header'}
})
export class Wtf2GridTileHeaderCssWtf2Styler {}

/**
 * Directive whose purpose is to add the wtf2- CSS styling to this selector.
 * @docs-private
 */
@Directive({
  selector: 'wtf2-grid-tile-footer',
  host: {'class': 'wtf2-grid-tile-footer'}
})
export class Wtf2GridTileFooterCssWtf2Styler {}
