import {
  WTF2_DIALOG_DATA,
  Wtf2DialogRef,
} from '@wtf2/theme/wtf2-material';
import {Component, Inject} from '@angular/core';
import {CrudDataService} from '../../services/data.service';
import { ToastrService } from '@wtf2/theme/wtf2-components/wtf2-toastr/toastr/toastr.service';


@Component({
  selector: 'app-delete.dialog',
  templateUrl: '../../dialogs/delete/delete.dialog.html',
  styleUrls: ['../../dialogs/delete/delete.dialog.css']
})
export class DeleteDialogComponent {

  constructor(public dialogRef: Wtf2DialogRef<DeleteDialogComponent>,
    @Inject(WTF2_DIALOG_DATA) public data: any, public dataService: CrudDataService,
    private toastr: ToastrService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dataService.deleteIssue(this.data.id);
    this.toastr.success('', 'Deleted successfully');
  }
}
