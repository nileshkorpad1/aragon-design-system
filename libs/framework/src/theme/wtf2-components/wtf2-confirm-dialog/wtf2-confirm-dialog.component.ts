import { Component } from '@angular/core';
import { Wtf2DialogRef } from '@wtf2/theme/wtf2-material';

@Component({
    selector   : 'wtf2-confirm-dialog',
    templateUrl: './wtf2-confirm-dialog.component.html',
    styleUrls: ['./wtf2-confirm-dialog.component.scss'],
})
export class Wtf2ConfirmDialogComponent {
    public confirmMessage: string;

    /**
     * Constructor
     *
     * @param {Wtf2DialogRef<Wtf2ConfirmDialogComponent>} dialogRef
     */
    constructor(
        public dialogRef: Wtf2DialogRef<Wtf2ConfirmDialogComponent>,
    ) {
    }

}
