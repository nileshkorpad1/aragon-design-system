import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Wtf2ConfigService } from '../../../services/config.service';

@Component({
  selector: 'wtf2-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class Wtf2SearchBarComponent implements OnInit, OnDestroy {
  collapsed: boolean;
  wtf2Config: any;

  @Output()
  input: EventEmitter<any>;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {Wtf2ConfigService} _wtf2ConfigService
   */
  constructor(private _wtf2ConfigService: Wtf2ConfigService) {
    // Set the defaults
    this.input = new EventEmitter();
    this.collapsed = true;

    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to config changes
    this._wtf2ConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(config => {
        this.wtf2Config = config;
      });
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
   * Collapse
   */
  collapse(searchInput): void {
    this.collapsed = true;
    searchInput.value = '';
  }

  /**
   * Expand
   */
  expand(): void {
    this.collapsed = false;
  }

  /**
   * Search
   *
   * @param event
   */
  search(event): void {
    event.stopPropagation();
    this.input.emit(event.target.value);
  }
}
