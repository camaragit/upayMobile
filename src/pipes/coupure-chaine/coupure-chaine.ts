import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the CoupureChainePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'coupureChaine',
})
export class CoupureChainePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(chaine: string) {
    if(chaine.length>20){
      var part1=chaine.substring(0,20);
      var part2=chaine.substring(20,chaine.length);
      return part1+'-\n       '+part2;
    }
    else return chaine;
  }
}
