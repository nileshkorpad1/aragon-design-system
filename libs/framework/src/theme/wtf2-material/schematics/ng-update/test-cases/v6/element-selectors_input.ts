import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';

const a = By.css('wtf2-input-container');

@Component({
  template: `
    <wtf2-input-container>
      <input wtf2Input placeholder="Test">
    </wtf2-input-container>

    <style>
      wtf2-input-container {
        border: red 1px solid;
      }
    </style>
  `
})
class B {}

@Component({
  styles: [`
    wtf2-input-container {
      flex-direction: row;
    }
    :host > wtf2-input-container {
      text-align: right;
    }
  `]
})
class C {}
