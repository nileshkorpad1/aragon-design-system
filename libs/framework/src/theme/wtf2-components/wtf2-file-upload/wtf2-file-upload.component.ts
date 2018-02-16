import { Component, Input } from '@angular/core';
import { convertToBoolProperty } from '../helpers';
import {
    FormControl,
    FormGroupDirective,
    NgForm,
    ValidatorFn,
} from '@angular/forms';
// import { ErrorStateMatcher } from '../core';
import { ToastrService } from '@wtf2/theme/wtf2-components/wtf2-toastr/toastr/toastr.service';
import { ErrorStateMatcher } from '@wtf2/theme/wtf2-material';

let FileTypeError = false;

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(
        control: FormControl | null,
        form: FormGroupDirective | NgForm | null,
    ): boolean {
        const IsSubmitted = form && form.submitted;
        return !!(
            control &&
            control.invalid &&
            (control.dirty || control.touched || IsSubmitted)
        );
    }
}

export function FileTypeFunction(): ValidatorFn {
    return (control: FormControl): { [key: string]: boolean } | null => {
        if (control.value !== undefined && FileTypeError) {
            return { fileTypeEE: true };
        }
        return null;
    };
}

@Component({
    selector: 'wtf2-file-upload',
    templateUrl: './wtf2-file-upload.component.html',
    styleUrls: ['./wtf2-file-upload.component.scss'],
})
export class Wtf2FileUploadComponent {
    constructor(public toastr: ToastrService) {}
    selectedFiles: any;
    Filename = '';
    InvalidFilename = '';
    Selectedfiletype: string;

    @Input() color = '';
    @Input() fileType = 'text/csv';
    @Input() buttonPlaceholder = 'Attachment';
    @Input() fieldPlaceholder = 'Choose file';

    @Input() hideNameFieldValue = true;
    @Input('nameField')
    set setNameField(val: boolean) {
        this.hideNameFieldValue = convertToBoolProperty(val);
    }
    @Input() hideButtonIconValue = true;
    @Input('buttonIcon')
    set setButtonIcon(val: boolean) {
        this.hideButtonIconValue = convertToBoolProperty(val);
    }
    @Input() hideButtonLabelValue = true;
    @Input('buttonLabel')
    set setButtonLabel(val: boolean) {
        this.hideButtonLabelValue = convertToBoolProperty(val);
    }
    @Input() buttonLeftValue = false;
    @Input('buttonPosition')
    set setButtonPosition(val: string) {
        if (val === 'left') {
            this.buttonLeftValue = true;
        } else if (val === 'left') {
            this.buttonLeftValue = false;
        }
    }
    @Input() toggleButtonValue = false;
    @Input('toggleButton')
    set setToggleButton(val: boolean) {
        this.toggleButtonValue = convertToBoolProperty(val);
    }
    @Input() wtf2RaisedButtonValue = false;
    @Input('wtf2RaisedButton')
    set setWtf2RaisedButton(val: boolean) {
        this.wtf2RaisedButtonValue = convertToBoolProperty(val);
    }
    @Input() multipleValue = false;
    @Input('multiple')
    set setMultiple(val: boolean) {
        this.multipleValue = convertToBoolProperty(val);
    }
    @Input() RequiredValue = false;
    @Input('required')
    set setRequired(val: boolean) {
        this.RequiredValue = convertToBoolProperty(val);
    }

    fileUpload = new FormControl('', [FileTypeFunction()]);
    matcher = new MyErrorStateMatcher();

    onFileSelectEvent(event) {
        let TotalFiles = event.target.files.length;
        let FileTypeNotMatch = 0;
        if (TotalFiles > 0) {
            this.Filename = '';
            this.InvalidFilename = '';
            for (let Index = 0; Index < TotalFiles; Index++) {
                this.Selectedfiletype = event.target.files[Index].type;
                this.Filename =
                    this.Filename + event.target.files[Index].name + ', ';
                if (0 > this.fileType.indexOf(this.Selectedfiletype)) {
                    FileTypeNotMatch++;
                    this.InvalidFilename =
                        this.InvalidFilename +
                        event.target.files[Index].name +
                        ', ';
                }
            }
            if (this.Filename !== '') {
                this.Filename = this.Filename.substring(
                    0,
                    this.Filename.length - 2,
                );
                this.fileUpload.markAsDirty();
            }
            if (this.InvalidFilename !== '') {
                this.InvalidFilename = this.InvalidFilename.substring(
                    0,
                    this.InvalidFilename.length - 2,
                );
            }
        }
        if (FileTypeNotMatch > 0) {
            FileTypeError = true;
            if (!this.hideNameFieldValue) {
                this.toastr.error(
                    this.InvalidFilename +
                        ' is not a valid file, Please provide a valid file',
                    'Error',
                );
            }
        } else {
            this.selectedFiles = event.target.files;
            FileTypeError = false;
            if (!this.hideNameFieldValue) {
                this.toastr.success(
                    this.Filename + ' files selected',
                    'Success',
                );
            }
        }
    }
}
