import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalvariableProvider} from "../../../providers/globalvariable/globalvariable";

/**
 * Generated class for the YakalmaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-yakalma',
  templateUrl: 'yakalma.html',
})
export class YakalmaPage {
  public datarecharge:any;

  constructor(public glb:GlobalvariableProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.glb.showRecu = false;
    this.glb.recu ={};
    this.datarecharge ={};
    this.datarecharge.image = this.glb.IMAGE_BASE_URL+'Icon-22.png';
    this.datarecharge.oper = '0034';
    this.datarecharge.operation = 'Yakalma';
    this.datarecharge.operateur = 'Expresso';
    console.log('ionViewDidLoad YakalmaPage');
  }

}
