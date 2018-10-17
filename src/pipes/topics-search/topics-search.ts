import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'topicsSearch',
})
export class TopicsSearchPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(items: any[], terms: string): any[] {
    if (!items) return [];
    if (!terms) return items;
    terms = terms.toLowerCase();
    return items.filter(it => {
      return it.title.toLowerCase().includes(terms);
    });
  }
}
