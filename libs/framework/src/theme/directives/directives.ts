import { NgModule } from '@angular/core';

import { Wtf2IfOnDomDirective } from './wtf2-if-on-dom/wtf2-if-on-dom.directive';
import { Wtf2InnerScrollDirective } from './wtf2-inner-scroll/wtf2-inner-scroll.directive';
import { Wtf2PerfectScrollbarDirective } from './wtf2-perfect-scrollbar/wtf2-perfect-scrollbar.directive';
import { Wtf2ClickStopPropagation } from './wtf2-click-stop-propagation';
import { ScrollToDirective } from './wtf2-smooth-scroll/scroll-to.directive';
import { Wtf2MatSidenavHelperDirective, Wtf2MatSidenavTogglerDirective } from './wtf2-mat-sidenav/wtf2-mat-sidenav.directive';
import { ScrollSpyDirective } from '../wtf2-components/wtf2-scroll-spy/wtf2-scroll-spy.directive';
@NgModule({
  declarations: [
    Wtf2IfOnDomDirective,
    Wtf2InnerScrollDirective,
    Wtf2MatSidenavHelperDirective,
    Wtf2MatSidenavTogglerDirective,
    Wtf2PerfectScrollbarDirective,
    Wtf2ClickStopPropagation,
    ScrollToDirective,
    ScrollSpyDirective
  ],
  imports: [],
  exports: [
    Wtf2IfOnDomDirective,
    Wtf2InnerScrollDirective,
    Wtf2MatSidenavHelperDirective,
    Wtf2MatSidenavTogglerDirective,
    Wtf2PerfectScrollbarDirective,
    Wtf2ClickStopPropagation,
    ScrollToDirective,
    ScrollSpyDirective
  ]
})
export class Wtf2DirectivesModule {}
