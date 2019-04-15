import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalvariableProvider} from "../../../providers/globalvariable/globalvariable";
import {ServiceProvider} from "../../../providers/service/service";
import {DatePipe} from "@angular/common";
import {MillierPipe} from "../../../pipes/millier/millier";

/**
 * Generated class for the EtatPlafondPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-etat-plafond',
  templateUrl: 'etat-plafond.html',
})
export class EtatPlafondPage {

  constructor(public number:MillierPipe,public datepipe:DatePipe,public serv:ServiceProvider,public navCtrl: NavController, public navParams: NavParams,public glb:GlobalvariableProvider) {
  }

  ionViewDidLoad() {
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL+"Icone_Compte.jpg";
    this.glb.HEADERTITELE.title = "Etat Plafond";
    console.log('ionViewDidLoad EtatPlafondPage');
    this.serv.afficheloading();
    this.serv.getplafond().then(data=>{
      this.serv.dismissloadin();
      let plafond = JSON.parse(data.data);
      if(plafond.returnCode=='0'){
        this.glb.HEADER.montant = this.number.transform(plafond.mntPlf);
        this.glb.HEADER.numcompte = plafond.numcompte;
        this.glb.HEADER.consomme = this.number.transform(plafond.consome)
      } else this.serv.showError(plafond.errorLabel)

    }).catch(error=>{
      this.serv.dismissloadin();
      this.serv.showError("Impossible d'atteindre le serveur");

    })
  }
  imprimer(){
    let consomme=parseFloat(this.glb.HEADER.consomme.replace(/ /g,""))>0?'Consomme:'+this.glb.HEADER.consomme+' F CFA\n':'0';
    let imp='          Proximo\n\n';
    imp+='          Etat Plafond\n\n';
    imp+='Date    :'+this.datepipe.transform(Date.now(),'dd-MM-yyyy @ HH:mm:ss')+'\n';
    imp+='Agence  :'+this.glb.HEADER.agence+'\n';
    imp+='Plafond : ' +this.glb.HEADER.montant+' F CFA\n';
    imp+=consomme;
    imp+='Compte  : '+this.glb.HEADER.numcompte+'\n\n\n\n';
    console.log(imp);
    this.serv.imprimer(imp);
  }

}
