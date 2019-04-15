import {Component, Input} from '@angular/core';
import {GlobalvariableProvider} from "../../providers/globalvariable/globalvariable";
import {MillierPipe} from "../../pipes/millier/millier";
import {ServiceProvider} from "../../providers/service/service";
import {NavController} from "ionic-angular";

/**
 * Generated class for the RecuRechargeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'recu-recharge',
  templateUrl: 'recu-recharge.html'
})
export class RecuRechargeComponent {
  text: string;

  constructor(public serv:ServiceProvider,public glb:GlobalvariableProvider,public number:MillierPipe) {
    console.log('Hello RecuRechargeComponent Component');
    this.text = 'Hello World';
  }
  imprimer(){
    var corps='           Proximo   \n\n';
    corps+='         Recu de transaction\n \n';
    corps+='Le        : '+this.glb.recu.dtTrx+'\n';
    corps+='Operateur :'+this.glb.recu.Oper+'\n';
    if(this.glb.recu.service)
      corps+='Service   :'+this.glb.recu.service+'\n';
    corps+='Agence    :'+this.glb.recu.agence+'\n'
    corps+='Guichet   :'+this.glb.recu.idTerm.substring(6,5)+'\n'
    corps+='Num trx   : '+this.glb.recu.numTrx+'\n'
    if(this.glb.recu.service && this.glb.recu.service=="rapido" )
      corps+='Badge     :' +this.glb.recu.telRech+'\n'
    else
      corps+='Telephone :' +this.glb.recu.telRech+'\n'
    corps+='===============================\n'
    corps+='Montant   :'+this.number.transform(this.glb.recu.mntAch)+' FCFA\n'
    let inf= "Proximo vous remercie. \n"
    inf+= "<Infos au 33 869 31 22>\n \n"
    let imp=corps+inf+corps+'\n\n\n';
    console.log(imp);
    this.serv.imprimer(imp);
    this.glb.showRecu=false;

  }

}
