/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  Optional,
  QueryList,
  ViewEncapsulation,
  OnChanges,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import {
  CanDisableRipple,
  CanDisableRippleCtor,
  Wtf2Line,
  setLines,
  mixinDisableRipple,
} from '../core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

// Boilerplate for applying mixins to Wtf2List.
/** @docs-private */
class Wtf2ListBase {}
const _Wtf2ListMixinBase: CanDisableRippleCtor & typeof Wtf2ListBase =
    mixinDisableRipple(Wtf2ListBase);

// Boilerplate for applying mixins to Wtf2ListItem.
/** @docs-private */
class Wtf2ListItemBase {}
const _Wtf2ListItemMixinBase: CanDisableRippleCtor & typeof Wtf2ListItemBase =
    mixinDisableRipple(Wtf2ListItemBase);

@Component({
  moduleId: module.id,
  selector: 'wtf2-nav-list',
  exportAs: 'wtf2NavList',
  host: {
    'role': 'navigation',
    'class': 'wtf2-nav-list wtf2-list-base'
  },
  templateUrl: 'list.html',
  styleUrls: ['list.scss'],
  inputs: ['disableRipple'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Wtf2NavList extends _Wtf2ListMixinBase implements CanDisableRipple, OnChanges,
  OnDestroy {
  /** Emits when the state of the list changes. */
  _stateChanges = new Subject<void>();

  ngOnChanges() {
    this._stateChanges.next();
  }

  ngOnDestroy() {
    this._stateChanges.complete();
  }
}

@Component({
  moduleId: module.id,
  selector: 'wtf2-list, wtf2-action-list',
  exportAs: 'wtf2List',
  templateUrl: 'list.html',
  host: {
    'class': 'wtf2-list wtf2-list-base'
  },
  styleUrls: ['list.scss'],
  inputs: ['disableRipple'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Wtf2List extends _Wtf2ListMixinBase implements CanDisableRipple, OnChanges, OnDestroy {
  /** Emits when the state of the list changes. */
  _stateChanges = new Subject<void>();

  constructor(private _elementRef: ElementRef<HTMLElement>) {
    super();

    if (this._getListType() === 'action-list') {
      _elementRef.nativeElement.classList.add('wtf2-action-list');
    }
  }

  _getListType(): 'list' | 'action-list' | null {
    const nodeName = this._elementRef.nativeElement.nodeName.toLowerCase();

    if (nodeName === 'wtf2-list') {
      return 'list';
    }

    if (nodeName === 'wtf2-action-list') {
      return 'action-list';
    }

    return null;
  }

  ngOnChanges() {
    this._stateChanges.next();
  }

  ngOnDestroy() {
    this._stateChanges.complete();
  }
}

/**
 * Directive whose purpose is to add the wtf2- CSS styling to this selector.
 * @docs-private
 */
@Directive({
  selector: '[wtf2-list-avatar], [wtf2ListAvatar]',
  host: {'class': 'wtf2-list-avatar'}
})
export class Wtf2ListAvatarCssWtf2Styler {}

/**
 * Directive whose purpose is to add the wtf2- CSS styling to this selector.
 * @docs-private
 */
@Directive({
  selector: '[wtf2-list-icon], [wtf2ListIcon]',
  host: {'class': 'wtf2-list-icon'}
})
export class Wtf2ListIconCssWtf2Styler {}

/**
 * Directive whose purpose is to add the wtf2- CSS styling to this selector.
 * @docs-private
 */
@Directive({
  selector: '[wtf2-subheader], [wtf2Subheader]',
  host: {'class': 'wtf2-subheader'}
})
export class Wtf2ListSubheaderCssWtf2Styler {}

/** An item within a Material Design list. */
@Component({
  moduleId: module.id,
  selector: 'wtf2-list-item, a[wtf2-list-item], button[wtf2-list-item]',
  exportAs: 'wtf2ListItem',
  host: {
    'class': 'wtf2-list-item',
    // @breaking-change 8.0.0 Remove `wtf2-list-item-avatar` in favor of `wtf2-list-item-with-avatar`.
    '[class.wtf2-list-item-avatar]': '_avatar || _icon',
    '[class.wtf2-list-item-with-avatar]': '_avatar || _icon',
  },
  inputs: ['disableRipple'],
  templateUrl: 'list-item.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Wtf2ListItem extends _Wtf2ListItemMixinBase implements AfterContentInit,
    CanDisableRipple, OnDestroy {
  private _isInteractiveList: boolean = false;
  private _list?: Wtf2NavList | Wtf2List;
  private _destroyed = new Subject<void>();

  @ContentChildren(Wtf2Line, {descendants: true}) _lines: QueryList<Wtf2Line>;
  @ContentChild(Wtf2ListAvatarCssWtf2Styler, {static: false}) _avatar: Wtf2ListAvatarCssWtf2Styler;
  @ContentChild(Wtf2ListIconCssWtf2Styler, {static: false}) _icon: Wtf2ListIconCssWtf2Styler;

  constructor(private _element: ElementRef<HTMLElement>,
              _changeDetectorRef: ChangeDetectorRef,
              @Optional() navList?: Wtf2NavList,
              @Optional() list?: Wtf2List) {
    super();
    this._isInteractiveList = !!(navList || (list && list._getListType() === 'action-list'));
    this._list = navList || list;

    // If no type attributed is specified for <button>, set it to "button".
    // If a type attribute is already specified, do nothing.
    const element = this._getHostElement();

    if (element.nodeName.toLowerCase() === 'button' && !element.hasAttribute('type')) {
      element.setAttribute('type', 'button');
    }

    if (this._list) {
      // React to changes in the state of the parent list since
      // some of the item's properties depend on it (e.g. `disableRipple`).
      this._list._stateChanges.pipe(takeUntil(this._destroyed)).subscribe(() => {
        _changeDetectorRef.markForCheck();
      });
    }
  }

  ngAfterContentInit() {
    setLines(this._lines, this._element);
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }

  /** Whether this list item should show a ripple effect when clicked. */
  _isRippleDisabled() {
    return !this._isInteractiveList || this.disableRipple ||
           !!(this._list && this._list.disableRipple);
  }

  /** Retrieves the DOM element of the component host. */
  _getHostElement(): HTMLElement {
    return this._element.nativeElement;
  }
}
