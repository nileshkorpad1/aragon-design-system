import { Directive, AfterViewInit, Renderer, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[wtf2SummernoteView]',
})
export class Wtf2SummernoteViewDirective implements AfterViewInit {
  @Input() set wtf2SummernoteView(content: string) {
    this._element.innerHTML = content || '';
  }

  private _element: any;

  constructor(
    private renderer: Renderer,
    element: ElementRef,
  ) {
    this._element = element.nativeElement;
  }

  ngAfterViewInit() {
    this.renderer.setElementClass(this._element, 'wtf2-summernote-view', true);
  }
}
