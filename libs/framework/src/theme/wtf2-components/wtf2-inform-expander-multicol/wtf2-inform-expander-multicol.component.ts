import { Component, OnInit, QueryList, ContentChildren, AfterContentInit, ElementRef, Renderer2, Input } from '@angular/core';
import { Wtf2ExpanderComponent } from './wtf2-expander/wtf2-expander.component';

import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';


@Component({
  selector: 'wtf2-inform-expander-multicol',
  templateUrl: './wtf2-inform-expander-multicol.component.html',
  styleUrls: ['./wtf2-inform-expander-multicol.component.scss']
})
export class Wtf2InformExpanderMultiColComponent implements OnInit, AfterContentInit {

  // @Input()
  // columns = 2;

  @ContentChildren(Wtf2ExpanderComponent) expanders: QueryList<Wtf2ExpanderComponent>;
  // @ContentChildren(Wtf2ExpanderControlComponent) expanderControls1: QueryList<Wtf2ExpanderControlComponent>;
  // @ContentChildren(Test1Component) Test1Component: QueryList<Test1Component>;

  constructor(private _elementRef: ElementRef, public render: Renderer2, public breakpointObserver: BreakpointObserver) { }


  ngAfterContentInit() {
    // console.log(this.expanders);
  }


  toggle(event, tab: any) {

    event.stopPropagation();
    // deactivate all tabs
    this.expanders.toArray().forEach(function (eachTab) {
      if (eachTab !== tab) {
        eachTab.active = false;
      }
      event.target.querySelectorAll('div.arrow-up').forEach(eachObj => {
        eachObj.remove();
      });
    });
    this._elementRef.nativeElement.querySelectorAll('div.arrow-up').forEach(eachObj => {
      eachObj.remove();
    });


    ////responsive design for inform expander
    let currentButton = event.target;
    let currentExpander = tab._elementRef;
    let buttonColumn = ((event.target).closest('.col'));
    let targetRow = ((event.target).closest('.row'));
    let allControlColumns = ((event.target).closest('.row')).querySelectorAll('div.col');
    let allColumns = ((event.target).closest('.row')).querySelectorAll('.col');

    let computedStyleForCol = window.getComputedStyle(buttonColumn);
    let columnWidth = computedStyleForCol.getPropertyValue('max-width');
    let rowWidth = columnWidth;


    if (!tab.active) {
      //setting expander caller
      tab.calledBy = event;

      currentExpander.nativeElement.classList.forEach(item => {
        if (item.startsWith('order-')) {
          currentExpander.nativeElement.classList.remove(item);
        }
      });

      allControlColumns.forEach(item => {
        // console.log(item.classList);
        item.classList.forEach(itemEach => {
          if (itemEach.startsWith('order-')) {
            item.classList.remove(itemEach);
          }
        });
      });

      // console.log(columnWidth);

      if (columnWidth == '100%') {
        var previeousColumn;
        var skippedIndex;
        var allIndexes = 1;;
        allControlColumns.forEach(function (element, index) {
          let tempIndex = index + 1;
          allIndexes = allIndexes + 1;
          if (previeousColumn !== buttonColumn) {
            element.classList.add('order-' + tempIndex);
          } else {
            skippedIndex = index + 1;
            index = index + 1;
            element.classList.add('order-' + (tempIndex + 1));
          }
          previeousColumn = element;
        });

        if (!skippedIndex) {
          skippedIndex = allIndexes;
        }
        currentExpander.nativeElement.classList.add('order-' + skippedIndex);
      }
      else {
        currentExpander.nativeElement.classList.add('order-last');
      }
    }

    if (!tab.active) {
      const child = document.createElement('div');
      this.render.addClass(child, 'arrow-up');
      this.render.appendChild(event.srcElement, child);
    }


    // activate the tab the user has clicked on.
    tab.active = !tab.active;
  }


  //collapse expander using passed expander reference
  collapse(tab: any) {
    // console.log('collapse');
    // activate the tab the user has clicked on.
    tab.active = false;
    let NodeListArrows = (this._elementRef.nativeElement).querySelectorAll('div.arrow-up');
    NodeListArrows.forEach(item => {
      item.remove();
    });
  }


  //collapse all expanders
  collapseAll() {
    // console.log(this.expanders);
    // activate the tab the user has clicked on.
    this.expanders.toArray().forEach(function (eachTab) {
      eachTab.active = false;
    });

    let NodeListArrows = (this._elementRef.nativeElement).querySelectorAll('div.arrow-up');

    NodeListArrows.forEach(item => {
      item.remove();
    });
  }



  ngOnInit() {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .subscribe((state: BreakpointState) => {

        // remove order and reset to default
        let NodeListControls = (this._elementRef.nativeElement).querySelectorAll('div.col');
        NodeListControls.forEach(item => {
          item.classList.forEach(itemEach => {
            if (itemEach.startsWith('order-')) {
              item.classList.remove(itemEach);
            }
          });
        });

        /// to remove arrows
        let NodeListArrows = (this._elementRef.nativeElement).querySelectorAll('div.arrow-up');
        NodeListArrows.forEach(item => {
          item.remove();
        });

        //collapse expander while resize
        this.expanders.toArray().forEach(function (eachTab) {
            eachTab.active = false;
        });
      });
  }


  getPosition() {

  }

}
