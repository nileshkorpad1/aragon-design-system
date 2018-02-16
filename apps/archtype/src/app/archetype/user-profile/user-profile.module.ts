import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { RouterModule } from '@angular/router';
import { Wtf2SkeletonModule } from '@wtf2/theme/wtf2-components/wtf2-skeleton/skeleton.module';
import { Wtf2SidebarModule } from '@wtf2/theme/wtf2-components/wtf2-sidebar/sidebar.module';
import { Wtf2ListModule } from '@wtf2/theme/wtf2-material/list';
import { Wtf2DividerModule } from '@wtf2/theme/wtf2-material/divider';
import { Wtf2CoreModule } from '@wtf2/theme/wtf2Core.module';
import { Wtf2PasswordStrengthModule } from '@wtf2/theme/wtf2-components/wtf2-password-strength/wtf2-password-strength.module';
import { TranslateModule } from '@ngx-translate/core';
import {PerfectScrollbarModule} from '@wtf2/theme/wtf2-components/wtf2-scrollbar';
import { Wtf2DirectivesModule } from '@wtf2/theme/directives/directives';
// import { ScrollSpyDirective } from '@wtf2/theme/wtf2-components';
import { Wtf2FormFieldModule, Wtf2InputModule, Wtf2SelectModule, Wtf2IconModule } from '@wtf2/theme/wtf2-material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

// import { ScrollSpyDirective } from '../wtf2-settings-demo/scroll-spy.directive';

const routes = [
  {
    path: 'profile',
    component: UserProfileComponent,
  },
];

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    Wtf2SkeletonModule,
    Wtf2SidebarModule,
    Wtf2ListModule,
    Wtf2DividerModule,
    Wtf2CoreModule,
    Wtf2PasswordStrengthModule,
    TranslateModule,
    Wtf2DirectivesModule,
    PerfectScrollbarModule,
    Wtf2FormFieldModule,
    Wtf2InputModule,
    Wtf2SelectModule,
    Wtf2IconModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class UserProfileModule { }
