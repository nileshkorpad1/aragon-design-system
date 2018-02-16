import { Component, OnInit } from '@angular/core';
import {
    FormControl,
    FormGroupDirective,
    NgForm,
    Validators,
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
    selector: 'app-stepper-demo',
    templateUrl: './stepper-demo.component.html',
    styleUrls: ['./stepper-demo.component.scss'],
})
export class StepperDemoComponent implements OnInit {
    isLinear = false;
    firstFormGroupVertical: FormGroup;
    firstFormGroupHorizontal: FormGroup;
    billingAddressFormGroup: FormGroup;
    shippingAddressFormGroup: FormGroup;
    ibgFormGroup: FormGroup;
    fillOutFormGroup: FormGroup;
    doneAddressFormGroup: FormGroup;

    public user = {
        password: null,
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

    paymentTermFormControl = new FormControl('', [Validators.required]);
    secondCtrl = new FormControl('', [Validators.required]);
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
    genderFormControl = new FormControl('', [Validators.required]);
    cityFormControl = new FormControl('', [Validators.required]);

    stateFormControl = new FormControl('', [Validators.required]);
    countryFormControl = new FormControl('', [Validators.required]);
    currentpassFormControl = new FormControl('', [Validators.required]);
    newpassFormControl = new FormControl('', [Validators.required]);
    confrimpassFormControl = new FormControl('', [Validators.required]);

    matcher = new MyErrorStateMatcher();

    hideCurrent = true;
    hideNew = true;
    hideConf = true;
    currentSection = 'personaldetails';
    constructor(
        private _formBuilder: FormBuilder,
        private toastr: ToastrService,
    ) {}

    ngOnInit() {
        this.firstFormGroupHorizontal = this._formBuilder.group({
            customerCodeFormControl: ['', Validators.required],
            customerNameFormControl: ['', Validators.required],
            accountFormControl: ['', Validators.required],
            currencyFormControl: ['', Validators.required],
            customerUenFormControl: ['', Validators.required],
            paymentTermFormControl: ['', Validators.required],
            cityFormControl: ['', Validators.required],
        });

        this.firstFormGroupVertical = this._formBuilder.group({
            customerCodeFormControl: ['', Validators.required],
            customerNameFormControl: ['', Validators.required],
            accountFormControl: ['', Validators.required],
            currencyFormControl: ['', Validators.required],
            customerUenFormControl: ['', Validators.required],
            paymentTermFormControl: ['', Validators.required],
            cityFormControl: ['', Validators.required],
        });

        this.billingAddressFormGroup = this._formBuilder.group({
            secondCtrl: ['', Validators.required],
        });

        this.shippingAddressFormGroup = this._formBuilder.group({
            secondCtrl: ['', Validators.required],
        });

        this.ibgFormGroup = this._formBuilder.group({
            secondCtrl: ['', Validators.required],
        });

        this.fillOutFormGroup = this._formBuilder.group({
            secondCtrl: ['', Validators.required],
        });

        this.doneAddressFormGroup = this._formBuilder.group({
            secondCtrl: ['', Validators.required],
        });
    }
    scrollTo(section) {
        this.currentSection = section;
        document.querySelector('#' + section).scrollIntoView();
    }
    get getFirstFormGroupVertical() {
        return this.firstFormGroupVertical.controls;
    }
    get getFirstFormGroupHorizontal() {
        return this.firstFormGroupHorizontal.controls;
    }
    get getShippingAddressFormGroup() {
        return this.shippingAddressFormGroup.controls;
    }
    get getBillingAddressFormGroup() {
        return this.billingAddressFormGroup.controls;
    }
    get getIbgFormGroup() {
        return this.ibgFormGroup.controls;
    }
    get getDoneAddressFormGroup() {
        return this.doneAddressFormGroup.controls;
    }
    get getFillOutFormGroup() {
        return this.fillOutFormGroup.controls;
    }
    submitData(formName) {
        if (
            this.firstFormGroupVertical.valid &&
            formName == 'firstFormGroupVertical'
        ) {
            this.toastr.success('', 'Vertical form details saved successfully');
        } else if (
            this.firstFormGroupHorizontal.valid &&
            formName == 'firstFormGroupHorizontal'
        ) {
            this.toastr.success(
                '',
                'Horizontal form details saved successfully',
            );
        } else if (
            this.billingAddressFormGroup.valid &&
            formName === 'billingAddress'
        ) {
            this.toastr.success(
                '',
                'Billing Address form details saved successfully',
            );
        } else if (
            this.shippingAddressFormGroup.valid &&
            formName === 'shippingAddressFormGroup'
        ) {
            this.toastr.success('', 'Shipping Address saved successfully');
        } else if (this.ibgFormGroup.valid && formName === 'ibgFormGroup') {
            this.toastr.success('', 'IBG Address saved successfully');
        } else if (
            this.fillOutFormGroup.valid &&
            formName === 'fillOutFormGroup'
        ) {
            this.toastr.success('', 'Address saved successfully');
        } else if (
            this.doneAddressFormGroup.valid &&
            formName === 'doneAddressFormGroup'
        ) {
            this.toastr.success('', 'Address saved successfully');
        } else {
            this.toastr.error('', 'Please fill mandatory details');
        }
    }
}
