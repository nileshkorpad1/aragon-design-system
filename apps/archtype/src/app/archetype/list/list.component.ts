import { Component, OnInit } from '@angular/core';
import { Wtf2SnackBar } from '@wtf2/theme/wtf2-material';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
    // let messages: { from: number, subject: string, content: string }[] = [
    //   { "from": 0, "subject": "Available", "content": "Available" },
    //   { "from": 1, "subject": "Ready", "content": "Available" },
    //   { "from": 2, "subject": "Started", "content": "Available" }
    // ];
    links = ['Windstorm', 'Bombasto', 'Magneta', 'Tornado'];
    typesOfShoes: string[] = [
        'Boots',
        'Clogs',
        'Loafers',
        'Moccasins',
        'Sneakers',
    ];

  constructor(private snackBar: Wtf2SnackBar) {
        // links = ['Link 1', 'Link 2', 'Link 3', 'Link 4']
    }

    ngOnInit() {}

    showInfo(link) {
      console.log(link);
      this.snackBar.open('Yor are clicked on link ' + link, 'Success', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });

    }
    selectionItem(item) {
      this.snackBar.open('You have clicked on ' + item, 'Success', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }
  selectionOption($event, option: any, shoe: string) {
    if (option.selected) {
      this.snackBar.open('Yor are selected ' + shoe, 'Success', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } else {

      this.snackBar.open('Yor are unselected ' + shoe, 'Success', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }
    }
}
