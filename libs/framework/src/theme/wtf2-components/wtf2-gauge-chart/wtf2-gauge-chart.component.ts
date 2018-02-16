import { Component, OnInit, Input } from '@angular/core';
import { Wtf2Colors } from '@wtf2/theme/wtf2-colors/index';
import { GaugeChartConfig } from './field.interface';
const d3 = require('d3');

@Component({
  selector: 'wtf2-gauge-chart',
  templateUrl: './wtf2-gauge-chart.component.html',
  styleUrls: ['./wtf2-gauge-chart.component.scss']
})
export class Wtf2GaugeChartComponent implements OnInit {

  gaugemap = { 'configure': null, 'isRendered': null, 'render': null, 'update': null };
  constructor() { }
  @Input() gaugedata: GaugeChartConfig;
  value;
  maxvalue;
  gaugeid;
  partition;
  ngOnInit() {
    this.partition = this.gaugedata[0].partition;
    this.gaugeid = this.gaugedata[0].gaugeid;
    this.maxvalue = this.gaugedata[0].maxvalue;
    this.value = this.gaugedata[0].value;
  }
  ngAfterViewInit() {
    this.draw();
  }
  draw() {
    let self = this;

    let gauge = function (container, configuration) {
      // conatainer contain the div which render graph
      let config = {
        size: 710,
        clipWidth: 200,
        clipHeight: 110,
        ringInset: 20,// arc outer width
        ringWidth: 20,

        pointerWidth: 10,//pointer width
        pointerTailLength: 5,// pointer bottom lenth
        pointerHeadLengthPercent: 0.9,//length of pointer

        minValue: 0,
        maxValue: 10,

        minAngle: -90,
        maxAngle: 90,//-90 and 90 show arc 180 deg. 

        transitionMs: 750,

        majorTicks: configuration.partition,//total no. of partition on gauge
        labelFormat: d3.format('d'),
        labelInset: 10,//label distance from arc

        arcColorFn: d3.interpolateHsl(d3.rgb(configuration.mincolor), d3.rgb(configuration.maxcolor))
      };
      let range = undefined;
      let r = undefined;
      let pointerHeadLength = undefined;
      let value = 0;

      let svg = undefined;
      let arc = undefined;
      let scale = undefined;
      let ticks = undefined;
      let tickData = undefined;
      let pointer = undefined;

      let donut = d3.pie();

      function deg2rad(deg) {
        return deg * Math.PI / 180;
      }

      //calculate new angle 
      function newAngle(d) {
        let ratio = scale(d);
        let newAngle = config.minAngle + (ratio * range);
        return newAngle;
      }

      function configure(configuration) {
        let prop = undefined;
        for (prop in configuration) {
          config[prop] = configuration[prop];
        }

        range = config.maxAngle - config.minAngle;
        r = (config.size / 2);
        pointerHeadLength = Math.round(r * config.pointerHeadLengthPercent);

        // a linear scale this.gaugemap maps domain values to a percent from 0..1
        scale = d3.scaleLinear()
          .range([0, 1])
          .domain([config.minValue, config.maxValue]);

        //partition data  
        ticks = scale.ticks(config.majorTicks);
        tickData = d3.range(config.majorTicks).map(function () { return 1 / config.majorTicks; });//config.majorTicks stop value this.value

        //generate arc width
        arc = d3.arc()
          .innerRadius(r - config.ringWidth - config.ringInset)
          .outerRadius(r - config.ringInset)
          .startAngle(function (d, i) {
            let ratio = d * i;
            return deg2rad(config.minAngle + (ratio * range));
          })
          .endAngle(function (d, i) {
            let ratio = d * (i + 1);
            return deg2rad(config.minAngle + (ratio * range));
          });
      }
      self.gaugemap.configure = configure;

      //translate or move center-point at center of html object
      function centerTranslation() {
        return 'translate(' + (r + 10) + ',' + (r + 10) + ')';
      }

      function isRendered() {
        return (svg !== undefined);
      }
      self.gaugemap.isRendered = isRendered;

      function render(newValue) {
        // container = document.getElementById('power-gauge');


        //select container for render chart on html object
        svg = d3.select(container)
          .append('svg:svg')
          .attr('class', 'gauge')
          .attr('width', '100%')
          .attr('height', config.clipHeight);

        let centerTx = centerTranslation();// call function for translate or move center point at center

        // (g) Grouping SVG Elements with container
        let arcs = svg.append('g')
          .attr('class', 'arc')
          .attr('transform', centerTx);

        arcs.selectAll('path')
          .data(tickData)
          .enter().append('path')
          .attr('fill', function (d, i) {
            return config.arcColorFn(d * i);
          })
          .attr('d', arc);

        let lg = svg.append('g')
          .attr('class', 'label')
          .attr('transform', centerTx);
        lg.selectAll('text')
          .data(ticks)
          .enter().append('text')
          // .style("fill", '#0000FF')  fill label color
          .attr('transform', function (d) {
            let ratio = scale(d);
            let newAngle = config.minAngle + (ratio * range);
            return 'rotate(' + newAngle + ') translate(0,' + (config.labelInset - r) + ')';
          })
          .text(config.labelFormat);

        //***** */Label at bottom*****
        let text = svg.append('text')
          .attr("x", configuration.size / 2)
          .attr("y", (configuration.size / 2) + 50)//shift below from center point
          .attr("font-size", "25px");

        let label = text.append('tspan')
          .attr("font-size", "25px")
          .text(configuration.value + '%');//value show

        text = svg.append('text')
          .attr('fill', '#a8a8a8')
          .attr("font-size", "12px");
        text.text('');
        // label at buttom end

        let lineData = [[config.pointerWidth / 2, 0],
        [0, -pointerHeadLength],
        [-(config.pointerWidth / 2), 0],
        [0, config.pointerTailLength],
        [config.pointerWidth / 2, 0]];
        let pointerLine = d3.line().curve(d3.curveLinear)
        let pg = svg.append('g').data([lineData])
          .attr('class', 'pointer')
          .attr('transform', centerTx);//center of graph 

        pointer = pg.append('path')
          .attr('d', pointerLine/*function(d) { return pointerLine(d) +'Z';}*/)
          .attr('transform', 'rotate(' + config.minAngle + ')');

        update(newValue === undefined ? 0 : newValue);
      }
      self.gaugemap.render = render;
      function update(newValue, newConfiguration?) {
        if (newConfiguration !== undefined) {
          configure(newConfiguration);
        }
        let ratio = scale(newValue);
        let newAngle = config.minAngle + (ratio * range);
        pointer.transition()
          .duration(config.transitionMs)
          .ease(d3.easeElastic)
          .attr('transform', 'rotate(' + newAngle + ')');
      }
      self.gaugemap.update = update;

      configure(configuration);

      return self.gaugemap;
    };

    let powerGauge = gauge('#' + this.gaugedata[0].gaugeid, {
      size: 350,//total size
      clipWidth: 320,//graph width
      clipHeight: 250,//graph height
      ringWidth: 50,//arc ring width inner
      maxValue: this.gaugedata[0].maxvalue,//set max value to display
      transitionMs: 4000,
      partition: this.gaugedata[0].partition,
      value: this.gaugedata[0].value,
      mincolor: Wtf2Colors.getColor('red')[100],
      maxcolor: Wtf2Colors.getColor('green')[500]
    });

    powerGauge.render(this.gaugedata[0].value);//passs value to point arrow
  }

}
