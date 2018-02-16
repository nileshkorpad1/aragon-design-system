import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';

const a = By.css('.wtf2-form-field-label');
const b = By.css('.wtf2-form-field-label-wrapper');
const c = By.css('.wtf2-form-field');
const d = By.css('.wtf2-form-field-flex');
const e = By.css('.wtf2-form-field-hint-spacer');

@Component({
  template: `
    <ng-content select=".wtf2-form-field-suffix"></ng-content>

    <style>
      .wtf2-form-field-suffix {
        border: red 1px solid;
      }

      .wtf2-form-field-underline {
        background: blue;
      }
    </style>
  `
})
class F {}

@Component({
  styles: [`
    .wtf2-form-field-subscript-wrapper {
      flex-direction: row;
    }
    .wtf2-form-field .wtf2-form-field-label {
      color: lightcoral;
    }
  `]
})
class G {}

@Component({
  // Considering this is SCSS that will be transformed by Webpack loaders.
  styles: [`
    body, html {
      font-family: Roboto, 'Helvetica Neue', sans-serif;
    }
  `]
})
class H {}
