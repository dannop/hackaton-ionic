import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TopicEditPage } from './topic-edit';

@NgModule({
  declarations: [
    TopicEditPage,
  ],
  imports: [
    IonicPageModule.forChild(TopicEditPage),
  ],
})
export class TopicEditPageModule {}
