/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {
  Directive,
  EventEmitter,
  Input,
  isDevMode,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  CanDisable,
  CanDisableCtor,
  HasInitialized,
  HasInitializedCtor,
  mixinDisabled,
  mixinInitialized,
} from '../core';
import {Subject} from 'rxjs';
import {SortDirection} from './sort-direction';
import {
  getSortDuplicateSortableIdError,
  getSortHeaderMissingIdError,
  getSortInvalidDirectionError,
} from './sort-errors';

/** Interface for a directive that holds sorting state consumed by `Wtf2SortHeader`. */
export interface Wtf2Sortable {
  /** The id of the column being sorted. */
  id: string;

  /** Starting sort direction. */
  start: 'asc' | 'desc';

  /** Whether to disable clearing the sorting state. */
  disableClear: boolean;
}

/** The current sort state. */
export interface Sort {
  /** The id of the column being sorted. */
  active: string;

  /** The sort direction. */
  direction: SortDirection;
}

// Boilerplate for applying mixins to Wtf2Sort.
/** @docs-private */
class Wtf2SortBase {}
const _Wtf2SortMixinBase: HasInitializedCtor & CanDisableCtor & typeof Wtf2SortBase =
    mixinInitialized(mixinDisabled(Wtf2SortBase));

/** Container for Wtf2Sortables to manage the sort state and provide default sort parameters. */
@Directive({
  selector: '[wtf2Sort]',
  exportAs: 'wtf2Sort',
  inputs: ['disabled: wtf2SortDisabled']
})
export class Wtf2Sort extends _Wtf2SortMixinBase
    implements CanDisable, HasInitialized, OnChanges, OnDestroy, OnInit {
  /** Collection of all registered sortables that this directive manages. */
  sortables = new Map<string, Wtf2Sortable>();

  /** Used to notify any child components listening to state changes. */
  readonly _stateChanges = new Subject<void>();

  /** The id of the most recently sorted Wtf2Sortable. */
  @Input('wtf2SortActive') active: string;

  /**
   * The direction to set when an Wtf2Sortable is initially sorted.
   * May be overriden by the Wtf2Sortable's sort start.
   */
  @Input('wtf2SortStart') start: 'asc' | 'desc' = 'asc';

  /** The sort direction of the currently active Wtf2Sortable. */
  @Input('wtf2SortDirection')
  get direction(): SortDirection { return this._direction; }
  set direction(direction: SortDirection) {
    if (isDevMode() && direction && direction !== 'asc' && direction !== 'desc') {
      throw getSortInvalidDirectionError(direction);
    }
    this._direction = direction;
  }
  private _direction: SortDirection = '';

  /**
   * Whether to disable the user from clearing the sort by finishing the sort direction cycle.
   * May be overriden by the Wtf2Sortable's disable clear input.
   */
  @Input('wtf2SortDisableClear')
  get disableClear(): boolean { return this._disableClear; }
  set disableClear(v: boolean) { this._disableClear = coerceBooleanProperty(v); }
  private _disableClear: boolean;

  /** Event emitted when the user changes either the active sort or sort direction. */
  @Output('wtf2SortChange') readonly sortChange: EventEmitter<Sort> = new EventEmitter<Sort>();

  /**
   * Register function to be used by the contained Wtf2Sortables. Adds the Wtf2Sortable to the
   * collection of Wtf2Sortables.
   */
  register(sortable: Wtf2Sortable): void {
    if (!sortable.id) {
      throw getSortHeaderMissingIdError();
    }

    if (this.sortables.has(sortable.id)) {
      throw getSortDuplicateSortableIdError(sortable.id);
    }
    this.sortables.set(sortable.id, sortable);
  }

  /**
   * Unregister function to be used by the contained Wtf2Sortables. Removes the Wtf2Sortable from the
   * collection of contained Wtf2Sortables.
   */
  deregister(sortable: Wtf2Sortable): void {
    this.sortables.delete(sortable.id);
  }

  /** Sets the active sort id and determines the new sort direction. */
  sort(sortable: Wtf2Sortable): void {
    if (this.active != sortable.id) {
      this.active = sortable.id;
      this.direction = sortable.start ? sortable.start : this.start;
    } else {
      this.direction = this.getNextSortDirection(sortable);
    }

    this.sortChange.emit({active: this.active, direction: this.direction});
  }

  /** Returns the next sort direction of the active sortable, checking for potential overrides. */
  getNextSortDirection(sortable: Wtf2Sortable): SortDirection {
    if (!sortable) { return ''; }

    // Get the sort direction cycle with the potential sortable overrides.
    const disableClear = sortable.disableClear != null ? sortable.disableClear : this.disableClear;
    let sortDirectionCycle = getSortDirectionCycle(sortable.start || this.start, disableClear);

    // Get and return the next direction in the cycle
    let nextDirectionIndex = sortDirectionCycle.indexOf(this.direction) + 1;
    if (nextDirectionIndex >= sortDirectionCycle.length) { nextDirectionIndex = 0; }
    return sortDirectionCycle[nextDirectionIndex];
  }

  ngOnInit() {
    this._markInitialized();
  }

  ngOnChanges() {
    this._stateChanges.next();
  }

  ngOnDestroy() {
    this._stateChanges.complete();
  }
}

/** Returns the sort direction cycle to use given the provided parameters of order and clear. */
function getSortDirectionCycle(start: 'asc' | 'desc',
                               disableClear: boolean): SortDirection[] {
  let sortOrder: SortDirection[] = ['asc', 'desc'];
  if (start == 'desc') { sortOrder.reverse(); }
  if (!disableClear) { sortOrder.push(''); }

  return sortOrder;
}
