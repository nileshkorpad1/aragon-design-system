import {Component} from '@angular/core';

class Wtf2Ripple {
  speedFactor: number;
}

class A {
  self = {me: this.ripple};

  constructor(protected ripple: Wtf2Ripple) {}

  onClick() {
    this.ripple.speedFactor = 0.5;
    this.self.me.speedFactor = 1.5;
  }
}

const b = new Wtf2Ripple();
const myConstant = 1;

b.speedFactor = 0.5 + myConstant;

@Component({
  template: `<div wtf2Ripple [wtf2RippleSpeedFactor]="0.5"></div>`
})
class C {}

@Component({
  template: `<div wtf2Ripple [wtf2RippleSpeedFactor]="myValue"></div>`
})
class D {
  myValue = 1.5;
}
