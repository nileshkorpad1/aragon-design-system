import { ButtonComponent } from './button.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Wtf2SkeletonModule } from '@wtf2/theme/wtf2-components/wtf2-skeleton/skeleton.module';
import { Wtf2SidebarModule } from '@wtf2/theme/wtf2-components/wtf2-sidebar/sidebar.module';
import { Wtf2ListModule } from '@wtf2/theme/wtf2-material/list';
import { Wtf2DividerModule } from '@wtf2/theme/wtf2-material/divider';
import { Wtf2CoreModule } from '@wtf2/theme/wtf2Core.module';
// import { Wtf2PasswordStrengthBar } from '@wtf2/theme/wtf2-components/wtf2-password-strength/Wtf2PasswordStrength';
// // import { Wtf2HideButton } from '@wtf2/theme/wtf2-components/wtf2-hide-button/Wtf2HideButton.ts';
import { Wtf2SplitButtonModule } from '@wtf2/theme/wtf2-components/wtf2-split-button/wtf2-split-button.module';
import { Wtf2IconModule, Wtf2ProgressSpinnerModule } from '@wtf2/theme/wtf2-material';
const routes = [
  {
    path: 'button',
    component: ButtonComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    Wtf2SkeletonModule,
    Wtf2SidebarModule,
    Wtf2ListModule,
    Wtf2DividerModule,
    RouterModule.forChild(routes),
    Wtf2CoreModule,
    Wtf2SplitButtonModule,
    Wtf2IconModule,
    Wtf2ProgressSpinnerModule
  ],
  declarations: [ButtonComponent],
})
export class ButtonModule { }
