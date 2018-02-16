import { Component, OnInit } from '@angular/core';
import { Chart } from '@wtf2/theme/wtf2-components/wtf2-chartjs/chart.js';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styleUrls: ['./donut.component.scss'],
})
export class DonutComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  ngAfterViewInit(): void {
    const ChartStatus = document.getElementById('donutcanvas');
     new Chart(ChartStatus, {
      type: 'doughnut',
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
                display: false,
              },
              ticks: {
                beginAtZero: true,
                display: false,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
              ticks: {
                beginAtZero: true,
                display: false,
              },
            },
          ],
        },
        legend: {
          display: true,
        },
      },
    });
  }
}
