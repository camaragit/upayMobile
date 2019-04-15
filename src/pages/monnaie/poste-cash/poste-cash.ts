import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalvariableProvider} from "../../../providers/globalvariable/globalvariable";

/**
 * Generated class for the PosteCashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-poste-cash',
  templateUrl: 'poste-cash.html',
})
export class PosteCashPage {
  private service;
  public datacashin:any ={libelle:'Téléphone'}
  public dataretrait:any ={}

  constructor(public glb:GlobalvariableProvider,public navCtrl: NavController, public navParams: NavParams) {
  }
  ionViewDidLoad() {
    this.glb.showRecu = false;
    this.glb.recu ={};
    this.service='Cashin';
    this.datacashin.image = this.dataretrait.image=this.glb.IMAGE_BASE_URL+'postecash.png';
    this.datacashin.oper='0053';
    this.datacashin.sousop='0001';
    this.datacashin.operation='Cashin';
    this.datacashin.operateur='PosteCash';
    console.log('ionViewDidLoad PosteCashPage');
  }

}
