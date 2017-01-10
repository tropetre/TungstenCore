import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../classes/user';

@Pipe({
    name: 'FilterUserByName',
    pure: false
})
export class FilterUserByNamePipe implements PipeTransform {
    transform(items: User[], args: string): any {
        args = args || '';
        if (args === '')
            return items;
        console.log(items);
        return items.filter(item => item.Name.toLowerCase().indexOf(args.toLowerCase()) !== -1);
    }
}