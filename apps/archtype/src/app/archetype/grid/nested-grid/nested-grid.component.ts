import { Component, OnInit, ViewChild, HostBinding, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';
import { Wtf2TableDataSource, Wtf2Paginator, Wtf2Sort, Wtf2Row, Wtf2Table } from '@wtf2/theme/wtf2-material';
import { DataServiceService } from './../data-service.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-nested-grid',
  templateUrl: './nested-grid.component.html',
  styleUrls: ['./nested-grid.component.scss'],
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
export class NestedGridComponent implements OnInit {
  selection = new SelectionModel<any>(true, []);
  totalRows = 0;
  constructor(public dataService: DataServiceService) {}

  MyDataSource;
  displayedColumns = ['id', 'userId', 'title', 'completed'];
  displaychildcols: string[] = ['date', 'action', 'user', 'note', 'profile'];
  @ViewChild(Wtf2Paginator, { static: false }) paginator: Wtf2Paginator;
  @ViewChild(Wtf2Sort, { static: false }) sort: Wtf2Sort;
  @ViewChild('childtable', { static: false }) childtable: Wtf2Table<any>;
  isExpanded: boolean = true;
  expandedElement: any[];
  isExpansionDetailRow = (i: number, row: Object) =>
    row.hasOwnProperty('detailRow');

  ngOnInit() {
    this.RenderDataTable();
  }
  isAllSelected() {
    const NumSelected = this.selection.selected.length;
    const NumRows = this.MyDataSource.data.length;
    return NumSelected === NumRows;
  }

  ShowAccordian(row, event) {
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
    this.dataService.getGridData().subscribe(
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
