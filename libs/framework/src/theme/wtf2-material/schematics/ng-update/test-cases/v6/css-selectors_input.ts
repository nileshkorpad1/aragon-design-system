import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';

const a = By.css('.wtf2-form-field-placeholder');
const b = By.css('.wtf2-form-field-placeholder-wrapper');
const c = By.css('.wtf2-input-container');
const d = By.css('.wtf2-input-flex');
const e = By.css('.wtf2-input-hint-spacer');

@Component({
  template: `
    <ng-content select=".wtf2-input-suffix"></ng-content>

    <style>
      .wtf2-input-suffix {
        border: red 1px solid;
      }

      .wtf2-input-underline {
        background: blue;
      }
    </style>
  `
})
class F {}

@Component({
  styles: [`
    .wtf2-input-subscript-wrapper {
      flex-direction: row;
    }
    .wtf2-input-container .wtf2-input-placeholder {
      color: lightcoral;
    }
  `]
})
class G {}

@Component({
  // Considering this is SCSS that will be transformed by Webpack loaders.
  styles: [`
    body, html {
      font-family: $wtf2-font-family;
    }
  `]
})
class H {}
