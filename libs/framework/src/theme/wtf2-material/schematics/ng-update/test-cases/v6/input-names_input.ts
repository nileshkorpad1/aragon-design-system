import {Component} from '@angular/core';

@Component({
  template: `
    <wtf2-radio-group align="end"></wtf2-radio-group>
    <wtf2-radio-group [align]="myAlign">
      <wtf2-radio-button [align]="myAlign"></wtf2-radio-button>
      <wtf2-radio-button align="start"></wtf2-radio-button>
    </wtf2-radio-group>
  `
})
class A {}

@Component({
  template: `
    <wtf2-drawer align="end"></wtf2-drawer>
    <wtf2-drawer [align]="myAlign"></wtf2-drawer>
    <wtf2-sidenav [align]="myAlign"></wtf2-sidenav>
  `
})
class B {}

@Component({
  template: `
    <wtf2-form-field dividerColor="primary"></wtf2-form-field>
    <wtf2-form-field [dividerColor]="myColor"></wtf2-form-field>
    <wtf2-form-field floatPlaceholder="always"></wtf2-form-field>
    <wtf2-form-field [floatPlaceholder]="floatState"></wtf2-form-field>
  `
})
class C {}

@Component({
  template: `
    <wtf2-tab-group [wtf2-dynamic-height]="myHeight"></wtf2-tab-group>
    <wtf2-checkbox align="end"></wtf2-checkbox>
    <div wtf2Tooltip [tooltip-position]="end"></div>
    <wtf2-slider [tick-interval]="interval"></wtf2-slider>
    <wtf2-slider [thumb-label]="myLabel"></wtf2-slider>
  `
})
class D {}
