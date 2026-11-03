import { Pipe, PipeTransform } from '@angular/core';
import { GlobalConstant } from '../../core/constants/GlobalConstant';

@Pipe({
  name: 'readConstant',
})
export class ReadConstantPipe implements PipeTransform {
  transform(value: string, constantName:string): unknown {
    return null;
  }
}
