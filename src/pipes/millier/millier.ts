import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the MillierPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'millier',
})
export class MillierPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(valeur: string) {
    valeur=valeur+"";
    valeur = valeur.replace(/ /g, "");

    //partie entiere avec separateur
    let pentier="";
    //partie decimal avec separateur
    let pdecimal="";
    //si la veleur comporte une une partie decimale
    if(valeur.indexOf('.')!=-1){

      //partie décimale sans separateur
      let partiedecimal=""+valeur.substring(valeur.indexOf('.')+1,valeur.length);
      //partie entiere sans separateur
      let partieentiere=valeur.substring(0,valeur.indexOf('.'))+"";
      let j=partieentiere.length;
      //Séparation partie entiere
      while(j>3)
      {
        pentier=" "+partieentiere.substring(j-3,j)+pentier;
        j-=3;
      }
      pentier= partieentiere.substring(0,j)+pentier;
      j=partiedecimal.length;
      while(j>3)
      {
        pdecimal=" "+partiedecimal.substring(j-3,j)+pdecimal;
        j-=3;
      }

      pdecimal= partiedecimal.substring(0,j)+pdecimal;

      return pentier+'.'+pdecimal;
    }
    else {
      let j=valeur.length;
      let val="";
      while(j>3)
      {
        val=" "+valeur.substring(j-3,j)+val;
        j-=3;
      }
      return valeur.substring(0,j)+val;

    }
  }
}
