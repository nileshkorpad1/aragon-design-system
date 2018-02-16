import { Component, OnInit } from '@angular/core';
import {
    FormControl,
    FormGroupDirective,
    NgForm,
    Validators,
    FormBuilder,
    FormGroup,
} from '@angular/forms';
import { Wtf2Dialog } from '@wtf2/theme/wtf2-material';
import { ToastrService } from '@wtf2/theme/wtf2-components/wtf2-toastr/toastr/toastr.service';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
    isLinear = true;
    firstFormGroup: FormGroup;

    vendarFormGroup: FormGroup;
    vendarSecondFormGroup: FormGroup;

    constructor(
        private dialog: Wtf2Dialog,
        private formBuilder: FormBuilder,
        private toastr: ToastrService,
    ) {}
    closeDialog() {
        this.dialog.closeAll();
    }

    get vendarGroup() {
        return this.vendarFormGroup.controls;
    }
    get secondVendorGroup() {
        return this.vendarSecondFormGroup.controls;
    }
    ngOnInit() {
        this.vendarFormGroup = this.formBuilder.group({
            address1: new FormControl('', [Validators.required]),
            address2: new FormControl('', [Validators.required]),
            state: new FormControl('', [Validators.required]),
            country: new FormControl('', [Validators.required]),
            postalcode: new FormControl('', [Validators.required]),
            city: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email]),
            phone: new FormControl('', [Validators.required]),
        });
        this.vendarSecondFormGroup = this.formBuilder.group({
            address1: new FormControl('', [Validators.required]),
            address2: new FormControl('', [Validators.required]),
            state: new FormControl('', [Validators.required]),
            city: new FormControl('', [Validators.required]),
        });
    }
    onSubmit() {
        if (!this.vendarFormGroup.invalid) {
            this.toastr.success('', 'Saved successfully');
        } else {
            this.toastr.warning('', 'Please enter required fields');
        }
    }

    onsecondFormSubmit() {
        if (!this.vendarSecondFormGroup.invalid) {
            this.toastr.success('', 'Saved successfully');
        } else {
            this.toastr.warning('', 'Please enter required fields');
        }
    }
}
