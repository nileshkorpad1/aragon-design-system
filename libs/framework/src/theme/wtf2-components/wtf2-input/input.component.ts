import { Component, OnInit, Directive } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../field.interface';
@Component({
    selector: 'wtf2-input.col-md-6',
    template: `
        <wtf2-form-field [formGroup]="group">
            <input wtf2Input [formControlName]="field.name" [placeholder]="field.label" [type]="field.inputType">
                <ng-container *ngFor="let validation of field.validations;" ngProjectAs="wtf2-error">
                    <wtf2-error *ngIf="group.get(field.name)?.hasError(validation.name)">{{validation.message}}</wtf2-error>
                </ng-container>
        </wtf2-form-field>
`,
    styles: [],
})

export class InputComponent implements OnInit {
    field: FieldConfig;
    group: FormGroup;
    constructor() { }
    ngOnInit() { }
}
