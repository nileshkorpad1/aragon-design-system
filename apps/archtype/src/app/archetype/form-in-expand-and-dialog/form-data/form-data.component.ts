import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroupDirective,
  NgForm,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ToastrService } from '@wtf2/theme/wtf2-components/wtf2-toastr/public_api';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null,
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
@Component({
  selector: 'app-form-data',
  templateUrl: './form-data.component.html',
  styleUrls: ['./form-data.component.scss']
})
export class FormDataComponent implements OnInit {

  currencies: string[] = ['Doller', 'SGD', 'Rupee'];

  jsonData : any = {
    customer: '',
    currency: '',
    exchangeRate: '',
    baseSalesInvoice : '',
    memo :'',
    poRefNo :'',
    nestInvoiceDate:'',
    repeatInvoice:'',
    recInvoice:'',
    recInvoiceDate:'',
    genrateInvoiceDate:'',
  };

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService,) { }

  get salesInvoiceGroup() {
    return this.salesInvoiceFormGroup.controls;
  }

  salesInvoiceFormGroup: FormGroup;
  ngOnInit() {

    this.salesInvoiceFormGroup = this.formBuilder.group({
      customerFormControl: new FormControl('', [Validators.required]),
      doccumentNumberFormControl: new FormControl('', [
        Validators.required,
      ]),
      memoControl: new FormControl('', [Validators.required]),
      currencyFormControl: new FormControl('', [Validators.required]),
      exchangerateFormControl: new FormControl('', [Validators.required]),
      basesalesinvoiceFormControl: new FormControl('', [
        Validators.required,
      ]),
      invoicedatecustomerFormControl: new FormControl('', [
        Validators.required,
      ]),
      customerporefnoFormControl: new FormControl('', [
        Validators.required,
      ]),
      // genindateFormControl : new FormControl('', [Validators.required]),
      reccFormControl: new FormControl('', [Validators.required]),
    });

  }
  onSubmit() {
    if (this.salesInvoiceFormGroup.valid) {
      this.toastr.success('', 'Saved successfully');
    } else {
      this.toastr.warning('', 'Please enter required fields');
    }
  }

}
