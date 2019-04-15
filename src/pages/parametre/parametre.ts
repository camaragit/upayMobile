import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalvariableProvider} from "../../providers/globalvariable/globalvariable";
import {ChangePinPage} from "../change-pin/change-pin";
import {ChangePasswordPage} from "../change-password/change-password";
import {ImprimantePage} from "../imprimante/imprimante";

/**
 * Generated class for the ParametrePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-parametre',
  templateUrl: 'parametre.html',
})
export class ParametrePage {
  private listeparametres:any;

  constructor(public glb:GlobalvariableProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.listeparametres = [{service:'chpin',img:glb.IMAGE_BASE_URL+'chpin.png',component:ChangePinPage,title:"Changement code Pin"},
      {service:'chpwd',img:glb.IMAGE_BASE_URL+'chmdp.png',component:ChangePasswordPage,title:"Changement Mot de passe"},
      {service:'rechimp',img:glb.IMAGE_BASE_URL+'rechimp.png',component:ImprimantePage,title:"Recherhe Imprimante"},
    ];
  }

  ionViewDidLoad() {
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL+"Icone_Parametrage.png";
    this.glb.HEADERTITELE.title = "Parametres";
    console.log('ionViewDidLoad ParametrePage');
  }
  verspage(page){
    this.navCtrl.push(page)
  }

}
