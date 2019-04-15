import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the FormatdatePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'formatdate',
})
export class FormatdatePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(chaine: string) {
    chaine = chaine.replace(/ /g, "");
    if(chaine.length==14)
      return chaine.substring(6,8)+'/'+chaine.substring(4,6)+'/'+chaine.substring(0,4)+' @ '+chaine.substring(8,10)+':'+chaine.substring(10,12)+':'+chaine.substring(12,14);
    return chaine;
  }
}
