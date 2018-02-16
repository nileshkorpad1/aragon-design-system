import { Component, OnInit } from '@angular/core';
import { ToastrService } from '@wtf2/theme/wtf2-components/wtf2-toastr/toastr/toastr.service';

@Component({
    selector: 'app-demo-form',
    templateUrl: './demo-form.component.html',
    styleUrls: ['./demo-form.component.scss'],
})
export class DemoFormComponent implements OnInit {
    constructor(private toastr: ToastrService) {}

    countries: string[] = ['India', 'Singapore', 'Malaysia'];

    cities: string[] = ['Alabama', 'Alaska', 'Arizona', 'Arkansas'];

    jobes: string[] = ['Accountant', 'HR', 'Developer', 'Assistant'];

    ngOnInit() {}
    submitData() {
        this.toastr.success('', 'Added successfully');
    }
}
