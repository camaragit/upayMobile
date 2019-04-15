import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalvariableProvider} from "../../providers/globalvariable/globalvariable";
import {IziPage} from "./izi/izi";
import {OrangePage} from "./orange/orange";
import {YakalmaPage} from "./yakalma/yakalma";
import {RapidoPage} from "./rapido/rapido";
/**
 * Generated class for the RechargePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recharge',
  templateUrl: 'recharge.html',
})
export class RechargePage {
  public recharges;

  constructor(public navCtrl: NavController, public navParams: NavParams,public glb:GlobalvariableProvider) {
    this.recharges =[{service:'orange',img:glb.IMAGE_BASE_URL+'logo_Orange.png',component:OrangePage},
                     {service:'tigo',img:glb.IMAGE_BASE_URL+'logo_Tigo.png',component:IziPage},
                     {service:'expresso',img:glb.IMAGE_BASE_URL+'logo_Expresso.png',component:YakalmaPage},
                     {service:'rapido',img:glb.IMAGE_BASE_URL+'logo_rapido.png',component:RapidoPage}
    ]
  }

  ionViewDidLoad() {
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL+"Petite-Icon-02.png";
    this.glb.HEADERTITELE.title = "Recharge";
    console.log('ionViewDidLoad RechargePage');
  }
  verspage(page){
    this.navCtrl.push(page)
  }

}
