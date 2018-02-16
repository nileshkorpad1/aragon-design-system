import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  Component,
  OnInit,
  ViewChild,
  HostBinding,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
  Output,
  Renderer2,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef,
  OnChanges,
} from '@angular/core';
import {
  Wtf2TableDataSource,
  Wtf2Paginator,
  Wtf2Sort,
  Wtf2Row,
  Wtf2Table,
} from '@wtf2/theme/wtf2-material';
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
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Wtf2PriceFormatComponent } from '../wtf2-price-format/wtf2-price-format.component';

@Component({
  selector: 'wtf2-draggable-grid',
  templateUrl: './wtf2-draggable-grid.component.html',
  styleUrls: ['./wtf2-draggable-grid.component.scss']
})
export class Wtf2DraggableGridComponent implements AfterViewInit, OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}
  @ViewChild('table', { static: false })
  table: Wtf2Table<any>;
  @ViewChild(Wtf2Sort, { static: false })
  sort: Wtf2Sort;
  @Input() displayedColumns: string[] = [];
  @Input() tabledata: any;
  @Input() columnConfig: any;
  @Input() filter = false;
  dataSource: any;

  MyDataSource;
  tableForm: FormGroup;
  position: number;

  ngOnInit() {
    this.position = this.tabledata.length + 1;
    this.MyDataSource = new Wtf2TableDataSource();
    this.MyDataSource.data = this.tabledata;
    this.MyDataSource.sort = this.sort;
    this.tableForm = this.formBuilder.group({
      users: this.formBuilder.array([])
    });
    this.setUsersForm();
  }
  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  setUsersForm() {
    const userCtrl = this.tableForm.get('users') as any;
    this.MyDataSource.data.forEach(user => {
      userCtrl.push(this.setUsersFormArray(user));
    });
    this.clearValidation(userCtrl.at(this.MyDataSource.data.length - 1));
  }
  setUsersFormArray(user) {
    const group = this.formBuilder.group({});
    this.columnConfig.forEach(col => {
      const control = this.formBuilder.control(
        col.name,
        this.bindValidations(col.validations || [])
      );
      group.addControl(col.name, control);
    });
    return group;
  }
  setValidation(formgroup: FormGroup) {
    for (var i = 0; i < this.displayedColumns.length; i++) {
      if (this.columnConfig[i].validations.length > 0) {
        const validList = [];
        this.columnConfig[i].validations.forEach(valid => {
          validList.push(valid.validator);
        });
        Validators.compose(validList);
        formgroup.controls[this.displayedColumns[i]].setValidators(validList);
        formgroup.controls[this.displayedColumns[i]].updateValueAndValidity();
      }
    }
    this.cdr.detectChanges();
  }
  clearValidation(formgroup: FormGroup) {
    for (var i = 0; i < this.displayedColumns.length; i++) {
      if (this.columnConfig[i].validations.length > 0) {
        const validList = [];
        this.columnConfig[i].validations.forEach(valid => {
          validList.push(valid.validator);
        });
        Validators.compose(validList);
        formgroup.controls[this.displayedColumns[i]].clearValidators();
        formgroup.controls[this.displayedColumns[i]].updateValueAndValidity();
      }
    }
  }

  bindValidations(validations: any) {
    if (validations.length > 0) {
      const validList = [];
      validations.forEach(valid => {
        validList.push(valid.validator);
      });
      return Validators.compose(validList);
    }
    return null;
  }
  getLastRow($event, row, i) {
    if (this.MyDataSource.data.length - 1 == i) {
      const userCtrl = this.tableForm.get('users') as any;
      if (userCtrl.at(i).controls[this.displayedColumns[1]].value != '') {
        this.addEmptyRecord();
        this.setValidation(userCtrl.at(i));
      }
    }
  }
  addEmptyRecord() {
    let userRec = {
      position: this.position++
    };
    for (var i = 1; i < this.displayedColumns.length; i++) {
      var colname = this.displayedColumns[i];
      userRec[colname] = '';
    }
    this.MyDataSource.data.push(userRec);
    const userCtrl = this.tableForm.get('users') as any;
    userCtrl.push(this.setUsersFormArray(userRec));
    this.clearValidation(userCtrl.at(this.MyDataSource.data.length - 1));
    this.table.renderRows();
  }
  dropTable(event: CdkDragDrop<any[]>) {
    const prevIndex = this.MyDataSource.data.findIndex(
      d => d === event.item.data
    );
    if (!(prevIndex == this.MyDataSource.data.length - 1)) {
      moveItemInArray(this.MyDataSource.data, prevIndex, event.currentIndex);
      this.MyDataSource.sort = this.sort;
      this.table.renderRows();
    }
  }

  deleteItem(id) {
    const foundIndex = this.MyDataSource.data.findIndex(x => x.position === id);
    if (!(foundIndex == this.MyDataSource.data.length - 1)) {
      this.MyDataSource.data.splice(foundIndex, 1);
      this.MyDataSource.sort = this.sort;
      // this.MyDataSource.paginator = this.paginator;
      this.table.renderRows();
    }
  }
  Filter(searchstring: string) {
    searchstring = searchstring.trim();
    searchstring = searchstring.toLowerCase();
    this.MyDataSource.filter = searchstring;
    this.MyDataSource.sort = this.sort;
    this.table.renderRows();
  }

  ShowCurrency($event, inputref) {
    inputref.hidden = false;
    $event.target.hidden = true;
  }
  showInput($event, currencyRef) {
    currencyRef.hidden = false;
    $event.target.hidden = true;
  }
}
