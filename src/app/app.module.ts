import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {BluetoothSerial} from "@ionic-native/bluetooth-serial";
import {Http, HttpModule} from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { GlobalvariableProvider } from '../providers/globalvariable/globalvariable';
import { ServiceProvider } from '../providers/service/service';
import {ImprimantePage} from "../pages/imprimante/imprimante";
import {ConnexionPage} from "../pages/connexion/connexion";
import {HttpClientModule} from "@angular/common/http";
import {HeaderComponent} from "../components/header/header";
import {EncaissementPage} from "../pages/encaissement/encaissement";
import {HeaderTitleComponent} from "../components/header-title/header-title";
import {TransfertPage} from "../pages/transfert/transfert";
import {RechargePage} from "../pages/recharge/recharge";
import {EncSenelecPage} from "../pages/encaissement/enc-senelec/enc-senelec";
import {EncSdePage} from "../pages/encaissement/enc-sde/enc-sde";
import {EncWoyofalPage} from "../pages/encaissement/enc-woyofal/enc-woyofal";
import {RiaPage} from "../pages/transfert/ria/ria";
import {ProxicashPage} from "../pages/transfert/proxicash/proxicash";
import {ReceptionComponent} from "../components/reception/reception";
import {EnvoiComponent} from "../components/envoi/envoi";
import {ScrollComponent} from "../components/scroll/scroll";
import {RechargeComponent} from "../components/recharge/recharge";
import {OrangePage} from "../pages/recharge/orange/orange";
import {IziPage} from "../pages/recharge/izi/izi";
import {YakalmaPage} from "../pages/recharge/yakalma/yakalma";
import {RapidoPage} from "../pages/recharge/rapido/rapido";
import {MonnaiePage} from "../pages/monnaie/monnaie";
import {WizallPage} from "../pages/monnaie/wizall/wizall";
import {EMoneyPage} from "../pages/monnaie/e-money/e-money";
import {TigoCashPage} from "../pages/monnaie/tigo-cash/tigo-cash";
import {OrangeMoneyPage} from "../pages/monnaie/orange-money/orange-money";
import {CashoutomComponent} from "../components/cashoutom/cashoutom";
import {CashoutEmoneyComponent} from "../components/cashout-emoney/cashout-emoney";
import {RetraitCompteComponent} from "../components/retrait-compte/retrait-compte";
import {CashoutPostcashComponent} from "../components/cashout-postcash/cashout-postcash";
import {PosteCashPage} from "../pages/monnaie/poste-cash/poste-cash";
import {ComptePage} from "../pages/compte/compte";
import {GestionPage} from "../pages/gestion/gestion";
import {EtatPlafondPage} from "../pages/compte/etat-plafond/etat-plafond";
import {EtatCaissePage} from "../pages/compte/etat-caisse/etat-caisse";
import {EtatCommissionPage} from "../pages/compte/etat-commission/etat-commission";
import {AccountToCashPage} from "../pages/compte/account-to-cash/account-to-cash";
import {CashtoAccountPage} from "../pages/compte/cashto-account/cashto-account";
import {EtatMouvementPage} from "../pages/compte/etat-mouvement/etat-mouvement";
import {HistoriquePlafondPage} from "../pages/gestion/historique-plafond/historique-plafond";
import {HistoriqueTransactionPage} from "../pages/gestion/historique-transaction/historique-transaction";
import {DuplicatatWoyofalPage} from "../pages/gestion/duplicatat-woyofal/duplicatat-woyofal";
import {DuplicatatTransfertPage} from "../pages/gestion/duplicatat-transfert/duplicatat-transfert";
import {DuplicatatEncaissementPage} from "../pages/gestion/duplicatat-encaissement/duplicatat-encaissement";
import {RecuC2aComponent} from "../components/recu-c2a/recu-c2a";
import {RecuEncaissementComponent} from "../components/recu-encaissement/recu-encaissement";
import {RecuTransfertComponent} from "../components/recu-transfert/recu-transfert";
import {RecuRechargeComponent} from "../components/recu-recharge/recu-recharge";
import {RecuWoyofalComponent} from "../components/recu-woyofal/recu-woyofal";
import {Sim} from "@ionic-native/sim";
import {DatePipe, DecimalPipe, LowerCasePipe, registerLocaleData} from "@angular/common";
import {HTTP} from "@ionic-native/http";
import localeFr from '@angular/common/locales/fr';
import {MillierPipe} from "../pipes/millier/millier";
import { RechargeProvider } from '../providers/recharge/recharge';
import {CashinreleveComponent} from "../components/cashinreleve/cashinreleve";
import {CashoutCodeComponent} from "../components/cashout-code/cashout-code";
import { EnvoiProvider } from '../providers/envoi/envoi';
import {FormatphonePipe} from "../pipes/formatphone/formatphone";
import {FormatdatePipe} from "../pipes/formatdate/formatdate";
import {FormatCodeTransfertPipe} from "../pipes/format-code-transfert/format-code-transfert";
import {EncaissementReleveComponent} from "../components/encaissement-releve/encaissement-releve";
import {CoupureChainePipe} from "../pipes/coupure-chaine/coupure-chaine";
import {Toast} from "@ionic-native/toast";
import {AutoCompleteModule} from "ionic2-auto-complete";
import { PaysProvider } from '../providers/pays/pays';
import {ParametrePage} from "../pages/parametre/parametre";
import {ChangePinPage} from "../pages/change-pin/change-pin";
import {ChangePasswordPage} from "../pages/change-password/change-password";
import {ProxicashTransfertPage} from "../pages/proxicash-transfert/proxicash-transfert";
import {Network} from "@ionic-native/network";
import {OneSignal} from "@ionic-native/onesignal";
import {MessageComponent} from "../components/message/message";
import {PubliciteComponent} from "../components/publicite/publicite";

registerLocaleData(localeFr);
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ImprimantePage,
    ConnexionPage,
    HeaderComponent,
    EncaissementPage,
    HeaderTitleComponent,
    TransfertPage,
    RechargePage,
    EncSenelecPage,
    EncSdePage,
    EncWoyofalPage,
    RiaPage,
    ProxicashPage,
    ReceptionComponent,EnvoiComponent,ScrollComponent,RechargeComponent,PubliciteComponent,
    CashoutomComponent,CashoutEmoneyComponent,RetraitCompteComponent,CashoutPostcashComponent,MessageComponent,
    OrangePage,
    IziPage,
    YakalmaPage,
    RapidoPage,ParametrePage,ChangePinPage,ChangePasswordPage,ProxicashTransfertPage,
    MonnaiePage,CashinreleveComponent,CashoutCodeComponent,EncaissementReleveComponent,
    ComptePage,GestionPage,MillierPipe,FormatphonePipe,FormatdatePipe,
    WizallPage,EMoneyPage,OrangePage,TigoCashPage,OrangeMoneyPage,PosteCashPage,
    EtatPlafondPage,EtatCaissePage,EtatCommissionPage,EtatMouvementPage,CoupureChainePipe,
    HistoriquePlafondPage,HistoriqueTransactionPage,FormatCodeTransfertPipe,
    DuplicatatEncaissementPage,DuplicatatWoyofalPage,DuplicatatTransfertPage,
    EtatPlafondPage,EtatCaissePage,EtatCommissionPage,AccountToCashPage,CashtoAccountPage,
    RecuC2aComponent,RecuEncaissementComponent,RecuTransfertComponent,RecuRechargeComponent,RecuWoyofalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,HttpModule,
    AutoCompleteModule,
    IonicModule.forRoot(MyApp,{monthNames: ['Janvier', 'Février', 'Mars','Avril','Mai','Juin','Juillet',
        'Août','Septembre','Octobre','Novembre','Décembre' ],
      dayNames: ['Dimanche', 'Lundi', 'Mardi','Mercredi','Jeudi','Vendredi','Samedi' ]})
  ],

  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ImprimantePage,
    ConnexionPage,
    HeaderComponent,
    EncaissementPage,
    HeaderTitleComponent,
    TransfertPage,
    RechargePage,
    EncSenelecPage,
    EncSenelecPage,
    EncSdePage,
    EncWoyofalPage,
    RiaPage,
    ProxicashPage,
    ReceptionComponent,EnvoiComponent,MessageComponent,PubliciteComponent,
    OrangePage,
    IziPage,
    YakalmaPage,RapidoPage,MonnaiePage,
    WizallPage,EMoneyPage,OrangePage,TigoCashPage,OrangeMoneyPage,
    PosteCashPage,ComptePage,GestionPage,EtatMouvementPage,
    HistoriquePlafondPage,HistoriqueTransactionPage,ParametrePage,ChangePinPage,ChangePasswordPage,
    DuplicatatEncaissementPage,DuplicatatWoyofalPage,DuplicatatTransfertPage,
    EtatPlafondPage,EtatCaissePage,EtatCommissionPage,AccountToCashPage,CashtoAccountPage,ProxicashTransfertPage,
    RecuC2aComponent,RecuEncaissementComponent,RecuTransfertComponent,RecuRechargeComponent,RecuWoyofalComponent

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GlobalvariableProvider,BluetoothSerial,
    ServiceProvider,Sim,LowerCasePipe,HTTP,DecimalPipe,MillierPipe,
    RechargeProvider,FormatphonePipe,FormatdatePipe,FormatCodeTransfertPipe,
    EnvoiProvider,CoupureChainePipe,DatePipe,Toast,
    PaysProvider, SplashScreen,Network,OneSignal
  ]
})
export class AppModule {}
