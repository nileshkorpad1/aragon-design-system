import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WYSIWYGLayoutComponent } from './wysiwyg-layout.component';
import { RouterModule } from '@angular/router';
import { Wtf2SkeletonModule } from '@wtf2/theme/wtf2-components/wtf2-skeleton/skeleton.module';
import { Wtf2SidebarModule } from '@wtf2/theme/wtf2-components/wtf2-sidebar/sidebar.module';
import { Wtf2ListModule } from '@wtf2/theme/wtf2-material/list';
import { Wtf2DividerModule } from '@wtf2/theme/wtf2-material/divider';
import { Wtf2CoreModule } from '@wtf2/theme/wtf2Core.module';
// import { Wtf2IconModule } from '@wtf2/theme/wtf2-material';
import { Wtf2GridModule } from '@wtf2/theme/wtf2-components/wtf2-grid/wtf2-grid.module';
import { HttpModule } from '@angular/http';
import {
  Wtf2PaginatorModule,
  Wtf2SelectModule,
  Wtf2OptionModule,
  Wtf2CheckboxModule,
  Wtf2ProgressSpinnerModule,
  Wtf2DatepickerModule,
  Wtf2InputModule,
} from '@wtf2/theme/wtf2-material';
import { Wtf2TableModule, Wtf2IconModule } from '@wtf2/theme/wtf2-material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Wtf2SplitButtonModule } from '@wtf2/theme/wtf2-components/wtf2-split-button/wtf2-split-button.module';
import { Wtf2InlineEditorModule } from '@wtf2/theme/wtf2-components/wtf2-inline-editor/wtf2-inline-editor.module';
import { Wtf2QuoteModule } from '@wtf2/theme/wtf2-components/wtf2-quote/wtf2-quote.module';
import { DataServiceService } from './data-service.service';

const routes = [
  {
    path: 'wysiwyg-layout',
    component: WYSIWYGLayoutComponent,
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
    // Wtf2IconModule,
    // InlineEditorModule,
    // Wtf2InlineModule,
    Wtf2InlineEditorModule,
    Wtf2PaginatorModule,
    Wtf2SelectModule,
    Wtf2OptionModule,
    Wtf2CheckboxModule,
    Wtf2ProgressSpinnerModule,
    Wtf2SplitButtonModule,
    Wtf2GridModule,
    HttpModule,
    Wtf2TableModule,
    Wtf2IconModule,
    DragDropModule,
    Wtf2QuoteModule,
    Wtf2DatepickerModule,
    Wtf2InputModule
  ],
  exports: [WYSIWYGLayoutComponent],
  providers: [DataServiceService,],
  declarations: [WYSIWYGLayoutComponent]
})
export class WYSIWYGLayoutModule { }
