import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Wtf2RowDetailsComponent } from './wtf2-row-details/wtf2-row-details.component';
import { CdkTableModule } from '@angular/cdk/table';
import { Wtf2ExpansionModule} from '@wtf2/theme/wtf2-material';
@NgModule({
  imports: [
    CdkTableModule,
    Wtf2ExpansionModule,
  ],
  exports: [
     Wtf2RowDetailsComponent,

  ],
  declarations: [Wtf2RowDetailsComponent],
})
export class Wtf2GridModule { }
