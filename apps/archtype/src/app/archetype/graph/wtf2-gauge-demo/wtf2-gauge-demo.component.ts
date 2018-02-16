import { Component, OnInit } from '@angular/core';
import { GaugeChartConfig } from '@wtf2/theme/wtf2-components/wtf2-gauge-chart/field.interface';
@Component({
  selector: 'app-wtf2-gauge-demo',
  templateUrl: './wtf2-gauge-demo.component.html',
  styleUrls: ['./wtf2-gauge-demo.component.scss']
})
export class Wtf2GaugeDemoComponent implements OnInit {

  constructor() { }
  gaugedata: GaugeChartConfig[];
  gaugedatatwo: GaugeChartConfig[];
  ngOnInit() {
    this.getGaugeData((data) => {
      this.gaugedata = data.data;
    });
  }
  getGaugeData(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', 'assets/data/gaugedata.json');
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }
}
