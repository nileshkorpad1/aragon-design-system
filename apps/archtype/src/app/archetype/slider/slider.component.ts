import { Component, OnInit } from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  autoTicks = false;
  disabled = false;
  invert = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;
  vertical = false;
  startRange1value: number = 80;
  rangeslideData = { range_start: 10, range_end: 500 };

  ngOnInit() {}
  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  get tickInterval(): number | 'auto' {
    return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
  }
  set tickInterval(value) {
    this._tickInterval = coerceNumberProperty(value);
  }
  onSliderChange(selectedValues: number[]) {
    //this._currentValues = selectedValues;
    console.log(selectedValues);
  }
  private _tickInterval = 1;
}
