import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalvariableProvider} from "../../providers/globalvariable/globalvariable";
import {ProxicashPage} from "./proxicash/proxicash";
import {RiaPage} from "./ria/ria";
import {ProxicashTransfertPage} from "../proxicash-transfert/proxicash-transfert";



@IonicPage()
@Component({
  selector: 'page-transfert',
  templateUrl: 'transfert.html',
})
export class TransfertPage {
  public transferts;

  constructor(public navCtrl: NavController, public navParams: NavParams,public glb:GlobalvariableProvider) {
    this.transferts =[
      {service:'proxicash',img:glb.IMAGE_BASE_URL+'logo_Proxicash.png',component:ProxicashPage},
     // {service:'proxicash',img:glb.IMAGE_BASE_URL+'logo_Proxicash.png',component:ProxicashTransfertPage},
      {service:'ria',img:glb.IMAGE_BASE_URL+'logo_Ria.png',component:RiaPage}
    ]
  }

  ionViewDidLoad() {

    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL+"Petite-Icon-03.png";
    this.glb.HEADERTITELE.title = "Transfert d'argent";
    console.log('ionViewDidLoad TransfertPage');
  }
  verspage(page){
     this.navCtrl.push(page)
  }
}
