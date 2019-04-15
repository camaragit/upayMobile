import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalvariableProvider} from "../../providers/globalvariable/globalvariable";
import {OrangeMoneyPage} from "../monnaie/orange-money/orange-money";
import {TigoCashPage} from "../monnaie/tigo-cash/tigo-cash";
import {EMoneyPage} from "../monnaie/e-money/e-money";
import {WizallPage} from "../monnaie/wizall/wizall";
import {PosteCashPage} from "../monnaie/poste-cash/poste-cash";
import {DuplicatatEncaissementPage} from "./duplicatat-encaissement/duplicatat-encaissement";
import {DuplicatatTransfertPage} from "./duplicatat-transfert/duplicatat-transfert";
import {DuplicatatWoyofalPage} from "./duplicatat-woyofal/duplicatat-woyofal";
import {HistoriquePlafondPage} from "./historique-plafond/historique-plafond";
import {HistoriqueTransactionPage} from "./historique-transaction/historique-transaction";

/**
 * Generated class for the GestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gestion',
  templateUrl: 'gestion.html',
})
export class GestionPage {

  public gestions;
  constructor(public navCtrl: NavController, public navParams: NavParams,public glb:GlobalvariableProvider) {
    this.gestions =[{service:'etatplf',img:glb.IMAGE_BASE_URL+'Petite-Icon-HistoriqueA2C-17.png',component:HistoriquePlafondPage,title:"Hist plafond"},
      {service:'etatmvnt',img:glb.IMAGE_BASE_URL+'Petite-Icon-EtatMouvementCercle.png',component:HistoriqueTransactionPage,title:"Hist transaction"},
      {service:'c2a',img:glb.IMAGE_BASE_URL+'dupliencais.png',component:DuplicatatEncaissementPage,title:"Duplicat Encaissement"},
      {service:'etatcomm',img:glb.IMAGE_BASE_URL+'Petite-Icon-duplitransfert.png',component:DuplicatatTransfertPage,title:"Duplicatat Transfert"},
      {service:'a2c',img:glb.IMAGE_BASE_URL+'Petite-Icon-dupliwoyofal.png',component:DuplicatatWoyofalPage,title:"Duplicat Woyofal"}
    ]
  }

  ionViewDidLoad() {
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL+"icone_Gestion.jpg";
    this.glb.HEADERTITELE.title = "Gestion";
    console.log('ionViewDidLoad MonnaiePage');
  }

  verspage(page){
    this.navCtrl.push(page)
  }


}
