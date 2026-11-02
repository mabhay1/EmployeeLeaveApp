import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'na',
})
export class NaPipe implements PipeTransform {
  transform(value: any, defaultPlaceholder="NA"): unknown {
    if(value===null|| value===undefined||value===''){
      return defaultPlaceholder
    }
    return value;
  }
}
