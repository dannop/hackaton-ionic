import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompleteSignupPage } from './complete-signup';

@NgModule({
  declarations: [
    CompleteSignupPage,
  ],
  imports: [
    IonicPageModule.forChild(CompleteSignupPage),
  ],
})
export class CompleteSignupPageModule {}
