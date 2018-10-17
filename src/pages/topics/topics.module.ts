import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TopicsPage } from './topics';
import { TopicShowPageModule } from './topic-show/topic-show.module';
import { TopicEditPageModule } from './topic-edit/topic-edit.module';
import { TopicNewPageModule } from './topic-new/topic-new.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    TopicsPage,
  ],
  imports: [
    IonicPageModule.forChild(TopicsPage),
    PipesModule,
    TopicShowPageModule,
    TopicEditPageModule,
    TopicNewPageModule
  ],
})
export class TopicsPageModule {}
