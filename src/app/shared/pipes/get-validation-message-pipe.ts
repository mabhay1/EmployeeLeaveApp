import { Pipe, PipeTransform } from '@angular/core';
import { GlobalConstant } from '../../core/constants/GlobalConstant';

@Pipe({
  name: 'getValidationMessage',
})
export class GetValidationMessagePipe implements PipeTransform {
  transform(value: any): unknown {
    if(Array.isArray(value)===true){
      for(let errorItem of value){
        if(errorItem.kind==='required'){
          return GlobalConstant.VALIDATION_MESSAGE.REQUIRED
        }
        else if(errorItem.kind==='minLength'){
          return `Minimum ${errorItem.minLength} characters are required`
        }
      }
    }
    else{
      if(value!==null){
        if(value?.['required']){
          return GlobalConstant.VALIDATION_MESSAGE.REQUIRED
        }
        else if(value?.['minlength']){
          return `Minimum ${value?.['minlength'].requiredLength} characters required`
        }
        else if(value?.['maxlength']){
          return `Maximum ${value?.['maxlength'].requiredLength} characters are allowed`
        }
        else if(value?.['pattern']){
          if(value?.['pattern'].requiredPattern==GlobalConstant.PATTERN.EMAIL){
            return GlobalConstant.VALIDATION_MESSAGE.EMAIL
          }
        }
      }
    }
    return null;
  }
}
