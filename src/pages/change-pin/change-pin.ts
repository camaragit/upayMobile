import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ServiceProvider} from "../../providers/service/service";
import {GlobalvariableProvider} from "../../providers/globalvariable/globalvariable";
import { LowerCasePipe } from '@angular/common';

/**
 * Generated class for the ChangePinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-pin',
  templateUrl: 'change-pin.html',
})
export class ChangePinPage {
  private typeanc:string="password";
  private typenouv:string="password";
  private typepwd:string="password";
  private typeconf:string="password";
  private Userdata : FormGroup;
  private message:string;
  private conf:boolean=true;


  constructor(public serv:ServiceProvider,public lower:LowerCasePipe,public formBuilder:FormBuilder,public glb:GlobalvariableProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.Userdata = this.formBuilder.group({
      login: ['', Validators.required],
      pwd: ['', Validators.required],
      newpin: ['', Validators.required],
      ancienpin: ['',Validators.required],
      conf: ['',Validators.required]
    });
  }

  ionViewDidLoad() {
    this.message = "Definir un mot de passe identique au nouveau saisi plus haut";
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL+"chpin.png";
    this.glb.HEADERTITELE.title = "Changement Mot de Pin";
    console.log('ionViewDidLoad ChangePasswordPage');
  }
  lowercase(){
    this.Userdata.controls['login'].setValue(this.lower.transform(this.Userdata.controls['login'].value))
   }
  affichemdpanc(){
    this.typeanc="text";
    setTimeout(() => {
      this.typeanc ="password";
    }, 5000);
  }
  affichemdp(){
    this.typepwd="text";
    setTimeout(() => {
      this.typepwd ="password";
    }, 5000);
  }
  affichemdpconf(){
    this.typeconf="text";
    setTimeout(() => {
      this.typeconf ="password";
    }, 5000);
  }
  affichemdpnouv(){
    this.typenouv="text";
    setTimeout(() => {
      this.typenouv ="password";
    }, 5000);
  }
  changeMotDePasse(){
    let parametre:any={};
    parametre.datapin = this.Userdata.getRawValue();
    parametre.session =this.glb.IDSESS;
    parametre.idTerm = this.glb.IDTERM;
    parametre.idPartn = this.glb.IDPART;
    this.serv.afficheloading();
    this.serv.posts('connexion/changepin.php',parametre,{}).then(data=>{
      this.serv.dismissloadin();
      let reponse = JSON.parse(data.data)
      if(reponse.returnCode=='0'){
        this.serv.showAlert(reponse.Message);
        this.Userdata.reset();
      }
      else this.serv.showError(reponse.errorLabel)
    }).catch(err=>{
      this.serv.dismissloadin();
      this.serv.showError("Impossible d'atteindre le serveur")
    })

  }
  verifconformite(){
    this.conf = this.Userdata.controls['newpin'].value == this.Userdata.controls['conf'].value
  }
}
