import { Component, OnInit } from '@angular/core';
import { Chart } from '@wtf2/theme/wtf2-components/wtf2-chartjs/chart.js';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss'],
})
export class StepComponent implements OnInit {
  constructor() { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    const ChartType = document.getElementById('stepcanvas');
     new Chart(ChartType, {
      type: 'line', // 'radar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        duration: 0.0001,
        datasets: [
          {
            steppedLine: true,
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
                max: 20,
                min: 0,
                stepSize: 2,
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
  }
}
