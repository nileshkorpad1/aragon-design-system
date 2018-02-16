import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeComponent } from './tree.component';
import { RouterModule } from '@angular/router';
import { Wtf2SkeletonModule } from '@wtf2/theme/wtf2-components/wtf2-skeleton/skeleton.module';
import { Wtf2SidebarModule } from '@wtf2/theme/wtf2-components/wtf2-sidebar/sidebar.module';
import { Wtf2ListModule } from '@wtf2/theme/wtf2-material/list';
import { Wtf2DividerModule } from '@wtf2/theme/wtf2-material/divider';
import { Wtf2CoreModule } from '@wtf2/theme/wtf2Core.module';
import { TreeFlatComponent } from './tree-flat/tree-flat.component';
import { TreeCheckboxesComponent } from './tree-checkboxes/tree-checkboxes.component';
import { TreeNestedComponent } from './tree-nested/tree-nested.component';
import { TreePartiallyComponent } from './tree-partially/tree-partially.component';
import { Wtf2TreeModule, Wtf2IconModule, Wtf2ProgressBarModule, Wtf2CardModule, Wtf2CheckboxModule, Wtf2FormFieldModule } from '@wtf2/theme/wtf2-material';
const routes = [
  {
    path: 'tree',
    component: TreeComponent,
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
    Wtf2TreeModule,
    Wtf2IconModule,
    Wtf2ProgressBarModule,
    Wtf2CardModule,
    Wtf2CheckboxModule,
    Wtf2FormFieldModule
  ],
  declarations: [TreeComponent, TreeFlatComponent, TreeCheckboxesComponent, TreeNestedComponent, TreePartiallyComponent]
})
export class TreeModule { }
