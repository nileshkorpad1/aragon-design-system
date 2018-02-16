import {Component} from '@angular/core';

class Wtf2Ripple {
  speedFactor: number;
}

class A {
  self = {me: this.ripple};

  constructor(protected ripple: Wtf2Ripple) {}

  onClick() {
    this.ripple.animation = {enterDuration: 900};
    this.self.me.animation = {enterDuration: 300};
  }
}

const b = new Wtf2Ripple();
const myConstant = 1;

b.animation = /** TODO: Cleanup duration calculation. */ {enterDuration: 450 / (0.5 + myConstant)};

@Component({
  template: `<div wtf2Ripple [wtf2RippleAnimation]="{enterDuration: 900}"></div>`
})
class C {}

@Component({
  template: `<div wtf2Ripple [wtf2RippleAnimation]="{enterDuration: (450 / (myValue))}"></div>`
})
class D {
  myValue = 1.5;
}
