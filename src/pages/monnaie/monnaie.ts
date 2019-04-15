import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {OrangePage} from "../recharge/orange/orange";
import {IziPage} from "../recharge/izi/izi";
import {YakalmaPage} from "../recharge/yakalma/yakalma";
import {RapidoPage} from "../recharge/rapido/rapido";
import {GlobalvariableProvider} from "../../providers/globalvariable/globalvariable";
import {OrangeMoneyPage} from "./orange-money/orange-money";
import {TigoCashPage} from "./tigo-cash/tigo-cash";
import {EMoneyPage} from "./e-money/e-money";
import {WizallPage} from "./wizall/wizall";
import {PosteCashPage} from "./poste-cash/poste-cash";

/**
 * Generated class for the MonnaiePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-monnaie',
  templateUrl: 'monnaie.html',
})
export class MonnaiePage {
  public monnaies;
  constructor(public navCtrl: NavController, public navParams: NavParams,public glb:GlobalvariableProvider) {
    this.monnaies =[{service:'orange',img:glb.IMAGE_BASE_URL+'logo_Orange Money.png',component:OrangeMoneyPage},
      {service:'tigo',img:glb.IMAGE_BASE_URL+'logo_Tigo Cash.png',component:TigoCashPage},
      {service:'expresso',img:glb.IMAGE_BASE_URL+'emoney.png',component:EMoneyPage},
      {service:'wizall',img:glb.IMAGE_BASE_URL+'wizall.png',component:WizallPage},
      {service:'postcash',img:glb.IMAGE_BASE_URL+'postecash.png',component:PosteCashPage}
    ]
  }

  ionViewDidLoad() {
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL+"Petite-Icon-12.png";
    this.glb.HEADERTITELE.title = "Monnaie electronique";
    console.log('ionViewDidLoad MonnaiePage');
  }

  verspage(page){
    this.navCtrl.push(page)
  }

}
