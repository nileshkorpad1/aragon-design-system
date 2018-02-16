import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../field.interface';
@Component({
  selector: 'wtf2-date.col-md-6',
  template: `
    <wtf2-form-field class="form-field" [formGroup]="group">
        <input wtf2Input [wtf2Datepicker]="picker" [formControlName]="field.name" [placeholder]="field.label">
        <wtf2-datepicker-toggle wtf2Suffix [for]="picker"></wtf2-datepicker-toggle>
        <wtf2-datepicker #picker></wtf2-datepicker>
        <wtf2-hint></wtf2-hint>
        <ng-container *ngFor="let validation of field.validations;" ngProjectAs="wtf2-error">
            <wtf2-error *ngIf="group.get(field.name).hasError(validation.name)">{{validation.message}}</wtf2-error>
        </ng-container>
    </wtf2-form-field>
`,
  styles: [],
})
export class DateComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() { }
  ngOnInit() { }
}
