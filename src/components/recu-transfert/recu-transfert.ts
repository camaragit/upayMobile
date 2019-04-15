import { Component } from '@angular/core';
import {GlobalvariableProvider} from "../../providers/globalvariable/globalvariable";
import {FormatCodeTransfertPipe} from "../../pipes/format-code-transfert/format-code-transfert";
import {MillierPipe} from "../../pipes/millier/millier";
import {ServiceProvider} from "../../providers/service/service";

/**
 * Generated class for the RecuTransfertComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'recu-transfert',
  templateUrl: 'recu-transfert.html'
})
export class RecuTransfertComponent {

  text: string;

  constructor(public serv:ServiceProvider,public glb:GlobalvariableProvider,public formatCode:FormatCodeTransfertPipe,public number:MillierPipe) {
    console.log('Hello RecuTransfertComponent Component');
    this.text = 'Hello World';
  }
  imprimer(){
    let dup='   ';
    if(this.glb.recu.duplicat)
      dup='Duplicatat '
    var imp= "\n             Proximo\n",corpsrecu;
    imp+=dup+this.glb.recu.operation+" "+this.glb.recu.operateur+"\n";
    imp+= "   Copie Client\n"
    corpsrecu= "Date        :" +this.glb.recu.dtTrx+ "\n";
    corpsrecu+='Agence      :'+this.glb.recu.agence+'\n'
    corpsrecu+='Guichet     :'+this.glb.recu.guichet+'\n'
    if(this.glb.recu.operateur=='Joni-Joni')
      corpsrecu+= "Banque agent: BIMAO \n";
    if(this.glb.recu.operateur=='ProxiCash')
      corpsrecu+= "Banque agent: BASN \n";
    corpsrecu+= "------------------------\n";
    corpsrecu+= "EXPEDITEUR \n"
    if(!this.glb.recu.duplicat)
      corpsrecu+= "Nom         : " + this.glb.recu.prenomExp + " " + this.glb.recu.nomExp + "\n";
    if(this.glb.recu.duplicat)
      corpsrecu+= "Nom         : " + this.glb.recu.nomexpe+ "\n";
    if(this.glb.recu.operation=='ENVOI')
      corpsrecu+= "Adr         :  "+ this.glb.recu.adrsExp +"\n";
    corpsrecu+= "Tel         : " + this.glb.recu.telExp + "\n";
    corpsrecu+= "------------------------\n";
    corpsrecu+= "BENEFICIAIRE \n";
    if(!this.glb.recu.duplicat)
      corpsrecu+= "Nom         : " + this.glb.recu.prenomBen + " " + this.glb.recu.nomBen + "\n";
    if(this.glb.recu.duplicat)
      corpsrecu+= "Nom         : " + this.glb.recu.nombenef + "\n";
    if(this.glb.recu.operation=='RECEPTION' && !this.glb.recu.duplicat)
      corpsrecu+= "Adr         : "+this.glb.recu.adrsBen +"\n";
    corpsrecu+= "Tel         : " + this.glb.recu.telBen + "\n";
    corpsrecu+= "------------------------\n";
    corpsrecu+= "Code        : ["+this.formatCode.transform(this.glb.recu.codTrans,3,' ')+ " ]\n\n";
    if(this.glb.recu.operation=='ENVOI' && !this.glb.recu.duplicat){
      corpsrecu+= "Mont HF     : " + this.number.transform(this.glb.recu.mntEnv) + " FCFA\n";
      corpsrecu+= "Frais       : " + this.number.transform(this.glb.recu.mntFrais) + " FCFA\n";
      corpsrecu+= "Mont TTC    : " + this.number.transform(this.glb.recu.mntTotal) + " FCFA\n\n";
    }
    else if(this.glb.recu.operation=='RECEPTION' && !this.glb.recu.duplicat)
      corpsrecu+= "Mont TTC    : " + this.number.transform(this.glb.recu.mntPaie) + " FCFA\n\n";
    if(this.glb.recu.duplicat)
      corpsrecu+= "Mont TTC    : " + this.number.transform(this.glb.recu.montant) + " FCFA\n\n";
    corpsrecu+= "<Gerant(e)>  <Client(e)>" + "\n";
    imp=imp+corpsrecu+"\n\nProximo vous remercie\n";
    imp+= "<Iinfos au 33 869 31 22>\n\n"
    imp+="=========================\n\n";
    imp+=" \n             Proximo\n    Copie Agence\n";
    imp+=corpsrecu+"\n\n\n";
    console.log(imp);
    this.serv.imprimer(imp);

  }

}
