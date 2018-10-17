import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupPage } from './signup';
import { CompleteSignupPageModule } from '../complete-signup/complete-signup.module';
import { NgxErrorsModule } from '@ultimate/ngxerrors';

@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupPage),
    CompleteSignupPageModule,
    NgxErrorsModule
  ],
})
export class SignupPageModule {}
