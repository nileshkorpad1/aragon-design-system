import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.scss']
})
export class ProgressbarComponent implements OnInit {
  color = 'primary';
  mode = 'determinate';
  value = 50;
  bufferValue = 75;

  constructor() { }

  ngOnInit() {
  }

}
