import { Component, OnInit } from '@angular/core';
import { Wtf2Colors } from '@wtf2/theme/wtf2-colors';

@Component({
  selector: 'app-wtf2-c3-donutchart',
  templateUrl: './wtf2-c3-donutchart.component.html',
  styleUrls: ['./wtf2-c3-donutchart.component.scss']
})
export class Wtf2C3DonutchartComponent implements OnInit {

  Donutdata:any=[];
  constructor() { }
arr=['1','2'];
  ngOnInit() {
    this.donutData((data)=>{
      this.Donutdata=data;
      var colorArr = [];
      colorArr.push(Wtf2Colors.getColor('brown')[300]);
      colorArr.push(Wtf2Colors.getColor('blue-grey')[900]);
      colorArr.push(Wtf2Colors.getColor('cyan')[900]);
      colorArr.push(Wtf2Colors.getColor('cyan')[700]);
      this.Donutdata['color'] = colorArr;
    });
  }
  donutData(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', 'assets/data/donut.json');
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }
}
