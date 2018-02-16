import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    DialogComponent,
    DialogDataExampleDialog,
    DialogContentExampleDialog,
} from './dialog.component';
import { RouterModule } from '@angular/router';
import { Wtf2SkeletonModule } from '@wtf2/theme/wtf2-components/wtf2-skeleton/skeleton.module';
import { Wtf2SidebarModule } from '@wtf2/theme/wtf2-components/wtf2-sidebar/sidebar.module';
import { Wtf2ListModule } from '@wtf2/theme/wtf2-material/list';
import { Wtf2DividerModule } from '@wtf2/theme/wtf2-material/divider';
import { Wtf2CoreModule } from '@wtf2/theme/wtf2Core.module';
import { DemoFormComponent } from './demo-form/demo-form.component';
import { Wtf2DialogHideButtonModule } from '@wtf2/theme/wtf2-components/wtf2-dialog-hide-button/wtf2-dialog-hide-button.module.ts';
import { FormComponent } from './form/form.component';
import { DialogBoxViewComponent, CourseDialogComponent, ManageUserDialog } from '../dialog-box-view/dialog-box-view.component';
import { Wtf2SplitButtonModule } from '@wtf2/theme/wtf2-components/wtf2-split-button/wtf2-split-button.module';
import {Wtf2HideButtonModule} from '@wtf2/theme/wtf2-components/wtf2-hide-button/wtf2-hide-button.module';
import { Wtf2FormFieldModule, Wtf2IconModule, Wtf2SelectModule, Wtf2DatepickerModule, Wtf2DialogModule, Wtf2TabsModule, Wtf2StepperModule, Wtf2InputModule } from '@wtf2/theme/wtf2-material';
// import { DynamicFormComponent } from '@wtf2/theme/wtf2-components/wtf2-dynamic-forms/dynamic-form.component';
// import { DynamicFieldDirective } from '@wtf2/theme/wtf2-components/wtf2-dynamic-field/dynamic-field.directive';
const routes = [
    {
        path: 'dialog',
        component: DialogComponent,
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
        Wtf2DialogHideButtonModule,
        Wtf2SplitButtonModule,
        Wtf2HideButtonModule,
        Wtf2FormFieldModule,
        Wtf2IconModule,
        Wtf2SelectModule,
        Wtf2DatepickerModule,
        Wtf2DialogModule,
        Wtf2TabsModule,
        Wtf2StepperModule,
        Wtf2InputModule


    ],
    declarations: [
        DialogComponent,
        DialogDataExampleDialog,
        DialogContentExampleDialog,
        DemoFormComponent,
        FormComponent,
        DialogBoxViewComponent,
        CourseDialogComponent,
        ManageUserDialog,
        // DynamicFormComponent,
        // DynamicFieldDirective,
    ],
    entryComponents: [
        DialogDataExampleDialog,
        DialogContentExampleDialog,
        DemoFormComponent,
        FormComponent,
        DialogBoxViewComponent,
        ManageUserDialog,
        CourseDialogComponent,
    ]
})
export class DialogModule {}
