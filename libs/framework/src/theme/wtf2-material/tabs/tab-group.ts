/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {coerceBooleanProperty, coerceNumberProperty} from '@angular/cdk/coercion';
import {
  AfterContentChecked,
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ViewChild,
  ViewEncapsulation,
  InjectionToken,
  Inject,
  Optional,
} from '@angular/core';
import {
  CanColor,
  CanColorCtor,
  CanDisableRipple,
  CanDisableRippleCtor,
  mixinColor,
  mixinDisableRipple,
  ThemePalette,
} from '../core';
import {merge, Subscription} from 'rxjs';
import {Wtf2Tab} from './tab';
import {Wtf2TabHeader} from './tab-header';


/** Used to generate unique ID's for each tab component */
let nextId = 0;

/** A simple change event emitted on focus or selection changes. */
export class Wtf2TabChangeEvent {
  /** Index of the currently-selected tab. */
  index: number;
  /** Reference to the currently-selected tab. */
  tab: Wtf2Tab;
}

/** Possible positions for the tab header. */
export type Wtf2TabHeaderPosition = 'above' | 'below';

/** Object that can be used to configure the default options for the tabs module. */
export interface Wtf2TabsConfig {
  /** Duration for the tab animation. Must be a valid CSS value (e.g. 600ms). */
  animationDuration?: string;
}

/** Injection token that can be used to provide the default options the tabs module. */
export const WTF2_TABS_CONFIG = new InjectionToken('WTF2_TABS_CONFIG');

// Boilerplate for applying mixins to Wtf2TabGroup.
/** @docs-private */
class Wtf2TabGroupBase {
  constructor(public _elementRef: ElementRef) {}
}
const _Wtf2TabGroupMixinBase: CanColorCtor & CanDisableRippleCtor & typeof Wtf2TabGroupBase =
    mixinColor(mixinDisableRipple(Wtf2TabGroupBase), 'primary');

/**
 * Material design tab-group component.  Supports basic tab pairs (label + content) and includes
 * animated ink-bar, keyboard navigation, and screen reader.
 * See: https://material.io/design/components/tabs.html
 */
@Component({
  moduleId: module.id,
  selector: 'wtf2-tab-group',
  exportAs: 'wtf2TabGroup',
  templateUrl: 'tab-group.html',
  styleUrls: ['tab-group.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: ['color', 'disableRipple'],
  host: {
    'class': 'wtf2-tab-group',
    '[class.wtf2-tab-group-dynamic-height]': 'dynamicHeight',
    '[class.wtf2-tab-group-inverted-header]': 'headerPosition === "below"',
  },
})
export class Wtf2TabGroup extends _Wtf2TabGroupMixinBase implements AfterContentInit,
    AfterContentChecked, OnDestroy, CanColor, CanDisableRipple {

  @ContentChildren(Wtf2Tab) _tabs: QueryList<Wtf2Tab>;

  @ViewChild('tabBodyWrapper', {static: false}) _tabBodyWrapper: ElementRef;

  @ViewChild('tabHeader', {static: false}) _tabHeader: Wtf2TabHeader;

  /** The tab index that should be selected after the content has been checked. */
  private _indexToSelect: number | null = 0;

  /** Snapshot of the height of the tab body wrapper before another tab is activated. */
  private _tabBodyWrapperHeight: number = 0;

  /** Subscription to tabs being added/removed. */
  private _tabsSubscription = Subscription.EMPTY;

  /** Subscription to changes in the tab labels. */
  private _tabLabelSubscription = Subscription.EMPTY;

  /** Whether the tab group should grow to the size of the active tab. */
  @Input()
  get dynamicHeight(): boolean { return this._dynamicHeight; }
  set dynamicHeight(value: boolean) { this._dynamicHeight = coerceBooleanProperty(value); }
  private _dynamicHeight: boolean = false;

  /** The index of the active tab. */
  @Input()
  get selectedIndex(): number | null { return this._selectedIndex; }
  set selectedIndex(value: number | null) {
    this._indexToSelect = coerceNumberProperty(value, null);
  }
  private _selectedIndex: number | null = null;

  /** Position of the tab header. */
  @Input() headerPosition: Wtf2TabHeaderPosition = 'above';

  /** Duration for the tab animation. Will be normalized to milliseconds if no units are set. */
  @Input()
  get animationDuration(): string { return this._animationDuration; }
  set animationDuration(value: string) {
    this._animationDuration = /^\d+$/.test(value) ? value + 'ms' : value;
  }
  private _animationDuration: string;

  /** Background color of the tab group. */
  @Input()
  get backgroundColor(): ThemePalette { return this._backgroundColor; }
  set backgroundColor(value: ThemePalette) {
    const nativeElement: HTMLElement = this._elementRef.nativeElement;

    nativeElement.classList.remove(`wtf2-background-${this.backgroundColor}`);

    if (value) {
      nativeElement.classList.add(`wtf2-background-${value}`);
    }

    this._backgroundColor = value;
  }
  private _backgroundColor: ThemePalette;

  /** Output to enable support for two-way binding on `[(selectedIndex)]` */
  @Output() readonly selectedIndexChange: EventEmitter<number> = new EventEmitter<number>();

  /** Event emitted when focus has changed within a tab group. */
  @Output() readonly focusChange: EventEmitter<Wtf2TabChangeEvent> =
      new EventEmitter<Wtf2TabChangeEvent>();

  /** Event emitted when the body animation has completed */
  @Output() readonly animationDone: EventEmitter<void> = new EventEmitter<void>();

  /** Event emitted when the tab selection has changed. */
  @Output() readonly selectedTabChange: EventEmitter<Wtf2TabChangeEvent> =
      new EventEmitter<Wtf2TabChangeEvent>(true);

  private _groupId: number;

  constructor(elementRef: ElementRef,
              private _changeDetectorRef: ChangeDetectorRef,
              @Inject(WTF2_TABS_CONFIG) @Optional() defaultConfig?: Wtf2TabsConfig) {
    super(elementRef);
    this._groupId = nextId++;
    this.animationDuration = defaultConfig && defaultConfig.animationDuration ?
        defaultConfig.animationDuration : '500ms';
  }

  /**
   * After the content is checked, this component knows what tabs have been defined
   * and what the selected index should be. This is where we can know exactly what position
   * each tab should be in according to the new selected index, and additionally we know how
   * a new selected tab should transition in (from the left or right).
   */
  ngAfterContentChecked() {
    // Don't clamp the `indexToSelect` immediately in the setter because it can happen that
    // the amount of tabs changes before the actual change detection runs.
    const indexToSelect = this._indexToSelect = this._clampTabIndex(this._indexToSelect);

    // If there is a change in selected index, emit a change event. Should not trigger if
    // the selected index has not yet been initialized.
    if (this._selectedIndex != indexToSelect) {
      const isFirstRun = this._selectedIndex == null;

      if (!isFirstRun) {
        this.selectedTabChange.emit(this._createChangeEvent(indexToSelect));
      }

      // Changing these values after change detection has run
      // since the checked content may contain references to them.
      Promise.resolve().then(() => {
        this._tabs.forEach((tab, index) => tab.isActive = index === indexToSelect);

        if (!isFirstRun) {
          this.selectedIndexChange.emit(indexToSelect);
        }
      });
    }

    // Setup the position for each tab and optionally setup an origin on the next selected tab.
    this._tabs.forEach((tab: Wtf2Tab, index: number) => {
      tab.position = index - indexToSelect;

      // If there is already a selected tab, then set up an origin for the next selected tab
      // if it doesn't have one already.
      if (this._selectedIndex != null && tab.position == 0 && !tab.origin) {
        tab.origin = indexToSelect - this._selectedIndex;
      }
    });

    if (this._selectedIndex !== indexToSelect) {
      this._selectedIndex = indexToSelect;
      this._changeDetectorRef.markForCheck();
    }
  }

  ngAfterContentInit() {
    this._subscribeToTabLabels();

    // Subscribe to changes in the amount of tabs, in order to be
    // able to re-render the content as new tabs are added or removed.
    this._tabsSubscription = this._tabs.changes.subscribe(() => {
      const indexToSelect = this._clampTabIndex(this._indexToSelect);

      // Maintain the previously-selected tab if a new tab is added or removed and there is no
      // explicit change that selects a different tab.
      if (indexToSelect === this._selectedIndex) {
        const tabs = this._tabs.toArray();

        for (let i = 0; i < tabs.length; i++) {
          if (tabs[i].isActive) {
            // Assign both to the `_indexToSelect` and `_selectedIndex` so we don't fire a changed
            // event, otherwise the consumer may end up in an infinite loop in some edge cases like
            // adding a tab within the `selectedIndexChange` event.
            this._indexToSelect = this._selectedIndex = i;
            break;
          }
        }
      }

      this._subscribeToTabLabels();
      this._changeDetectorRef.markForCheck();
    });
  }

  ngOnDestroy() {
    this._tabsSubscription.unsubscribe();
    this._tabLabelSubscription.unsubscribe();
  }

  /** Re-aligns the ink bar to the selected tab element. */
  realignInkBar() {
    if (this._tabHeader) {
      this._tabHeader._alignInkBarToSelectedTab();
    }
  }

  _focusChanged(index: number) {
    this.focusChange.emit(this._createChangeEvent(index));
  }

  private _createChangeEvent(index: number): Wtf2TabChangeEvent {
    const event = new Wtf2TabChangeEvent;
    event.index = index;
    if (this._tabs && this._tabs.length) {
      event.tab = this._tabs.toArray()[index];
    }
    return event;
  }

  /**
   * Subscribes to changes in the tab labels. This is needed, because the @Input for the label is
   * on the Wtf2Tab component, whereas the data binding is inside the Wtf2TabGroup. In order for the
   * binding to be updated, we need to subscribe to changes in it and trigger change detection
   * manually.
   */
  private _subscribeToTabLabels() {
    if (this._tabLabelSubscription) {
      this._tabLabelSubscription.unsubscribe();
    }

    this._tabLabelSubscription = merge(...this._tabs.map(tab => tab._stateChanges))
      .subscribe(() => this._changeDetectorRef.markForCheck());
  }

  /** Clamps the given index to the bounds of 0 and the tabs length. */
  private _clampTabIndex(index: number | null): number {
    // Note the `|| 0`, which ensures that values like NaN can't get through
    // and which would otherwise throw the component into an infinite loop
    // (since Math.max(NaN, 0) === NaN).
    return Math.min(this._tabs.length - 1, Math.max(index || 0, 0));
  }

  /** Returns a unique id for each tab label element */
  _getTabLabelId(i: number): string {
    return `wtf2-tab-label-${this._groupId}-${i}`;
  }

  /** Returns a unique id for each tab content element */
  _getTabContentId(i: number): string {
    return `wtf2-tab-content-${this._groupId}-${i}`;
  }

  /**
   * Sets the height of the body wrapper to the height of the activating tab if dynamic
   * height property is true.
   */
  _setTabBodyWrapperHeight(tabHeight: number): void {
    if (!this._dynamicHeight || !this._tabBodyWrapperHeight) { return; }

    const wrapper: HTMLElement = this._tabBodyWrapper.nativeElement;

    wrapper.style.height = this._tabBodyWrapperHeight + 'px';

    // This conditional forces the browser to paint the height so that
    // the animation to the new height can have an origin.
    if (this._tabBodyWrapper.nativeElement.offsetHeight) {
      wrapper.style.height = tabHeight + 'px';
    }
  }

  /** Removes the height of the tab body wrapper. */
  _removeTabBodyWrapperHeight(): void {
    const wrapper = this._tabBodyWrapper.nativeElement;
    this._tabBodyWrapperHeight = wrapper.clientHeight;
    wrapper.style.height = '';
    this.animationDone.emit();
  }

  /** Handle click events, setting new selected index if appropriate. */
  _handleClick(tab: Wtf2Tab, tabHeader: Wtf2TabHeader, index: number) {
    if (!tab.disabled) {
      this.selectedIndex = tabHeader.focusIndex = index;
    }
  }

  /** Retrieves the tabindex for the tab. */
  _getTabIndex(tab: Wtf2Tab, idx: number): number | null {
    if (tab.disabled) {
      return null;
    }
    return this.selectedIndex === idx ? 0 : -1;
  }
}
