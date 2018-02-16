import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../field.interface';
@Component({
  selector: 'wtf2-button.col-md-6',
  template: `
  <div class="form-field" [formGroup]="group">
    <button type="submit" wtf2-raised-button color="primary">{{field.label}}</button>
  </div>
`,
  styles: [],
})
export class ButtonComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() {}
  ngOnInit() {}
}
