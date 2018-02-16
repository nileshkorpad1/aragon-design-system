import { Component, OnInit } from '@angular/core';
import { Wtf2Colors } from '@wtf2/theme/wtf2-colors';

@Component({
  selector: 'app-wtf2-c3-linechart',
  templateUrl: './wtf2-c3-linechart.component.html',
  styleUrls: ['./wtf2-c3-linechart.component.scss']
})
export class Wtf2C3LinechartComponent implements OnInit {

  constructor() { }
  LineData: any = [];
  ngOnInit() {
    this.lineChartData((data) => {
      this.LineData = data;
      var colorArr = [];
      colorArr.push(Wtf2Colors.getColor('brown')[300]);
      colorArr.push(Wtf2Colors.getColor('blue-grey')[900]);
      colorArr.push(Wtf2Colors.getColor('cyan')[900]);
      this.LineData['color'] = colorArr;
      this.LineData['rotateLabelName']=75;//Must number, rotate X-axis label 75 Deg
    });
  }

  lineChartData(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', 'assets/data/line.json');
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }
}
