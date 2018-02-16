import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormfieldComponent } from './formfield.component';
import { RouterModule } from '@angular/router';
import { Wtf2SkeletonModule } from '@wtf2/theme/wtf2-components/wtf2-skeleton/skeleton.module';
import { Wtf2SidebarModule } from '@wtf2/theme/wtf2-components/wtf2-sidebar/sidebar.module';
import { Wtf2ListModule } from '@wtf2/theme/wtf2-material/list';
import { Wtf2DividerModule } from '@wtf2/theme/wtf2-material/divider';
import { Wtf2CoreModule } from '@wtf2/theme/wtf2Core.module';
import { Wtf2FormFieldModule, Wtf2InputModule, Wtf2SelectModule, Wtf2IconModule, Wtf2RadioModule, Wtf2CheckboxModule } from '@wtf2/theme/wtf2-material';

const routes = [
  {
    path: 'formfield',
    component: FormfieldComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    Wtf2SkeletonModule,
    Wtf2SidebarModule,
    Wtf2ListModule,
    Wtf2DividerModule,
    Wtf2CoreModule,
    RouterModule.forChild(routes),
    Wtf2FormFieldModule,
    Wtf2InputModule,
    Wtf2SelectModule,
    Wtf2IconModule,
    Wtf2RadioModule,
    Wtf2CheckboxModule

  ],
  declarations: [FormfieldComponent],
})
export class FormfieldModule { }
