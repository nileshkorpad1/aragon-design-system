
import {Directive, HostListener} from "@angular/core";

@Directive({
    selector: '[wtf2-click-stop-propagation]',
})
export class Wtf2ClickStopPropagation
{
    @HostListener("click", ["$event"])
    public onClick(event: any): void
    {
        event.stopPropagation();
    }
}
