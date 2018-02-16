import { Component, OnInit } from '@angular/core';
import { Chart } from '@wtf2/theme/wtf2-components/wtf2-chartjs/chart.js';

@Component({
  selector: 'app-stackedbar',
  templateUrl: './stackedbar.component.html',
  styleUrls: ['./stackedbar.component.scss'],
})
export class StackedbarComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
  ngAfterViewInit(): void {
    const ChartType = document.getElementById('stackedbarcanvas');
     new Chart(ChartType, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue'],
        duration: 0.0001,
        datasets: [

          // label: '# of Votes',
          {
            label: 'Low',
            data: [67.8, 30],
            backgroundColor: '#D6E9C6',
          },
          {
            label: 'Moderate',
            data: [20.7, 40],
            backgroundColor: '#FAEBCC',
          },
          {
            label: 'High',
            data: [11.4, 10],
            backgroundColor: '#EBCCD1',
          },
          // backgroundColor: [
          //   'rgba(255, 99, 132, 0.2)',
          //   'rgba(54, 162, 235, 0.2)',
          //   'rgba(255, 206, 86, 0.2)',
          //   'rgba(75, 192, 192, 0.2)',
          //   'rgba(153, 102, 255, 0.2)',
          //   'rgba(255, 159, 64, 0.2)',
          // ],
          // borderColor: [
          //   'rgba(255,99,132,1)',
          //   'rgba(54, 162, 235, 1)',
          //   'rgba(255, 206, 86, 1)',
          //   'rgba(75, 192, 192, 1)',
          //   'rgba(153, 102, 255, 1)',
          //   'rgba(255, 159, 64, 1)',
          // ],
          // borderWidth: 1,
          // },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              stacked: true,
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
              stacked: true,
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
