import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalvariableProvider} from "../../providers/globalvariable/globalvariable";
import {EncSenelecPage} from "./enc-senelec/enc-senelec";
import {EncWoyofalPage} from "./enc-woyofal/enc-woyofal";
import {EncSdePage} from "./enc-sde/enc-sde";

/**
 * Generated class for the EncaissementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-encaissement',
  templateUrl: 'encaissement.html',
})
export class EncaissementPage {
  public encaissements;

  constructor(public navCtrl: NavController, public navParams: NavParams,public glb:GlobalvariableProvider) {
    this.encaissements =[{service:'senelec',img:glb.IMAGE_BASE_URL+'Petite-Icon-24.png',component:EncSenelecPage},
                         {service:'woyofal',img:glb.IMAGE_BASE_URL+'logo_Woyofal.png',component:EncWoyofalPage},
                         {service:'sde',img:glb.IMAGE_BASE_URL+'Logo_SDE.PNG',component:EncSdePage}
                         ]

  }

  ionViewDidLoad() {
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL+"Icon-11.png";
    this.glb.HEADERTITELE.title = "Paiement de Factures";
    console.log('ionViewDidLoad EncaissementPage');
  }

  verspage(page){
    this.navCtrl.push(page)
  }

}
