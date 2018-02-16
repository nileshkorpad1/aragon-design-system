import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagelayout-left-sidenav-simple',
  templateUrl: './pagelayout-left-sidenav-simple.component.html',
  styleUrls: ['./pagelayout-left-sidenav-simple.component.scss']
})
export class PagelayoutLeftSidenavSimpleComponent implements OnInit {

  constructor() { }

  toggleSidebar(eventValue: string) {
    console.log(eventValue);
  }

  ngOnInit() {
  }

}
