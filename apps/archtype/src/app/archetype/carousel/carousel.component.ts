import { Component, OnInit } from '@angular/core';
import { IImage } from '@wtf2/theme/wtf2-components/wtf2-carousel/IImage.ts';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {


  imageUrls: (string | IImage)[] = [
    {
      url: 'https://desk.sg/image/catalog/slider1.png',
      caption: 'The first slide',
      // href: '#config',
      // title: 'Wtf2 Demo Carousel 1',
      // description: 'The argument in favor of using filler text goes something like this: If you use real content in the design process, anytime you reach a review point you’ll end up reviewing and negotiating the content itself and not the design. This will just slow down the design process. Design first, with real content in mind (of course!), but don’t drop in the real content until the design is well on its way. Using filler text avoids the inevitable argumentation that accompanies the use of real content in the design process.',
    },
    {
      url: 'https://desk.sg/image/catalog/slider2.png',
      // title: 'Wtf2 Demo Carousel 2',
      // description: 'Those opposed to using filler text of any sort counter by saying: The ultimate purpose of any digital product, whether a website, app, or HTML email, is to showcase real content, not to showcase great design. You can’t get a true sense for how your content plays with your design unless you use the real thing!',
    },
    {
      url: 'https://desk.sg/image/catalog/slider3.png',
      caption: 'Apple TV',
      // href: 'https://www.apple.com/',
      // title: 'Wtf2 Demo Carousel 3',
      // description: 'Before things get too heated, let us jump in and say that both sides make valid points. Using real content during design can distract designers and design review teams alike away from the design, and insisting on always using publication-ready content can be a real drag on the design process.',
    },
    {
      url: 'https://desk.sg/image/catalog/slider5.png',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      // title: 'Wtf2 Demo Carousel 4',
      // description: 'We propose a compromise: Only use filler text that has been edited for length and format to match the characteristics of real content as closely as possible, and use real content where possible, and where it doesn’t create too much distraction. Relax and do whatever fits with your design process. Don’t set a lot of restrictive hard-and-fast rules. Use filler text where it helps your design process, but use real content if you’ve got it, as long as it doesn’t distract and slow down your design process.',
    }
  ];

  height: string = '300px';
  minHeight: string;
  // minHeight: string;
  arrowSize: string = '30px';
  showArrows: boolean = true;
  disableSwiping: boolean = false;
  autoPlay: boolean = true;
  autoPlayInterval: number = 3333;
  stopAutoPlayOnSlide: boolean = true;
  debug: boolean = false;
  backgroundSize: string = 'cover';
  backgroundPosition: string = 'center center';
  backgroundRepeat: string = 'no-repeat';
  showDots: boolean = true;
  dotColor: string = '#a5a5a5';
  showCaptions: boolean = true;
  captionColor: string = '#FFF';
  captionBackground: string = 'rgba(0, 0, 0, .35)';
  lazyLoad: boolean = false;
  hideOnNoSlides: boolean = false;
  width: string = '100%';
  fullscreen: boolean = false;
  direction: string = 'vertical';

  constructor() { }

  ngOnInit() {
  }

}
