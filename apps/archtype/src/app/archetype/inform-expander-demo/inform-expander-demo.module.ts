import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformExpanderDemoComponent } from './inform-expander-demo.component';
import { RouterModule } from '@angular/router';
import { Wtf2SkeletonModule } from '@wtf2/theme/wtf2-components/wtf2-skeleton/skeleton.module';
import { Wtf2SidebarModule } from '@wtf2/theme/wtf2-components/wtf2-sidebar/sidebar.module';
import { Wtf2ListModule } from '@wtf2/theme/wtf2-material/list';
import { Wtf2DividerModule } from '@wtf2/theme/wtf2-material/divider';
import { Wtf2CoreModule } from '@wtf2/theme/wtf2Core.module';
import { Wtf2InformExpanderModule } from '@wtf2/theme/wtf2-components/wtf2-inform-expander/wtf2-inform-expander.module';
import { Wtf2InformExpanderFullwidthModule } from '@wtf2/theme/wtf2-components/wtf2-inform-expander-fullwidth/wtf2-inform-expander-fullwidth.module';
import { Wtf2InformExpanderMultiColModule } from '@wtf2/theme/wtf2-components/wtf2-inform-expander-multicol/wtf2-inform-expander-multicol.module';
import { Wtf2FormFieldModule, Wtf2SelectModule, Wtf2IconModule, Wtf2InputModule } from '@wtf2/theme/wtf2-material';
const routes = [
  {
    path: 'inform-expander',
    component: InformExpanderDemoComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    Wtf2SkeletonModule,
    Wtf2SidebarModule,
    Wtf2ListModule,
    Wtf2DividerModule,
    Wtf2CoreModule,
    Wtf2InformExpanderModule,
    Wtf2InformExpanderFullwidthModule,
    Wtf2InformExpanderMultiColModule,
    Wtf2FormFieldModule,
    Wtf2SelectModule,
    Wtf2IconModule,
    Wtf2InputModule

  ],
  declarations: [InformExpanderDemoComponent]
})
export class InformExpanderDemoModule { }
