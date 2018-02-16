/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {
  AfterContentInit,
  Attribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Directive,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewEncapsulation,
  ViewChild,
} from '@angular/core';
import {Wtf2Button} from '../button';
import {merge, of as observableOf, Subscription} from 'rxjs';
import {Wtf2Datepicker} from './datepicker';
import {Wtf2DatepickerIntl} from './datepicker-intl';


/** Can be used to override the icon of a `wtf2DatepickerToggle`. */
@Directive({
  selector: '[wtf2DatepickerToggleIcon]'
})
export class Wtf2DatepickerToggleIcon {}


@Component({
  moduleId: module.id,
  selector: 'wtf2-datepicker-toggle',
  templateUrl: 'datepicker-toggle.html',
  styleUrls: ['datepicker-toggle.scss'],
  host: {
    'class': 'wtf2-datepicker-toggle',
    // Always set the tabindex to -1 so that it doesn't overlap with any custom tabindex the
    // consumer may have provided, while still being able to receive focus.
    '[attr.tabindex]': '-1',
    '[class.wtf2-datepicker-toggle-active]': 'datepicker && datepicker.opened',
    '[class.wtf2-accent]': 'datepicker && datepicker.color === "accent"',
    '[class.wtf2-warn]': 'datepicker && datepicker.color === "warn"',
    '(focus)': '_button.focus()',
  },
  exportAs: 'wtf2DatepickerToggle',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Wtf2DatepickerToggle<D> implements AfterContentInit, OnChanges, OnDestroy {
  private _stateChanges = Subscription.EMPTY;

  /** Datepicker instance that the button will toggle. */
  @Input('for') datepicker: Wtf2Datepicker<D>;

  /** Tabindex for the toggle. */
  @Input() tabIndex: number | null;

  /** Whether the toggle button is disabled. */
  @Input()
  get disabled(): boolean {
    if (this._disabled === undefined && this.datepicker) {
      return this.datepicker.disabled;
    }

    return !!this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
  }
  private _disabled: boolean;

  /** Whether ripples on the toggle should be disabled. */
  @Input() disableRipple: boolean;

  /** Custom icon set by the consumer. */
  @ContentChild(Wtf2DatepickerToggleIcon, {static: false}) _customIcon: Wtf2DatepickerToggleIcon;

  /** Underlying button element. */
  @ViewChild('button', {static: false}) _button: Wtf2Button;

  constructor(
    public _intl: Wtf2DatepickerIntl,
    private _changeDetectorRef: ChangeDetectorRef,
    @Attribute('tabindex') defaultTabIndex: string) {

    const parsedTabIndex = Number(defaultTabIndex);
    this.tabIndex = (parsedTabIndex || parsedTabIndex === 0) ? parsedTabIndex : null;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['datepicker']) {
      this._watchStateChanges();
    }
  }

  ngOnDestroy() {
    this._stateChanges.unsubscribe();
  }

  ngAfterContentInit() {
    this._watchStateChanges();
  }

  _open(event: Event): void {
    if (this.datepicker && !this.disabled) {
      this.datepicker.open();
      event.stopPropagation();
    }
  }

  private _watchStateChanges() {
    const datepickerDisabled = this.datepicker ? this.datepicker._disabledChange : observableOf();
    const inputDisabled = this.datepicker && this.datepicker._datepickerInput ?
        this.datepicker._datepickerInput._disabledChange : observableOf();
    const datepickerToggled = this.datepicker ?
        merge(this.datepicker.openedStream, this.datepicker.closedStream) :
        observableOf();

    this._stateChanges.unsubscribe();
    this._stateChanges = merge(
      this._intl.changes,
      datepickerDisabled,
      inputDisabled,
      datepickerToggled
    ).subscribe(() => this._changeDetectorRef.markForCheck());
  }
}
