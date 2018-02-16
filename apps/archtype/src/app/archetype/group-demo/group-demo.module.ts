import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Wtf2SkeletonModule } from '@wtf2/theme/wtf2-components/wtf2-skeleton/skeleton.module';
import { Wtf2CoreModule } from '@wtf2/theme/wtf2Core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Wtf2FormFieldModule, Wtf2IconModule, Wtf2InputModule, Wtf2SelectModule, Wtf2DialogModule } from '@wtf2/theme/wtf2-material';
import { Wtf2ContentToolbarModule } from '@wtf2/theme/wtf2-components/wtf2-content-toolbar/wtf2-content-toolbar.module';
import { Wtf2ExpansionToolbarModule } from '@wtf2/theme/wtf2-components/wtf2-expansion-toolbar/wtf2-expansion-toolbar.module';
import {
    GroupDemoComponent,
    GroupCreateDialogComponent,
} from './group-demo.component';
import { GroupDemoService } from './group-demo.service';
const routes = [
    {
        path: 'wtf2-group-demo-component',
        component: GroupDemoComponent,
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        Wtf2SkeletonModule,
        Wtf2CoreModule,
        FormsModule,
        Wtf2FormFieldModule,
        Wtf2ContentToolbarModule,
        Wtf2ExpansionToolbarModule,
        Wtf2IconModule,
        Wtf2InputModule,
        ReactiveFormsModule,
        Wtf2SelectModule,
        Wtf2DialogModule
    ],
    providers: [GroupDemoService],
    declarations: [GroupDemoComponent, GroupCreateDialogComponent],
    entryComponents: [GroupDemoComponent, GroupCreateDialogComponent],
})
export class GroupDemoModule {}
