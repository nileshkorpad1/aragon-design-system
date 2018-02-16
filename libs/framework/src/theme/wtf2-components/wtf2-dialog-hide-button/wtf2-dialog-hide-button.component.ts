import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';
@Component({
  selector: 'wtf2-dialog-hide-button',
  templateUrl: './wtf2-dialog-hide-button.component.html',
  styleUrls: ['./wtf2-dialog-hide-button.component.scss'],
  // animations: [
  //   trigger('slideInOut', [
  //     transition(':enter', [
  //       style({ transform: 'translateX(100%)' }),
  //       animate('425ms ease-in-out', style({ transform: 'translateX(0%)' })),
  //     ]),
  //     transition(':leave', [
  //       animate('0ms ease-in-out', style({ transform: 'translateX(100%)' })),
  //     ]),
  //   ]),

  // ],
})
export class Wtf2DialogHideButtonComponent implements OnInit {
  show: boolean;
  menuState: string;
  constructor() {
    this.show = true;

    this.menuState = 'out';
  }
  toggle() {
    this.show = !this.show;
  }

  ngOnInit() {}
}
