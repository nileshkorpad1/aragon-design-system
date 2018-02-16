import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation, HostBinding, Input, Output, EventEmitter } from '@angular/core';
import { Wtf2Row } from '@wtf2/theme/wtf2-material';

@Component({
  selector: 'wtf2-row-detail',
  templateUrl: './wtf2-row-details.component.html',
  styleUrls: ['./wtf2-row-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'wtf2Row',
  preserveWhitespaces: false,
})
export class Wtf2RowDetailsComponent extends Wtf2Row implements OnInit {
  @HostBinding('class') clazz = 'wtf2-detail-row';
  @Input() isselectedrow: boolean;

  @Input() isOpen = false;
  @Input() hideToggle = true;
  @Input() disabled = false;
  @Input() displayPosition = 1;
  @Output() public expandEvent: EventEmitter<{ event: Event }> = new EventEmitter<{ event: Event }>();
  constructor() {
    super();
    this.isselectedrow=false;

  }

  ngOnInit() {
  }
  afterExpand(event: Event) {
    this.expandEvent.emit({ event });
  }
}
