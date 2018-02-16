import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Wtf2FileUploadComponent } from './wtf2-file-upload.component';
import { Wtf2FormFieldModule, Wtf2IconModule, Wtf2InputModule, Wtf2ButtonModule } from '@wtf2/theme/wtf2-material';
import { Wtf2SkeletonModule } from '@wtf2/theme/wtf2-components/wtf2-skeleton/skeleton.module';
import { Wtf2CoreModule } from '@wtf2/theme/wtf2Core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Wtf2ContentToolbarModule } from '@wtf2/theme/wtf2-components/wtf2-content-toolbar/wtf2-content-toolbar.module';

@NgModule({
    imports: [
        CommonModule,
        Wtf2FormFieldModule,
        Wtf2CoreModule,
        Wtf2SkeletonModule,
        FormsModule,
        Wtf2ContentToolbarModule,
        Wtf2IconModule,
        ReactiveFormsModule,
        Wtf2InputModule,
        Wtf2ButtonModule,
    ],
    declarations: [Wtf2FileUploadComponent],
    exports: [Wtf2FileUploadComponent],
})
export class Wtf2FileUploadModule {}
