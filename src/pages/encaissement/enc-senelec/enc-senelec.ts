import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalvariableProvider} from "../../../providers/globalvariable/globalvariable";

/**
 * Generated class for the EncSenelecPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-enc-senelec',
  templateUrl: 'enc-senelec.html',
})
export class EncSenelecPage {
  private dataencaissement:any={}

  constructor(public navCtrl: NavController, public navParams: NavParams,public glb:GlobalvariableProvider) {
  }

  ionViewDidLoad() {
    this.glb.recu=null,
    this.glb.showRecu=false;
    this.dataencaissement.oper ='0027';
    this.dataencaissement.image =this.glb.IMAGE_BASE_URL+'Petite-Icon-24.png';
    this.dataencaissement.encaissementfile ='encaissement/encaissementsenelec.php';
    this.dataencaissement.typereleve ='Police';
    this.dataencaissement.operateur ='SENELEC';
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL+"Icon-11.png";
    this.glb.HEADERTITELE.title = "Paiement de Factures";

    console.log('ionViewDidLoad EncSenelecPage');
  }

}
