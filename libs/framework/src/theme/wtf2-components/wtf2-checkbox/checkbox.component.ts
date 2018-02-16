import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../field.interface';
@Component({
  selector: 'wtf2-checkbox-ng.col-md-6',
  template: `
  <div class="form-field" [formGroup]="group" >
    <wtf2-checkbox [formControlName]="field.name">{{field.label}}</wtf2-checkbox>
  </div>
`,
  styles: [],
})
export class CheckboxComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() {}
  ngOnInit() {}
}
