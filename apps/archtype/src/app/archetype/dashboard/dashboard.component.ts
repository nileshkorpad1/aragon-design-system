import { Component, ViewEncapsulation } from '@angular/core';
import { Chart } from '@wtf2/theme/wtf2-components/wtf2-chartjs/chart.js';



export interface GridTile {
    id: string;
    cols: number;
    rows: number;
    text: string;
    type: string;
  }
export interface userInfo {
    title: string;
    userCount: number;
    lastSync: string;
    // color: string;
}
export interface chartCount {
    title: string;
    count: string;
    perc:number;
    id: string;
}
export interface imageList {
    title: string;
    url: string;
}

// export interface Subscriptions {
//     subscription: string;
//     subscriptionDate: string;
//     subscriptionStartDate: string;
//     subscriptionEndDate: string;
//     subscriptionDaysRemaining: string;
// }

// const SUBSCRIPTION_ELEMENT_DATA: Subscriptions[] = [
//     {
//         subscription: 'trial',
//         subscriptionDate: 'August 31 2018 [11:57 pm]',
//         subscriptionStartDate: 'August 31 2018 [11:58 pm]',
//         subscriptionEndDate: 'September 15 2018 [11:58 pm]',
//         subscriptionDaysRemaining: '41',
//     },
// ];

// export interface Orders {
//     orderId: string;
//     date: string;
//     amount: string;
//     paymentMode: string;
//     status: string;
// }

// const ORDER_ELEMENT_DATA: Orders[] = [
//     {
//         orderId: '#1335674895',
//         date: 'August 31 2018 [11:57 pm]',
//         amount: '0',
//         paymentMode: 'FREE',
//         status: 'authorized',
//     },
// ];
@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    // encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent {
    // subscriptionRows = [];
    // orderRows = [];
    // loadingIndicator = true;
    // reorderable = true;
    // subscriptionColumns = [
    //     { name: 'Subscription', summaryFunc: () => null },
    //     { name: 'Subscription Date', summaryFunc: () => null},
    //     { name: 'Subscription Start Date', summaryFunc: () => null },
    //     { name: 'Subscription End Date', summaryFunc: () => null },
    //     { name: 'Subscription Days Remaining', summaryFunc: () => null },
    // ];
    // orderColumns = [
    //     { name: 'Order Id', summaryFunc: () => null },
    //     { name: 'Date', summaryFunc: () => null},
    //     { name: 'Amount', summaryFunc: () => null },
    //     { name: 'Payment Mode', summaryFunc: () => null },
    //     { name: 'Status', summaryFunc: () => null },
    // ];

    // constructor() {
    //     this.fetchSubscription((subscriptionData) => {
    //         this.subscriptionRows = subscriptionData;
    //         setTimeout(() => { this.loadingIndicator = false; }, 1500);
    //     });
    //     this.fetchOrder((orderData) => {
    //         this.orderRows = orderData;
    //         setTimeout(() => { this.loadingIndicator = false; }, 1500);
    //     });
    // }

    // fetchSubscription(cb) {
    //     const req = new XMLHttpRequest();
    //     req.open('GET', `assets/data/subscription.json`);

    //     req.onload = () => {
    //         cb(JSON.parse(req.response));
    //     };
    //     req.send();
    // }
    // fetchOrder(cb) {
    //     const req = new XMLHttpRequest();
    //     req.open('GET', `assets/data/order.json`);

    //     req.onload = () => {
    //         cb(JSON.parse(req.response));
    //     };
    //     req.send();
    // }

    tiles: GridTile[] = [
        {text: 'ACCOUNTING', cols: 1, rows: 1, id:"accounting",type:"bar"},
        {text: 'CRM', cols: 1, rows: 1,id:"crm",type:"line"},
        {text: 'HRMS', cols: 1, rows: 1, id:"hrms",type:"pie"},
        {text: 'PM', cols: 1, rows: 1, id:"pm",type:"radar"},
        {text: 'eLEAVE', cols: 1, rows: 1, id:"lms",type:"doughnut"},
        {text: 'E-claims', cols: 1, rows: 1, id:"eleave",type:"bar"}
      ];
    userInfo: userInfo[] = [

        {title: "TOTAL USERS",userCount: 3565,lastSync:"Sync 2 in ago"},
        {title: "ASSIGNED USERS",userCount: 120,lastSync:"Sync 2 in ago"},
        {title: "IMPORT USERS",userCount: 1000,lastSync:"Sync 2 in ago"}
    ];
    chartCount: chartCount[] = [

        {title: "Users",count: "3565",perc:-9.48,id:"user"},
        {title: "Sessions",count: "125",perc:1.48,id:"Session"},
        {title: "Bounce Rate",count: "52%",perc:-3.48,id:"bounce"},
        {title: "Session Duration",count: "5m 08s",perc:19.48,id:"sessiondur"}
    ];
    imageList: imageList[] = [
        {title: "Erp",url:"assets/images/erp-icon.png"},
        {title: "Crm",url:"assets/images/crm-icon.png"},
        {title: "Pm",url:"assets/images/pm-icon.png"},
        {title: "Hrms",url:"assets/images/hrms-icon.png"},
        {title: "E-leave",url:"assets/images/e-leave-icon.png"},
        {title: "E-claims",url:"assets/images/e-claims-icon.png"},

    ];

    years: string[]=['2017','2018'];




    ngOnInit() {
        // console.log("********************ngOnInit**************************")
        // const ctx = document.getElementById('myChart');
        // console.log("********************ngOnInit"+ctx)
    }
    ngAfterViewInit(): void {
        this.tiles.forEach(tile => {
            const ctx = document.getElementById('dashWidget_' + tile.id);
            const type =tile.type;
            const myChart = new Chart(ctx, {
                type: type,
                data: {
                    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    duration: 0.0001,
                    datasets: [{
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
                    }],
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                            },
                        }],
                    },
                },
            });
        });
        this.statusChart(0)

        const ctxStatus = document.getElementById('activeuser');
        const myChart = new Chart(ctxStatus, {
            type: "bar",
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                duration: 0.0001,
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        '#000',
                        '#000',
                        '#000',
                        '#000',
                        '#000',
                        '#000',
                        '#000',
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
                }],
            },
            options: {
                scales: {
                    yAxes: [{
                        gridLines: {
                            display: false,
                          },
                        ticks: {
                            beginAtZero: true,
                            display: false
                        }
                    },
                ],
                xAxes: [{
                    gridLines: {
                      display: false,
                    },
                    ticks: {
                        beginAtZero: true,
                        display: false
                    }
                  }],
                },
                legend: {
                    display: false
                 },
            },
        });

    }

    statusChart(index){
        const ctxStatus = document.getElementById(this.chartCount[index].id);
        const myChart = new Chart(ctxStatus, {
            type: "line",
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                duration: 0.0001,
                datasets: [{
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
                }],
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                        },
                    }],
                },
                legend: {
                    display: false
                 },
            },
        });
    }
}
