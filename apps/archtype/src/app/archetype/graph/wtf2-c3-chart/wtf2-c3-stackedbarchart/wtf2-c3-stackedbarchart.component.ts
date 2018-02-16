import { Component, OnInit } from '@angular/core';
import { Wtf2Colors } from '@wtf2/theme/wtf2-colors';

@Component({
  selector: 'app-wtf2-c3-stackedbarchart',
  templateUrl: './wtf2-c3-stackedbarchart.component.html',
  styleUrls: ['./wtf2-c3-stackedbarchart.component.scss']
})
export class Wtf2C3StackedbarchartComponent implements OnInit {
  StackedBarChart: any = [];
  constructor() { }
  ngOnInit() {
    this.stackedBarChart((data)=>{
      this.StackedBarChart=data;
      var colorArr = [];
      colorArr.push(Wtf2Colors.getColor('brown')[300]);
      colorArr.push(Wtf2Colors.getColor('blue-grey')[900]);
      this.StackedBarChart['color'] = colorArr;
    });
  }
  stackedBarChart(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', 'assets/data/stackedbar.json');
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }
}
