import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-formfield',
  templateUrl: './formfield.component.html',
  styleUrls: ['./formfield.component.scss'],
})
export class FormfieldComponent implements OnInit {

  hide = false;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  matcher = new MyErrorStateMatcher();
  options: FormGroup;

  constructor(fb: FormBuilder) {
    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
      color: 'primary',
      fontSize: [16, Validators.min(10)],
    });
  }
  getFontSize() {
    return Math.max(10, this.options.value.fontSize);
  }
  ngOnInit() {
  }

}
