import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Wtf2NestedGridComponent } from './wtf2-nested-grid.component';
import { Wtf2SkeletonModule } from '@wtf2/theme/wtf2-components/wtf2-skeleton/skeleton.module';
import { Wtf2SidebarModule } from '@wtf2/theme/wtf2-components/wtf2-sidebar/sidebar.module';
import { Wtf2GridModule } from '@wtf2/theme/wtf2-components/wtf2-grid/wtf2-grid.module';
import { Wtf2DividerModule } from '@wtf2/theme/wtf2-material/divider';
import { Wtf2CoreModule } from '@wtf2/theme/wtf2Core.module';
import { HttpModule } from '@angular/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {
  Wtf2IconModule,
  Wtf2PaginatorModule,
  Wtf2SelectModule,
  Wtf2OptionModule,
  Wtf2CheckboxModule,
  Wtf2TableModule,
  Wtf2ProgressSpinnerModule,
} from '@wtf2/theme/wtf2-material';
@NgModule({
  imports: [
    CommonModule,
    Wtf2IconModule,
  Wtf2PaginatorModule,
  Wtf2SelectModule,
  Wtf2OptionModule,
  Wtf2CheckboxModule,
  Wtf2TableModule,
  Wtf2ProgressSpinnerModule,
  DragDropModule,
  HttpModule,
  Wtf2CoreModule,
  Wtf2DividerModule,
  Wtf2GridModule,
  Wtf2SidebarModule,
  Wtf2SkeletonModule,
  ],
  declarations: [Wtf2NestedGridComponent],
  exports:[Wtf2NestedGridComponent]
})
export class Wtf2NestedGridModule { }
