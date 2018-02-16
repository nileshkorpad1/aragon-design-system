import { Component, OnInit, Input, ViewEncapsulation, SimpleChange } from '@angular/core';
import { Wtf2Colors } from '@wtf2/theme/wtf2-colors';

var c3 = require('c3');

const chartdata = {
  'JsonData': [],
  'color': '',
  'type': '',
  'keys': [],
}

@Component({
  selector: 'wtf2-chart',
  templateUrl: './wtf2-c3-chart.component.html',
  styleUrls: ['./wtf2-c3-chart.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class Wtf2C3ChartComponent implements OnInit {

  constructor() { }
  wtf2chartcolor: any;
  Color: any;
  type: string;
  JsonData: any;
  keys: any;
  InitialData: any;
  @Input() ChartData;
  @Input() ChartConfig: any[];
  @Input() chartid;
  @Input() height;
  @Input() Type: string = "2d";


  @Input() IsDrillDownReset: boolean = false;
  ngOnInit() {
    chartdata.JsonData = this.ChartData.data;
    chartdata.color = this.ChartData.color;
    chartdata.type = this.ChartData.type;
    chartdata.keys = this.ChartData.keys;
    this.wtf2chartcolor = Wtf2Colors.presets;
    this.chartid = this.chartid;
  }
  reset() {
    this.ChartData.data;
    this.drawChart();
  }
  ngAfterViewInit() {
    if (this.ChartData.data) {
      this.drawChart();
    }
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changeObj: SimpleChange) {
    if (this.ChartData.data) {
      this.drawChart();
    }
  }
  drawChart() {
    chartdata.JsonData = this.ChartData.data;
    var GaugeMaxValue = (chartdata.JsonData.length > 0 && chartdata.JsonData[0].maxvalue) ? chartdata.JsonData[0].maxvalue : 0;
    chartdata.color = this.ChartData.color;
    chartdata.type = this.ChartData.type;
    chartdata.keys = this.ChartData.keys;
    this.wtf2chartcolor = Wtf2Colors.presets;
    var chartid = this.chartid;
    var IsXaxis = (this.ChartData.isXaxisShow != undefined) ? this.ChartData.isXaxisShow : true;
    var IsYaxis = (this.ChartData.isYaxisShow != undefined) ? this.ChartData.isYaxisShow : true;
    var LegendPossition = (this.ChartData.LegendPossition) ? this.ChartData.LegendPossition : 'bottom';
    var RotateLabel = (this.ChartData.rotateLabelName != undefined) ? this.ChartData.rotateLabelName : 0;
    var LegendShow = (this.ChartData.LegendShow != undefined) ? this.ChartData.LegendShow : false;
    var IsIntTickValues = (this.ChartData.IsIntTickValues != undefined) ? this.ChartData.IsIntTickValues : false;
    var negative = Wtf2Colors.getColor('red')[400];
    var positive = Wtf2Colors.getColor('green')[400];
    var bindhtml = document.getElementById(this.chartid);
    const horizontalChartFlag: boolean = this.ChartData.horizontalChart ? true : false;
    const isPossitiveNegativeColor: boolean = this.ChartData.isPossitiveNegativeColor ? true : false;
    const chartHeight = this.height;
    var group = [];
    if (chartdata.type == 'stacked') {
      group = chartdata.keys;
      chartdata.type = 'bar';
    }

    var chart = c3.generate({
      bindto: bindhtml,
      data: {
        type: chartdata.type,
        onclick: function (d, element) {

          if (chartdata.JsonData[element.__data__.index].hasOwnProperty("subdata")) {
            var subdata = chartdata.JsonData[element.__data__.index].subdata;
            var subkeys = subdata.keys;
            var data = subdata.data;

            chart.load({
              unload: true,
              keys: {
                x: 'labelname',
                value: subkeys
              },
              json: data
            });
            chartdata.JsonData = data;
            chartdata.keys = subkeys;
          }
        },
        json: chartdata.JsonData,
        keys: {
          x: 'labelname',
          value: chartdata.keys
        },
        groups: [group],
        color: function (color, d) {
          if (isPossitiveNegativeColor) {
            return d.value < 0 ? negative : positive;
          }
          return color
        }
      },
      color: {
        pattern: chartdata.color
      },
      legend: {
        show: LegendShow,
        position: LegendPossition
      },
      axis: {
        x: {
          tick: {
            rotate: RotateLabel,
          },
          show: IsXaxis,
          type: 'category',
        },
        y: {
          show: IsYaxis,
          tick: {
            // format: function(x) { return x % 1 === 0 ? x : ''; }
            format: function (d) {
              if (IsIntTickValues) {
                d = (parseInt(d) == d) ? d : null;
              }
              return d;
          }
              // values : [1,2,3, ...],
          },
        },
        rotated: horizontalChartFlag
      },
      bar: {
        width: {
          ratio: 0.5
        }
      },
      gauge: {
        label: {
          format: function (value, ratio) {
            return value;
          },
          show: true // to turn off the min/max labels.
        },
        min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
        max: GaugeMaxValue, // 100 is default
        units: ' %',
        // width: 39 // for adjusting arc thickness
      },
      donut: { width: 45 },
      size: {
        height: chartHeight,
      }
    });

    // d3.select(bindhtml)
    //   .on('click', function (d, element) {
    //     if (chartdata.JsonData[element].hasOwnProperty("subdata")) {
    //       var subdata = chartdata.JsonData[element].subdata;
    //       var subkeys = subdata.keys;
    //       var data = subdata.data;

    //       chart.load({
    //         unload: true,
    //         keys: {
    //           x: 'labelname',
    //           value: subkeys
    //         },
    //         json: data
    //       });
    //       chartdata.JsonData = data;
    //       chartdata.keys=subkeys;
    //     }
    //   });
  }
}
