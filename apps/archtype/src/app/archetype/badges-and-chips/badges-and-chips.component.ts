import { OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ThemePalette } from '@angular/material/core';

export interface ChipColor {
  name: string;
  color: ThemePalette;
}

@Component({
  selector: 'app-badges-and-chips',
  templateUrl: './badges-and-chips.component.html',
  styleUrls: ['./badges-and-chips.component.scss']
})
export class BadgesAndChipsComponent implements OnInit {
  availableColors: ChipColor[] = [
    { name: 'none', color: undefined },
    { name: 'Primary', color: 'primary' },
    { name: 'Accent', color: 'accent' },
    { name: 'Warn', color: 'warn' }
  ];

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = ['Lemon'];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('fruitInput', { static: false }) fruitInput: ElementRef<
    HTMLInputElement
  >;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  visible1 = true;
  selectable1 = true;
  removable1 = true;
  OnBlur1 = true;
  addOnBlur = true;
  addOnBlur1 = true;
  readonly separatorKeysCodes1: number[] = [ENTER, COMMA];
  fruits1 = [{ name: 'Lemon' }, { name: 'Lime' }, { name: 'Apple' }];

  add1(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // 1 our fruit
    if ((value || '').trim()) {
      this.fruits1.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove1(fruit): void {
    const index = this.fruits1.indexOf(fruit);

    if (index >= 0) {
      this.fruits1.splice(index, 1);
    }
  }
  removeChip(): void {
    console.log(this);
    // this.remove();
    // this._ref.destroy();
  }

  constructor() {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) =>
        fruit ? this._filter(fruit) : this.allFruits.slice()
      )
    );
  }

  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.fruits.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.fruitCtrl.setValue(null);
    }
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(
      fruit => fruit.toLowerCase().indexOf(filterValue) === 0
    );
  }

  ngOnInit() {}
}
