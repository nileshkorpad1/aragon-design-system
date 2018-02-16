import { Injectable, Injector } from '@angular/core';
import {
    Overlay,
    ConnectionPositionPair,
    PositionStrategy,
    OverlayConfig
} from '@angular/cdk/overlay';
import { PortalInjector, ComponentPortal } from '@angular/cdk/portal';
import { DateRangeRef, DateRangeContent } from './wtf2-datepicker-range-ref';
import { Wtf2DatepickerRangeComponent } from './wtf2-datepicker-range.component';

export type DateRangeParams<T> = {
    width?: string | number;
    height?: string | number;
    origin: HTMLElement;
    content: DateRangeContent;
    data?: T;
};

@Injectable({ providedIn: 'root' })
export class Wtf2DatepickerRangeService {
    constructor(private overlay: Overlay, private injector: Injector) {}

    open<T>({
        origin,
        content,
        data,
        width,
        height
    }: DateRangeParams<T>): DateRangeRef<T> {
        const overlayRef = this.overlay.create(
            this.getOverlayConfig({ origin, width, height })
        );
        const daterangeRef = new DateRangeRef<T>(overlayRef, content, data);

        const injector = this.createInjector(daterangeRef, this.injector);
        overlayRef.attach(
            new ComponentPortal(Wtf2DatepickerRangeComponent, null, injector)
        );

        return daterangeRef;
    }

    private getOverlayConfig({ origin, width, height }): OverlayConfig {
        return new OverlayConfig({
            hasBackdrop: true,
            width,
            height,
            backdropClass: 'popover-backdrop',
            positionStrategy: this.getOverlayPosition(origin),
            scrollStrategy: this.overlay.scrollStrategies.reposition()
        });
    }

    private getOverlayPosition(origin: HTMLElement): PositionStrategy {
        const positionStrategy = this.overlay
            .position()
            .flexibleConnectedTo(origin)
            .withPositions(this.getPositions())
            .withFlexibleDimensions(false)
            .withPush(false);

        return positionStrategy;
    }

    createInjector(daterangeRef: DateRangeRef, injector: Injector) {
        const tokens = new WeakMap([[DateRangeRef, daterangeRef]]);
        return new PortalInjector(injector, tokens);
    }

    private getPositions(): ConnectionPositionPair[] {
        return [
            {
                originX: 'center',
                originY: 'top',
                overlayX: 'center',
                overlayY: 'bottom'
            },
            {
                originX: 'center',
                originY: 'bottom',
                overlayX: 'center',
                overlayY: 'top'
            }
        ];
    }
}
