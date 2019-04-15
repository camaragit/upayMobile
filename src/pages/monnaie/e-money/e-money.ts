import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalvariableProvider} from "../../../providers/globalvariable/globalvariable";
import {RechargeProvider} from "../../../providers/recharge/recharge";

/**
 * Generated class for the EMoneyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-e-money',
  templateUrl: 'e-money.html',
})
export class EMoneyPage {
  private service;
  private datarecharge:any={};
  private datareception:any={};

  constructor(public rechprov:RechargeProvider,public glb:GlobalvariableProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.glb.showRecu = false;
    this.glb.recu ={};
    this.datarecharge.image=this.datareception.image = this.glb.IMAGE_BASE_URL+'emoney.png';
    this.datarecharge.oper=this.datareception.oper = '0054';
    this.datarecharge.operation = 'Cashin';
    this.datareception.operation = 'Retrait avec code';
    this.datareception.operateur = this.datarecharge.operateur = 'E-money';
    this.datareception.initfile ='releveemoney.php';
    this.datareception.confirmfile ='validationretemoney.php';
    this.service ='Cashin';
    console.log('ionViewDidLoad EMoneyPage');
  }


}
