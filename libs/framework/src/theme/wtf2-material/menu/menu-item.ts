/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {FocusableOption, FocusMonitor, FocusOrigin} from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewEncapsulation,
  Inject,
  Optional,
  Input,
  HostListener,
} from '@angular/core';
import {
  CanDisable, CanDisableCtor,
  CanDisableRipple, CanDisableRippleCtor,
  mixinDisabled,
  mixinDisableRipple,
} from '../core';
import {Subject} from 'rxjs';
import {DOCUMENT} from '@angular/common';
import {WTF2_MENU_PANEL, Wtf2MenuPanel} from './menu-panel';

// Boilerplate for applying mixins to Wtf2MenuItem.
/** @docs-private */
class Wtf2MenuItemBase {}
const _Wtf2MenuItemMixinBase: CanDisableRippleCtor & CanDisableCtor & typeof Wtf2MenuItemBase =
    mixinDisableRipple(mixinDisabled(Wtf2MenuItemBase));

/**
 * This directive is intended to be used inside an wtf2-menu tag.
 * It exists mostly to set the role attribute.
 */
@Component({
  moduleId: module.id,
  selector: '[wtf2-menu-item]',
  exportAs: 'wtf2MenuItem',
  inputs: ['disabled', 'disableRipple'],
  host: {
    '[attr.role]': 'role',
    'class': 'wtf2-menu-item',
    '[class.wtf2-menu-item-highlighted]': '_highlighted',
    '[class.wtf2-menu-item-submenu-trigger]': '_triggersSubmenu',
    '[attr.tabindex]': '_getTabIndex()',
    '[attr.aria-disabled]': 'disabled.toString()',
    '[attr.disabled]': 'disabled || null',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'menu-item.html',
})
export class Wtf2MenuItem extends _Wtf2MenuItemMixinBase
    implements FocusableOption, CanDisable, CanDisableRipple, OnDestroy {

  /** ARIA role for the menu item. */
  @Input() role: 'menuitem' | 'menuitemradio' | 'menuitemcheckbox' = 'menuitem';

  private _document: Document;

  /** Stream that emits when the menu item is hovered. */
  readonly _hovered: Subject<Wtf2MenuItem> = new Subject<Wtf2MenuItem>();

  /** Whether the menu item is highlighted. */
  _highlighted: boolean = false;

  /** Whether the menu item acts as a trigger for a sub-menu. */
  _triggersSubmenu: boolean = false;

  constructor(
    private _elementRef: ElementRef<HTMLElement>,
    @Inject(DOCUMENT) document?: any,
    private _focusMonitor?: FocusMonitor,
    @Inject(WTF2_MENU_PANEL) @Optional() private _parentMenu?: Wtf2MenuPanel<Wtf2MenuItem>) {

    // @breaking-change 8.0.0 make `_focusMonitor` and `document` required params.
    super();

    if (_focusMonitor) {
      // Start monitoring the element so it gets the appropriate focused classes. We want
      // to show the focus style for menu items only when the focus was not caused by a
      // mouse or touch interaction.
      _focusMonitor.monitor(this._elementRef, false);
    }

    if (_parentMenu && _parentMenu.addItem) {
      _parentMenu.addItem(this);
    }

    this._document = document;
  }

  /** Focuses the menu item. */
  focus(origin: FocusOrigin = 'program'): void {
    if (this._focusMonitor) {
      this._focusMonitor.focusVia(this._getHostElement(), origin);
    } else {
      this._getHostElement().focus();
    }
  }

  ngOnDestroy() {
    if (this._focusMonitor) {
      this._focusMonitor.stopMonitoring(this._elementRef);
    }

    if (this._parentMenu && this._parentMenu.removeItem) {
      this._parentMenu.removeItem(this);
    }

    this._hovered.complete();
  }

  /** Used to set the `tabindex`. */
  _getTabIndex(): string {
    return this.disabled ? '-1' : '0';
  }

  /** Returns the host DOM element. */
  _getHostElement(): HTMLElement {
    return this._elementRef.nativeElement;
  }

  /** Prevents the default element actions if it is disabled. */
  // We have to use a `HostListener` here in order to support both Ivy and ViewEngine.
  // In Ivy the `host` bindings will be merged when this class is extended, whereas in
  // ViewEngine they're overwritte.
  // TODO(crisbeto): we move this back into `host` once Ivy is turned on by default.
  // tslint:disable-next-line:no-host-decorator-in-concrete
  @HostListener('click', ['$event'])
  _checkDisabled(event: Event): void {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  /** Emits to the hover stream. */
  // We have to use a `HostListener` here in order to support both Ivy and ViewEngine.
  // In Ivy the `host` bindings will be merged when this class is extended, whereas in
  // ViewEngine they're overwritte.
  // TODO(crisbeto): we move this back into `host` once Ivy is turned on by default.
  // tslint:disable-next-line:no-host-decorator-in-concrete
  @HostListener('mouseenter')
  _handleMouseEnter() {
    this._hovered.next(this);
  }

  /** Gets the label to be used when determining whether the option should be focused. */
  getLabel(): string {
    const element: HTMLElement = this._elementRef.nativeElement;
    const textNodeType = this._document ? this._document.TEXT_NODE : 3;
    let output = '';

    if (element.childNodes) {
      const length = element.childNodes.length;

      // Go through all the top-level text nodes and extract their text.
      // We skip anything that's not a text node to prevent the text from
      // being thrown off by something like an icon.
      for (let i = 0; i < length; i++) {
        if (element.childNodes[i].nodeType === textNodeType) {
          output += element.childNodes[i].textContent;
        }
      }
    }

    return output.trim();
  }

}
