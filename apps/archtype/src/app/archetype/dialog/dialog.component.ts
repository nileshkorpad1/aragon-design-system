import { Component, OnInit, Inject } from '@angular/core';
import {
    Wtf2Dialog,
    WTF2_DIALOG_DATA,
    Wtf2DialogConfig,
} from '@wtf2/theme/wtf2-material';
import { DemoFormComponent } from './demo-form/demo-form.component';
import { FormComponent } from './form/form.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from '@wtf2/theme/wtf2-components/wtf2-toastr/toastr/toastr.service';
import { CourseDialogComponent } from '../dialog-box-view/dialog-box-view.component';
export interface DialogData {
    animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
    form: FormGroup;

    constructor(public dailog: Wtf2Dialog) { }
    openDialog() {
        const dialogConfig = new Wtf2DialogConfig();
        dialogConfig.data = {
            id: 1,
            title: '',
        };
        dialogConfig.height = '100vh';
        dialogConfig.panelClass = ['wtf2-dialog-responsive'];
        dialogConfig.position = { right: '0%' };
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = false;
        this.dailog.open(DialogDataExampleDialog, dialogConfig);
    }
    closeDialog() {
        this.dailog.closeAll();
    }
    openDialogScrollablea() {
        const dialogConfig = new Wtf2DialogConfig();
        dialogConfig.data = {
            id: 1,
            title: '',
        };
        dialogConfig.height = '100vh';
        dialogConfig.panelClass = ['wtf2-dialog-responsive-sm'];
        dialogConfig.position = { right: '0%' };
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = false;

        this.dailog.open(DialogContentExampleDialog,
            dialogConfig,
        );
    }
    showTestDialog() {
        const dialogConfig = new Wtf2DialogConfig();
        dialogConfig.data = {
            id: 1,
            title: '',
        };
        dialogConfig.height = '100vh';
        dialogConfig.width = '70vh';
        dialogConfig.position = { right: '0%' };
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = false;
        dialogConfig.panelClass = ['wtf2-dialog-responsive-md'];
        this.dailog.open(DemoFormComponent, dialogConfig);
    }

    showDialog() {
        const dialogConfig = new Wtf2DialogConfig();
        dialogConfig.data = {
            id: 1,
            title: '',
        };
        dialogConfig.height = '100vh';
        dialogConfig.width = '100vh';
        dialogConfig.position = { right: '0%' };
        dialogConfig.disableClose = false;
        dialogConfig.panelClass = ['wtf2-dialog-responsive-lg'];
        this.dailog.open(FormComponent, dialogConfig);
    }
    nestedDialog() {
        const dialogConfig = new Wtf2DialogConfig();
        dialogConfig.data = {
            id: 1,
            title: '',
        };
        dialogConfig.height = '100vh';
        dialogConfig.width = '70vh';
        dialogConfig.position = { right: '0%' };
        dialogConfig.disableClose = false;
        dialogConfig.panelClass = ['wtf2-dialog-responsive-lg'];
        dialogConfig.autoFocus = false;
        this.dailog.open(CourseDialogComponent, {
            width: '400px',
            height: '100vh',
            autoFocus: false,
            position: { right: ' 0px' },
        });
    }

    ngOnInit() { }
}
@Component({
    selector: 'dialog-data-example-dialog',
    templateUrl: 'dialog-data-example-dialog.html',
    styleUrls: ['./dialog.component.scss'],
})
export class DialogDataExampleDialog {
    constructor(
        @Inject(WTF2_DIALOG_DATA) public data: DialogData,
        public dailog: Wtf2Dialog,
        private toastr: ToastrService,
    ) { }
    form: FormGroup;
    closeDialog() {
        this.dailog.closeAll();
    }
    submitData() {
        this.toastr.success('', 'Saved successfully');
    }
}
@Component({
    selector: 'dialog-content-example-dialog',
    templateUrl: 'dialog-content-example-dialog.html',
    styleUrls: ['./dialog.component.scss'],
})
export class DialogContentExampleDialog {
    constructor(
        public dailog: Wtf2Dialog,
    ) { }
    closeDialog(){
        this.dailog.closeAll();
    }
}
