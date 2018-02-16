import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-demo',
  templateUrl: './card-demo.component.html',
  styleUrls: ['./card-demo.component.scss']
})
export class CardDemoComponent implements OnInit {
  cards = [
    {
      title: 'Address 1',
      description: ' Lorem ipsum dolor sit amet.',
      selected : true,
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
