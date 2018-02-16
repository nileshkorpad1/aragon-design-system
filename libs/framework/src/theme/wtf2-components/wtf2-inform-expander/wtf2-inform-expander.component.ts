import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'wtf2-inform-expander',
  templateUrl: './wtf2-inform-expander.component.html',
  styleUrls: ['./wtf2-inform-expander.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        height: '*',
      })),
      state('out', style({
        height: '0px',
      })),
      transition('in => out', animate('200ms ease-in')),
      transition('out => in', animate('200ms ease-in'))
    ]),
  ]
})
export class Wtf2InformExpanderComponent implements OnInit {
  @Input() show: boolean = false;
  SingleColumn: boolean = true;
  @Input() title: string;
  @Input() icon: string;
  @Input() menuState: string = 'in';

  // for toggle event
  @Output() toggleExpander = new EventEmitter();
  constructor() { }
  ngOnInit() {
  }
  toggle() {
    // this.show = !this.show;
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
    this.toggleExpander.emit(this);
  }


}
