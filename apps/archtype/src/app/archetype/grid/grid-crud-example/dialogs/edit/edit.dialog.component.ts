import {
  WTF2_DIALOG_DATA,
  Wtf2DialogRef,
} from '@wtf2/theme/wtf2-material';
import {Component, Inject} from '@angular/core';
import {CrudDataService} from '../../services/data.service';
import {FormControl, Validators} from '@angular/forms';
import { ToastrService } from '@wtf2/theme/wtf2-components/wtf2-toastr/public_api';

@Component({
  selector: 'app-baza.dialog',
  templateUrl: '../../dialogs/edit/edit.dialog.html',
  styleUrls: ['../../dialogs/edit/edit.dialog.css']
})
export class EditDialogComponent {

  constructor(public dialogRef: Wtf2DialogRef<EditDialogComponent>,
    private toastr: ToastrService,
    @Inject(WTF2_DIALOG_DATA) public data: any, public dataService: CrudDataService) { }

  formControl = new FormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  stopEdit(): void {
    this.dataService.updateIssue(this.data);
  }
  submitData() {
    this.toastr.success('', 'Edited successfully');
  }

}
