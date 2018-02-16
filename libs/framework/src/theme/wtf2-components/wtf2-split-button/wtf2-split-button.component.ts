import {
    Component,
    EventEmitter,
    Input,
    Output,
    ViewEncapsulation,
    Directive,
    OnInit,
} from '@angular/core';

@Component({
    selector: 'wtf2-split-button',
    templateUrl: './wtf2-split-button.component.html',
    styleUrls: ['./wtf2-split-button.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class Wtf2SplitButtonComponent implements OnInit {
    @Input() className: string;
    @Input() title: string;
    @Input() color = 'basic';
    @Input() disabled = false;
    @Input() click = '';
    @Input() type: string;
    @Output() onClick: EventEmitter<any> = new EventEmitter<any>();

    classVariable: string;
    classMenuVariable: string;

    constructor() {}

    handleClick(event: any) {
        this.onClick.emit(event);
    }

    ngOnInit() {
        this.classVariable =
            'wtf2-split-button-menu ' + 'wtf2-' + this.color + '-bg';
    }
}

@Directive({
    selector:
        'wtf2-split-button-title,[wtf2-split-button-title],.wtf2-split-button-title',
    host: {
        class: 'wtf2-split-button-title'
    }
})
export class Wtf2SplitButtonTitle implements OnInit {
    ngOnInit() {}
}
