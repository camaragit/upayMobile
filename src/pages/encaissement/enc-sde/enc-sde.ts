import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalvariableProvider} from "../../../providers/globalvariable/globalvariable";

/**
 * Generated class for the EncSdePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-enc-sde',
  templateUrl: 'enc-sde.html',
})
export class EncSdePage {
  private dataencaissement:any={};

  constructor(public navCtrl: NavController, public navParams: NavParams,public glb:GlobalvariableProvider) {
  }

  ionViewDidLoad() {
    this.glb.recu=null,
      this.glb.showRecu=false;
    this.dataencaissement.typereleve ='Reference';
    this.dataencaissement.oper ='0016';
    this.dataencaissement.operateur ='SDE';
    this.dataencaissement.encaissementfile ='encaissement/encaissementsde.php';
    this.dataencaissement.image =this.glb.IMAGE_BASE_URL+'Icon-28.png';
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL+"Icon-11.png";
    this.glb.HEADERTITELE.title = "Paiement de Factures";
    console.log('ionViewDidLoad EncSdePage');
  }

}
