import { Component, OnInit, Inject } from '@angular/core';
import { Wtf2DialogRef } from '@wtf2/theme/wtf2-material';
import { Wtf2Dialog, WTF2_DIALOG_DATA } from '@wtf2/theme/wtf2-material';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
    selector: 'app-dialog-box-view',
    templateUrl: './dialog-box-view.component.html',
    styleUrls: ['./dialog-box-view.component.scss'],
})
export class DialogBoxViewComponent implements OnInit {
    reportDialogRef: Wtf2DialogRef<CourseDialogComponent, any>;
    constructor(private dialog: Wtf2Dialog) { }
    openDialog() {
        this.dialog.open(CourseDialogComponent, {
            width: '400px',
            height: '100vh',
            autoFocus: false,
            position: { right: ' 0px' },
        });
    }
    ngOnInit() { }
}
// Invite User Component
@Component({
    selector: 'course-dialog',
    templateUrl: 'course-dialog.component.html',
    styleUrls: ['./dialog-box-view.component.scss'],
})
export class CourseDialogComponent {
    form: FormGroup;
    constructor(
        private dialog: Wtf2Dialog,
        private fb: FormBuilder,
        private dialogRef: Wtf2DialogRef<CourseDialogComponent>,
        @Inject(WTF2_DIALOG_DATA) public data,
    ) { }
    ngOnInit() { }
    close() {
        this.dialogRef.close();
    }
    nextDialog() {

        let dialogref = this.dialog.open(ManageUserDialog, {
            width: '400px',
            height: '100vh',
            autoFocus: false,
            position: { right: ' 0px' },
        });

        dialogref.afterOpened().subscribe(result => {
            this.updateParentDialogConfig();
        });
        dialogref.afterClosed().subscribe(result => {
            const siblings = document.getElementsByClassName('parent-transition');

            for (let i = siblings.length - 1; i > -1; i--) {
                let sibling = siblings[i];
                sibling.classList.remove('class', 'parent-transition');
                sibling.setAttribute('class', 'reset-transition');
            }
        });
    }
    updateParentDialogConfig() {
        if (document.getElementsByClassName('cdk-overlay-pane')) {
            const siblings = document.getElementsByClassName(
                'cdk-overlay-pane',
            );

            const elements = document.getElementsByClassName(
                'reset-transition',
            );
            if (siblings.length > 1) {
                for (let i = siblings.length - 2; i > -1; i--) {
                    let sibling = siblings[i];
                    sibling.removeAttribute('style');
                    sibling.setAttribute('class', 'parent-transition ');
                }
            }
            if (elements.length) {
                for (let i = elements.length - 1; i > -1; i--) {
                    let ele = elements[i];
                    ele.setAttribute('class', 'parent-transition ');
                }
            }
        }
    }
    closeDialog() {
        this.dialogRef.close();
    }
}
// Manage User Component
@Component({
    selector: 'manage-user-dialog',
    templateUrl: 'manage-user-dialog.html',
    styleUrls: ['./dialog-box-view.component.scss'],
})
export class ManageUserDialog {
    form: FormGroup;
    constructor(
        private dialog: Wtf2Dialog,
        private fb: FormBuilder,
        private dialogRef: Wtf2DialogRef<ManageUserDialog>,
        @Inject(WTF2_DIALOG_DATA) public data,
    ) { }
    ngOnInit() { }

    closeDialog() {
        this.dialogRef.close();
    }
}
