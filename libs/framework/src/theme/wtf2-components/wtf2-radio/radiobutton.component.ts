import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../field.interface';
@Component({
  selector: 'wtf2-radiobutton.col-md-6',
  template: `
<div class="form-field" [formGroup]="group">
<label class="radio-label-padding">{{field.label}}:</label>
<wtf2-radio-group [formControlName]="field.name">
<wtf2-radio-button *ngFor="let item of field.options" [value]="item">{{item}}</wtf2-radio-button>
</wtf2-radio-group>
</div>
`,
  styles: [],
})
export class RadiobuttonComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() {}
  ngOnInit() {}
}
