import { Component, OnInit, Output } from '@angular/core';
import { Wtf2ConfigService } from '@wtf2/services/config.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { navigation } from '../../navigation/navigation';
import { EventEmitter } from 'events';

@Component({
    selector: "app-search",
    templateUrl: "./search.component.html",
    styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit {
    wtf2Config: any;
    navigation: any;
    private _unsubscribeAll: Subject<any>;

    @Output()
    onSearch = new EventEmitter();

    constructor(private _wtf2ConfigService: Wtf2ConfigService) {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit() {
        this._wtf2ConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(config => {
                this.wtf2Config = config;
            });
        this.navigation = navigation[0].children;
    }

    searchopen(): void {
        this.wtf2Config.globleSearch = true;
        this.onSearch.emit(this.navigation);
    }

    closesearch(): void {
        this.wtf2Config.globleSearch = false;
    }
}
