import {
    Component,
    EventEmitter,
    OnDestroy,
    OnInit,
    Output,
    ViewEncapsulation,
    Input
} from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Subject, Observable } from "rxjs";
import { startWith, map, takeUntil } from "rxjs/operators";
import { navigation } from "../../navigation/navigation";

import { Wtf2ConfigService } from "../../../services/config.service";
import { Router } from "@angular/router";

@Component({
    selector: "wtf2-global-search",
    templateUrl: "./global-search.component.html",
    styleUrls: ["./global-search.component.scss"],
    encapsulation: ViewEncapsulation.Emulated
})
export class Wtf2GlobalSearchComponent implements OnInit, OnDestroy {
    wtf2Config: any;
    navigation = [];
    globalsearch = new FormControl();
    inputFilter: any;
    autochecked: false;

    filteredOptions: Observable<string[]>;
    node: any;
    nodebutton: any;

    @Input() searchType;
    searchDefault = "rotate-layout";
    onSearch = new EventEmitter();

    @Output()

    //closesearch = new EventEmitter();
    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {Wtf2ConfigService} _wtf2ConfigService
     */
    constructor(
        private _wtf2ConfigService: Wtf2ConfigService,
        private router: Router
    ) {
        // Set the defaults
        //this.closesearch = new EventEmitter();

        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this.navigation = navigation[0].children;
    }

    ngAfterViewInit(): void {
        this.node = document.querySelector(this.wtf2Config.layout.style);
        this.nodebutton = document.querySelector(".theme-options-button");
        this.node.className =
            this.node.className + " rotate-layout wtf2-elevation-z24";
        this.nodebutton.className = this.nodebutton.className + " d-none";
    }

    ngAfterContentInit() {
        this.filteredOptions = this.globalsearch.valueChanges.pipe(
            startWith(""),
            map(value => this._filter(value))
        );
        //this.autochecked = true;
    }

    ngOnInit(): void {
        this.searchDefault = this.searchType;
        this._wtf2ConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(config => {
                this.wtf2Config = config;
            });
    }

    private _filter(value: any): string[] {
        if (typeof value != "string") {
            return;
        }
        return this.navigation.filter(
            option =>
                option.title.toLowerCase().indexOf(value.toLowerCase()) === 0
        );
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Search
     */

    filterOptions($event) {
        this.navigation = JSON.parse($event);
    }

    onSelected(event) {
        this.router.navigate([event.source.value.url]);
        this.closesearch();
    }

    // onSearch(event){
    //     console.log(event);
    // }
    closesearch() {
        this.node.className = this.node.className.replace(
            "rotate-layout wtf2-elevation-z24",
            "rotate-layout-clear"
        );
        this.nodebutton.className = this.nodebutton.className.replace(
            "d-none",
            ""
        );
        this.wtf2Config.globleSearch = false;
    }
}
