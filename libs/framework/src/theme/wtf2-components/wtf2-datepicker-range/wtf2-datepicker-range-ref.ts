import { OverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';
import { TemplateRef, Type } from '@angular/core';

export type DateRangeCloseEvent<T = any> = {
    type: 'backdropClick' | 'close';
    data: T;
}

export type DateRangeContent = TemplateRef<any> | Type<any> | string;

export class DateRangeRef<T = any> {
    private afterClosed = new Subject<DateRangeCloseEvent<T>>();
    afterClosed$ = this.afterClosed.asObservable();

    constructor(public overlay: OverlayRef,
        public content: DateRangeContent,
        public data: T) {
        overlay.backdropClick().subscribe(() => {
            this._close('backdropClick', null);
        });
    }

    close(data?: T) {
        this._close('close', data);
    }

    private _close(type: DateRangeCloseEvent['type'], data?: T) {
        this.overlay.dispose();
        this.afterClosed.next({
            type,
            data
        });
        this.afterClosed.complete();
    }
}
