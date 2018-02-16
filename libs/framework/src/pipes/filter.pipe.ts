import { Pipe, PipeTransform } from '@angular/core';
import { Wtf2Utils } from '../utils';

@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform {
    /**
     * Transform
     *
     *   mainArr
     *   searchText
     *   property
     *
     */
    transform(mainArr: any[], searchText: string, property: string): any {
        return Wtf2Utils.filterArrayByString(mainArr, searchText);
    }
}
