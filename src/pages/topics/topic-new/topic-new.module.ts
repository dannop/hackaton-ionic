import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TopicNewPage } from './topic-new';

@NgModule({
  declarations: [
    TopicNewPage,
  ],
  imports: [
    IonicPageModule.forChild(TopicNewPage),
  ],
})
export class TopicNewPageModule {}
