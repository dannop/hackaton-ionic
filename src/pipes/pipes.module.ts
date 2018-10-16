import { NgModule } from '@angular/core';
import { TopicsSearchPipe } from './topics-search/topics-search';
import { SortPipe } from './sort/sort';
@NgModule({
	declarations: [TopicsSearchPipe,
    SortPipe],
	imports: [],
	exports: [TopicsSearchPipe,
    SortPipe]
})
export class PipesModule {}
