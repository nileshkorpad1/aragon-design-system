import { Component, OnInit, Input, ViewChild, TemplateRef, ElementRef, Renderer2, HostBinding } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'wtf2-expander',
  templateUrl: './wtf2-expander.component.html',
  styleUrls: ['./wtf2-expander.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('true', style({
        height: '*',
      })),
      state('false', style({
        height: '0px',
      })),
      transition('false => true', animate('200ms ease-in')),
      transition('true => false', animate('1ms ease-in')),
    ]),
  ]
})
export class Wtf2ExpanderComponent implements OnInit {

  protected _elementClass = 'col-12';
  @HostBinding('class.col-12') hostClass: boolean = true;
  @Input() active = false;
  @Input() calledBy;
  @ViewChild('itemTemplate',{static:false})
  template: TemplateRef<any>;
  constructor(private _elementRef: ElementRef, public render: Renderer2) { }


  toggle(event) {
    let currentButton = event.target;
    let currentExpander = this._elementRef;
    let buttonColumn = ((event.target).closest('.col'));
    let targetRow = ((event.target).closest('.row'));
    let allControlColumns = ((event.target).closest('.row')).querySelectorAll('div.col');
    let allColumns = ((event.target).closest('.row')).querySelectorAll('.col');

    let computedStyleForCol = window.getComputedStyle(buttonColumn);
    let columnWidth = computedStyleForCol.getPropertyValue('max-width');

    if (!this.active) {

      currentExpander.nativeElement.classList.forEach(item => {
        if (item.startsWith('order-')) {
          currentExpander.nativeElement.classList.remove(item);
        }
      });

      allControlColumns.forEach(item => {
        console.log(item.classList);
        item.classList.forEach(itemEach => {
          if (itemEach.startsWith('order-')) {
            item.classList.remove(itemEach);
          }
        });

      });

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
    event.stopPropagation();
    this.active = !this.active;
  }

  ngOnInit() {
    this.hostClass = true;
  }

}
