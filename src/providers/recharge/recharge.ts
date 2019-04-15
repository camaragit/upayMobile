import { PipesModule } from './../../pipes/pipes.module';
import { Injectable } from '@angular/core';
import {ServiceProvider} from "../service/service";
import {GlobalvariableProvider} from "../globalvariable/globalvariable";
import {MillierPipe} from "../../pipes/millier/millier";

@Injectable()
export class RechargeProvider {

  constructor(public serv:ServiceProvider,public glb:GlobalvariableProvider,public number:MillierPipe) {
    console.log('Hello RechargeProvider Provider');
  }

  recharger(datarecharge){
    //alert('datarecharge '+JSON.stringify(datarecharge));
    this.serv.saisiecodepin(datarecharge).then(data=>{
      let values:any =data;
      datarecharge.recharge.pin= values.pin;
      let parametres :any={};
      parametres.recharge = datarecharge.recharge;
      parametres.recharge.montant   = datarecharge.recharge.montant.replace(/ /g, "");
      parametres.recharge.telephone = datarecharge.recharge.telephone.replace(/-/g, "");
      parametres.recharge.telephone = parametres.recharge.telephone.replace(/ /g, "");
      if(parametres.recharge.frais)
        parametres.recharge.frais = parametres.recharge.frais.replace(/ /g, "");
      parametres.idTerm = this.glb.IDTERM;
      parametres.session = this.glb.IDSESS;
      this.serv.afficheloading();
      this.serv.posts('recharge/recharge.php',parametres,{}).then(data=>{
        this.serv.dismissloadin();
        let reponse = JSON.parse(data.data);
        if(reponse.returnCode=='0'){
          this.glb.recu=reponse;
          if(typeof (reponse.telRech)=='object')
            this.glb.recu.telRech = datarecharge.recharge.telephone;
          this.glb.recu.guichet = this.glb.IDTERM.substring(5,6);
          this.glb.recu.agence = this.glb.HEADER.agence;
          this.glb.showRecu=true;
          this.glb.HEADER.montant= this.number.transform(reponse.mntPlfap);
          this.glb.recu.service = datarecharge.operation;
          this.glb.recu.Oper = datarecharge.operateur;

        }
        else this.serv.showError(reponse.errorLabel)
      }).catch(err=>{
        this.serv.dismissloadin();
        this.serv.showError("Impossible d'atteindre le serveur");

      })

    }).catch(err=>{

    })
  }

}
