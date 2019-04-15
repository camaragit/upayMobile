/**
 * Generated class for the RecuEncaissementComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
import {Component} from "@angular/core";
import {GlobalvariableProvider} from "../../providers/globalvariable/globalvariable";
import {ServiceProvider} from "../../providers/service/service";
import {MillierPipe} from "../../pipes/millier/millier";

@Component({
  selector: 'recu-encaissement',
  templateUrl: 'recu-encaissement.html'
})
export class RecuEncaissementComponent {

  text: string;

  constructor(public glb:GlobalvariableProvider,public serv:ServiceProvider,public number:MillierPipe) {
    console.log('Hello RecuEncaissementComponent Component');
    this.text = 'Hello World';
  }
  imprimer(){
    let dup='';
    if(this.glb.recu.duplicatat)
    {
      if(!this.glb.recu.telClient)
        this.glb.recu.telClient='';
      dup=' Duplicatat';
    }


    var imp= "\n            Proximo\n";
    imp+= "Recu "+dup+" de transaction  ProxiCash\n\n";
    imp+= "          Copie Client\n\n";
    imp+= "Oper     :"+this.glb.recu.Oper+"\n";
    imp+= "Date     :" + this.glb.recu.dtTrx + "\n";

    imp+= "Agence   :"+this.glb.recu.agence+" \n";
    imp+= "Guichet  : "+this.glb.recu.guichet+" \n";
    //si c l cas de senelec c 'Police :' sinon on a 'Reference:'
    // imp+= this.glb.recu.Oper=='SDE' ?"Reference: "+ $rootScope.reference + "\n" :"Police   :"+ $rootScope.reference + "\n";
    imp+= this.glb.recu.Oper=='SDE' ?"Reference: "+ this.glb.recu.IdClient + "\n" :"Police   :"+ this.glb.recu.IdClient + "\n";
    imp+= "Client   :" +this.glb.recu.NomClient + "\n";
    //lE TEL SI C SDE SINON, PAS DE TELEPHONE POUR SENELEC
    imp+=this.glb.recu.Oper=='SDE'? "Tel      :" + this.glb.recu.telClient      + "\n":"";
    imp+= "================================\n";
    imp+= '            Factures\n';
    imp+= "================================\n";
    if(!this.glb.recu.duplicatat)
    {
      //Le padding differe selon sde et senelec
      if(this.glb.recu.Oper=='SDE'){
        imp+= "N Fact                    Mnt\n";
        for(let i=0;i<this.glb.recu.Factures.Facture.length;i++){
          let trx=this.glb.recu.Factures.Facture[i];
          imp+=this.serv.padding((i*1+1*1),2)+this.serv.padding(trx.numFact,24)+this.number.transform(trx.mntFact)+"\n";
        }
      }
      else {
        imp+= "Num Fact       Mnt\n";
        for(var i=0;i<this.glb.recu.Factures.Facture.length;i++){
          let trx=this.glb.recu.Factures.Facture[i];
          imp+=this.serv.padding((i*1+1*1),4)+this.serv.padding(trx.numFact,11)+this.number.transform(trx.mntFact)+"\n";
        }
      }
      imp+= "\n================================\n";
    }

    imp+= "Mnt Facture :"+this.number.transform(this.glb.recu.mntFact)+" FCFA\n";
    if(this.glb.recu.mntTbr>0)
      imp+= "Timbre      :"+this.glb.recu.mntTbr+" F CFA\n";
    imp+= "Frais       :"+this.number.transform(this.glb.recu.mntFrais)+" FCFA\n";
    imp+= "================================\n";
    imp+= "Total:" + this.number.transform(this.glb.recu.mntTotal) + " FCFA\n\n";
    imp+= "Proximo vous remercie. \n"
    imp+= "<Infos au 33 869 31 22>\n \n"
    imp+= "\n==============================\n";
    imp+= "\n            Proximo\n"
    imp+= "Recu"+dup+ " de transaction ProxiCash\n\n";
    imp+= "Copie Agence\n\n";
    imp+= "Oper     :"+this.glb.recu.Oper+"\n";
    imp+= "Date     : " +this.glb.recu.dtTrx+ "\n";
    //imp+= "Recu     :"+this.glb.recu.NumRecu+"\n";
    imp+= "Agence   :"+this.glb.recu.agence+" \n"
    imp+= "Guichet  :"+this.glb.recu.guichet+" \n"
    imp+= this.glb.recu.Oper=='SDE' ?"Reference: "+ this.glb.recu.IdClient + "\n" :"Police   :"+ this.glb.recu.IdClient + "\n";
    imp+= "Client   : " + this.glb.recu.NomClient + "\n";
    //lE TEL SI C SDE SINON PAS DE TELEPHONE POUR SENELEC
    imp+=this.glb.recu.Oper=='SDE'? "Tel      : " + this.glb.recu.telClient      + "\n":"";
    imp+= "\n================================\n";
    imp+= "Mnt Facture :"+this.number.transform(this.glb.recu.mntFact)+" FCFA\n";
    if(this.glb.recu.mntTbr>0)
      imp+= "Timbre      :"+this.glb.recu.mntTbr+" FCFA\n";
    imp+= "Frais       :"+this.number.transform(this.glb.recu.mntFrais)+" FCFA\n";
    imp+= "================================\n";
    imp+= "Total:" + this.number.transform(this.glb.recu.mntTotal) + "FCFA\n\n\n\n\n";
    // console.log('votre recu à imprimer',imp);
    this.serv.imprimer(imp);
  }

}
