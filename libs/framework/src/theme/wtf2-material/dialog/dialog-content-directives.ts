/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
  Directive,
  Input,
  OnChanges,
  OnInit,
  Optional,
  SimpleChanges,
  ElementRef,
} from '@angular/core';
import {Wtf2Dialog} from './dialog';
import {Wtf2DialogRef} from './dialog-ref';

/** Counter used to generate unique IDs for dialog elements. */
let dialogElementUid = 0;

/**
 * Button that will close the current dialog.
 */
@Directive({
  selector: `button[wtf2-dialog-close], button[wtf2DialogClose]`,
  exportAs: 'wtf2DialogClose',
  host: {
    '(click)': 'dialogRef.close(dialogResult)',
    '[attr.aria-label]': 'ariaLabel || null',
    'type': 'button', // Prevents accidental form submits.
  }
})
export class Wtf2DialogClose implements OnInit, OnChanges {
  /** Screenreader label for the button. */
  @Input('aria-label') ariaLabel: string;

  /** Dialog close input. */
  @Input('wtf2-dialog-close') dialogResult: any;

  @Input('wtf2DialogClose') _wtf2DialogClose: any;

  constructor(
    @Optional() public dialogRef: Wtf2DialogRef<any>,
    private _elementRef: ElementRef<HTMLElement>,
    private _dialog: Wtf2Dialog) {}

  ngOnInit() {
    if (!this.dialogRef) {
      // When this directive is included in a dialog via TemplateRef (rather than being
      // in a Component), the DialogRef isn't available via injection because embedded
      // views cannot be given a custom injector. Instead, we look up the DialogRef by
      // ID. This must occur in `onInit`, as the ID binding for the dialog container won't
      // be resolved at constructor time.
      this.dialogRef = getClosestDialog(this._elementRef, this._dialog.openDialogs)!;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const proxiedChange = changes['_wtf2DialogClose'] || changes['_wtf2DialogCloseResult'];

    if (proxiedChange) {
      this.dialogResult = proxiedChange.currentValue;
    }
  }
}

/**
 * Title of a dialog element. Stays fixed to the top of the dialog when scrolling.
 */
@Directive({
  selector: '[wtf2-dialog-title], [wtf2DialogTitle]',
  exportAs: 'wtf2DialogTitle',
  host: {
    'class': 'wtf2-dialog-title',
    '[id]': 'id',
  },
})
export class Wtf2DialogTitle implements OnInit {
  @Input() id = `wtf2-dialog-title-${dialogElementUid++}`;

  constructor(
    @Optional() private _dialogRef: Wtf2DialogRef<any>,
    private _elementRef: ElementRef<HTMLElement>,
    private _dialog: Wtf2Dialog) {}

  ngOnInit() {
    if (!this._dialogRef) {
      this._dialogRef = getClosestDialog(this._elementRef, this._dialog.openDialogs)!;
    }

    if (this._dialogRef) {
      Promise.resolve().then(() => {
        const container = this._dialogRef._containerInstance;

        if (container && !container._ariaLabelledBy) {
          container._ariaLabelledBy = this.id;
        }
      });
    }
  }
}


/**
 * Scrollable content container of a dialog.
 */
@Directive({
  selector: `[wtf2-dialog-content], wtf2-dialog-content, [wtf2DialogContent]`,
  host: {'class': 'wtf2-dialog-content'}
})
export class Wtf2DialogContent {}


/**
 * Container for the bottom action buttons in a dialog.
 * Stays fixed to the bottom when scrolling.
 */
@Directive({
  selector: `[wtf2-dialog-actions], wtf2-dialog-actions, [wtf2DialogActions]`,
  host: {'class': 'wtf2-dialog-actions'}
})
export class Wtf2DialogActions {}


/**
 * Finds the closest Wtf2DialogRef to an element by looking at the DOM.
 * @param element Element relative to which to look for a dialog.
 * @param openDialogs References to the currently-open dialogs.
 */
function getClosestDialog(element: ElementRef<HTMLElement>, openDialogs: Wtf2DialogRef<any>[]) {
  let parent: HTMLElement | null = element.nativeElement.parentElement;

  while (parent && !parent.classList.contains('wtf2-dialog-container')) {
    parent = parent.parentElement;
  }

  return parent ? openDialogs.find(dialog => dialog.id === parent!.id) : null;
}
