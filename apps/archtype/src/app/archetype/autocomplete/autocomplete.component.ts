import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface State {
  statename: string;
  population: string;
}
export interface StateGroup {
  letter: string;
  names: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};
export interface User {
  username: string;
}

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent implements OnInit {
  stateForm: FormGroup = this.fb.group({
    stateGroup: '',
  });

  stateCtrl = new FormControl();
  filteredStates: Observable<State[]>;
  optionsarray: User[] = [
    { username: 'Mary' },
    { username: 'Shelley' },
    { username: 'Igor' },
    { username: 'Bhupesh' },
  ];

  optionsFilterAuto: string[] = ['One', 'Two', 'Three'];
  filteredNumOptions: Observable<string[]>;
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  filteredUserOptions: Observable<User[]>;
  states: State[] = [
    {
      statename: 'Uttar Pradesh',
      population: '16.49%',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
    },
    {
      statename: 'Maharashtra',
      population: '9.28%',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
    },
    {
      statename: 'Bihar',
      population: '8.58%',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
    },
    {
      statename: 'West Bengal',
      population: '7.55%',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
    },
    {
      statename: 'Madhya Pradesh',
      population: '6.00%',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
    },
    {
      statename: 'Tamil Nadu',
      population: '5.96%',
    },
    {
      statename: 'Rajasthan',
      population: '5.67%',
    },
    {
      statename: 'Karnataka',
      population: '5.05%',
    },
    {
      statename: 'Gujarat',
      population: '5.00%',
    },
    {
      statename: 'Andhra Pradesh',
      population: '4.08%',
    },
    {
      statename: 'Odisha',
      population: '3.47%',
    },
    {
      statename: 'Telangana',
      population: '2.97%',
    },
    {
      statename: 'Kerala',
      population: '2.76%',
    },
    {
      statename: 'Jharkhand',
      population: '2.72%',
    },
    {
      statename: 'Assam',
      population: '2.58%',
    },
    {
      statename: 'Punjab',
      population: '2.30%',
    },
    {
      statename: 'Chhattisgarh',
      population: '2.11%',
    },
    {
      statename: 'Haryana',
      population: '2.09%',
    },
    {
      statename: 'Jammu and Kashmir',
      population: '1.04%',
    },
    {
      statename: 'Uttarakhand',
      population: '0.84%',
    },
    {
      statename: 'Himachal Pradesh',
      population: '0.57%',
    },
    {
      statename: 'Tripura',
      population: '0.30%',
    },
    {
      statename: 'Meghalaya',
      population: '0.24%',
    },
    {
      statename: 'Manipur',
      population: '0.22%',
    },
    {
      statename: 'Nagaland',
      population: '0.16%',
    },
    {
      statename: 'Goa',
      population: '0.12%',
    },
    {
      statename: 'Goa',
      population: '0.11%',
    },
    {
      statename: 'Goa',
      population: '0.09%',
    },
    {
      statename: 'Sikkim',
      population: '0.05%',
    },
  ];

  stateGroups: StateGroup[] = [
    {
      letter: 'A',
      names: ['Andhra Pradesh', 'Arunachal Pradesh ', 'Assam'],
    },
    {
      letter: 'B',
      names: ['Bihar'],
    },
    {
      letter: 'C',
      names: ['Chhattisgarh'],
    },
    {
      letter: 'G',
      names: ['Goa', 'Gujarat'],
    },
    {
      letter: 'H',
      names: ['Haryana', 'Himachal Pradesh'],
    },
    {
      letter: 'J',
      names: ['Jammu and Kashmir', 'Jharkhand'],
    },
    {
      letter: 'K',
      names: ['Karnataka', 'Kerala'],
    },
    {
      letter: 'M',
      names: [
        'Madhya Pradesh',
        'Maharashtra',
        'Manipur',
        'Meghalaya',
        'Mizoram',
      ],
    },
    {
      letter: 'N',
      names: ['Nagaland'],
    },
    {
      letter: 'O',
      names: ['Odisha'],
    },
    {
      letter: 'P',
      names: ['Punjab'],
    },
    {
      letter: 'R',
      names: ['Rajasthan'],
    },
    {
      letter: 'S',
      names: ['Sikkim'],
    },
    {
      letter: 'T',
      names: ['Tamil Nadu', 'Telangana', 'Tripura '],
    },
    {
      letter: 'U',
      names: ['Uttar Pradesh', 'Uttarakhand'],
    },
    {
      letter: 'W',
      names: ['West Bengal'],
    },
  ];

  stateGroupOptions: Observable<StateGroup[]>;

  myControl = new FormControl();
  constructor(private fb: FormBuilder) {
    this.filteredStates = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map(state => (state ? this._filterStates(state) : this.states.slice())),
    );
  }

  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();

    return this.states.filter(
      state => state.statename.toLowerCase().indexOf(filterValue) === 0,
    );
  }
  ngOnInit() {
    this.filteredUserOptions = this.myControl.valueChanges.pipe(
      startWith<string | User>(''),
      map(value => (typeof value === 'string' ? value : value.username)),
      map(username =>
        username ? this._filter(username) : this.optionsarray.slice(),
      ),
    );
    this.filteredNumOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterNum(value)),
    );
    this.stateGroupOptions = this.stateForm
      .get('stateGroup')!
      .valueChanges.pipe(
        startWith(''),
        map(value => this._filterGroup(value)),
      );
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterhightlight(value)),
    );
  }
  private _filterhightlight(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(
      option => option.toLowerCase().indexOf(filterValue) === 0,
    );
  }

  private _filterGroup(value: string): StateGroup[] {
    if (value) {
      return this.stateGroups
        .map(group => ({
          letter: group.letter,
          names: _filter(group.names, value),
        }))
        .filter(group => group.names.length > 0);
    }

    return this.stateGroups;
  }
  private _filterNum(value: string): string[] {
    const filterValuenum = value.toLowerCase();

    return this.optionsFilterAuto.filter(option =>
      option.toLowerCase().includes(filterValuenum),
    );
  }
  displayFn(user?: User): string | undefined {
    return user ? user.username : undefined;
  }

  private _filter(username: string): User[] {
    const filterValueusername = username.toLowerCase();

    return this.optionsarray.filter(
      option => option.username.toLowerCase().indexOf(filterValueusername) === 0,
    );
  }
}
