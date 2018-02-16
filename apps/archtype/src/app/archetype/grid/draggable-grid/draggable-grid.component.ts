import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-draggable-grid',
  templateUrl: './draggable-grid.component.html',
  styleUrls: ['./draggable-grid.component.scss'],
})
export class DraggableGridComponent implements OnInit {
  constructor() { }
  displayedColumns: string[];
  columnConfig: any;
  tabledata: any;

  ngOnInit() {
    this.displayedColumns = [
      'position',
      'product',
      'description',
      'quantity',
      'date',
      'discount',
      'tax',
      'taxamount',
      'amount',
      'action',
    ];
    this.tabledata = [
      {
        position: 1,
        amount: 12,
        description: 'aut',
        date: '3/15/2017',
        product: 'Aluminium',
        quantity: 50,
        discount: 2,
        tax: '1',
        taxamount: 1,
      },
      {
        position: 2,
        amount: 10,
        description: ' autem',
        date: '3/15/2018',
        product: 'Steel Bar',
        quantity: 50,
        discount: 2,
        tax: '1',
        taxamount: 1,
      },
      {
        position: 3,
        amount: 15.5,
        description: ' aut ',
        date: '3/15/2018',
        product: 'Aluminium',
        quantity: 50,
        discount: 2,
        tax: '1',
        taxamount: 1,
      },
      {
        position: 4,
        amount: 0,
        description: '',
        date: null,
        product: '',
        quantity: 0,
        discount: 0,
        tax: '',
        taxamount: 0,
      },
    ];

    this.columnConfig = [
      {
        name: 'position',
        type: 'icon',
        validations: [
          {
            validator: Validators.required,
          },
        ],
      },
      {
        name: 'product',
        type: 'select',
        data: ['Aluminium', 'Matel Bar', 'steel Bar', 'steel Bar'],
        validations: [
          {
            validator: Validators.required,
          },
        ],
      },
      {
        name: 'description',
        type: 'textarea',
        validations: [
          {
            validator: Validators.required,
          },
        ],
      },
      {
        name: 'quantity',
        type: 'input-number',
        validations: [
          {
            validator: Validators.required,
          },
        ],
      },
      {
        name: 'date',
        type: 'date',
        validations: [
          {
            validator: Validators.required,
          },
        ],
      },
      {
        name: 'discount',
        type: 'input',
        validations: [
          {
            validator: Validators.required,
          },
        ],
      },
      {
        name: 'tax',
        type: 'input',
        validations: [
          {
            validator: Validators.required,
          },
        ],
      },
      {
        name: 'taxamount',
        type: 'input',
        validations: [
          {
            validator: Validators.required,
          },
        ],
      },
      {
        name: 'amount',
        type: 'currency',
        code: 'INR',
        validations: [
          {
            validator: Validators.required,
          },
        ],
      },
      {
        name: 'action',
        type: 'input',
        validations: [
          {
            validator: Validators.required,
          },
        ],
      },
    ];
  }
}
