import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getInitials',
})
export class GetInitialsPipe implements PipeTransform {
  transform(value: string|undefined): unknown {
    if(value!==undefined){
      const valueList=value.split(" ")
      const resultValue = valueList.reduce((acc,val)=>acc+val.charAt(0).toLocaleUpperCase(),'')
      return resultValue;
    }
    return undefined
    
  }
}
