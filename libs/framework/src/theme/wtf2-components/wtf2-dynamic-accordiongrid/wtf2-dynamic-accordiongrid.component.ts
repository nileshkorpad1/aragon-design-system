import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { fromWtf2Sort, sortRows, fromWtf2Paginator, paginateRows } from '@wtf2/utils/datasource.utils';
import {
    Wtf2Paginator,
    Wtf2Sort,
    Sort,
    PageEvent,
} from '@wtf2/theme/wtf2-material';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { ButtonConfig, col, ShipData } from '@wtf2/theme/wtf2-components/field.interface';
import { Wtf2ExpansionToolbarComponent } from '../wtf2-expansion-toolbar/wtf2-expansion-toolbar.component';


@Component({
  selector: 'wtf2-dynamic-accordiongrid',
  templateUrl: './wtf2-dynamic-accordiongrid.component.html',
  styleUrls: ['./wtf2-dynamic-accordiongrid.component.scss']
})
export class Wtf2DynamicAccordiongridComponent implements OnInit {

  @ViewChild(Wtf2Sort) sort: Wtf2Sort;
  @ViewChild(Wtf2Paginator) paginator: Wtf2Paginator;
  @ViewChild(Wtf2ExpansionToolbarComponent) expToolbar: Wtf2ExpansionToolbarComponent;

  exampleShips: [] = [];
  @Input() columnData: col[] = [];
  @Input() buttonData: col[] = [];
  @Input() dataArray :any;
    rows = [];
    loadingIndicator = true;
    reorderable = true;
  @Input() totalData: number=0;

  totalRows$: Observable<number>;
  currentSection = this.totalData;
  columnArray$: Observable<col[]>;

  ngOnInit() {

  }


  ngAfterViewInit(): void {
      const sortEvents$: Observable<Sort> = fromWtf2Sort(this.sort);
      const pageEvents$: Observable<PageEvent> = fromWtf2Paginator(this.paginator);
      const rows$ = of(this.dataArray);
      const rows1$ = of(this.columnData);
      this.dataArray = rows$.pipe(sortRows(sortEvents$), paginateRows(pageEvents$));
      this.columnArray$ = rows1$;
  }

}
