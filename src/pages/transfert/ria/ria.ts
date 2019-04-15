import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalvariableProvider} from "../../../providers/globalvariable/globalvariable";

/**
 * Generated class for the RiaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ria',
  templateUrl: 'ria.html',
})
export class RiaPage {
  private  service;
private datareception:any={};
  constructor(public navCtrl: NavController, public navParams: NavParams,public glb:GlobalvariableProvider) {
  }

  ionViewDidLoad() {
    this.glb.showRecu=false;
    this.service ='Réception';
    this.datareception.image = this.glb.IMAGE_BASE_URL+"Icon-26.png";
    this.datareception.oper='0044';
    this.datareception.operateur='RIA';
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL+"Petite-Icon-03.png";
    this.glb.HEADERTITELE.title = "Transfert d'argent";
    console.log('ionViewDidLoad RiaPage');
  }

}
