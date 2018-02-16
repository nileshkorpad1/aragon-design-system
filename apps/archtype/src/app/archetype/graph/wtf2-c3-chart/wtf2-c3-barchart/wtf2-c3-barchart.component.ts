import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wtf2-c3-barchart',
  templateUrl: './wtf2-c3-barchart.component.html',
  styleUrls: ['./wtf2-c3-barchart.component.scss']
})
export class Wtf2C3BarchartComponent implements OnInit {

  PnlData: any = [];
  constructor() { }
  ngOnInit() {
    this.pnlFectchData((data) => {
      this.PnlData = data;
    });
  }
  pnlFectchData(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', 'assets/data/barposneg.json');
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }




  payableFectchData(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', 'assets/data/bar.json');
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }
  cashFectchData(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', 'assets/data/groupbar.json');
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }
  stockFectchData(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', 'assets/data/stock.json');
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }
    topCustomerFetchData(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', 'assets/data/topcustomer.json');
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }

  topProductFetchData(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', 'assets/data/topproducts.json');
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }

  incomeChartFetchData(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', 'assets/data/income.json');
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }

}
