import {Component} from '@angular/core';

@Component({
  template: `
    <wtf2-radio-group labelPosition="end"></wtf2-radio-group>
    <wtf2-radio-group [labelPosition]="myAlign">
      <wtf2-radio-button [labelPosition]="myAlign"></wtf2-radio-button>
      <wtf2-radio-button labelPosition="start"></wtf2-radio-button>
    </wtf2-radio-group>
  `
})
class A {}

@Component({
  template: `
    <wtf2-drawer position="end"></wtf2-drawer>
    <wtf2-drawer [position]="myAlign"></wtf2-drawer>
    <wtf2-sidenav [position]="myAlign"></wtf2-sidenav>
  `
})
class B {}

@Component({
  template: `
    <wtf2-form-field color="primary"></wtf2-form-field>
    <wtf2-form-field [color]="myColor"></wtf2-form-field>
    <wtf2-form-field floatLabel="always"></wtf2-form-field>
    <wtf2-form-field [floatLabel]="floatState"></wtf2-form-field>
  `
})
class C {}

@Component({
  template: `
    <wtf2-tab-group [dynamicHeight]="myHeight"></wtf2-tab-group>
    <wtf2-checkbox labelPosition="end"></wtf2-checkbox>
    <div wtf2Tooltip [wtf2TooltipPosition]="end"></div>
    <wtf2-slider [tickInterval]="interval"></wtf2-slider>
    <wtf2-slider [thumbLabel]="myLabel"></wtf2-slider>
  `
})
class D {}
