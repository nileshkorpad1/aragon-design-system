import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { Wtf2Dialog } from '@wtf2/theme/wtf2-material';
import { FormDataComponent } from './form-data/form-data.component';

@Component({
    selector: 'app-form-in-expand-and-dialog',
    templateUrl: './form-in-expand-and-dialog.component.html',
    styleUrls: ['./form-in-expand-and-dialog.component.scss'],
})
export class FormInExpandAndDialogComponent implements OnInit {
    @ViewChild('childRef',{static:false}) fromData: FormDataComponent;
    constructor(public dailog: Wtf2Dialog) {}
    ngOnInit() {}
    openDialogScrollablea() {
        this.dailog.open(DialogContent, {
            width: '800px',
            autoFocus: false,
        });
    }
}
@Component({
    selector: 'dialog-content',
    templateUrl: 'dialog-content.html',
})
export class DialogContent implements AfterViewInit, OnInit {
    @ViewChild('childRef',{static:false}) fromData: FormDataComponent;
    constructor() {}
    ngAfterViewInit() {}
    ngOnInit() {
    }
}
