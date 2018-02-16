import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';


import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Wtf2Table } from '@wtf2/theme/wtf2-material';
import { DatePipe } from '@angular/common';
import { FieldConfig } from '@wtf2/theme/wtf2-components/field.interface';
import { DynamicFormComponent } from '@wtf2/theme/wtf2-components/wtf2-dynamic-forms/dynamic-form.component';
import { ToastrService } from '@wtf2/theme/wtf2-components/wtf2-toastr/toastr/toastr.service';
import { DataServiceService } from './data-service.service';
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(
        control: FormControl | null,
        form: FormGroupDirective | NgForm | null,
    ): boolean {
        const isSubmitted = form && form.submitted;
        return !!(
            control &&
            control.invalid &&
            (control.dirty || control.touched || isSubmitted)
        );
    }
}
export interface PeriodicElement {

    position: number;
    amount: number;
    description: string;
    product: string;
    unitprice: number;
    quantity: number;
    discount: number;
    tax: string;
    taxamount: number;
}

export interface HistoryElement {
    date: string;
    action: string;
    user: string;
    note: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { position: 1, amount: 12, description: 'delectus aut', unitprice: 5, product: 'Matel Bar', quantity: 50, discount: 2, tax: '1', taxamount: 1 },
    { position: 2, amount: 10, description: ' autem', unitprice: 6, product: 'Steel Bar', quantity: 50, discount: 2, tax: '1', taxamount: 1 },
    { position: 3, amount: 15.5, description: ' aut ', unitprice: 5, product: 'Aluminium', quantity: 50, discount: 2, tax: '1', taxamount: 1 },
    { position: 4, amount: 0, description: '', unitprice: 0, product: '', quantity: 0, discount: 0, tax: '', taxamount: 0 },
];

const HISTORY_DATA: HistoryElement[] = [
    { date: '12-04-2018', action: 'delectus aut', user: 'Robert', note: 'Lorem Ipsum is simply dummy text of the printing' },
    { date: '10-04-2018', action: ' autem', user: 'Desila', note: 'Lorem Ipsum is simply dummy text of the printing' },
    { date: '10-04-2018', action: ' aut ', user: 'wisome', note: 'Lorem Ipsum is simply dummy text of the printing' },
];

@Component({
  selector: 'app-wysiwyg-layout',
  templateUrl: './wysiwyg-layout.component.html',
  styleUrls: ['./wysiwyg-layout.component.scss'],
  providers: [DatePipe]
})
export class WYSIWYGLayoutComponent implements OnInit {
  editableText = 'Platenium Cobalt Inc.';
  editabledate: Date;
  editableInvoicedate1: Date;
  editableDuedate1: Date;
  editablePassword = 'myPassword';
  editableTextArea: any;
  editableSelect = 2;
  editableSelectOptions1 = [];
  formConfig: FieldConfig[] = [];

  textareaControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z 0-9 ,]+$')
  ]);

  MyDataSource: any;
  editableSelectOptions = [
    {
      text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, corrupti laborum distinctio ab quisquam veritatis.`,
      id: 1,
      json: ` {
            "aliasName": "Billing Address 1",
            "country": "INDIA",
            "website": "",
            "address": "MAHAKALI WARD NEAR MAHAKALI TEMPLE",
            "city": "CHANDRAPUR",
            "mobileNumber": "",
            "postalCode": "442403",
            "contactPersonDesignation": "",
            "county": "",
            "contactPerson": "",
            "emailID": "",
            "isDefaultAddress": true,
            "isBillingAddress": true,
            "shippingRoute": "",
            "phone": "",
            "recipientName": "",
            "stateCode": "",
            "id": "402880e8690eac8701690ebf12690001",
            "state": "MAHARASHTRA",
            "fax": "",
            "contactPersonNumber": ""
          }`
    },
    {
      text: `This seemingly straightforward attribute contains a\nsurprising amount of issues that prevent it from`,
      id: 2,
      json: ` {
            "aliasName": "Billing Address 1",
            "country": "INDIA",
            "website": "",
            "address": "MAHAKALI WARD NEAR MAHAKALI TEMPLE",
            "city": "CHANDRAPUR",
            "mobileNumber": "",
            "postalCode": "442403",
            "contactPersonDesignation": "",
            "county": "",
            "contactPerson": "",
            "emailID": "",
            "isDefaultAddress": true,
            "isBillingAddress": true,
            "shippingRoute": "",
            "phone": "",
            "recipientName": "",
            "stateCode": "",
            "id": "402880e8690eac8701690ebf12690001",
            "state": "MAHARASHTRA",
            "fax": "",
            "contactPersonNumber": ""
          }`
    },
    {
      text: `Call it remediation, inclusive design, universal access`,
      id: 3,
      json: ` {
            "aliasName": "Billing Address 1",
            "country": "INDIA",
            "website": "",
            "address": "MAHAKALI WARD NEAR MAHAKALI TEMPLE",
            "city": "CHANDRAPUR",
            "mobileNumber": "",
            "postalCode": "442403",
            "contactPersonDesignation": "",
            "county": "",
            "contactPerson": "",
            "emailID": "",
            "isDefaultAddress": true,
            "isBillingAddress": true,
            "shippingRoute": "",
            "phone": "",
            "recipientName": "",
            "stateCode": "",
            "id": "402880e8690eac8701690ebf12690001",
            "state": "MAHARASHTRA",
            "fax": "",
            "contactPersonNumber": ""
          }`
    },
    {
      text: `Inputs are the gates through which nearly all`,
      id: 4,
      json: ` {
            "aliasName": "Billing Address 1",
            "country": "INDIA",
            "website": "",
            "address": "MAHAKALI WARD NEAR MAHAKALI TEMPLE",
            "city": "CHANDRAPUR",
            "mobileNumber": "",
            "postalCode": "442403",
            "contactPersonDesignation": "",
            "county": "",
            "contactPerson": "",
            "emailID": "",
            "isDefaultAddress": true,
            "isBillingAddress": true,
            "shippingRoute": "",
            "phone": "",
            "recipientName": "",
            "stateCode": "",
            "id": "402880e8690eac8701690ebf12690001",
            "state": "MAHARASHTRA",
            "fax": "",
            "contactPersonNumber": ""
          }`
    }
  ];

  constructor(
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    public dataService: DataServiceService
  ) {
    this.editabledate = new Date();
    this.editableDuedate1 = new Date();
    this.editableInvoicedate1 = new Date();

    this.editableTextArea = {
      text: `Titanium unobtanoum, Candada 123456`,
      id: 0,
      json: `{
        "aliasName": "Billing Address 1",
        "country": "INDIA",
        "website": "",
        "address": "MAHAKALI WARD NEAR MAHAKALI TEMPLE",
        "city": "CHANDRAPUR",
  }`
    };
  }

  // updateData() {
  //     console.log('data updated');
  //     // this.editableSelectOptions1 = this.editableSelectOptions;

  // this.editableSelectOptions = this.editableSelectOptions.concat([{
  //     text: `new data`,
  //     id: 1,
  //     json: ` {
  //     "aliasName": "Billing Address 1",
  //     "country": "INDIA",
  //     "website": "",
  //     "address": "MAHAKALI WARD NEAR MAHAKALI TEMPLE",
  //     "city": "CHANDRAPUR",
  //     "mobileNumber": "",
  //     "postalCode": "442403",
  //     "contactPersonDesignation": "",
  //     "county": "",
  //     "contactPerson": "",
  //     "emailID": "",
  //     "isDefaultAddress": true,
  //     "isBillingAddress": true,
  //     "shippingRoute": "",
  //     "phone": "",
  //     "recipientName": "",
  //     "stateCode": "",
  //     "id": "402880e8690eac8701690ebf12690001",
  //     "state": "MAHARASHTRA",
  //     "fax": "",
  //     "contactPersonNumber": ""
  //   }`,
  // }]);
  //     console.log(this.editableSelectOptions);

  // }

  selectedDate = new Date();
  defaultDate = new FormControl(new Date());
  isEdit = false;
  isEdited = false;
  // selectedDate: any = this.date;
  events: string[] = [];
  currencies: string[] = ['Doller', 'SGD', 'Rupee'];

  selectedText = 'Platenium Cobalt Inc.';

  customerFormControl = new FormControl('', [Validators.required]);
  doccumentNumberFormControl = new FormControl('', [Validators.required]);
  memoControl = new FormControl('', [Validators.required]);
  currencyFormControl = new FormControl('', [Validators.required]);
  exchangerateFormControl = new FormControl('', [Validators.required]);
  basesalesinvoiceFormControl = new FormControl('', [Validators.required]);
  invoicedatecustomerFormControl = new FormControl('', [Validators.required]);
  customerporefnoFormControl = new FormControl('', [Validators.required]);
  genindateFormControl = new FormControl('', [Validators.required]);
  reccFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();

  SubTotal = 0;
  AmountBeforTax = 4.0;
  TaxAmount: number = -10;
  TotalInBaseCurrency;
  number = 0;
  TotalAmoumt = 0;
  OutstandingBalance = 0;

  showtool = true;
  @ViewChild('table', { static: false }) table: Wtf2Table<PeriodicElement>;
  @ViewChild('historytable', { static: false }) historytable: Wtf2Table<
    HistoryElement
  >;
  @ViewChild(DynamicFormComponent, { static: false })
  form: DynamicFormComponent;

  displayedColumns: string[] = [
    'position',
    'product',
    'description',
    'quantity',
    'unitprice',
    'discount',
    'tax',
    'taxamount',
    'amount',
    'action'
  ];
  displayhistorycols: string[] = ['date', 'action', 'user', 'note'];

  dataSource = ELEMENT_DATA;
  dataSourceHistory = HISTORY_DATA;
  tableForm: FormGroup;
  get salesInvoiceGroup() {
    return this.salesInvoiceFormGroup.controls;
  }
  salesInvoiceFormGroup: FormGroup;
  position = 5;
  ngOnInit() {
    this.salesInvoiceFormGroup = this.formBuilder.group({
      customerFormControl: new FormControl('', [Validators.required]),
      doccumentNumberFormControl: new FormControl('', [Validators.required]),
      memoControl: new FormControl('', [Validators.required]),
      currencyFormControl: new FormControl('', [Validators.required]),
      exchangerateFormControl: new FormControl('', [Validators.required]),
      basesalesinvoiceFormControl: new FormControl('', [Validators.required]),
      invoicedatecustomerFormControl: new FormControl('', [
        Validators.required
      ]),
      customerporefnoFormControl: new FormControl('', [Validators.required]),
      // genindateFormControl : new FormControl('', [Validators.required]),
      reccFormControl: new FormControl('', [Validators.required])
    });

    this.formConfig = [
      {
        type: 'input',
        label: 'Username',
        inputType: 'text',
        name: 'name',
        validations: [
          {
            name: 'required',
            validator: Validators.required,
            message: 'Name Required'
          }
        ]
      },
      {
        type: 'input',
        label: 'Address1',
        inputType: 'text',
        name: 'address1',
        validations: [
          {
            name: 'required',
            validator: Validators.required,
            message: 'address1 Required'
          }
        ]
      },
      {
        type: 'input',
        label: 'Address2',
        inputType: 'text',
        name: 'address2',
        validations: [
          {
            name: 'required',
            validator: Validators.required,
            message: 'address2 Required'
          }
        ]
      },
      {
        type: 'input',
        label: 'Email Address',
        inputType: 'email',
        name: 'email',
        validations: [
          {
            name: 'required',
            validator: Validators.required,
            message: 'email Required'
          }
        ]
      }
    ];

    this.tableForm = this.formBuilder.group({
      users: this.formBuilder.array([])
    });
    this.setUsersForm();
    this.tableForm.get('users').valueChanges.subscribe(users => {
      if (this.dataSource[this.dataSource.length - 1].product !== '') {
        //  this.addEmptyRecord();
      }
      console.log('users', users);
    });
  }

  RenderDataSelect() {
    this.dataService.GetAllTodos().subscribe(
      res => {
        res.forEach(element => {
          this.editableSelectOptions = this.editableSelectOptions.concat([
            {
              text: element.title,
              id: element.id,
              json: JSON.stringify(element)
            }
          ]);
        });
        // res.forEach(element => {
        //     this.editableSelectOptions.push({
        //         text: element.title,
        //         id: element.id,
        //         json: JSON.stringify(element),
        //     });

        // });
        // this.editableSelectOptions = this.editableSelectOptions.slice();
      },
      error => {
        console.log('There was an error while retrieving Todos !!!' + error);
      }
    );
  }

  addEmptyRecord() {
    let userRec = {
      position: this.position++,
      amount: 0,
      description: '',
      unitprice: 0,
      product: ' ',
      quantity: 0,
      discount: 0,
      tax: ' ',
      taxamount: 0
    };
    this.dataSource.push(userRec);
    const userCtrl = this.tableForm.get('users') as any;
    userCtrl.push(this.setUsersFormArray(userRec));
    this.table.renderRows();
    userCtrl.at(userRec.position - 1).controls.product.clearValidators();
    userCtrl.at(userRec.position - 1).controls.product.updateValueAndValidity();
  }
  setUsersForm() {
    const userCtrl = this.tableForm.get('users') as any;
    this.dataSource.forEach(user => {
      userCtrl.push(this.setUsersFormArray(user));
    });
    userCtrl.at(this.dataSource.length - 1).controls.product.clearValidators();
    userCtrl
      .at(this.dataSource.length - 1)
      .controls.product.updateValueAndValidity();
  }
  setUsersFormArray(user) {
    return this.formBuilder.group({
      product: [user.product, Validators.required],
      position: [user.position, Validators.required]
    });
  }
  addEmptyRowInFormArray(user) {
    return this.formBuilder.group({
      position: [user.position],
      product: [user.product, null]
    });
  }
  saveEditable(value) {
    // call to http service
    console.log('After save clicked: ' + value);
  }
  getLastRow($event, row) {
    // call to http service
    if (
      this.dataSource[this.dataSource.length - 1].position == row.position &&
      $event.target.value != ''
    ) {
      this.addEmptyRecord();
      const userCtrl = this.tableForm.get('users') as any;
      userCtrl
        .at(row.position - 1)
        .controls.product.setValidators([Validators.required]);
      userCtrl.at(row.position - 1).controls.product.updateValueAndValidity();
    }
    console.log('getLastRow ' + row.position);
  }
  saveEditableTextarea(value) {
    this.editableTextArea = value;
    console.log('After save clicked text: ' + value.text);
    console.log('After save clicked id: ' + value.id);
    console.log('After save clicked json: ' + value.json);
  }
  ngAfterContentChecked() {
    this.getTotalCost();
  }

  dropTable(event: CdkDragDrop<PeriodicElement[]>) {
    const prevIndex = this.dataSource.findIndex(d => d === event.item.data);

    if (!(prevIndex == this.dataSource.length - 1)) {
      moveItemInArray(this.dataSource, prevIndex, event.currentIndex);
      this.table.renderRows();
    }
  }

  refreshTable() {
    // this.dataSource;
    // this.dataSource.sort
    // this.totalRows = this.dataSource.length;
  }
  deleteItem(id) {
    const foundIndex = this.dataSource.findIndex(x => x.position === id);
    if (!(foundIndex == this.dataSource.length - 1)) {
      this.dataSource.splice(foundIndex, 1);
      this.table.renderRows();
    }
    // this.dataSource = new Wtf2TableDataSource<PeriodicElement[]>;
    // this.refreshTable();
  }
  getTotalCost() {
    this.SubTotal = this.dataSource
      .map(t => t.amount)
      .reduce((acc, value) => acc + value, 0);
    this.TotalInBaseCurrency = this.SubTotal;
    this.TotalAmoumt = this.SubTotal;
    this.OutstandingBalance = this.SubTotal;
  }
  sendEmail() {}
  isTool() {
    this.showtool = !this.showtool;
  }

  openTest() {
    if (!this.salesInvoiceFormGroup.invalid) {
      this.toastr.success('', 'Saved successfully');
    } else {
      this.toastr.warning('', 'Please enter required fields');
    }
  }

  openCancelToaster() {
    this.toastr.warning('', 'Operation cancelled.');
  }

  saveEditableDialog($event) {
    console.log('saved address from dialog ' + $event);
  }
  saveEditableDate($event) {
    console.log('date saved ' + this.datePipe.transform($event));
    // new Date());
  }
}
