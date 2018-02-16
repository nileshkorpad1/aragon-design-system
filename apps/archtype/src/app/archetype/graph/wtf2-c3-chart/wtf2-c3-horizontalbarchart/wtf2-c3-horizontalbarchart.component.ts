import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wtf2-c3-horizontalbarchart',
  templateUrl: './wtf2-c3-horizontalbarchart.component.html',
  styleUrls: ['./wtf2-c3-horizontalbarchart.component.scss']
})
export class Wtf2C3HorizontalbarchartComponent implements OnInit {

  Horizontalbardata: any = [];
  constructor() { }

  ngOnInit() {
    this.horizontalBarData((data) => {
      this.Horizontalbardata = data;
    });
  }

  horizontalBarData(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', 'assets/data/horizontal.json');
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }

}
