import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inform-expander-demo',
  templateUrl: './inform-expander-demo.component.html',
  styleUrls: ['./inform-expander-demo.component.scss']
})
export class InformExpanderDemoComponent implements OnInit {

  selected = 'option2';

  constructor() { }

  ngOnInit() {
  }

  openInformExpander(ex1, ex2, ex3, $event, InformExpanderControls) {
    // console.log(ex2.isOpen());
    $event.stopPropagation();

    ex2.collapse();
    ex3.collapse();
    ex1.removeArrows(InformExpanderControls);
    ex1.toggle($event);
  }

  openInformExapnderTwo($event) {
    console.log($event);
  }

  openTwoColumnExpanderBoth(ex1, ex2, $event, InformExpanderControls) {
    ex2.collapse();
    ex1.removeArrows(InformExpanderControls);
    ex1.toggle($event);
  }

}
