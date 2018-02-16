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
import { UserProfileService } from '@wtf2/services/user-profile.service';
import { ToastrService } from '@wtf2/theme/wtf2-components/wtf2-toastr/toastr/toastr.service';
import { locale as navigationEnglish } from './i18n/en';
import { locale as navigationTurkish } from './i18n/ch';
import { Wtf2TranslationLoaderService } from '@wtf2/services/translation-loader.service';


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
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
    barLabel: string;
    public user = {
        password: null,
    };
    panelOpenState = false;





    matcher = new MyErrorStateMatcher();

    message: string;
    hideCurrent = true;
    hideNew = true;
    hideConf = true;
    currentSection = 'personaldetail';
    SelectedFile = null;
    PreviewImg: any;
    Filetype: any;
    ImgFileError: boolean = false;

    constructor(public UserProfileService: UserProfileService, public toastr: ToastrService, private formBuilder: FormBuilder, private _wtf2TranslationLoaderService: Wtf2TranslationLoaderService) {

        this._wtf2TranslationLoaderService.loadTranslations(navigationTurkish);
        this._wtf2TranslationLoaderService.loadTranslations(navigationEnglish);
    }

    onFileSelectEvent(event) {
        if (event.target.files && event.target.files[0]) {
            this.Filetype = event.target.files[0].type;
            var Type = this.Filetype.substring(0, 5);
            if (Type != 'image') {
                this.ImgFileError = true;
                this.SelectedFile = null;
            } else {
                this.ImgFileError = false;
                this.PreviewImg = document.getElementById('imgid');
                this.PreviewImg.src = URL.createObjectURL(event.target.files[0]);
                this.SelectedFile = event.target.files[0];
            }
        }
    }

    onSubmit() {

        if (this.userProfileFormGroup.invalid) {
            this.toastr.warning('', 'Please enter required fields');
            return;
        } else if (this.userProfileFormGroup.valid) {
            const Formdata = new FormData();
            Formdata.append('img', this.SelectedFile);
            Formdata.append('firstname', this.userProfileFormGroup.get('firstnameFormControl').value);
            Formdata.append('lastname', this.userProfileFormGroup.get('lastnameFormControl').value);
            Formdata.append('phone', this.userProfileFormGroup.get('phnnoFormControl').value);
            Formdata.append('gender', this.userProfileFormGroup.get('genderFormControl').value);
            Formdata.append('city', this.userProfileFormGroup.get('cityFormControl').value);
            Formdata.append('state', this.userProfileFormGroup.get('stateFormControl').value);
            Formdata.append('country', this.userProfileFormGroup.get('countryFormControl').value);
            Formdata.append('currentpass', this.passwordFormGroup.get('currentpassFormControl').value);
            Formdata.append('newpass', this.passwordFormGroup.get('newpassFormControl').value);
            Formdata.append('confirmpass', this.passwordFormGroup.get('confrimpassFormControl').value);
            // this.UserProfileService.editUserDetails(Formdata)
            //     .subscribe(
            //         Formdata => {
            //             this.toastr.success('', 'Profile updated');
            //         },
            //         error => {
            //             this.toastr.error('', 'Unable to update profile');
            //         }
            //     );
        }
    }

    get profileGroup() { return this.userProfileFormGroup.controls; }
    get passwordGroup() { return this.passwordFormGroup.controls; }
    userProfileFormGroup: FormGroup;
    passwordFormGroup: FormGroup;
    ngOnInit() {
        this.userProfileFormGroup = this.formBuilder.group({
            firstnameFormControl: new FormControl('', [
                Validators.required,
                Validators.pattern('^[a-zA-Z]+$'),
            ]),

            lastnameFormControl: new FormControl('', [
                Validators.required,
                Validators.pattern('^[a-zA-Z]+$'),
            ]),

            phnnoFormControl: new FormControl('', [
                Validators.required,
                Validators.pattern('^[0-9]+$'),
            ]),

            genderFormControl: new FormControl('', [Validators.required]),

            cityFormControl: new FormControl('', [Validators.required]),

            stateFormControl: new FormControl('', [Validators.required]),

            countryFormControl: new FormControl('', [Validators.required]),

            emailFormControl: new FormControl('', [
                Validators.required,
                Validators.email,
            ])
        });

        this.passwordFormGroup = this.formBuilder.group({

            currentpassFormControl: new FormControl('', [Validators.required]),

            newpassFormControl: new FormControl('', [Validators.required]),

            confrimpassFormControl: new FormControl('', [Validators.required]),
        });

    }
    onSectionChange(sectionId: string) {
        this.currentSection = sectionId;
    }
    // scrollTo(section) {
    //     this.currentSection = section;
    //     document.querySelector('#' + section)
    //         .scrollIntoView();
    // }


    submitData() {
        console.log(this.passwordFormGroup);
        if (!this.passwordFormGroup.valid) {
            this.toastr.warning('', 'Please enter valid data');
            return;
        } else if (this.passwordFormGroup.get('newpassFormControl').value != this.passwordFormGroup.get('confrimpassFormControl').value) {
            this.toastr.warning('', 'New password and Confirmed passowrd should be match');
            return;
        }
        this.toastr.success('', 'Password change successfully.');
    }


}
