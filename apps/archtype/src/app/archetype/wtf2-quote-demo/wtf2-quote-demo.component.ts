import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wtf2-quote-demo',
  templateUrl: './wtf2-quote-demo.component.html',
  styleUrls: ['./wtf2-quote-demo.component.scss']
})
export class Wtf2QuoteDemoComponent implements OnInit {
  cards = [
    {
      title: 'Address 1',
      description: ' Lorem ipsum dolor sit amet.',
      selected: true,
    },
    {
      title: 'Address 2',
      description: ' Lorem ipsum dolor sit amet.',
    }
    ,
    {
      title: 'Address 3',
      description: ' Lorem ipsum dolor sit amet.',
    }
    ,
    {
      title: 'Address 3',
      description: ' Lorem ipsum dolor sit amet.',
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
