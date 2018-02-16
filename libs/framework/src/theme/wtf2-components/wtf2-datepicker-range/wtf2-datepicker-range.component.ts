import {
    Component,
    OnInit,
    Input,
    Renderer2,
    ViewEncapsulation,
    ElementRef,
    TemplateRef
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateRangeRef, DateRangeContent } from './wtf2-datepicker-range-ref';
import {
    MAT_MOMENT_DATE_FORMATS,
    MomentDateAdapter
} from '@angular/material-moment-adapter';
import {
    WTF2_DATE_FORMATS
} from '@wtf2/theme/wtf2-material/core';
import { MAT_DATE_FORMATS } from '@angular/material';

@Component({
    selector: 'wtf2-datepicker-range',
    templateUrl: './wtf2-datepicker-range.component.html',
    styleUrls: ['./wtf2-datepicker-range.component.scss'],
    providers: [
        // {
        //     provide: DateAdapter,
        //     useClass: MomentDateAdapter,
        //     deps: [MAT_DATE_LOCALE]
        // },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
    ],
    encapsulation: ViewEncapsulation.None
})
export class Wtf2DatepickerRangeComponent implements OnInit {
    dateCurrent = new FormControl(new Date());
    selectedFromDate: Date;
    selectedToDate: Date;
    monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    datesToHighlight: Date[] = [];
    startDate = new Date();

    renderMethod: 'template' | 'component' | 'text' = 'component';
    content: DateRangeContent;
    context;

    constructor(
        private renderer: Renderer2,
        private elRef: ElementRef,
        private daterangeref: DateRangeRef
    ) {}

    ngOnInit() {
        this.content = this.daterangeref.data.value;
        if(this.content){
            this.convertToDate(this.content);
        }

        if (typeof this.content === 'string') {
            this.renderMethod = 'text';
        }

        if (this.content instanceof TemplateRef) {
            this.renderMethod = 'template';
            this.context = {
                close: this.daterangeref.close.bind(this.daterangeref)
            };
        }
    }

    dateClass: (d: Date) => any;

    convertToDate(date){
        let explodeDate = date.split('-');
        let from = explodeDate[0].trim().split('/');
        let to = explodeDate[1].trim().split('/');
        this.selectedFromDate = new Date(from[1] + '/' + from[0] + '/' + from[2]);
        this.selectedToDate = new Date(to[1] + '/' + to[0] + '/' + to[2]);
        this.datesToHighlight = this.dateDifference(
            this.selectedFromDate,
            this.selectedToDate
        );
        this.displayMonthTo();
    }

    onSelectFrom(event) {
        this.selectedFromDate = event;
        this.selectedToDate = null;
        this.datesToHighlight = [];
    }
    onSelectTo(event) {
        let from = new Date(this.selectedFromDate);
        let to = new Date(event);
        if (from.getTime() <= to.getTime()) {
            this.selectedToDate = event;
            this.datesToHighlight = this.dateDifference(
                this.selectedFromDate,
                this.selectedToDate
            );
        } else {
            this.selectedToDate = null;
            this.datesToHighlight = [];
        }
    }

    dateDifference(startDate, endDate) {
        let retVal: Date[] = [];
        var current = new Date(startDate);
        var end = new Date(endDate);
        while (current <= end) {
            retVal.push(new Date(current));
            current.setDate(current.getDate() + 1);
        }
        retVal.push(end);
        return retVal;
    }

    displayMonthTo() {
        let HeaderElsClass = this.elRef.nativeElement.getElementsByClassName(
            'wtf2-calendar-body-cell'
        );
        var months = this.monthNames;
        var render = this.renderer;
        var heighligt = this.datesToHighlight;
        for (let index in HeaderElsClass) {
            if (typeof HeaderElsClass[index] === 'object') {
                let headerClass = HeaderElsClass[index].getAttribute(
                    'aria-label'
                );
                render.removeClass(HeaderElsClass[index], 'special-date');
                render.removeStyle(HeaderElsClass[index], 'border-radius');
                this.datesToHighlight.find(function(each, indexarray) {
                    let dateTemp = new Date(each);
                    let formate =
                        months[dateTemp.getMonth()] +
                        ' ' +
                        dateTemp.getDate() +
                        ', ' +
                        dateTemp.getFullYear();
                    if (formate === headerClass) {
                        render.addClass(HeaderElsClass[index], 'special-date');
                        if (indexarray == 0) {
                            render.setStyle(
                                HeaderElsClass[index],
                                'border-radius',
                                '30px 0px 0px 30px'
                            );
                        }
                        if (
                            heighligt.length - 1 == indexarray &&
                            formate == headerClass
                        ) {
                            render.setStyle(
                                HeaderElsClass[index],
                                'border-radius',
                                '0px 30px 30px 0px'
                            );
                        }
                    }
                    return false;
                });
            }
        }
    }

    displayMonthFrom() {
        let HeaderElsClass = this.elRef.nativeElement.getElementsByClassName(
            'wtf2-calendar-body-cell'
        );
        var months = this.monthNames;
        var render = this.renderer;
        var heighligt = this.datesToHighlight;
        for (let index in HeaderElsClass) {
            if (typeof HeaderElsClass[index] === 'object') {
                let headerClass = HeaderElsClass[index].getAttribute(
                    'aria-label'
                );
                this.datesToHighlight.find(function(each, indexarray) {
                    let dateTemp = new Date(each);
                    let formate =
                        months[dateTemp.getMonth()] +
                        ' ' +
                        dateTemp.getDate() +
                        ', ' +
                        dateTemp.getFullYear();
                    if (formate === headerClass) {
                        render.addClass(HeaderElsClass[index], 'special-date');
                        if (indexarray == 0) {
                            render.setStyle(
                                HeaderElsClass[index],
                                'border-radius',
                                '30px 0px 0px 30px'
                            );
                        }
                        if (
                            heighligt.length - 1 == indexarray &&
                            formate == headerClass
                        ) {
                            render.setStyle(
                                HeaderElsClass[index],
                                'border-radius',
                                '0px 30px 30px 0px'
                            );
                        }
                    }
                    return false;
                });
            }
        }
    }

    savedate() {
        let from = 'DD/MM/YYYY';
        let to = 'DD/MM/YYYY';
        if (this.selectedFromDate) {
            from = this.formatDate(this.selectedFromDate);
        }
        if (this.selectedToDate) {
            to = this.formatDate(this.selectedToDate);
        }
        this.daterangeref.close(from + ' - ' + to);
    }

    closedate() {
        this.daterangeref.close('');
    }

    userSelection(event) {
    }

    cdkAutofill(event) {
    }

    formatDate(eventdate) {
        let date = new Date(eventdate);
        var day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
        let tmpmonth: number | string = date.getMonth();
        var month = tmpmonth > 9 ? tmpmonth + 1 : '0' + (tmpmonth + 1);
        var year = date.getFullYear();
        return day + '/' + month + '/' + year;
    }
}
