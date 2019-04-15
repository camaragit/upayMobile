import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalvariableProvider} from "../../../providers/globalvariable/globalvariable";
import {ServiceProvider} from "../../../providers/service/service";
import {RechargeProvider} from "../../../providers/recharge/recharge";

/**
 * Generated class for the RapidoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rapido',
  templateUrl: 'rapido.html',
})
export class RapidoPage {
  public montant;
  public montantttc;
  public telephone;
  public datacashin:any ={libelle:'Numero Badge'}

  constructor(public rechprovider:RechargeProvider,public serv:ServiceProvider,public glb:GlobalvariableProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.glb.showRecu = false;
    this.glb.recu ={};
    this.datacashin.image = this.glb.IMAGE_BASE_URL+'logo_rapido.png';
    this.datacashin.oper = '0057';
    this.datacashin.sousop='0002';
    this.datacashin.operation = 'Recharge Rapido';
    this.datacashin.operateur = 'Rapido';
    console.log('ionViewDidLoad RapidoPage');
  }



}
