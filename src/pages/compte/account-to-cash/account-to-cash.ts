import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalvariableProvider} from "../../../providers/globalvariable/globalvariable";
import {ServiceProvider} from "../../../providers/service/service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MillierPipe} from "../../../pipes/millier/millier";

/**
 * Generated class for the AccountToCashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account-to-cash',
  templateUrl: 'account-to-cash.html',
})
export class AccountToCashPage {
  private enlevementForm:FormGroup;

  constructor(public number:MillierPipe,public formBuilder:FormBuilder,public serv:ServiceProvider,public navCtrl: NavController, public navParams: NavParams,public glb:GlobalvariableProvider) {
    this.enlevementForm = formBuilder.group({
      mntPlf:[''],
      recipient:['',Validators.required],
      montant:['',Validators.required],
      type:[''],
      min:[''],
      max:['']
    })
  }
  changemontant(){

    if(this.enlevementForm.controls['montant'].value)
    {
      this.enlevementForm.controls['montant'].setValue(this.enlevementForm.controls['montant'].value.replace(/ /g, ""));
      this.enlevementForm.controls['montant'].setValue(this.enlevementForm.controls['montant'].value.replace(/-/g, ""))
      this.enlevementForm.controls['montant'].setValue(this.number.transform(this.enlevementForm.controls['montant'].value));

    }

  }

  ionViewDidLoad() {
    this.reset();
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL+"Icone_Compte.jpg";
    this.glb.HEADERTITELE.title = "Account To Cash";
    console.log('ionViewDidLoad EtatPlafondPage');
  }
  validerReception(){
    let parametre:any={};
    parametre.compte = this.enlevementForm.getRawValue();
    let mnt:any = parametre.compte.montant.replace(/ /g,"")*1;
    let min:any = parametre.compte.min.replace(/ /g,"")*1;
    let max = parametre.compte.max.replace(/ /g,"")*1;
    if(mnt>max || mnt<min){
      this.serv.showError("Le montant doit être compris entre "+this.enlevementForm.controls['min'].value+" et "+this.enlevementForm.controls['max'].value);
      return false;
    }
    parametre.compte.mntPlf = parametre.compte.mntPlf.replace(/ /g,"");
    parametre.compte.montant = parametre.compte.montant.replace(/ /g,"");
    parametre.session = this.glb.IDSESS;
    parametre.idTerm = this.glb.IDTERM;
    parametre.image = this.glb.HEADERTITELE.src;
    parametre.operation = 'Account-To-Account';
    parametre.recharge = {};
    parametre.recharge.montant = parametre.compte.montant;
    this.serv.saisiecodepin(parametre).then(data=>{
      let value :any =data;
      parametre.compte.pin = value.pin;
      this.serv.afficheloading();
      this.serv.posts('compte/enlevement.php',parametre,{}).then(data=>{
        this.serv.dismissloadin();
        let reponse :any = JSON.parse(data.data);
        if(reponse.returnCode=='0'){
          this.serv.showAlert("Demande d'enlèvement de "+ parametre.compte.montant+" enregistrée avec succès");
          this.reset();
        }
        else this.serv.showError(reponse.errorLabel);

      }).catch(err=>{
        this.serv.dismissloadin();
        this.serv.showError("Impossible d'atteindre le serveur");
      })
    }).catch(err=>{

    })

  }
  reset(){
    this.enlevementForm.reset();
    this.glb.showRecu=false;
    this.enlevementForm.controls['mntPlf'].setValue(this.number.transform(this.glb.HEADER.montant))
    let min:any =this.glb.minenlevement;
    min+="";
    let max:any = this.glb.HEADER.montant.replace(/ /g,"")*1-100000;
    max = max>0?max+"":"0";
    this.enlevementForm.controls['min'].setValue(this.number.transform(min))
    this.enlevementForm.controls['max'].setValue(this.number.transform(max));
    this.enlevementForm.controls['type'].setValue("01");
  }

}
