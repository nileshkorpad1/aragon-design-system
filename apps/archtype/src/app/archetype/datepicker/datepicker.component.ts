import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Wtf2DatepickerInputEvent } from '@wtf2/theme/wtf2-material/datepicker';
import { WTF2_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@wtf2/theme/wtf2-material/wtf2-moment-adapter';
import {
  DateAdapter,
  WTF2_DATE_FORMATS,
  WTF2_DATE_LOCALE
} from '@wtf2/theme/wtf2-material/core';
import { Wtf2DatepickerRangeService } from '@wtf2/theme/wtf2-components/wtf2-datepicker-range/wtf2-datepicker-range.service';

@Component({
    selector: 'app-datepicker',
    templateUrl: './datepicker.component.html',
    styleUrls: ['./datepicker.component.scss'],
    providers: [
        // The locale would typically be provided on the root module of your application. We do it at
        // the component level here, due to limitations of our example generation script.
        // { provide: WTF2_DATE_LOCALE, useValue: 'ja-JP' },

        // `MomentDateAdapter` and `WTF2_MOMENT_DATE_FORMATS` can be automatically provided by importing
        // `MatMomentDateModule` in your applications root module. We provide it at the component level
        // here, due to limitations of our example generation script.
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [WTF2_DATE_LOCALE]
        },
        { provide: WTF2_DATE_FORMATS, useValue: WTF2_MOMENT_DATE_FORMATS }
    ]
})
export class DatepickerComponent implements OnInit {
    date = new FormControl(new Date());
    datenew = new FormControl();
    serializedDate = new FormControl(new Date().toISOString());
    startDate = new Date(1990, 0, 1);

    minDate = new Date(2000, 0, 1);
    maxDate = new Date(2020, 0, 1);
    events: string[] = [];

    myFilter = (d: Date): boolean => {
        const day = d.getDay();
        // Prevent Saturday and Sunday from being selected.
        return day !== 0 && day !== 6;
    };

    constructor(
        private adapter: DateAdapter<any>,
        private daterange: Wtf2DatepickerRangeService
    ) {}

    ngOnInit() {}

    addEvent(type: string, event: Wtf2DatepickerInputEvent<Date>) {
        this.events.push(`${type}: ${event.value}`);
    }

    french() {
        this.adapter.setLocale('fr');
    }

    /**** Date range Picker ****/
    show(content: TemplateRef<any>, origin) {
        const ref = this.daterange.open<{ value }>({
            content,
            origin,
            width: '200px',
            data: { value: this.datenew.value }
        });

        ref.afterClosed$.subscribe(res => {
            if(res.data){
                this.datenew = new FormControl(res.data);
            }
        });
    }
}
