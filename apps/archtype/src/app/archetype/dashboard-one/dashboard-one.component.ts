import { Component, OnInit } from '@angular/core';
import { Chart } from '@wtf2/theme/wtf2-components/wtf2-chartjs/chart.js';

@Component({
  selector: 'app-dashboard-one',
  templateUrl: './dashboard-one.component.html',
  styleUrls: ['./dashboard-one.component.scss']
})
export class DashboardOneComponent implements OnInit {
  constructor() { }
  index = 1;
  combinationLineData: any; // Store Data for combination Line Chart
  combinationLineBarData: any; // Store Data for Combination Line Bar Chart
  LineData: any; // Store Data for Line Chart
  chartType = ['pie', 'doughnut', 'polarArea', 'radar', 'line', 'line', 'bar']; // No. Chart Listed
  ngOnInit() {
    // Store Data for combination Line Chart
    this.combinationLineData = [
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
      {
        label: '# of Votes',
        data: [4, 5, 13, 5, 12, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(154, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(175, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(154, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(175, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ];
    // Store Data for combination Line Bar Chart
    this.combinationLineBarData = [
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
      {
        type: 'line',
        label: '# of Votes',
        data: [4, 5, 13, 5, 12, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(154, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(175, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(154, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(175, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
      {
        type: 'line',
        label: '# of Votes',
        data: [4, 5, 13, 5, 12, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(154, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(175, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(154, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(175, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ];
    // Store Data for Line Chart
    this.LineData = [
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
    ];
  }
  ngAfterViewInit(): void {
    // Render Chart After Init
    for (this.index = 0; this.index <= this.chartType.length; this.index++) {
      if (this.index <= 2) {
        this.viewChart(this.chartType[this.index], this.index); // CREATE PIE ,DONUT, POLAR CHART
      } else {
        this.viewLineRadar(this.chartType[this.index], this.index); // CREATE LINE , RADAR CHART
      }
    }
    this.viewBarChart();
    this.viewStackedBar();
    this.viewGaugeChart();
  }

  // **************CREATE PIE ,DONUT, POLAR CHART*************** */
  viewChart(ChartType, i) {
    const ChartElement = document.getElementById('piewidget-' + i); // Get Canvas By ID to render Chart
    if (ChartElement != null) {
      new Chart(ChartElement, {
        type: ChartType,
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green'], //
          duration: 0.0001,
          datasets: [
            {
              label: '# of Votes',
              data: [20, 35, 40, 5],
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
          legend: {
            display: true,
            position: 'bottom',
          },
        },
      });
    }
  }
  viewBarChart() {
    const ChartElement = document.getElementById('piewidget-bar'); // Get Canvas By ID to render Chart
    if (ChartElement != null) {
      new Chart(ChartElement, {
        type: 'bar',
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
    }
  }

  // **************** */ CREATE Stacked BAR CHART***********

  viewStackedBar() {
    const ChartElement = document.getElementById('piewidget-stacked'); // Get Canvas By ID to render Chart
    if (ChartElement != null) {
      new Chart(ChartElement, {
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

  // *************CREATE LINE AND RADAR CHART******************* */
  viewLineRadar(ChartType, i) {
    const ChartElement = document.getElementById('piewidget-' + i); // Get Canvas By ID to render Chart
    const dataDisplay =( i == 6 ) ? this.combinationLineBarData : (i != 5)? this.LineData : this.combinationLineData;
    if (ChartElement != null) {
      new Chart(ChartElement, {
        type: ChartType,
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          duration: 0.0001,
          datasets: dataDisplay,
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
    }
  }

  // *******************CARETE GAUGE CHART****************** */
  viewGaugeChart() {
    const ChartElement = document.getElementById('piewidget-gauge'); // Get Canvas By ID to render Chart
    if (ChartElement != null) {
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

}
