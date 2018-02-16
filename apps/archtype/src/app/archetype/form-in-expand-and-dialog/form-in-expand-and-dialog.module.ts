import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormInExpandAndDialogComponent, DialogContent } from './form-in-expand-and-dialog.component';
import { FormDataComponent } from './form-data/form-data.component';
import { RouterModule } from '@angular/router';
import { Wtf2SkeletonModule } from '@wtf2/theme/wtf2-components/wtf2-skeleton/skeleton.module';
import { Wtf2SidebarModule } from '@wtf2/theme/wtf2-components/wtf2-sidebar/sidebar.module';
import { Wtf2DividerModule } from '@wtf2/theme/wtf2-material/divider';
import { Wtf2CoreModule } from '@wtf2/theme/wtf2Core.module';
import { Wtf2InformExpanderModule } from '@wtf2/theme/wtf2-components/wtf2-inform-expander/wtf2-inform-expander.module';
import { path } from 'd3';
import { Wtf2CardModule, Wtf2InputModule, Wtf2FormFieldModule, Wtf2DatepickerModule, Wtf2SelectModule, Wtf2IconModule } from '@wtf2/theme/wtf2-material';

const routes = [{
  path : 'expand-and-dialog',
  component: FormInExpandAndDialogComponent,

}]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    Wtf2SkeletonModule,
    Wtf2SidebarModule,
    Wtf2DividerModule,
    Wtf2CoreModule,
    Wtf2InformExpanderModule,
    Wtf2CardModule,
    Wtf2InputModule,
    Wtf2FormFieldModule,
    Wtf2DatepickerModule,
    Wtf2SelectModule,
    Wtf2IconModule
  ],
  declarations: [FormInExpandAndDialogComponent, DialogContent, FormDataComponent],
  entryComponents: [
    DialogContent,
  ],
  exports: [FormDataComponent],
})
export class FormInExpandAndDialogModule { }
