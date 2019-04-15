import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalvariableProvider} from "../../providers/globalvariable/globalvariable";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ServiceProvider} from "../../providers/service/service";
import { LowerCasePipe } from '@angular/common';


@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {
  private typeanc:string="password";
  private typenouv:string="password";
  private typeconf:string="password";
  private Userdata : FormGroup;
  private message:string;
  private confirmation:boolean=true;


  constructor(public serv:ServiceProvider,public lower:LowerCasePipe,public formBuilder:FormBuilder,public glb:GlobalvariableProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.Userdata = this.formBuilder.group({
      login: ['', Validators.required],
      newpwd: ['', Validators.required],
      ancienpwd: ['',Validators.required],
      conf: ['',Validators.required]
    });
  }

  ionViewDidLoad() {
    this.message = "Definir un mot de passe identique au nouveau saisi plus haut";
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL+"chmdp.png";
    this.glb.HEADERTITELE.title = "Changement Mot de passe";
    console.log('ionViewDidLoad ChangePasswordPage');
  }
  affichemdpanc(){
    this.typeanc="text";
    setTimeout(() => {
      this.typeanc ="password";
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
  lowercase(){
    this.Userdata.controls['login'].setValue(this.lower.transform(this.Userdata.controls['login'].value))
   }
  changeMotDePasse(){
    let parametre:any={};
    parametre.datapass = this.Userdata.getRawValue();
    parametre.session =this.glb.IDSESS;
    parametre.idTerm = this.glb.IDTERM;
    parametre.idPartn = this.glb.IDPART;
    this.serv.afficheloading();
    this.serv.posts('connexion/changepass.php',parametre,{}).then(data=>{
      this.serv.dismissloadin();
      let reponse = JSON.parse(data.data)
      if(reponse.returnCode=='0'){
        this.serv.showAlert(reponse.Message);
        this.Userdata.reset();
      }
      else this.serv.showError(reponse.errorLabel)
    }).catch(err=>{
      this.serv.dismissloadin();
      this.serv.showError("Impossible d'atteindre le serveur "+JSON.stringify(err))
    })

  }
  verifconformite(){
    console.log("nouveau paswd "+this.Userdata.controls['newpwd'].value)
    console.log("conf  paswd "+this.Userdata.controls['conf'].value)
    this.confirmation = this.Userdata.controls['newpwd'].value == this.Userdata.controls['conf'].value
  }

}
