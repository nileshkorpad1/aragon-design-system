import {
    Component,
    OnInit,
    ViewChild,
    Input,
    HostBinding,
    EventEmitter,
    Output,
    ChangeDetectionStrategy,
    ViewEncapsulation,
} from '@angular/core';
import {
    Wtf2TableDataSource,
    Wtf2Paginator,
    Wtf2Sort,
    Wtf2Row,
} from '@wtf2/theme/wtf2-material';
import { DataServiceService } from './../data-service.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import {
    animate,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
@Component({
  selector: 'app-combined',
  templateUrl: './accordion-grid-checkbox.component.html',
  styleUrls: ['./accordion-grid-checkbox.component.scss'],
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
export class AccordionGridCheckboxComponent implements OnInit {
  selection = new SelectionModel<any>(true, []);
  @Output() isselectedrow = new EventEmitter();
  totalRows = 0;
  constructor(public dataService: DataServiceService) {}

  MyDataSource: any;
  displayedColumns = ['select', 'id', 'userId', 'title', 'completed'];
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
}
