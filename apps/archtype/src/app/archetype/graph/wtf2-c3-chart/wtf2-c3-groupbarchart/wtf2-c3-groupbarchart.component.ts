import { Component, OnInit } from '@angular/core';
import { Wtf2Colors } from '@wtf2/theme/wtf2-colors';

@Component({
  selector: 'app-wtf2-c3-groupbarchart',
  templateUrl: './wtf2-c3-groupbarchart.component.html',
  styleUrls: ['./wtf2-c3-groupbarchart.component.scss']
})
export class Wtf2C3GroupbarchartComponent implements OnInit {
  GroupBarData: any = [];
  constructor() { }

  ngOnInit() {
    this.groupBarChartData((data) => {
      this.GroupBarData = data;
      var colorArr = [];
      colorArr.push(Wtf2Colors.getColor('brown')[300]);
      colorArr.push(Wtf2Colors.getColor('blue-grey')[900]);
      this.GroupBarData['color'] = colorArr;
      this.GroupBarData['isYaxisShow'] = false;//to show/hide yaxis
      this.GroupBarData['LegendShow']=false;
    });
  }

  groupBarChartData(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', 'assets/data/groupbar.json');
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }

}
