import { Component, OnInit } from '@angular/core';
import { Chart } from '@wtf2/theme/wtf2-components/wtf2-chartjs/chart.js';

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.scss'],
})
export class GaugeComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
  ngAfterViewInit() {
    // Create chart
    var ChartElement = document.getElementById('gaugecanvas');
    new Chart(ChartElement, {
      type: 'doughnut',
      data: {
        labels: ['Red', 'Blue'],
        datasets: [
          {
            label: 'Gauge',
            data: [65, 190],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
            ],
          },
        ],
      },
      options: {
        circumference: Math.PI,
        rotation: Math.PI,
        cutoutPercentage: 80, // precent
        plugins: {
          datalabels: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            align: 'start',
            anchor: 'start',
            offset: 10,
            borderRadius: 4,
            borderWidth: 1,
          },
        },
        legend: {
          display: false,
        },
        tooltips: {
          enabled: true,
        },
      },
    });
  }
}
