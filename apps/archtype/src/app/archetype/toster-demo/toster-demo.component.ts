import { Component, OnInit } from '@angular/core';
import { ToastrService } from '@wtf2/theme/wtf2-components/wtf2-toastr/toastr/toastr.service';
import { Wtf2SnackBar } from '@wtf2/theme/wtf2-material/snack-bar';

@Component({
  selector: 'app-toster-demo',
  templateUrl: './toster-demo.component.html',
  styleUrls: ['./toster-demo.component.scss'],
})
export class TosterDemoComponent implements OnInit {
  title: string;
  msg: string;
  msgtype: string;
  position: string;
  hposition: any;
  vposition: any;
  isprogressbar: boolean;

  constructor(private toastr: ToastrService, private snackBar: Wtf2SnackBar) {
    this.title = 'success';
    this.msg = 'You are awesome!';
    this.msgtype = 'success';
    this.position = 'top-right';
    this.hposition = 'start';
    this.vposition = 'top';
  }
  openToastr() {
    console.log(this.isprogressbar);
    if (this.msgtype == 'success') {
      this.toastr.success(this.msg, this.title, {
        positionClass: 'toast-' + this.position,
        progressBar: this.isprogressbar,
      });
    } else if (this.msgtype == 'error') {
      this.toastr.error(this.msg, this.title, {
        positionClass: 'toast-' + this.position,
        progressBar: this.isprogressbar,
      });
    } else if (this.msgtype == 'info') {
      this.toastr.info(this.msg, this.title, {
        positionClass: 'toast-' + this.position,
        progressBar: this.isprogressbar,
      });
    } else if (this.msgtype == 'warning') {
      this.toastr.warning(this.msg, this.title, {
        positionClass: 'toast-' + this.position,
        progressBar: this.isprogressbar,
      });
    }
  }
  openSnackbar() {
    console.log(this.vposition, this.hposition);
    this.snackBar.open(this.msg, this.title, {
      duration: 2000,
      horizontalPosition: this.hposition,
      verticalPosition: this.vposition,
      direction: 'rtl',
    });
  }
  clearToastr() {
    this.toastr.clear();
  }

  clearSnackbar() {
    this.snackBar.dismiss();
  }

  ngOnInit() { }
}
