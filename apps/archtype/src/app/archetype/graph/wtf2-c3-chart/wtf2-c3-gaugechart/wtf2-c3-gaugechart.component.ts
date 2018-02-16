import { Component, OnInit } from '@angular/core';
import { Wtf2Colors } from '@wtf2/theme/wtf2-colors';

@Component({
  selector: 'app-wtf2-c3-gaugechart',
  templateUrl: './wtf2-c3-gaugechart.component.html',
  styleUrls: ['./wtf2-c3-gaugechart.component.scss']
})
export class Wtf2C3GaugechartComponent implements OnInit {
  GaugeData: any = [];
  constructor() { }

  ngOnInit() {
    this.gaugeFectchData((data) => {
      this.GaugeData = data;
      var colorArr = [];
      colorArr.push(Wtf2Colors.getColor('brown')[300]);
      colorArr.push(Wtf2Colors.getColor('blue-grey')[900]);
      this.GaugeData['color'] = colorArr;
    })
  }
  gaugeFectchData(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', 'assets/data/c3gauge.json');
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }

}
