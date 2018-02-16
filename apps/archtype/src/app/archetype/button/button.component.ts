import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openTest() {
    console.log("primary");
  }
  openTestWarn() {
    console.log("warn");
  }
  openTestAccent() {
    console.log("Accent");
  }

}
