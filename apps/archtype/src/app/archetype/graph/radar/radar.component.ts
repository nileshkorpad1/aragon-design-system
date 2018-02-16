import { Component, OnInit } from '@angular/core';
import { Chart } from '@wtf2/theme/wtf2-components/wtf2-chartjs/chart.js';

@Component({
  selector: 'app-radar',
  templateUrl: './radar.component.html',
  styleUrls: ['./radar.component.scss'],
})
export class RadarComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
  ngAfterViewInit(): void {
    const ChartElement = document.getElementById('radarcanvas');
    new Chart(ChartElement, {
      type: 'radar', // 'radar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        duration: 0.0001,
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              gridLines: {
                display: true,
              },
              ticks: {
                beginAtZero: true,
                display: true,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: true,
              },
              ticks: {
                beginAtZero: true,
                display: true,
              },
            },
          ],
        },
        legend: {
          display: true,
        },
      },
    });

    var ctx2 = document.getElementById('gaugecanvas');
    new Chart(ctx2, {
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
