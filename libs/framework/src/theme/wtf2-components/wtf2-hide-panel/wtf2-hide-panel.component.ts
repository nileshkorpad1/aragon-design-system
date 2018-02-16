import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../field.interface';
import { convertToBoolProperty } from '../helpers';
import { trigger, transition, animate, style } from '@angular/animations';
import { Input } from '@angular/core';
@Component({
  selector: 'wtf2-Hide-Button, wtf2-hide-panel',
  templateUrl: './wtf2-hide-panel.component.html',
  styleUrls: ['./wtf2-hide-panel.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class Wtf2HidePanel implements OnInit {
  show: boolean;
  field: FieldConfig;
  group: FormGroup;
  @Input() color = '';
  @Input() VerticalbuttonVar = false;
  @Input() HorizontalbuttonVar = true;
  @Input() class = '';
  @Input() type = 'wtf2-button';
  @Input() isToolbar = false;

  @Input() ShowLabel: string;
  @Input() HideLabel: string;

  @Input('vertical')
  set verticalHideButton(val: boolean) {
    this.VerticalbuttonVar = convertToBoolProperty(val);
    this.HorizontalbuttonVar = false;
  }

  @Input('horizontal')
  set horizontalHidebutton(val: boolean) {
    this.HorizontalbuttonVar = convertToBoolProperty(val);
  }
  constructor() {
    this.show = true;
    this.ShowLabel = 'Show Help';
    this.HideLabel = 'Hide Help';
  }
  showExpander(event: any) {
    this.show = true;
  }

  hideExpander(event: any) {
    this.show = false;
  }
  ngOnInit() {}

}
