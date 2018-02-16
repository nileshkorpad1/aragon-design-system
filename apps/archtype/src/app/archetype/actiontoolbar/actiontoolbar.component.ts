import { Component, OnInit, ViewChild,Output,EventEmitter } from '@angular/core';
import { ButtonConfig, col, ShipData } from '@wtf2/theme/wtf2-components/field.interface';
// import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { DataServiceService } from './data-service.service';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import { Observable } from 'rxjs/Observable';
import { Wtf2Paginator, Wtf2Sort, Wtf2TableDataSource } from '@wtf2/theme/wtf2-material';

export const buttonData1: ButtonConfig[] = [

  {
    label: 'ADD',
    icon: 'add',
    selected: false,
    type: 'expand',
    card: [
      {
        avatar: 'add',
        title: 'Add Account',
        description: 'Lorem description',
        action: 'addAccount',
      },
      {
        avatar: 'add',
        title: 'Add Group',
        description: 'Lorem description',
        action: 'addGroup',
      },
      // {
      //   avatar: 'add',
      //   title: 'Add Group',
      //   description: 'Lorem description',
      //   action: 'addGroup',
      // },
      // {
      //   avatar: 'add',
      //   title: 'Add Group',
      //   description: 'Lorem description',
      //   action: 'addGroup',
      // },
    ],
  },
  {
    label: 'Sample 2',
    icon: 'open_in_browser',
    selected: false,
    type: 'expand',
    card: [
      {
        avatar: 'backup',
        title: 'Add Users',
        description: 'No description',
        action: 'addUser',
      },
      {
        avatar: 'book',
        title: 'Import Users',
        description: 'Import description',
        action: 'importUser',
      },
    ],
  },
  // {
  //   label: 'IMPORT2',
  //   icon: 'open_in_browser',
  //   selected: false,
  //   type: 'expand',
  //   card: [
  //     {
  //       avatar: 'backup',
  //       title: 'Add Users',
  //       description: 'No description',
  //       action: 'addUser',
  //     },
  //     {
  //       avatar: 'book',
  //       title: 'Import Users',
  //       description: 'Import description',
  //       action: 'importUser',
  //     },
  //   ],
  // },
  {
    label: 'Split Button',
    icon: 'play_arrow',
    selected: false,
    type: 'split-button',
    action: 'splitClick',
    card: [
      {
        avatar: 'backup',
        title: 'Add Users',
        description: 'No description',
        action: 'addUser',
      },
      {
        avatar: 'book',
        title: 'Import Users',
        description: 'Import description',
        action: 'importUser',
      },
    ],
  },
  {
    search: true,
  },
];
@Component({
  selector: 'app-actionbar',
  templateUrl: './actiontoolbar.component.html',
  styleUrls: ['./actiontoolbar.component.scss'],
  animations: [
    trigger('detailExpand', [
      state(
        'collapsed',
        style({ height: '0px', minHeight: '0', visibility: 'hidden' })
      ),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      )
    ])
  ]
})
export class ActiontoolbarComponent implements OnInit {
  @Output() isselectedrow = new EventEmitter();

  buttonData: ButtonConfig[] = buttonData1;

  selection = new SelectionModel<any>(true, []);
  totalRows = 0;
  constructor(public dataService: DataServiceService) {}

  MyDataSource: any;
  displayedColumns = [
    'select',
    'ACCOUNT_CODE',
    'ACCOUNT',
    'ACCOUNT_GROUP',
    'MASTER_TYPE',
    'BALANCE',
    'STATUS',
    'action'
  ];
  @ViewChild(Wtf2Paginator, { static: false }) paginator: Wtf2Paginator;
  @ViewChild(Wtf2Sort, { static: false }) sort: Wtf2Sort;
  expandedElement: any;

  isExpansionDetailRow = (i: number, row: Object) =>
    row.hasOwnProperty('detailRow');

  ngOnInit() {
    this.RenderDataTable();
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const NumSelected = this.selection.selected.length;
    const NumRows = this.MyDataSource.data.length;

    return NumSelected === NumRows;
  }

  ShowAccordion(row, event) {
    console.log(row);
    this.expandedElement = row;
    event.stopPropagation();
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.MyDataSource.data.forEach(row => this.selection.select(row));
  }
  RenderDataTable() {
    this.dataService.GetAllTodos().subscribe(
      res => {
        this.MyDataSource = new Wtf2TableDataSource();
        // res.forEach(element => rows.push(element, { detailRow: true, element }));
        this.MyDataSource.data = res;
        this.MyDataSource.sort = this.sort;
        this.totalRows = this.MyDataSource.data.length;
        this.MyDataSource.paginator = this.paginator;
      },
      error => {
        console.log('There was an error while retrieving Todos !!!' + error);
      }
    );
  }

  Filter(searchstring: string) {
    searchstring = searchstring.trim();
    searchstring = searchstring.toLowerCase();
    this.MyDataSource.filter = searchstring;
  }

  searchClickAction(searchstring) {
    console.log('hi' + searchstring);
  }

  searchString(event) {
    // this.searchClick.emit(event);
    console.log('searching for string in ' + event);
  }

  testInput(event) {
    //
    console.log(event);
  }

  hasProp(o, name) {
    console.log(o);
    console.log(o.hasOwnProperty(name));
  }

  actionToolbarClickEvents(event) {
    console.log(event.action);
  }
}
