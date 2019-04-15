import {Component, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RechargeProvider} from "../../providers/recharge/recharge";
import {MillierPipe} from "../../pipes/millier/millier";
import {ServiceProvider} from "../../providers/service/service";
import {GlobalvariableProvider} from "../../providers/globalvariable/globalvariable";

/**
 * Generated class for the RetraitCompteComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'retrait-compte',
  templateUrl: 'retrait-compte.html'
})
export class RetraitCompteComponent {

  private retraitForm :FormGroup;
  @Input('dataretrait') dataretrait;

  constructor(public rechargeServ:RechargeProvider,public number:MillierPipe,public formbuilder:FormBuilder,public serv:ServiceProvider,public glb:GlobalvariableProvider) {
    this.retraitForm = this.formbuilder.group({
      codevalidation: ['', Validators.required],
      montant: ['', Validators.required],
      oper: ['0057'],
      numtrx: [''],
      pin: [''],

    })
  }
  validerRetrait(){
    let parametre :any={};
    parametre.recharge = this.retraitForm.getRawValue();
    parametre.operation ='Retrait sur Compte';
    parametre.operateur = 'Wizall';
    parametre.image = this.dataretrait.image;
    console.log(JSON.stringify(parametre))
    this.serv.saisiecodepin(parametre).then(data=>{
      let values :any =data;
      parametre.recharge.pin = values.pin;
      parametre.session = this.glb.IDSESS;
      parametre.idTerm = this.glb.IDTERM;
      this.serv.afficheloading();
      this.serv.posts('recharge/validationWalett.php',parametre,{}).then(data=>{
        this.serv.dismissloadin();
        let reponse = JSON.parse(data.data)
        if(reponse.returnCode=='0'){
          this.glb.recu = reponse;
          this.glb.recu.agence = this.glb.HEADER.agence;
          this.glb.recu.guichet = this.glb.IDTERM.substring(6, 5);
          this.glb.recu.Oper = 'Wizall';
          this.glb.recu.service = 'Retrait sur Compte';
          this.glb.recu.telRech = parametre.recharge.codevalidation;
          this.glb.showRecu = true;
        }
        else this.serv.showError(reponse.errorLabel)
      }).catch(err=>{
        this.serv.dismissloadin();
        this.serv.showError("Impossible d'atteindre le serveur")
      })
    }).catch(err=>{

    })

  }

  changetel(){
    console.log('change')
    this.retraitForm.controls['telephone'].setValue(this.retraitForm.controls['telephone'].value.replace(/ /g, ""));
    this.retraitForm.controls['telephone'].setValue(this.retraitForm.controls['telephone'].value.replace(/-/g, ""));
    if(this.retraitForm.controls['telephone'].value.length>9)
      this.retraitForm.controls['telephone'].setValue(this.retraitForm.controls['telephone'].value.substring(0,9));
  }
  changemontant(){

    if(this.retraitForm.controls['montant'].value)
    {
      this.retraitForm.controls['montant'].setValue(this.retraitForm.controls['montant'].value.replace(/ /g, ""));
      this.retraitForm.controls['montant'].setValue(this.retraitForm.controls['montant'].value.replace(/-/g, ""))
      this.retraitForm.controls['montant'].setValue(this.number.transform(this.retraitForm.controls['montant'].value));

    }

  }
  focustel(){
    console.log('focus')
    if(this.retraitForm.controls['telephone'].value)
    {
      this.retraitForm.controls['telephone'].setValue(this.retraitForm.controls['telephone'].value.replace(/ /g, ""));
      this.retraitForm.controls['telephone'].setValue(this.retraitForm.controls['telephone'].value.replace(/-/g, ""));

    }
  }
  blurtel(){
    console.log('blur')
    let tel = this.retraitForm.controls['telephone'].value;
    let phone = tel.length>=2?tel.substring(0,2)+'-':'';
    phone+= tel.length >5 ?tel.substring(2,5)+'-':'';
    phone+= tel.length >7 ?tel.substring(5,7)+'-':'';
    phone+= tel.length >=8 ?tel.substring(7,9):'';
    this.retraitForm.controls['telephone'].setValue(phone);

  }

}
