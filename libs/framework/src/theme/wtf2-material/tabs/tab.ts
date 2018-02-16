/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {TemplatePortal} from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import {CanDisable, CanDisableCtor, mixinDisabled} from '../core';
import {Subject} from 'rxjs';
import {Wtf2TabContent} from './tab-content';
import {Wtf2TabLabel} from './tab-label';


// Boilerplate for applying mixins to Wtf2Tab.
/** @docs-private */
class Wtf2TabBase {}
const _Wtf2TabMixinBase: CanDisableCtor & typeof Wtf2TabBase =
    mixinDisabled(Wtf2TabBase);

@Component({
  moduleId: module.id,
  selector: 'wtf2-tab',
  templateUrl: 'tab.html',
  inputs: ['disabled'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'wtf2Tab',
})
export class Wtf2Tab extends _Wtf2TabMixinBase implements OnInit, CanDisable, OnChanges, OnDestroy {
  /** Content for the tab label given by `<ng-template wtf2-tab-label>`. */
  @ContentChild(Wtf2TabLabel, {static: false}) templateLabel: Wtf2TabLabel;

  /**
   * Template provided in the tab content that will be used if present, used to enable lazy-loading
   */
  @ContentChild(Wtf2TabContent, {read: TemplateRef, static: true})
  _explicitContent: TemplateRef<any>;

  /** Template inside the Wtf2Tab view that contains an `<ng-content>`. */
  @ViewChild(TemplateRef, {static: true}) _implicitContent: TemplateRef<any>;

  /** Plain text label for the tab, used when there is no template label. */
  @Input('label') textLabel: string = '';

  /** Aria label for the tab. */
  @Input('aria-label') ariaLabel: string;

  /**
   * Reference to the element that the tab is labelled by.
   * Will be cleared if `aria-label` is set at the same time.
   */
  @Input('aria-labelledby') ariaLabelledby: string;

  /** Portal that will be the hosted content of the tab */
  private _contentPortal: TemplatePortal | null = null;

  /** @docs-private */
  get content(): TemplatePortal | null {
    return this._contentPortal;
  }

  /** Emits whenever the internal state of the tab changes. */
  readonly _stateChanges = new Subject<void>();

  /**
   * The relatively indexed position where 0 represents the center, negative is left, and positive
   * represents the right.
   */
  position: number | null = null;

  /**
   * The initial relatively index origin of the tab if it was created and selected after there
   * was already a selected tab. Provides context of what position the tab should originate from.
   */
  origin: number | null = null;

  /**
   * Whether the tab is currently active.
   */
  isActive = false;

  constructor(private _viewContainerRef: ViewContainerRef) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('textLabel') || changes.hasOwnProperty('disabled')) {
      this._stateChanges.next();
    }
  }

  ngOnDestroy(): void {
    this._stateChanges.complete();
  }

  ngOnInit(): void {
    this._contentPortal = new TemplatePortal(
        this._explicitContent || this._implicitContent, this._viewContainerRef);
  }
}
