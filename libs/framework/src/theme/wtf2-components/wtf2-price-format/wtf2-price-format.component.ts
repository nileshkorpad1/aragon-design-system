// import { Pipe, PipeTransform } from "@angular/core";
import { Component, OnInit, ContentChild, Input, Pipe, PipeTransform, OnChanges } from '@angular/core';
import { CustomCurrencyPipe } from './custom-currency.pipe';
import {
  CurrencyPipe, getCurrencySymbol,
} from '@angular/common';

@Component({
  selector: 'wtf2-price-format,[wtf2-price-format]',
  templateUrl: './wtf2-price-format.component.html',
  styleUrls: ['./wtf2-price-format.component.scss'],
  providers: [CurrencyPipe],
})
export class Wtf2PriceFormatComponent implements OnInit, OnChanges {

  @Input()
  currencyAmount: number;

  @Input()
  currencySymbol: string;

  @Input()
  currencyCode: string;

  currencyMain: string;
  currencyDigit: string;
  formattedAmount: string;

  constructor(private currencyPipe: CurrencyPipe) {
  }

  ngOnInit() {
    let filterCustomCurrencyPipe = new CustomCurrencyPipe();
    var fiteredCustomCurrency = filterCustomCurrencyPipe.transform(this.currencyAmount);
    let x = fiteredCustomCurrency.split(".");

    // this.formattedAmount = this.currencyPipe.transform(this.currencyAmount);
    if (this.currencyCode) {
      this.currencySymbol = getCurrencySymbol(this.currencyCode, 'narrow')
    }

    this.currencyMain = x[0];
    this.currencyDigit = x[1];
  }

  transformAmount(element) {

    element.target.value = this.formattedAmount;
  }

  ngOnChanges() {
    let filterCustomCurrencyPipe = new CustomCurrencyPipe();
    var fiteredCustomCurrency = filterCustomCurrencyPipe.transform(this.currencyAmount);
    let x = fiteredCustomCurrency.split(".");

    // this.formattedAmount = this.currencyPipe.transform(this.currencyAmount);
    if (this.currencyCode) {
      this.currencySymbol = getCurrencySymbol(this.currencyCode, 'narrow')
    }

    this.currencyMain = x[0];
    this.currencyDigit = x[1];
  }

}

