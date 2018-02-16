import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatepickerComponent } from './datepicker.component';
import { RouterModule } from '@angular/router';
import { Wtf2SkeletonModule } from '@wtf2/theme/wtf2-components/wtf2-skeleton/skeleton.module';
import { Wtf2SidebarModule } from '@wtf2/theme/wtf2-components/wtf2-sidebar/sidebar.module';
import { Wtf2ListModule } from '@wtf2/theme/wtf2-material/list';
import { Wtf2DividerModule } from '@wtf2/theme/wtf2-material/divider';
import { Wtf2CoreModule } from '@wtf2/theme/wtf2Core.module';
import {
  Wtf2DatepickerModule,
  Wtf2NativeDateModule,
  Wtf2InputModule,
  Wtf2IconModule,
} from '@wtf2/theme/wtf2-material';


const routes = [
  {
    path: 'datepicker',
    component: DatepickerComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    Wtf2SkeletonModule,
    Wtf2SidebarModule,
    Wtf2ListModule,
    Wtf2DividerModule,
    RouterModule.forChild(routes),
    Wtf2CoreModule,
    Wtf2DatepickerModule,
    Wtf2NativeDateModule,
    Wtf2InputModule,
    Wtf2IconModule
  ],
  declarations: [DatepickerComponent]
})
export class DatepickerModule { }
