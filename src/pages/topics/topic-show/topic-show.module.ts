import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TopicShowPage } from './topic-show';

@NgModule({
  declarations: [
    TopicShowPage,
  ],
  imports: [
    IonicPageModule.forChild(TopicShowPage),
  ],
})
export class TopicShowPageModule {}
