import { Component, OnInit } from '@angular/core';
import { Wtf2Colors } from '@wtf2/theme/wtf2-colors';

@Component({
  selector: 'app-wtf2-c3-area',
  templateUrl: './wtf2-c3-area.component.html',
  styleUrls: ['./wtf2-c3-area.component.scss']
})
export class Wtf2C3AreaComponent implements OnInit {

  constructor() { }

  AreaData: any = [];
  ngOnInit() {
    this.areaChartData((data) => {
      this.AreaData = data;
      var colorArr = [];
      colorArr.push(Wtf2Colors.getColor('brown')[300]);
      colorArr.push(Wtf2Colors.getColor('blue-grey')[900]);
      colorArr.push(Wtf2Colors.getColor('cyan')[900]);
      colorArr.push(Wtf2Colors.getColor('cyan')[700]);
      this.AreaData['color'] = colorArr;
    });
  }


  areaChartData(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', 'assets/data/areachart.json');
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }
}
