import { RechargePage } from './../pages/recharge/recharge';
import {Component, ViewChild} from '@angular/core';
import {MenuController, ModalController, Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { HomePage } from '../pages/home/home';
import {ConnexionPage} from "../pages/connexion/connexion";
import {EncaissementPage} from "../pages/encaissement/encaissement";
import {TransfertPage} from "../pages/transfert/transfert";
import {MonnaiePage} from "../pages/monnaie/monnaie";
import {ComptePage} from "../pages/compte/compte";
import {GestionPage} from "../pages/gestion/gestion";
import {GlobalvariableProvider} from "../providers/globalvariable/globalvariable";
import {ParametrePage} from "../pages/parametre/parametre";
import {SplashScreen} from "@ionic-native/splash-screen";
import {Network} from "@ionic-native/network";
import {ServiceProvider} from "../providers/service/service";
import {OneSignal} from "@ionic-native/onesignal";
import {MessageComponent} from "../components/message/message";
import {PubliciteComponent} from "../components/publicite/publicite";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = ConnexionPage;
  private pages:any;
  @ViewChild(Nav) nav: Nav;

  constructor(private modalCrtl:ModalController,private oneSignal:OneSignal,private splashScreen:SplashScreen,public network:Network,public platform: Platform, statusBar: StatusBar,public Glb:GlobalvariableProvider,public serv:ServiceProvider) {
    this.pages = [
      { title: 'Acceuil', component: HomePage,src:this.Glb.IMAGE_BASE_URL+'Icon-08.png' },
      { title: 'Paiement Factures', component: EncaissementPage,src:this.Glb.IMAGE_BASE_URL+'Petite-Icon-04.png' },
      { title: "Transfert d'argent", component: TransfertPage,src:this.Glb.IMAGE_BASE_URL+'Petite-Icon-03.png' },
      { title: "Recharge", component: RechargePage,src:this.Glb.IMAGE_BASE_URL+'Petite-Icon-02.png' },
      { title: 'Monnaie electronique', component: MonnaiePage,src:this.Glb.IMAGE_BASE_URL+'Petite-Icon-05.png' },
      { title: 'Compte', component: ComptePage,src:this.Glb.IMAGE_BASE_URL+'Petite-Icon-07.png' },
      { title: 'Gestion', component: GestionPage,src:this.Glb.IMAGE_BASE_URL+'Petite-Icon-06.png.png' },
      { title: 'Parametres', component: ParametrePage,src:this.Glb.IMAGE_BASE_URL+'Icone_Parametrage.png' },
      { title: 'Deconnexion', component: ConnexionPage,src:this.Glb.IMAGE_BASE_URL+'Icon-13.png' }

    ];

    platform.ready().then(() => {
      statusBar.styleDefault();
   
      this.splashScreen.hide();

      this.checkNetwork();

      var gestionNotification = function(jsonData) {
/*        $rootScope.notification = jsonData.notification?jsonData.notification.payload:jsonData.payload;
        if($rootScope.notification.bigPicture)
          compteFact.affichepub($rootScope.notification.bigPicture,$rootScope.notification.title,$rootScope.notification.body);
        else
          compteFact.affichealert($rootScope.notification.body);*/
      };
      this.oneSignal.startInit('0283c2b3-d313-4eba-80ef-2ed2b6c89fde', '591653617837');

      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

      this.oneSignal.handleNotificationReceived().subscribe((data) => {
      //  alert(JSON.stringify(data))
      });

      this.oneSignal.handleNotificationOpened().subscribe((data) => {
        // do something when a notification is opened
        let mod= this.modalCrtl.create(data.notification.payload.bigPicture?PubliciteComponent:MessageComponent,{val:data},{cssClass: "test"});
        mod.present();      });
      this.oneSignal.endInit();
    });
  }

  verspage(page){
    if(page.component==ConnexionPage)
      this.nav.setRoot(page.component);
    else this.nav.push(page.component);
  }
  initializeApp() {
/*     this.platform.ready().then(() => {
      // do whatever you need to do here.
      setTimeout(() => {
        this.splashScreen.hide();
      }, 100);
    }); */
  }
  checkNetwork(){
    this.network.onDisconnect().subscribe(() => {
      this.serv.showToast("Vous n'avez plus de connexion internet");
      this.Glb.ISCONNECTED = false;

    });
    this.network.onConnect().subscribe(() => {
      this.serv.showToast("Vous êtes maintenant en ligne");
      this.Glb.ISCONNECTED =true;

    });
  }
}

