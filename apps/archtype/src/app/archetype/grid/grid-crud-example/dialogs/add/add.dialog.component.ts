import {
  WTF2_DIALOG_DATA,
  Wtf2DialogRef,
} from '@wtf2/theme/wtf2-material';
import {Component, Inject} from '@angular/core';
import {CrudDataService} from '../../services/data.service';
import {FormControl, Validators} from '@angular/forms';
import {Issue} from '../../models/issue';
import { ToastrService } from '@wtf2/theme/wtf2-components/wtf2-toastr/toastr/toastr.service';

@Component({
  selector: 'app-add.dialog',
  templateUrl: '../../dialogs/add/add.dialog.html',
  styleUrls: ['../../dialogs/add/add.dialog.css']
})

export class AddDialogComponent {
  constructor(public dialogRef: Wtf2DialogRef<AddDialogComponent>,
    @Inject(WTF2_DIALOG_DATA) public data: Issue,
    private toastr: ToastrService,
    public dataService: CrudDataService) { }

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

  public confirmAdd(): void {
    this.dataService.addIssue(this.data);
  }
  submitData() {
    this.toastr.success('', 'Saved successfully');
  }

}
