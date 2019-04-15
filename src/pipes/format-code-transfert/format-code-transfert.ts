import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the FormatCodeTransfertPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'formatCodeTransfert',
})
export class FormatCodeTransfertPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(chaine: string, bloc:number,separateur:string) {
    let i=0,j=bloc;
    let format='';
    chaine+="";
    if(chaine=="")
      return "";
    //supprime tous les espaces contenu dans la chaine
    chaine = chaine.replace(/ /g, "");
    while(j<chaine.length){
      format+=chaine.substring(i,j)+separateur;
      i=j;
      j+=bloc;
    }
    return format+=chaine.substring(i,j);
  }
}
