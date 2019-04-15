import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalvariableProvider} from "../../../providers/globalvariable/globalvariable";

/**
 * Generated class for the WizallPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wizall',
  templateUrl: 'wizall.html',
})
export class WizallPage {
  private service;
  public datacashin:any ={libelle:'Téléphone'}
  public datareception:any ={}
  public dataretrait:any ={}
  constructor(public glb:GlobalvariableProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.glb.showRecu = false;
    this.glb.recu ={};
    this.service='Cashin';
    this.datacashin.image = this.datareception.image= this.dataretrait.image=this.glb.IMAGE_BASE_URL+'logo_wizall.jpg';
    this.datacashin.oper =this.datareception.oper ='0057';
    this.datacashin.operation='Cashin';
    this.datareception.operation='Retrait avec Code';
    this.datareception.initfile ='releveBonWizall.php';
    this.datareception.confirmfile ='validationBonWizall.php';
    this.datacashin.operateur = this.datareception.operateur ='Wizall';
    this.datacashin.sousop='0001';
    console.log('ionViewDidLoad WizallPage');
  }

}
