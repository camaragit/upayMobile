import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MillierPipe} from "../../pipes/millier/millier";
import {ServiceProvider} from "../../providers/service/service";
import {GlobalvariableProvider} from "../../providers/globalvariable/globalvariable";

/**
 * Generated class for the CashoutEmoneyComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'cashout-emoney',
  templateUrl: 'cashout-emoney.html'
})
export class CashoutEmoneyComponent implements  OnInit{

private cashoutForm:FormGroup;
  constructor(public glb:GlobalvariableProvider,public number:MillierPipe,public formbuilder:FormBuilder,public serv:ServiceProvider) {
    this.cashoutForm = this.formbuilder.group({telephone: ['', Validators.required],
      codevalidation: ['', Validators.required],
      montant: ['', Validators.required],
      numtrx: ['', Validators.required],
      oper: ['0054']

    });


  }

  changetel(){
    this.cashoutForm.controls['numtrx'].setValue("");
    console.log('change')
    this.cashoutForm.controls['telephone'].setValue(this.cashoutForm.controls['telephone'].value.replace(/ /g, ""));
    this.cashoutForm.controls['telephone'].setValue(this.cashoutForm.controls['telephone'].value.replace(/-/g, ""));
    if(this.cashoutForm.controls['telephone'].value.length>9)
      this.cashoutForm.controls['telephone'].setValue(this.cashoutForm.controls['telephone'].value.substring(0,9));
  }
  changemontant(){
    this.cashoutForm.controls['numtrx'].setValue("");
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
  blurtel(){
    console.log('blur')
    let tel = this.cashoutForm.controls['telephone'].value;
    let phone = tel.length>=2?tel.substring(0,2)+'-':'';
    phone+= tel.length >5 ?tel.substring(2,5)+'-':'';
    phone+= tel.length >7 ?tel.substring(5,7)+'-':'';
    phone+= tel.length >=8 ?tel.substring(7,9):'';
    this.cashoutForm.controls['telephone'].setValue(phone);

  }

  initierCashout(){
    //this.cashoutForm.controls['numtrx'].setValue('5555');

    let parametres :any ={};
    parametres.recharge = this.cashoutForm.getRawValue();
    parametres.idTerm = this.glb.IDTERM;
    parametres.session = this.glb.IDSESS;
    this.serv.afficheloading();
    this.serv.posts('recharge/initcashoutemoney.php',parametres,{}).then(data=>{
      this.serv.dismissloadin();
      let reponse: any= JSON.parse(data.data);
      if(reponse.returnCode=='0')
      {
        this.cashoutForm.controls['numtrx'].setValue(reponse.numtrx);
        this.serv.showAlert(reponse.desc)

      }
      else{
        this.serv.showError(reponse.errorLabel)
      }
    }).catch(err=>{
      this.serv.dismissloadin();
      this.serv.showError("Impossible d'atteindre le serveur");
      }
    )


  }
  validerCashout(){
    let parametres :any={};
    parametres.recharge = this.cashoutForm.getRawValue();
    parametres.image = this.glb.IMAGE_BASE_URL+"emoney.png";
    parametres.operation = 'Cashout';
    parametres.operateur ="E-money";
    this.serv.saisiecodepin(parametres).then(data=>{
      let code : any=data;
      parametres.recharge.pin = code.pin;
      parametres.idTerm= this.glb.IDTERM;
      parametres.session= this.glb.IDSESS;
      this.serv.afficheloading();
      this.serv.posts('recharge/validationemoney.php',parametres,{}).then(data=>{
        this.serv.dismissloadin();
        let reponse = JSON.parse(data.data)
        if(reponse.returnCode=='0'){
          this.glb.showRecu = true;
          this.glb.recu = reponse;
          this.glb.recu.Oper = 'E-Money';
          this.glb.recu.service = 'Cash-Out';
          this.glb.recu.telRech = parametres.recharge.telephone;
          this.glb.HEADER.montant = reponse.mntPlfap;
          this.glb.recu.guichet = this.glb.IDTERM.substring(5,6);
          this.glb.recu.agence = this.glb.HEADER.agence;
          this.reset();
        }
        else this.serv.showError(reponse.errorLabel)
      }).catch(err=>{
        this.serv.dismissloadin();
        this.serv.showError("Impossible d'atteindre le serveur")

      })
    }).catch(err=>{

    })



  }
  reset(){
    this.cashoutForm.reset();
  }

  ngOnInit(): void {
    this.reset();

  }

}
