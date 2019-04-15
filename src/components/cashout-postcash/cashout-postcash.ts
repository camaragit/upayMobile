import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RechargeProvider} from "../../providers/recharge/recharge";
import {MillierPipe} from "../../pipes/millier/millier";
import {ServiceProvider} from "../../providers/service/service";
import {GlobalvariableProvider} from "../../providers/globalvariable/globalvariable";

/**
 * Generated class for the CashoutPostcashComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'cashout-postcash',
  templateUrl: 'cashout-postcash.html'
})
export class CashoutPostcashComponent implements OnInit{
  private retraitForm :FormGroup;
  @Input('dataretrait') dataretrait;
  private showdetails:boolean=false;
  private montantrlv;
  private phonerlv;

  constructor(public rechargeServ:RechargeProvider,public number:MillierPipe,public formbuilder:FormBuilder,public serv:ServiceProvider,public glb:GlobalvariableProvider) {
    this.retraitForm = this.formbuilder.group({
      telephone: ['', Validators.required],
      montant: ['', Validators.required],
      oper: ['0053'],
      sousop: ['0002'],
      montanttc: [''],
      frais: [''],
      codevalidation: ['',Validators.required],
      pin: [''],

    })
  }
  changetel(){
    console.log('change');
    this.showdetails = false;
    this.retraitForm.controls['telephone'].setValue(this.retraitForm.controls['telephone'].value.replace(/ /g, ""));
    this.retraitForm.controls['telephone'].setValue(this.retraitForm.controls['telephone'].value.replace(/-/g, ""));
    if(this.retraitForm.controls['telephone'].value.length>9)
      this.retraitForm.controls['telephone'].setValue(this.retraitForm.controls['telephone'].value.substring(0,9));
  }
  changemontant(){
this.showdetails=false;
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
  initierCashout(){
    let parametre :any={};
    parametre.recharge = this.retraitForm.getRawValue();
    parametre.recharge.montant   = parametre.recharge.montant.replace(/ /g, "");
    parametre.recharge.telephone = parametre.recharge.telephone.replace(/-/g, "");
    parametre.recharge.telephone = parametre.recharge.telephone.replace(/ /g, "");
    parametre.idTerm = this.glb.IDTERM;
    parametre.session = this.glb.IDSESS;
    this.serv.afficheloading();
    this.serv.posts('recharge/relevecashinwizall.php',parametre,{}).then(data=>{
      let reponse :any= JSON.parse(data.data);
      this.serv.dismissloadin();
      if(reponse.returnCode=='0'){
        this.showdetails = true;
        this.retraitForm.controls['frais'].setValue(this.number.transform(reponse.mntTarif));
        let ttc:any = reponse.mntTarif*1 + parametre.recharge.montant*1;
        ttc+="";
        this.retraitForm.controls['montanttc'].setValue(this.number.transform(ttc));
        this.montantrlv = parametre.recharge.montant;
        this.phonerlv  = this.retraitForm.controls['telephone'].value;

      }else{
        this.serv.showError(reponse.errorLabel)
      }

    }).catch(err=>{
      this.serv.dismissloadin();
      this.serv.showError("Impossible d'atteindre le serveur");

    })
  }
ngOnInit(){

}
  validerRetrait(){
    let parametre :any ={};
    parametre.recharge = this.retraitForm.getRawValue();
    parametre.recharge.telephone = this.phonerlv;
    parametre.recharge.montant = this.montantrlv;
    parametre.image = this.dataretrait.image;
    parametre.operateur ='PosteCash';
    parametre.operation ='Retrait sur Compte';
    this.serv.saisiecodepin(parametre).then(data=>{
      let values :any =data;
      parametre.recharge.pin = values.pin;
      parametre.idTerm = this.glb.IDTERM;
      parametre.session = this.glb.IDSESS;
      this.serv.afficheloading();
      this.serv.posts('recharge/retraitpostcash.php',parametre,{}).then(data=>{
        this.serv.dismissloadin();
        let reponse = JSON.parse(data.data)
        if(reponse.returnCode=='0'){
          this.glb.recu = reponse;
          this.glb.showRecu = true;
          this.glb.recu.telRech = parametre.recharge.telephone;
          this.glb.recu.guichet = this.glb.IDTERM.substring(5,6);
          this.glb.recu.agence = this.glb.HEADER.agence;
          this.glb.HEADER.montant= this.number.transform(reponse.mntPlfap);
          this.glb.recu.service = parametre.operation;
          this.glb.recu.Oper = parametre.operateur;
        }
        else{
          this.serv.showError(reponse.errorLabel)
        }

      }).catch(err=>{
        this.serv.dismissloadin();
        this.serv.showError("Impossible d'atteindre le serveur");
      })

    }).catch(err=>{

    })
  }
}
