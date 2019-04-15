import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalvariableProvider} from "../../../providers/globalvariable/globalvariable";

/**
 * Generated class for the OrangePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orange',
  templateUrl: 'orange.html',
})
export class OrangePage {
  private datarecharge:any ={image:'',oper:'',operation:'Seddo'};

  constructor(public navCtrl: NavController, public navParams: NavParams,public glb:GlobalvariableProvider) {
  }

  ionViewDidLoad() {
    this.glb.showRecu = false;
    this.glb.recu ={};
    this.datarecharge.image = this.glb.IMAGE_BASE_URL+'orange.png';
    this.datarecharge.oper = '0005';
    this.datarecharge.operateur = 'Orange';
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL+"Petite-Icon-02.png";
    this.glb.HEADERTITELE.title = "Recharge";
    console.log('ionViewDidLoad OrangePage');
  }

}
