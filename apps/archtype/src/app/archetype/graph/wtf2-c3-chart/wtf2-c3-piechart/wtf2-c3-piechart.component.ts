import { Component, OnInit } from '@angular/core';
import { Wtf2Colors } from '@wtf2/theme/wtf2-colors';

@Component({
  selector: 'app-wtf2-c3-piechart',
  templateUrl: './wtf2-c3-piechart.component.html',
  styleUrls: ['./wtf2-c3-piechart.component.scss']
})
export class Wtf2C3PiechartComponent implements OnInit {

  constructor() { }
  piedata:any=[];
  ngOnInit() {
    this.pieData((data) => {
      this.piedata = data;
      var colorArr = [];
      colorArr.push(Wtf2Colors.getColor('brown')[300]);
      colorArr.push(Wtf2Colors.getColor('blue-grey')[900]);
      colorArr.push(Wtf2Colors.getColor('cyan')[900]);
      colorArr.push(Wtf2Colors.getColor('cyan')[700]);
      this.piedata['color'] = colorArr;
      this.piedata['LegendPossition']='right';//bottom right left top
    });
  }
  pieData(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', 'assets/data/pie.json');
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }

}
