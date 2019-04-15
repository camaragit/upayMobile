import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the FormatphonePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'formatphone',
})
export class FormatphonePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string) {
    value =  value.replace(/ /g, "");
    let tel = value.replace(/-/g, "");
    let phone = tel.length>=2?tel.substring(0,2)+'-':'';
    phone+= tel.length >5 ?tel.substring(2,5)+'-':'';
    phone+= tel.length >7 ?tel.substring(5,7)+'-':'';
    phone+= tel.length >=8 ?tel.substring(7,9):'';
    return phone;
  }
}
