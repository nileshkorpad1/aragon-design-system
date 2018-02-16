import { Component, OnInit, Input, EventEmitter, Output, ElementRef, Renderer2, ViewChild, Renderer, Directive, ContentChild, AfterContentInit, TemplateRef } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'wtf2-inform-expander-fullwidth',
  templateUrl: './wtf2-inform-expander-fullwidth.component.html',
  styleUrls: ['./wtf2-inform-expander-fullwidth.component.scss'],
  animations: [
    trigger('slideInOut', [
      state(
        'expand',
        style({
          height: '*'
        })
      ),
      state(
        'collapse',
        style({
          height: '0px'
        })
      ),
      transition('collapse => expand', animate('200ms ease-in')),
      transition('expand => collapse', animate('1ms ease-in'))
    ])
  ]
})
export class Wtf2InformExpanderFullwidthComponent implements OnInit {
  SingleColumn: boolean = true;
  @Input() title: string;
  @Input() icon: string;
  menuState: string = 'collapse';
  parent: any;

  // for toggle event
  @Output() toggleExpander = new EventEmitter();
  @ViewChild('content', { static: false }) d1: ElementRef;

  @ViewChild('singleInForm', { static: false }) templatePropName: TemplateRef<any>;

  @ContentChild('content', { static: false }) content: ElementRef;
  constructor(private _elementRef: ElementRef, public render: Renderer2) {}
  ngOnInit() {
    this.parent = this._elementRef.nativeElement.parentElement.parentElement.parentElement;
    this.render;
  }
  ngAfterViewInit() {}

  isOpen() {
    return this.menuState;
  }
  collapse($event) {
    this.menuState = 'collapse';
  }
  expand() {
    this.menuState = 'expand';
  }
  // mainelement
  toggle($event) {
    // this.show = !this.show;
    // this.render.setElementClass($event, 'class');

    var target1 = $event.target;
    var target2 = $event.srcElement;
    var target3 = event.currentTarget;

    // $event.srcElement.nextSibling($event.srcElement, child);
    // console.log($event.srcElement.classList);
    // console.log($event._elementRef.nativeElement.setElementClass('hello'));
    this.menuState = this.menuState === 'collapse' ? 'expand' : 'collapse';

    if (this.menuState === 'collapse') {
      // console.log(this.menuState);
      // // console.log($event.closest('.arrow-up'));
      // console.log($event.ElementRef.nativeElement.closest('.arrow-up'));

      // console.log('Child:', $event.target);
      // console.log('Child:', $event.target.child);
      // console.log('Parent:', $event.target.querySelectorAll('div.arrow-up'));

      $event.target.querySelectorAll('div.arrow-up').forEach(eachObj => {
        eachObj.remove();
      });
      // $event.target.querySelectorAll('div.arrow-up').remove();
      // console.log('Parents parent sibling:', $event.target.parentNode.parentNode.nextSibling);
      // console.log($event.ElementRef.closest('.arrow-up'));

      // $event.ElementRef.removeClass(this.el.nativeElement, 'wild');
    } else {
      const child = document.createElement('div');

      // this.elem.nativeElement.querySelectorAll('.classImLookingFor');

      this.render.addClass(child, 'arrow-up');

      this.render.appendChild($event.srcElement, child);
      console.log(this.menuState);
    }
    this.toggleExpander.emit(this.menuState);
  }

  removeArrows(reference) {
    reference.querySelectorAll('div.arrow-up').forEach(eachObj => {
      eachObj.remove();
    });
  }
}


// @Directive({
//   selector: 'wtf2-expander-toggle,[wtf2-expander-toggle],.wtf2-expander-toggle',
//   host: {
//     class: 'wtf2-page-expander-toggle',
//   },
// })
// export class Wtf2ExpanderToggle implements OnInit {
//   ngOnInit() { }
// }
