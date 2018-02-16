import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent, DialogDataExampleDialog } from './select.component';
import { RouterModule } from '@angular/router';
import { Wtf2SkeletonModule } from '@wtf2/theme/wtf2-components/wtf2-skeleton/skeleton.module';
import { Wtf2SidebarModule } from '@wtf2/theme/wtf2-components/wtf2-sidebar/sidebar.module';
import { Wtf2ListModule } from '@wtf2/theme/wtf2-material/list';
import { Wtf2DividerModule } from '@wtf2/theme/wtf2-material/divider';
import { Wtf2CoreModule } from '@wtf2/theme/wtf2Core.module';
import { Wtf2SelectModule, Wtf2FormFieldModule, Wtf2IconModule, Wtf2CheckboxModule, Wtf2InputModule } from '@wtf2/theme/wtf2-material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
const routes = [
  {
    path: 'select',
    component: SelectComponent,
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
    Wtf2SelectModule,
    Wtf2FormFieldModule,
    Wtf2IconModule,
    Wtf2CheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    Wtf2InputModule
  ],
  declarations: [SelectComponent, DialogDataExampleDialog],
  entryComponents: [DialogDataExampleDialog],
})
export class SelectModule {}
