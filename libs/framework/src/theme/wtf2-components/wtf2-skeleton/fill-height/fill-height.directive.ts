import { HostListener, Directive, ElementRef, Input, AfterViewInit } from '@angular/core';
@Directive({ selector: '[fill-height]' })

export class FillHeightDirective implements AfterViewInit {

	@Input() footerElement = null;
	constructor(private el: ElementRef) {
	}

	ngAfterViewInit(): void {
		this.el.nativeElement.style.height = 'auto';
		//console.log(this.el.nativeElement.style.height);
		this.calculateAndSetElementHeight();
		//console.log(this.el.nativeElement.style.height);
	}

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		this.el.nativeElement.style.height = 'auto';
		this.calculateAndSetElementHeight();
	}

	private calculateAndSetElementHeight() {
		// this.el.nativeElement.style.overflow = 'auto';
		if (this.el.nativeElement.classList.contains('carded-page-content')) {

			const windowHeight = window.innerHeight;
			const elementOffsetTop = this.getElementOffsetTop();
			const elementMarginBottom = this.el.nativeElement.style.marginBottom;

			// console.log(this.el.nativeElement.scrollHeight + elementOffsetTop - 10); //542px
			// console.log(window.innerHeight); //644px


			const footerElementMargin = this.getfooterElementMargin();

			if ( (windowHeight) > (this.el.nativeElement.scrollHeight + elementOffsetTop - 10)) {
				this.el.nativeElement.style.height = windowHeight - footerElementMargin - elementOffsetTop + 'px';
				console.log([windowHeight, elementOffsetTop, elementMarginBottom, footerElementMargin, this.el.nativeElement.style.height]);
			}
		}
	}

	private getElementOffsetTop() {
		return this.el.nativeElement.offsetTop + 64 ;
	}

	private getfooterElementMargin() {
		if (!this.footerElement) { return 0; }
		const footerStyle = window.getComputedStyle(this.footerElement);
		return parseInt(footerStyle.height, 10);
	}
}
