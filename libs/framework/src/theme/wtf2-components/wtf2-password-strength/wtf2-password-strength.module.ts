import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Wtf2PasswordStrengthComponent } from './wtf2-password-strength.component';
import { Wtf2ProgressBarModule } from '@wtf2/theme/wtf2-material/progress-bar';

@NgModule({
  imports: [
    CommonModule,
    Wtf2ProgressBarModule
  ],
  exports: [Wtf2PasswordStrengthComponent],
  declarations: [Wtf2PasswordStrengthComponent],
})
export class Wtf2PasswordStrengthModule { }
