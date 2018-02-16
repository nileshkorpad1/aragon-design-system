import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionGridCheckboxComponent, GridCheckboxComponent} from './index';
import { RouterModule } from '@angular/router';
import { Wtf2SkeletonModule } from '@wtf2/theme/wtf2-components/wtf2-skeleton/skeleton.module';
import { Wtf2SidebarModule } from '@wtf2/theme/wtf2-components/wtf2-sidebar/sidebar.module';
import {Wtf2GridModule} from '@wtf2/theme/wtf2-components/wtf2-grid/wtf2-grid.module';
import { Wtf2DividerModule } from '@wtf2/theme/wtf2-material/divider';
import { Wtf2CoreModule } from '@wtf2/theme/wtf2Core.module';
// import { HttpModule } from '@angular/http';
import { CrudDataService } from './grid-crud-example/services/data.service';
import {
  Wtf2IconModule,
  Wtf2PaginatorModule,
  Wtf2SelectModule,
  Wtf2OptionModule,
  Wtf2CheckboxModule,
  Wtf2TableModule,
  Wtf2ProgressSpinnerModule,
  Wtf2MenuModule,
  Wtf2DialogModule,
  Wtf2FormFieldModule,
  Wtf2InputModule,
  Wtf2SortModule,
} from '@wtf2/theme/wtf2-material';
import { DataServiceService } from './data-service.service';
import { GridCrudExampleComponent } from './grid-crud-example/grid-crud-example.component';
import { AddDialogComponent } from './grid-crud-example/dialogs/add/add.dialog.component';
import { EditDialogComponent } from './grid-crud-example/dialogs/edit/edit.dialog.component';
import { DeleteDialogComponent } from './grid-crud-example/dialogs/delete/delete.dialog.component';
import { NestedGridComponent } from './nested-grid/nested-grid.component';
import { DraggableGridComponent } from './draggable-grid/draggable-grid.component';
import { Wtf2DraggableGridModule } from '@wtf2/theme/wtf2-components/wtf2-draggable-grid/wtf2-draggable-grid.module';
const routes = [
  {
    path: 'wtf2-accordion-grid',
    component: AccordionGridCheckboxComponent,
  },
  {
    path: 'wtf2-grid',
    component: GridCheckboxComponent,
  },
  {
    path: 'wtf2-grid-crud',
    component: GridCrudExampleComponent,
  },
  {
    path: 'wtf2-nested-grid',
    component: NestedGridComponent,
  },
  {
    path: 'wtf2-draggable-grid',
    component: DraggableGridComponent,
  },
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    Wtf2SkeletonModule,
    Wtf2SidebarModule,
    Wtf2DividerModule,
    Wtf2CoreModule,
    Wtf2IconModule,
    Wtf2PaginatorModule,
    Wtf2SelectModule,
    Wtf2OptionModule,
    Wtf2CheckboxModule,
    Wtf2TableModule,
    // HttpModule,
    Wtf2GridModule,
    Wtf2ProgressSpinnerModule,
    Wtf2DraggableGridModule,
    Wtf2MenuModule,
    Wtf2DialogModule,
    Wtf2FormFieldModule,
    Wtf2InputModule,
    Wtf2SortModule,
  ],
  declarations: [AccordionGridCheckboxComponent, GridCheckboxComponent, GridCrudExampleComponent, AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent,
    NestedGridComponent,
    DraggableGridComponent,
  ],
  providers: [DataServiceService, CrudDataService],
  entryComponents: [
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent,
  ],
})
export class AccordionGridCheckboxModule { }
