import { Component } from '@angular/core';
import {AlertController, IonicPage, MenuController, NavController, NavParams, Platform} from 'ionic-angular';
import {HomePage} from "../home/home";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ServiceProvider} from "../../providers/service/service";
import {GlobalvariableProvider} from "../../providers/globalvariable/globalvariable";
import {Sim} from "@ionic-native/sim";
import {LowerCasePipe} from "@angular/common";
import {MillierPipe} from "../../pipes/millier/millier";
import {SplashScreen} from "@ionic-native/splash-screen";
import {OneSignal} from "@ionic-native/onesignal";

/**
 * Generated class for the ConnexionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-connexion',
  templateUrl: 'connexion.html',
})
export class ConnexionPage {
  private Userdata : FormGroup;
  private type:string="password";
  selectedImp:any;

  constructor(private oneSignal:OneSignal,private menu: MenuController,public number:MillierPipe,public lower:LowerCasePipe,private sim: Sim,public glb:GlobalvariableProvider,public alertCtrl:AlertController,public navCtrl: NavController, public navParams: NavParams,public formBuilder:FormBuilder,public serv:ServiceProvider) {
    this.Userdata = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
      imei: [''],
      idSim1: [''],
      idSim2: [''],
    });
  }


  ionViewDidLoad() {

    this.menu.swipeEnable(false);

  }
  ionViewWillLeave() {
    // Don't forget to return the swipe to normal, otherwise
    // the rest of the pages won't be able to swipe to open menu
    this.menu.swipeEnable(true);

    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(true, 'menu1');
  }
s
  chercherimprimante(){
    if(this.glb.statusImpriamte==true){
      //this.GblVariable.statusImpriamte=false
      this.serv.rechercheperiph();
    }
    else{

    }
  }
  lier(){
    console.log(JSON.stringify(this.selectedImp))
    this.serv.liaison(this.selectedImp.id)
  }
  affichemdp() {
    this.type="text";
    setTimeout(() => {
      this.type ="password";
    }, 5000);
  }
  lowercase(){
   this.Userdata.controls['login'].setValue(this.lower.transform(this.Userdata.controls['login'].value))
  }
  connecter(){
    this.navCtrl.setRoot(HomePage);

/*     this.sim.requestReadPermission().then(
      () => {
        this.sim.getSimInfo().then(
          (info) =>{
            this.Userdata.controls['imei'].setValue(info.deviceId);
            if(!info.simSerialNumber)
            {
              this.serv.showError('Veuillez inserer une carte SIM')
            }

            else{
              let card = info.cards;
              if(card){
                this.Userdata.controls['idSim1'].setValue(card[0].simSerialNumber)
                if(card.length > 1)
                  this.Userdata.controls['idSim2'].setValue(card[1].simSerialNumber)
              }
              else this.Userdata.controls['idSim1'].setValue(info.simSerialNumber);
            }
            this.oneSignal.sendTags({imei:this.Userdata.controls['imei'].value,
              numsim1:this.Userdata.controls['idSim1'].value,
              numsim2:this.Userdata.controls['idSim2'].value,
            });
            this.serv.afficheloading();
            this.serv.posts('connexion/conn.php',this.Userdata.getRawValue(),{}).then(data=>{

              let reponse = JSON.parse(data.data);
              console.log(JSON.stringify(reponse))
             // alert("Connexion "+JSON.stringify(reponse));
              if(reponse.returnCode=='0'){
                  this.glb.HEADER.agence=reponse.agence;
                  this.glb.IDPART = reponse.idPartn;
                  this.glb.IDSESS = reponse.idSession;
                  this.glb.IDTERM = reponse.idTerm;
                  this.serv.getplafond().then(data=>{
                    this.serv.dismissloadin();
                    let plafond = JSON.parse(data.data);
                    //alert("Connexion "+JSON.stringify(plafond))
                    if(plafond.returnCode=='0'){

                      this.oneSignal.sendTags({codeespace:this.glb.HEADER.agence});
                      this.glb.HEADER.montant = this.number.transform(plafond.mntPlf);
                      this.glb.HEADER.numcompte = plafond.numcompte;
                      this.glb.HEADER.consomme = this.number.transform(plafond.consome)
                      this.navCtrl.setRoot(HomePage)
                    } else this.serv.showError(plafond.errorLabel)

                }).catch(error=>{
                    this.serv.dismissloadin();
                    this.serv.showError("Impossible d'atteindre le serveur ");

                })

              }
              else{
                this.serv.dismissloadin();
                this.serv.showError(reponse.errorLabel);
              }
            }).catch(error=>{
              this.serv.dismissloadin();
              this.serv.showError("Impossible d'atteindre le serveur ");

            })


          },
          (err) => this.serv.showError("Impossible de récuperer les infos du téléphones")
        );
      },
      () => this.serv.showError("Vous devez activer les autorisations")
    ) */

  }


}
