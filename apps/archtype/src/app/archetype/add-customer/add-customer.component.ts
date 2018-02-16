import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ToastrService } from '@wtf2/theme/wtf2-components/wtf2-toastr/toastr/toastr.service';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  public user = {
    password: null
  };
  panelOpenState = false;


  customerNameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z]+$'),
  ]);
  currencyFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z]+$'),
  ]);
  customerCodeFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]+$'),
  ]);
  accountFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]+$'),
  ]);
  customerUenFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]+$'),
  ]);

  paymentTermFormControl = new FormControl('', [
    Validators.required,
  ]);
  secondCtrl = new FormControl('', [
    Validators.required,
  ]);




  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  // firstnameFormControl = new FormControl('', [
  //   Validators.required,
  //   Validators.pattern('^[a-zA-Z]+$'),
  // ]);

  phnnoFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]+$'),
  ]);
  genderFormControl = new FormControl('', [
    Validators.required,
  ]);
  cityFormControl = new FormControl('', [
    Validators.required,
  ]);

  stateFormControl = new FormControl('', [
    Validators.required,
  ]);
  countryFormControl = new FormControl('', [
    Validators.required,
  ]);
  currentpassFormControl = new FormControl('', [
    Validators.required,
  ]);
  newpassFormControl = new FormControl('', [
    Validators.required,
  ]);
  confrimpassFormControl = new FormControl('', [
    Validators.required,
  ]);



  matcher = new MyErrorStateMatcher();


  hideCurrent = true;
  hideNew = true;
  hideConf = true;
  currentSection = 'personaldetails';
  constructor(private _formBuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      // firstCtrl: ['', Validators.required],
      customerCodeFormControl: ['', Validators.required],
      customerNameFormControl: ['', Validators.required],
      accountFormControl: ['', Validators.required],
      currencyFormControl: ['', Validators.required],
      customerUenFormControl: ['', Validators.required],
      paymentTermFormControl: ['', Validators.required],
      cityFormControl: ['', Validators.required],
      secondCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      secondCtrl1: ['', Validators.required],
    });
  }
  scrollTo(section) {
    this.currentSection = section;
    document.querySelector('#' + section)
      .scrollIntoView();
  }

  submitData() {
    this.toastr.success('', 'Edited successfully');
  }
}
