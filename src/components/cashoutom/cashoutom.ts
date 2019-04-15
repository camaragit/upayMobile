import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GlobalvariableProvider} from "../../providers/globalvariable/globalvariable";
import {ServiceProvider} from "../../providers/service/service";
import {MillierPipe} from "../../pipes/millier/millier";

/**
 * Generated class for the CashinsimpleComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'cashoutom',
  templateUrl: 'cashoutom.html'
})
export class CashoutomComponent implements OnInit{
  private cashoutForm:FormGroup;
  private click:boolean=true;
  @Input('datareception') datareception;

  constructor(public number:MillierPipe,public glb:GlobalvariableProvider,public serv:ServiceProvider,public formbuilder:FormBuilder) {
    this.cashoutForm = formbuilder.group({
      montant: ['', Validators.required],
      montantp: ['', Validators.required],
      telephone: ['', Validators.required],
      telephonep: ['', Validators.required],
      oper: ['', Validators.required],


    })

  }

  changetel(){
    console.log('change')
    this.cashoutForm.controls['telephone'].setValue(this.cashoutForm.controls['telephone'].value.replace(/ /g, ""));
    this.cashoutForm.controls['montantp'].setValue("");
    this.cashoutForm.controls['telephonep'].setValue("");
    this.cashoutForm.controls['telephone'].setValue(this.cashoutForm.controls['telephone'].value.replace(/-/g, ""));
    if(this.cashoutForm.controls['telephone'].value.length>9)
      this.cashoutForm.controls['telephone'].setValue(this.cashoutForm.controls['telephone'].value.substring(0,9));
  }
  changemontant(){
    this.cashoutForm.controls['montantp'].setValue("");
    this.cashoutForm.controls['telephonep'].setValue("");
    if(this.cashoutForm.controls['montant'].value)
    {
      this.cashoutForm.controls['montant'].setValue(this.cashoutForm.controls['montant'].value.replace(/ /g, ""));
      this.cashoutForm.controls['montant'].setValue(this.cashoutForm.controls['montant'].value.replace(/-/g, ""))
      this.cashoutForm.controls['montant'].setValue(this.number.transform(this.cashoutForm.controls['montant'].value));

    }

  }
  focustel(){
    console.log('focus')
    if(this.cashoutForm.controls['telephone'].value)
    {
      this.cashoutForm.controls['telephone'].setValue(this.cashoutForm.controls['telephone'].value.replace(/ /g, ""));
      this.cashoutForm.controls['telephone'].setValue(this.cashoutForm.controls['telephone'].value.replace(/-/g, ""));

    }
  }
  blurtelp(){
    console.log('blur')
    let tel = this.cashoutForm.controls['telephonep'].value;
    let phone = tel.length>=2?tel.substring(0,2)+'-':'';
    phone+= tel.length >5 ?tel.substring(2,5)+'-':'';
    phone+= tel.length >7 ?tel.substring(5,7)+'-':'';
    phone+= tel.length >=8 ?tel.substring(7,9):'';
    this.cashoutForm.controls['telephonep'].setValue(phone);

  }
  changetelp(){
    console.log('change')
    this.cashoutForm.controls['telephonep'].setValue(this.cashoutForm.controls['telephonep'].value.replace(/ /g, ""));
    this.cashoutForm.controls['telephonep'].setValue(this.cashoutForm.controls['telephonep'].value.replace(/-/g, ""));
    if(this.cashoutForm.controls['telephonep'].value.length>9)
      this.cashoutForm.controls['telephonep'].setValue(this.cashoutForm.controls['telephonep'].value.substring(0,9));
  }
  changemontantp(){

    if(this.cashoutForm.controls['montantp'].value)
    {
      this.cashoutForm.controls['montantp'].setValue(this.cashoutForm.controls['montantp'].value.replace(/ /g, ""));
      this.cashoutForm.controls['montantp'].setValue(this.cashoutForm.controls['montantp'].value.replace(/-/g, ""))
      this.cashoutForm.controls['montantp'].setValue(this.number.transform(this.cashoutForm.controls['montantp'].value));

    }

  }
  focustelp(){
    console.log('focus')
    if(this.cashoutForm.controls['telephonep'].value)
    {
      this.cashoutForm.controls['telephonep'].setValue(this.cashoutForm.controls['telephonep'].value.replace(/ /g, ""));
      this.cashoutForm.controls['telephonep'].setValue(this.cashoutForm.controls['telephonep'].value.replace(/-/g, ""));

    }
  }
  blurtel(){
    console.log('blur')
    let tel = this.cashoutForm.controls['telephone'].value;
    let phone = tel.length>=2?tel.substring(0,2)+'-':'';
    phone+= tel.length >5 ?tel.substring(2,5)+'-':'';
    phone+= tel.length >7 ?tel.substring(5,7)+'-':'';
    phone+= tel.length >=8 ?tel.substring(7,9):'';
    this.cashoutForm.controls['telephone'].setValue(phone);

  }
  ngOnInit(){
    this.cashoutForm.controls['oper'].setValue(this.datareception.oper)
  }
  initierCashout(){

    let parametres :any={};
    parametres.recharge = this.cashoutForm.getRawValue();
    parametres.idTerm = this.glb.IDTERM;
    parametres.session = this.glb.IDSESS;
    this.serv.afficheloading();
    this.serv.posts('recharge/initCashout.php',parametres,{}).then(data=>{
      this.serv.dismissloadin();
      let reponse = JSON.parse(data.data);
      if(reponse.returnCode=='0'){
        this.cashoutForm.controls['montantp'].setValue(this.cashoutForm.controls['montant'].value)
        this.cashoutForm.controls['telephonep'].setValue(this.cashoutForm.controls['telephone'].value)
        this.cashoutForm.controls['telephone'].setValue('')
        this.cashoutForm.controls['montant'].setValue('')
        this.serv.showAlert(reponse.desc);
      }
      else this.serv.showError(reponse.errorLabel)
    }).catch(err=>{
      this.serv.dismissloadin();
      this.serv.showError("Impossible d'atteindre le serveur")
    })

  }
  validerCashout(){
    this.click = false;
    let parametre:any ={};
    parametre.recharge = this.cashoutForm.getRawValue();
    parametre.recharge.oper= this.datareception.oper;
    parametre.recharge.telephone= parametre.recharge.telephonep;
    parametre.recharge.montant= parametre.recharge.montantp;
    parametre.image = this.datareception.image;
    parametre.operation = this.datareception.operation;
    parametre.operateur = this.datareception.operateur;
    parametre.idTerm = this.glb.IDTERM;
    parametre.session = this.glb.IDSESS;
    this.serv.posts('recharge/verifConfirmation.php',parametre,{}).then(data=>{
      let reponse = JSON.parse(data.data);
      this.click=true;
      if(reponse.returnCode=='0'){
        parametre.recharge.codevalidation = reponse.codeVal;
        this.serv.saisiecodepin(parametre).then(data=>{
          let values:any = data;
          parametre.recharge.montantp = parametre.recharge.montantp.replace(/ /g, "");
          parametre.recharge.telephonep = parametre.recharge.telephonep.replace(/ /g, "");
          parametre.recharge.telephonep = parametre.recharge.telephonep.replace(/-/g, "");
          parametre.recharge.pin = values.pin;
          this.serv.afficheloading();
          console.log(JSON.stringify(parametre));
          this.serv.posts('recharge/validationcashout.php',parametre,{}).then(data=>{
            this.serv.dismissloadin();
            let reponse:any=JSON.parse(data.data)
            if(reponse.returnCode=='0')
            {
              this.glb.recu = reponse;
              this.glb.recu.agence = this.glb.HEADER.agence;
              this.glb.recu.guichet = this.glb.IDTERM.substring(5,6);
              this.glb.recu.Oper = parametre.operateur;
              this.glb.recu.service = this.datareception.operation;
              this.glb.recu.telRech = parametre.recharge.telephonep;
              this.glb.showRecu=true;
            }
            else this.serv.showError(reponse.errorLabel)

          }).catch(err=>{
            this.serv.dismissloadin();
            this.serv.showError("Impossible d'atteindre le serveur")
          })
        }).catch(err=>{})

      }
      else this.serv.showError(reponse.errorLabel)
    }).catch(err=>{
      this.click=true;
      this.serv.dismissloadin();
      this.serv.showError("Impossible d'atteindre le serveur")
    })



  }
}
