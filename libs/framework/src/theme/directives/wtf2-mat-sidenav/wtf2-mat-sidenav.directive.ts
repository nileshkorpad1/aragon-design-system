import { Directive, Input, OnInit, HostListener, OnDestroy, HostBinding } from '@angular/core';
import { Wtf2Sidenav } from '@wtf2/theme/wtf2-material';
import { MediaObserver } from '@angular/flex-layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Wtf2MatchMediaService } from '../../../services/match-media.service';
import { Wtf2SidenavHelperService } from './wtf2-mat-sidenav.service';

@Directive({
  selector: '[wtf2MatSidenavHelper]'
})
export class Wtf2MatSidenavHelperDirective implements OnInit, OnDestroy {
  @HostBinding('class.wtf2-is-locked-open')
  isLockedOpen: boolean;

  @Input()
  wtf2MatSidenavHelper: string;

  @Input()
  matIsLockedOpen: string;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   *  {Wtf2MatchMediaService} _wtf2MatchMediaService
   *  {Wtf2SidenavHelperService} _wtf2MatSidenavHelperService
   *  {MatSidenav} _wtf2Sidenav
   *  {MediaObserver} _mediaObserver
   */
  constructor(
    private _wtf2MatchMediaService: Wtf2MatchMediaService,
    private _wtf2MatSidenavHelperService: Wtf2SidenavHelperService,
    private _wtf2Sidenav: Wtf2Sidenav,
    private _mediaObserver: MediaObserver
  ) {
    // Set the defaults
    this.isLockedOpen = true;

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
    // Register the sidenav to the service
    this._wtf2MatSidenavHelperService.setSidenav(
      this.wtf2MatSidenavHelper,
      this._wtf2Sidenav
    );

    if (this._mediaObserver.isActive(this.matIsLockedOpen)) {
      this.isLockedOpen = true;
      this._wtf2Sidenav.mode = 'side';
      this._wtf2Sidenav.toggle(true);
    } else {
      this.isLockedOpen = false;
      this._wtf2Sidenav.mode = 'over';
      this._wtf2Sidenav.toggle(false);
    }

    this._wtf2MatchMediaService.onMediaChange
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        if (this._mediaObserver.isActive(this.matIsLockedOpen)) {
          this.isLockedOpen = true;
          this._wtf2Sidenav.mode = 'side';
          this._wtf2Sidenav.toggle(true);
        } else {
          this.isLockedOpen = false;
          this._wtf2Sidenav.mode = 'over';
          this._wtf2Sidenav.toggle(false);
        }
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
}

@Directive({
    selector: '[wtf2MatSidenavToggler]',
})
export class Wtf2MatSidenavTogglerDirective {
    @Input()
    wtf2MatSidenavToggler: string;

    /**
     * Constructor
     *
     *  {Wtf2SidenavHelperService} _wtf2MatSidenavHelperService
     */
    constructor(private _wtf2MatSidenavHelperService: Wtf2SidenavHelperService) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * On click
     */
    @HostListener('click')
    onClick(): void {
        this._wtf2MatSidenavHelperService.getSidenav(this.wtf2MatSidenavToggler).toggle();
    }
}
