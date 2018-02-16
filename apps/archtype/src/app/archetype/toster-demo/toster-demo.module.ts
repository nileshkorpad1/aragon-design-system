import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Wtf2SkeletonModule } from '@wtf2/theme/wtf2-components/wtf2-skeleton/skeleton.module';
import { Wtf2CoreModule } from '@wtf2/theme/wtf2Core.module';
import { Wtf2FormFieldModule, Wtf2RadioModule, Wtf2CheckboxModule, Wtf2InputModule, Wtf2SnackBarModule, Wtf2ButtonModule } from '@wtf2/theme/wtf2-material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Wtf2ContentToolbarModule } from '@wtf2/theme/wtf2-components/wtf2-content-toolbar/wtf2-content-toolbar.module';
import { TosterDemoComponent } from './toster-demo.component';
// import { Wtf2ToastrModule } from '@wtf2/theme/wtf2-components';

const routes = [
  {
    path: 'wtf2-toster-demo',
    component: TosterDemoComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    Wtf2CoreModule,
    Wtf2SkeletonModule,
    CommonModule,
    FormsModule,
    Wtf2FormFieldModule,
    Wtf2ContentToolbarModule,
    Wtf2RadioModule,
    Wtf2CheckboxModule,
    Wtf2InputModule,
    Wtf2SnackBarModule,
    Wtf2ButtonModule,
    // Wtf2ToastrModule.forRoot(),
    // Wtf2ToastrModule
  ],
  declarations: [TosterDemoComponent],
})
export class TosterDemoModule {}
