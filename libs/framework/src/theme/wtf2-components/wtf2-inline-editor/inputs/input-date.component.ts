import { Component, OnInit, Injector, ChangeDetectionStrategy, ElementRef, ViewChild,AfterViewInit, EventEmitter, Output } from '@angular/core';
import { InputBase } from './input-base';
import { InlineConfig } from '../types/inline-configs';
// import { Wtf2DatepickerInputEvent } from '../../';
// import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '../../m';
import { DateAdapter, WTF2_DATE_FORMATS, WTF2_DATE_LOCALE } from '@wtf2/theme/wtf2-material/core';
import { MomentDateAdapter } from '@wtf2/theme/wtf2-material/wtf2-moment-adapter';
// import { AppDateAdapter, APP_DATE_FORMATS } from './date.adapter';

// import * as _moment from 'moment';
// // tslint:disable-next-line:no-duplicate-imports
// import { default as _rollupMoment } from 'moment';

// const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
    parse: {
        dateInput: 'DD-MM-YYYY',
    },
    display: {
        dateInput: 'DD-MM-YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'DD-MM-YYYY',
        monthYearA11yLabel: 'DD-MM-YYYY',
    },
};



@Component({
  selector: 'inline-editor-date',
  styleUrls: ['./input.component.css'],
  template: `
    <!-- <wtf2-form-field> -->
    <input
      wtf2Input
      [wtf2Datepicker]="picker"
      wtf2Input
      [wtf2Datepicker]="picker"
      #inputRef
      class="form-control"
      (keyup.enter)="onEnter($event)"
      (keyup.escape)="onEscape($event)"
      (focus)="onFocus($event)"
      (blur)="onBlur($event)"
      (blur)="onBlur($event)"
      (keypress)="onKeyPress($event)"
      [(ngModel)]="value"
      [required]="config.required"
      [disabled]="state.isDisabled()"
      [name]="config.name"
      [size]="config.size"
      [min]="config.min"
      [max]="config.max"
      (click)="picker.open()"
      readonly
    />
    <wtf2-datepicker
      #picker
      (closed)="datepickerClosedMethod($event)"
    ></wtf2-datepicker>
    <!-- </wtf2-form-field> -->
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter },

    { provide: WTF2_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class InputDateComponent extends InputBase implements OnInit {
  //  (ngModelChange) = "updateCalcs()"

  @Output() public datepickerClosed = new EventEmitter<number>();
  @ViewChild('inputRef', { static: true }) datePicker: ElementRef;
  @ViewChild('inline-editor', { static: true }) parentRef;
  constructor(injector: Injector) {
    super(injector);
    this.isRegexTestable = true;
    // this.dateAdapter.setLocale('your locale name');
  }

  public config: InlineConfig;

  onChange($event) {
    // this.datePicker.nativeElement.value = $event.target.value;
    // this.value.text = $event.target.value;
    console.log('onChange' + this.value);
  }

  datepickerClosedMethod(event) {
    this.datepickerClosed.emit();
    // console.log('hello ' + this.parentRef);
  }
}
