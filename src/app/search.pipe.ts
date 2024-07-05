import { Product } from 'src/app/shard/interface/product';
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(searchItem:Product[] ,item:string):Product[] {
    return searchItem.filter((product)=>product.title.toLowerCase().includes(item.toLowerCase()));
  }

}
