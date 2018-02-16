import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';

const a = By.css('wtf2-form-field');

@Component({
  template: `
    <wtf2-form-field>
      <input wtf2Input placeholder="Test">
    </wtf2-form-field>

    <style>
      wtf2-form-field {
        border: red 1px solid;
      }
    </style>
  `
})
class B {}

@Component({
  styles: [`
    wtf2-form-field {
      flex-direction: row;
    }
    :host > wtf2-form-field {
      text-align: right;
    }
  `]
})
class C {}
