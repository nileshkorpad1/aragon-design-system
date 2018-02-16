import {
    Component,
    Input,
} from '@angular/core';

@Component({
    selector: 'wtf2-side-dialog-action',
    exportAs: 'Wtf2SideDialogAction',
    templateUrl: 'wtf2-side-dialog-action.html',
})
export class Wtf2SideDialogActionComponent {}

@Component({
    selector: 'wtf2-side-dialog',
    exportAs: 'Wtf2SideDialogComponent',
    templateUrl: 'wtf2-side-dialog.html',
    styleUrls: ['./wtf2-side-dialog.component.scss'],
})
export class Wtf2SideDialogComponent {

    constructor() { }
    dialogTitle: string;
    @Input() dialogComponent: any;
    @Input() dialog: any;
    @Input() dialogRef: any;
    @Input() leftButtonClass: string;
    @Input() leftButtonLabel: string;
    @Input() middleButtonClass: string;
    @Input() middleButtonLabel: string;
    @Input() rightButtonClass: string;
    @Input() rightButtonLabel: string;

    manageDialog(dialog, dialogComponent): void {
        console.log("Yo I'm in");
        const dialogRef = dialog.open(dialogComponent, {
            width: '50%',
            height: '100vh',
            position: {
                right: '0',
            },
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    closeDialog() {
        this.dialogRef.close();
    }
}
