import { Component } from '@angular/core';
import {NavController,  Platform} from 'ionic-angular';
import {EncaissementPage} from "../encaissement/encaissement";
import {TransfertPage} from "../transfert/transfert";
import {MonnaiePage} from "../monnaie/monnaie";
import {GlobalvariableProvider} from "../../providers/globalvariable/globalvariable";
import {ComptePage} from "../compte/compte";
import {GestionPage} from "../gestion/gestion";
import {RechargePage} from "../recharge/recharge";
import {SplashScreen} from "@ionic-native/splash-screen";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private pages :any;

  constructor(private splashScreen:SplashScreen,private platform:Platform,public navCtrl: NavController,public Glb:GlobalvariableProvider) {
    this.pages = [
      { title: 'Paiement Factures', component: EncaissementPage,src:this.Glb.IMAGE_BASE_URL+'Petite-Icon-04.png' },
      { title: "Transfert d'argent", component: TransfertPage,src:this.Glb.IMAGE_BASE_URL+'Petite-Icon-03.png' },
      { title: "Recharge electronique", component: RechargePage,src:this.Glb.IMAGE_BASE_URL+'Petite-Icon-02.png' },
      { title: 'Monnaie electronique', component: MonnaiePage,src:this.Glb.IMAGE_BASE_URL+'Petite-Icon-05.png' },
      { title: 'Compte', component: ComptePage,src:this.Glb.IMAGE_BASE_URL+'Petite-Icon-07.png' },
      { title: 'Gestion', component: GestionPage,src:this.Glb.IMAGE_BASE_URL+'Petite-Icon-06.png.png' }

    ];
    console.log(JSON.stringify(this.pages))

  }
  verspage(page){
    this.navCtrl.push(page.component);

  }
  ionViewDidEnter(){
    setTimeout(() => {
      if(this.platform.is('cordova')  || this.platform.is('android')){
      this.splashScreen.hide();
      }
    }, 100);
  }

  ionViewDidLoad() {
     this.platform.ready().then(()=>{
      this.splashScreen.hide();

    });   }

}
