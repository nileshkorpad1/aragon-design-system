/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  forwardRef,
  Inject,
  Input,
  ViewEncapsulation,
  QueryList,
  ElementRef,
  NgZone,
} from '@angular/core';
import {Wtf2Drawer, Wtf2DrawerContainer, Wtf2DrawerContent} from './drawer';
import {wtf2DrawerAnimations} from './drawer-animations';
import {coerceBooleanProperty, coerceNumberProperty} from '@angular/cdk/coercion';
import {ScrollDispatcher} from '@angular/cdk/scrolling';


@Component({
  moduleId: module.id,
  selector: 'wtf2-sidenav-content',
  template: '<ng-content></ng-content>',
  host: {
    'class': 'wtf2-drawer-content wtf2-sidenav-content',
    '[style.margin-left.px]': '_container._contentMargins.left',
    '[style.margin-right.px]': '_container._contentMargins.right',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Wtf2SidenavContent extends Wtf2DrawerContent {
  constructor(
      changeDetectorRef: ChangeDetectorRef,
      @Inject(forwardRef(() => Wtf2SidenavContainer)) container: Wtf2SidenavContainer,
      elementRef: ElementRef<HTMLElement>,
      scrollDispatcher: ScrollDispatcher,
      ngZone: NgZone) {
    super(changeDetectorRef, container, elementRef, scrollDispatcher, ngZone);
  }
}


@Component({
  moduleId: module.id,
  selector: 'wtf2-sidenav',
  exportAs: 'wtf2Sidenav',
  templateUrl: 'drawer.html',
  animations: [wtf2DrawerAnimations.transformDrawer],
  host: {
    'class': 'wtf2-drawer wtf2-sidenav',
    'tabIndex': '-1',
    // must prevent the browser from aligning text based on value
    '[attr.align]': 'null',
    '[class.wtf2-drawer-end]': 'position === "end"',
    '[class.wtf2-drawer-over]': 'mode === "over"',
    '[class.wtf2-drawer-push]': 'mode === "push"',
    '[class.wtf2-drawer-side]': 'mode === "side"',
    '[class.wtf2-sidenav-fixed]': 'fixedInViewport',
    '[style.top.px]': 'fixedInViewport ? fixedTopGap : null',
    '[style.bottom.px]': 'fixedInViewport ? fixedBottomGap : null',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Wtf2Sidenav extends Wtf2Drawer {
  /** Whether the sidenav is fixed in the viewport. */
  @Input()
  get fixedInViewport(): boolean { return this._fixedInViewport; }
  set fixedInViewport(value) { this._fixedInViewport = coerceBooleanProperty(value); }
  private _fixedInViewport = false;

  /**
   * The gap between the top of the sidenav and the top of the viewport when the sidenav is in fixed
   * mode.
   */
  @Input()
  get fixedTopGap(): number { return this._fixedTopGap; }
  set fixedTopGap(value) { this._fixedTopGap = coerceNumberProperty(value); }
  private _fixedTopGap = 0;

  /**
   * The gap between the bottom of the sidenav and the bottom of the viewport when the sidenav is in
   * fixed mode.
   */
  @Input()
  get fixedBottomGap(): number { return this._fixedBottomGap; }
  set fixedBottomGap(value) { this._fixedBottomGap = coerceNumberProperty(value); }
  private _fixedBottomGap = 0;
}


@Component({
  moduleId: module.id,
  selector: 'wtf2-sidenav-container',
  exportAs: 'wtf2SidenavContainer',
  templateUrl: 'sidenav-container.html',
  styleUrls: ['drawer.scss'],
  host: {
    'class': 'wtf2-drawer-container wtf2-sidenav-container',
    '[class.wtf2-drawer-container-explicit-backdrop]': '_backdropOverride',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Wtf2SidenavContainer extends Wtf2DrawerContainer {
  @ContentChildren(Wtf2Sidenav) _drawers: QueryList<Wtf2Sidenav>;
  @ContentChild(Wtf2SidenavContent, {static: false}) _content: Wtf2SidenavContent;
}
