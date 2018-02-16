import { Component, Input, OnInit  } from '@angular/core';
import { convertToBoolProperty } from '../helpers';
@Component({
  selector: 'wtf2-page-heading',
  templateUrl: 'wtf2-page-heading.component.html',
})
export class Wtf2PageHeadingComponent implements OnInit {
  @Input() largeValue = false;
  @Input() mediumValue = false;
  @Input() smallValue = false;

  @Input('large')
  set setLarge(val: boolean) {
    this.largeValue = convertToBoolProperty(val);
  }

  @Input('medium')
  set setMedium(val: boolean) {
    this.mediumValue = convertToBoolProperty(val);
  }

  @Input('small')
  set setSmall(val: boolean) {
    this.smallValue = convertToBoolProperty(val);
  }
    ngOnInit() { }
}
