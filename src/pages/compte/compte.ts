import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalvariableProvider} from "../../providers/globalvariable/globalvariable";
import {OrangeMoneyPage} from "../monnaie/orange-money/orange-money";
import {TigoCashPage} from "../monnaie/tigo-cash/tigo-cash";
import {EMoneyPage} from "../monnaie/e-money/e-money";
import {WizallPage} from "../monnaie/wizall/wizall";
import {PosteCashPage} from "../monnaie/poste-cash/poste-cash";
import {EtatPlafondPage} from "./etat-plafond/etat-plafond";
import {EtatMouvementPage} from "./etat-mouvement/etat-mouvement";
import {CashtoAccountPage} from "./cashto-account/cashto-account";
import {EtatCommissionPage} from "./etat-commission/etat-commission";
import {AccountToCashPage} from "./account-to-cash/account-to-cash";
import {EtatCaissePage} from "./etat-caisse/etat-caisse";

/**
 * Generated class for the ComptePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-compte',
  templateUrl: 'compte.html',
})
export class ComptePage {

  public comptes;
  constructor(public navCtrl: NavController, public navParams: NavParams,public glb:GlobalvariableProvider) {
    this.comptes =[{service:'etatplf',img:glb.IMAGE_BASE_URL+'etatplf.png',component:EtatPlafondPage,title:"Etat plafond"},
      {service:'etatmvnt',img:glb.IMAGE_BASE_URL+'Petite-Icon-EtatMouvementCercle.png',component:EtatMouvementPage,title:"Etat mouvement"},
      {service:'c2a',img:glb.IMAGE_BASE_URL+'c2a.png',component:CashtoAccountPage,title:"Cash to account"},
      {service:'etatcomm',img:glb.IMAGE_BASE_URL+'etatcommission.png',component:EtatCommissionPage,title:"Etat commission"},
      {service:'a2c',img:glb.IMAGE_BASE_URL+'a2c.png',component:AccountToCashPage,title:"Account to Cash"},
      {service:'etatcaisse',img:glb.IMAGE_BASE_URL+'gestion.jpg',component:EtatCaissePage,title:"Etat caisse"},
    ]
  }

  ionViewDidLoad() {
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL+"Icone_Compte.jpg";
    this.glb.HEADERTITELE.title = "Compte";
    console.log('ionViewDidLoad MonnaiePage');
  }

  verspage(page){
    this.navCtrl.push(page)
  }


}
