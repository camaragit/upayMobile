import { Component } from '@angular/core';
import {GlobalvariableProvider} from "../../providers/globalvariable/globalvariable";
import {ServiceProvider} from "../../providers/service/service";

/**
 * Generated class for the RecuWoyofalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'recu-woyofal',
  templateUrl: 'recu-woyofal.html'
})
export class RecuWoyofalComponent {

  text: string;

  constructor(public glb:GlobalvariableProvider,public serv:ServiceProvider) {
    console.log('Hello RecuWoyofalComponent Component');
    this.text = 'Hello World';
  }
  imprimer(){
    let dup=''
    if(this.glb.recu.duplicat)
      dup='Duplicatat';
    let imp;
    imp= "\n        Proximo\n"
    imp+= "Recu "+dup+ " de transaction Proxicash\n\n"
    imp+= "Copie Client\n\n"
    imp+= "Oper   : WOYOFAL\n"
    imp+= "Date   : " + this.glb.recu.dtTrx + "\n"
    if(!this.glb.recu.duplicat)
      imp+= "Recu   : " + this.glb.recu.numTrx + "\n"
    imp+= "Agence : "+this.glb.recu.agence+" \n"
    imp+= "Guichet: "+this.glb.recu.guichet+" \n"
    if(this.glb.recu.telClient)
      imp+= "Tel   : " + this.glb.recu.telClient + "\n";
    imp+= "------------------------\n";
    if (this.glb.recu.Token2 && this.glb.recu.Token2!='')
      imp+= "Sts1   : " + this.glb.recu.Token2 + "\n";
    if (this.glb.recu.Token3 && this.glb.recu.Token3!='')
      imp+= "Sts2   : " +this.glb.recu.Token3 + "\n"
    imp+= "Code   : "+this.glb.recu.Token1+"\n";

    if(this.glb.recu.mntFact)
    { imp+= "Energie: "  + this.glb.recu.Energy + " \n"
      imp+= "Montant: "+this.glb.recu.mntFact+" FCFA\n"
      imp+= "Frais  : "+this.glb.recu.mntFrais+" FCFA\n"
    }

    imp+= "------------------------\n"
    imp+= "Total  : "+this.glb.recu.mntTotal+" FCFA \n"
    imp+= "Proximo vous remercie\n"
    imp+= "Infos au 338693122.\n"
    imp+="========================\n\n"
    imp+= "\n        Proximo\n"
    imp+= "Recu "+dup+" de transaction Proxicash\n\n"
    imp+= "Copie Agence\n\n"
    imp+= "Oper   : WOYOFAL\n"
    imp+= "Date   : " + this.glb.recu.dtTrx + "\n"
    imp+= "Agence : "+this.glb.recu.agence+" \n"
    imp+= "Guichet:"+this.glb.recu.guichet+" \n"
    if(!this.glb.recu.duplicat)
      imp+= "Recu   : " +this.glb.recu.NumRecu + "\n"
    imp+= "Compt  : " + this.glb.recu.IdClient + "\n"
    if(this.glb.recu.telClient)
    {
      imp+= "Tel    : " + this.glb.recu.telClient + "\n"
      imp+= "Montant: "+this.glb.recu.mntFact+" FCFA\n"
      imp+= "Frais  : "+this.glb.recu.mntFrais+" FCFA\n"
      imp+= "------------------------\n"
    }

    imp+= "Total  : "+this.glb.recu.mntTotal+" FCFA\n\n\n\n"
    console.log(imp);
    this.serv.imprimer(imp);
  }
}
