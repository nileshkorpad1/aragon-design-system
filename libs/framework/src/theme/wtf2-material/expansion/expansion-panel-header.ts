/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {FocusMonitor, FocusableOption, FocusOrigin} from '@angular/cdk/a11y';
import {ENTER, SPACE, hasModifierKey} from '@angular/cdk/keycodes';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  Host,
  Input,
  OnDestroy,
  ViewEncapsulation,
  Optional,
  Inject,
} from '@angular/core';
import {merge, Subscription, EMPTY} from 'rxjs';
import {filter} from 'rxjs/operators';
import {wtf2ExpansionAnimations} from './expansion-animations';
import {
  Wtf2ExpansionPanel,
  Wtf2ExpansionPanelDefaultOptions,
  WTF2_EXPANSION_PANEL_DEFAULT_OPTIONS,
} from './expansion-panel';


/**
 * `<wtf2-expansion-panel-header>`
 *
 * This component corresponds to the header element of an `<wtf2-expansion-panel>`.
 */
@Component({
  moduleId: module.id,
  selector: 'wtf2-expansion-panel-header',
  styleUrls: ['./expansion-panel-header.scss'],
  templateUrl: './expansion-panel-header.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    wtf2ExpansionAnimations.indicatorRotate,
    wtf2ExpansionAnimations.expansionHeaderHeight
  ],
  host: {
    'class': 'wtf2-expansion-panel-header',
    'role': 'button',
    '[attr.id]': 'panel._headerId',
    '[attr.tabindex]': 'disabled ? -1 : 0',
    '[attr.aria-controls]': '_getPanelId()',
    '[attr.aria-expanded]': '_isExpanded()',
    '[attr.aria-disabled]': 'panel.disabled',
    '[class.wtf2-expanded]': '_isExpanded()',
    '(click)': '_toggle()',
    '(keydown)': '_keydown($event)',
    '[@expansionHeight]': `{
        value: _getExpandedState(),
        params: {
          collapsedHeight: collapsedHeight,
          expandedHeight: expandedHeight
        }
    }`,
  },
})
export class Wtf2ExpansionPanelHeader implements OnDestroy, FocusableOption {
  private _parentChangeSubscription = Subscription.EMPTY;

  constructor(
      @Host() public panel: Wtf2ExpansionPanel,
      private _element: ElementRef,
      private _focusMonitor: FocusMonitor,
      private _changeDetectorRef: ChangeDetectorRef,
      @Inject(WTF2_EXPANSION_PANEL_DEFAULT_OPTIONS) @Optional()
          defaultOptions?: Wtf2ExpansionPanelDefaultOptions) {
    const accordionHideToggleChange = panel.accordion ?
        panel.accordion._stateChanges.pipe(
            filter(changes => !!changes['hideToggle'])) :
        EMPTY;

    // Since the toggle state depends on an @Input on the panel, we
    // need to subscribe and trigger change detection manually.
    this._parentChangeSubscription =
        merge(
            panel.opened, panel.closed, accordionHideToggleChange,
            panel._inputChanges.pipe(filter(
                changes => !!(changes['hideToggle'] || changes['disabled']))))
    .subscribe(() => this._changeDetectorRef.markForCheck());

    // Avoids focus being lost if the panel contained the focused element and was closed.
    panel.closed
      .pipe(filter(() => panel._containsFocus()))
      .subscribe(() => _focusMonitor.focusVia(_element, 'program'));

    _focusMonitor.monitor(_element).subscribe(origin => {
      if (origin && panel.accordion) {
        panel.accordion._handleHeaderFocus(this);
      }
    });

    if (defaultOptions) {
      this.expandedHeight = defaultOptions.expandedHeight;
      this.collapsedHeight = defaultOptions.collapsedHeight;
    }
  }

  /** Height of the header while the panel is expanded. */
  @Input() expandedHeight: string;

  /** Height of the header while the panel is collapsed. */
  @Input() collapsedHeight: string;

  /**
   * Whether the associated panel is disabled. Implemented as a part of `FocusableOption`.
   * @docs-private
   */
  get disabled() {
    return this.panel.disabled;
  }

  /** Toggles the expanded state of the panel. */
  _toggle(): void {
    this.panel.toggle();
  }

  /** Gets whether the panel is expanded. */
  _isExpanded(): boolean {
    return this.panel.expanded;
  }

  /** Gets the expanded state string of the panel. */
  _getExpandedState(): string {
    return this.panel._getExpandedState();
  }

  /** Gets the panel id. */
  _getPanelId(): string {
    return this.panel.id;
  }

  /** Gets whether the expand indicator should be shown. */
  _showToggle(): boolean {
    return !this.panel.hideToggle && !this.panel.disabled;
  }

  _displayPosition(): number {
    return this.panel.displayPosition;
  }

  /** Handle keydown event calling to toggle() if appropriate. */
  _keydown(event: KeyboardEvent) {
    switch (event.keyCode) {
      // Toggle for space and enter keys.
      case SPACE:
      case ENTER:
        if (!hasModifierKey(event)) {
          event.preventDefault();
          this._toggle();
        }

        break;
      default:
        if (this.panel.accordion) {
          this.panel.accordion._handleHeaderKeydown(event);
        }

        return;
    }
  }

  /**
   * Focuses the panel header. Implemented as a part of `FocusableOption`.
   * @param origin Origin of the action that triggered the focus.
   * @docs-private
   */
  focus(origin: FocusOrigin = 'program') {
    this._focusMonitor.focusVia(this._element, origin);
  }

  ngOnDestroy() {
    this._parentChangeSubscription.unsubscribe();
    this._focusMonitor.stopMonitoring(this._element);
  }
}

/**
 * `<wtf2-panel-description>`
 *
 * This directive is to be used inside of the Wtf2ExpansionPanelHeader component.
 */
@Directive({
  selector: 'wtf2-panel-description',
  host: {
    class: 'wtf2-expansion-panel-header-description'
  }
})
export class Wtf2ExpansionPanelDescription {}

/**
 * `<wtf2-panel-title>`
 *
 * This directive is to be used inside of the Wtf2ExpansionPanelHeader component.
 */
@Directive({
  selector: 'wtf2-panel-title',
  host: {
    class: 'wtf2-expansion-panel-header-title'
  }
})
export class Wtf2ExpansionPanelTitle {}
