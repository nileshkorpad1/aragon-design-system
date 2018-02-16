import { Component, OnInit, ViewChild, HostBinding, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';
import { Wtf2TableDataSource, Wtf2Paginator, Wtf2Sort, Wtf2Row, Wtf2Table } from '@wtf2/theme/wtf2-material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
@Component({
  selector: 'wtf2-nested-grid',
  templateUrl: './wtf2-nested-grid.component.html',
  styleUrls: ['./wtf2-nested-grid.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class Wtf2NestedGridComponent implements OnInit {

  selection = new SelectionModel<any>(true, []);
  totalRows = 0;
  constructor() { }

  @Input() MyDataSource;
  @Input() displayedColumns: any[];
  @Input() displaychildcols: string[];
  @ViewChild(Wtf2Paginator) paginator: Wtf2Paginator;
  @ViewChild(Wtf2Sort) sort: Wtf2Sort;
  @ViewChild('childtable') childtable: Wtf2Table<any>;
  @Input() isExpanded: boolean = false;
  expandedElement: any[];
  @Input() ChildDataSource: any[];
  dataSourceHistory
  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');

  ngOnInit() {
    this.dataSourceHistory = this.ChildDataSource;   
  }
  /** Whether the number of selected elements matches the total number of rows. */
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
    this.isAllSelected() ?
      this.selection.clear() :
      this.MyDataSource.data.forEach(row => this.selection.select(row));
  }
  RenderDataTable() {
    
  }


}
