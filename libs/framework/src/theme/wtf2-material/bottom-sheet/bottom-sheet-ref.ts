/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Location} from '@angular/common';
import {ESCAPE, hasModifierKey} from '@angular/cdk/keycodes';
import {OverlayRef} from '@angular/cdk/overlay';
import {merge, Observable, Subject} from 'rxjs';
import {filter, take} from 'rxjs/operators';
import {Wtf2BottomSheetContainer} from './bottom-sheet-container';


/**
 * Reference to a bottom sheet dispatched from the bottom sheet service.
 */
export class Wtf2BottomSheetRef<T = any, R = any> {
  /** Instance of the component making up the content of the bottom sheet. */
  instance: T;

  /**
   * Instance of the component into which the bottom sheet content is projected.
   * @docs-private
   */
  containerInstance: Wtf2BottomSheetContainer;

  /** Whether the user is allowed to close the bottom sheet. */
  disableClose: boolean | undefined;

  /** Subject for notifying the user that the bottom sheet has been dismissed. */
  private readonly _afterDismissed = new Subject<R | undefined>();

  /** Subject for notifying the user that the bottom sheet has opened and appeared. */
  private readonly _afterOpened = new Subject<void>();

  /** Result to be passed down to the `afterDismissed` stream. */
  private _result: R | undefined;

  constructor(
    containerInstance: Wtf2BottomSheetContainer,
    private _overlayRef: OverlayRef,
    // @breaking-change 8.0.0 `_location` parameter to be removed.
    _location?: Location) {
    this.containerInstance = containerInstance;
    this.disableClose = containerInstance.bottomSheetConfig.disableClose;

    // Emit when opening animation completes
    containerInstance._animationStateChanged.pipe(
      filter(event => event.phaseName === 'done' && event.toState === 'visible'),
      take(1)
    )
    .subscribe(() => {
      this._afterOpened.next();
      this._afterOpened.complete();
    });

    // Dispose overlay when closing animation is complete
    containerInstance._animationStateChanged
        .pipe(filter(event => event.phaseName === 'done' && event.toState === 'hidden'), take(1))
        .subscribe(() => {
          _overlayRef.dispose();
        });

    _overlayRef.detachments().pipe(take(1)).subscribe(() => {
      this._afterDismissed.next(this._result);
      this._afterDismissed.complete();
    });

    merge(
      _overlayRef.backdropClick(),
      _overlayRef.keydownEvents().pipe(filter(event => event.keyCode === ESCAPE))
    ).subscribe(event => {
      if (!this.disableClose &&
        (event.type !== 'keydown' || !hasModifierKey(event as KeyboardEvent))) {
        event.preventDefault();
        this.dismiss();
      }
    });
  }

  /**
   * Dismisses the bottom sheet.
   * @param result Data to be passed back to the bottom sheet opener.
   */
  dismiss(result?: R): void {
    if (!this._afterDismissed.closed) {
      // Transition the backdrop in parallel to the bottom sheet.
      this.containerInstance._animationStateChanged.pipe(
        filter(event => event.phaseName === 'start'),
        take(1)
      ).subscribe(() => this._overlayRef.detachBackdrop());

      this._result = result;
      this.containerInstance.exit();
    }
  }

  /** Gets an observable that is notified when the bottom sheet is finished closing. */
  afterDismissed(): Observable<R | undefined> {
    return this._afterDismissed.asObservable();
  }

  /** Gets an observable that is notified when the bottom sheet has opened and appeared. */
  afterOpened(): Observable<void> {
    return this._afterOpened.asObservable();
  }

  /**
   * Gets an observable that emits when the overlay's backdrop has been clicked.
   */
  backdropClick(): Observable<MouseEvent> {
    return this._overlayRef.backdropClick();
  }

  /**
   * Gets an observable that emits when keydown events are targeted on the overlay.
   */
  keydownEvents(): Observable<KeyboardEvent> {
    return this._overlayRef.keydownEvents();
  }
}
