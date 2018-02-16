import { Component, OnInit, Input, Directive,ViewEncapsulation, HostBinding, ElementRef, Renderer2 } from '@angular/core';
import { convertToBoolProperty } from '../helpers';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ThemePalette } from '@wtf2/theme/wtf2-material';


@Component({
  selector: 'wtf2-quote,[wtf2-quote]',
  host: {
    'role': 'blockquote',
    '[attr.aria-orientation]': 'right ? "right" : "left"',
    '[class.wtf2-quote-right]': 'right',
    '[class.wtf2-quote-left]': '!right',
    'class': 'wtf2-quote',
  },
  template: '<ng-content></ng-content>',
  styleUrls: ['./wtf2-quote.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class Wtf2QuoteComponent implements OnInit {

  private _right: boolean = false;

  constructor(
    private _elementRef: ElementRef<HTMLElement>)
    {}

    // @HostBinding('class') class = 'wtf2-quote';
  @Input('right')
  get right(): boolean { return this._right; }
  set right(value: boolean) { this._right = coerceBooleanProperty(value); }


  /** The color of the badge. Can be `primary`, `accent`, or `warn`. */
  @Input('color')
  get color(): ThemePalette { return this._color; }
  set color(value: ThemePalette) {
    this._setColor(value);
    this._color = value;
  }
  private _color: ThemePalette = 'primary';

  private _setColor(colorPalette: ThemePalette) {
    if (colorPalette !== this._color) {
      if (this._color) {
        this._elementRef.nativeElement.classList.remove(`wtf2-${this._color}-border`);
      }
      if (colorPalette) {
        this._elementRef.nativeElement.classList.add(`wtf2-${colorPalette}-border`);
      }
    }
  }

  ngOnInit() { }
}

