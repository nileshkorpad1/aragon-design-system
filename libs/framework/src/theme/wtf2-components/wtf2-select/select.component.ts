import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../field.interface';
@Component({
    selector: 'wtf2-select-ng.col-md-6',
    template: `
    <wtf2-form-field class="form-field" [formGroup]="group">
        <wtf2-select [placeholder]="field.label" [formControlName]="field.name">
            <wtf2-option *ngFor="let item of field.options" [value]="item">{{item}}</wtf2-option>
        </wtf2-select>
    </wtf2-form-field>
`,
    styles: [],
})
export class SelectComponent implements OnInit {
    field: FieldConfig;
    group: FormGroup;
    constructor() { }
    ngOnInit() { }
}
