import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadDemoComponent } from './file-upload-demo.component';
import { RouterModule } from '@angular/router';
import { Wtf2SkeletonModule } from '@wtf2/theme/wtf2-components/wtf2-skeleton/skeleton.module';
import { Wtf2CoreModule } from '@wtf2/theme/wtf2Core.module';
import { Wtf2FileUploadModule } from '@wtf2/theme/wtf2-components/wtf2-file-upload/wtf2-file-upload.module';

const Routes = [
    {
        path: 'wtf2-file-upload-demo-component',
        component: FileUploadDemoComponent,
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(Routes),
        Wtf2SkeletonModule,
        Wtf2CoreModule,
        Wtf2FileUploadModule,
    ],
    declarations: [FileUploadDemoComponent],
})
export class FileUploadDemoModule {}
