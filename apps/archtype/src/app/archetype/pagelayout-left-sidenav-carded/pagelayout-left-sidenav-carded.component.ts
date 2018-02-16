import { Component, OnInit } from '@angular/core';
import { ButtonConfig, col, ShipData } from '@wtf2/theme/wtf2-components/field.interface';
import { Wtf2SidebarService } from '@wtf2/theme/wtf2-components/wtf2-sidebar/sidebar.service';
export const buttonData1: ButtonConfig[] = [

  {
    label: 'ADD',
    icon: 'add',
    selected: false,
    type: 'expand',
    card: [
      {
        avatar: 'add',
        title: 'Add Account',
        description: 'Lorem description',
        action: 'addAccount',
      },
      {
        avatar: 'add',
        title: 'Add Group',
        description: 'Lorem description',
        action: 'addGroup',
      },
    ],
  },
  {
    label: 'Sample 2',
    icon: 'open_in_browser',
    selected: false,
    type: 'expand',
    card: [
      {
        avatar: 'backup',
        title: 'Add Users',
        description: 'No description',
        action: 'addUser',
      },
      {
        avatar: 'book',
        title: 'Import Users',
        description: 'Import description',
        action: 'importUser',
      },
    ],
  },
  {
    label: 'Split Button',
    icon: 'play_arrow',
    selected: false,
    type: 'split-button',
    action: 'splitClick',
    card: [
      {
        avatar: 'backup',
        title: 'Add Users',
        description: 'No description',
        action: 'addUser',
      },
      {
        avatar: 'book',
        title: 'Import Users',
        description: 'Import description',
        action: 'importUser',
      },
    ],
  },
  {
    search: true,
  },
];

@Component({
  selector: 'app-pagelayout-left-sidenav-carded',
  templateUrl: './pagelayout-left-sidenav-carded.component.html',
  styleUrls: ['./pagelayout-left-sidenav-carded.component.scss']
})
export class PagelayoutLeftSidenavCardedComponent implements OnInit {
  buttonData: ButtonConfig[] = buttonData1;

  constructor(private _wtf2SidebarService: Wtf2SidebarService) { }

  ngOnInit() {
  }

  toggleSidebarOpen(key): void {
    this._wtf2SidebarService.getSidebar(key).toggleOpen();
  }

  actionToolbarClickEvents($event) {
    console.log('test');
  }
  testInput($event) {
    console.log('test');
  }

}
