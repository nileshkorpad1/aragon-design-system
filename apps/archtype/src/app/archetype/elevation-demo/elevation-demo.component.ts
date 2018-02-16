import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-elevation-demo',
    templateUrl: './elevation-demo.component.html',
    styleUrls: ['./elevation-demo.component.scss'],
})
export class ElevationDemoComponent implements OnInit {
    currentelevation: number;
    constructor() {
        this.currentelevation = 0;
    }

    ngOnInit() {}
    addelevation() {
        this.currentelevation = this.currentelevation + 1;
        if (this.currentelevation > 24 || this.currentelevation < 0) {
            this.currentelevation = 0;
        }
    }
    removeelevation() {
        this.currentelevation = this.currentelevation - 1;
        if (this.currentelevation > 24 || this.currentelevation < 0) {
            this.currentelevation = 0;
        }
    }
}
