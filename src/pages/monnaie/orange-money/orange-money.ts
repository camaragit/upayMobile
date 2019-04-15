import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalvariableProvider} from "../../../providers/globalvariable/globalvariable";

/**
 * Generated class for the OrangeMoneyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orange-money',
  templateUrl: 'orange-money.html',
})
export class OrangeMoneyPage {
public service;
private datarecharge:any={};
private datareception:any={};

  constructor(public glb:GlobalvariableProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.glb.showRecu = false;
    this.glb.recu ={};
    this.datarecharge.image = this.datareception.image = this.glb.IMAGE_BASE_URL+'Icon-20.png';
    this.datarecharge.oper = this.datareception.oper = '0025';
    this.datarecharge.operation = 'Cashin';
    this.datareception.operation = 'Cashout';
    this.datarecharge.operateur = this.datareception.operateur = 'Orange-Money';
    this.service ='Cashin';
    console.log('ionViewDidLoad OrangeMoneyPage');
  }

}
