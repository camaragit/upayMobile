import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalvariableProvider} from "../../../providers/globalvariable/globalvariable";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ServiceProvider} from "../../../providers/service/service";
import {MillierPipe} from "../../../pipes/millier/millier";
import {FormatphonePipe} from "../../../pipes/formatphone/formatphone";
import {DatePipe} from "@angular/common";

/**
 * Generated class for the CashtoAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cashto-account',
  templateUrl: 'cashto-account.html',
})
export class CashtoAccountPage {
  private dataForm:FormGroup;
  private showdetails :boolean=false;
  private NomEs :any;


  constructor(public formatDate:DatePipe,public formatphone:FormatphonePipe,public number:MillierPipe,public formBuilder:FormBuilder,public serv:ServiceProvider,public navCtrl: NavController, public navParams: NavParams,public glb:GlobalvariableProvider) {
    this.dataForm = this.formBuilder.group({
      institution:['',Validators.required],
      montant:['',Validators.required],
      prenomremet:['',Validators.required],
      telremet:['',Validators.required],
      typIdExp:[''],
      Codees:[''],
      numPiece:[''],
      adresse:[''],
      Numcompte:[''],
      frais:['0'],
      mnttc:['0']
    })
  }

  ionViewDidLoad() {
    this.glb.showRecu=false;
    this.showdetails = false;
    this.dataForm.controls['institution'].setValue('ATPS');
    this.reset();
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL+"Icone_Compte.jpg";
    this.glb.HEADERTITELE.title = "Cash To Account";
    console.log('ionViewDidLoad EtatPlafondPage ' );
  }
  validerReception(){
    console.log('dame');

    let parametre :any={};
    parametre.compte = this.dataForm.getRawValue();
    parametre.operation='Cash-To-Account'
    parametre.recharge ={};
    parametre.image = this.glb.HEADERTITELE.src;
    parametre.recharge.montant = parametre.compte.montant.replace(/ /g,"");
    parametre.compte.mnttc = parametre.compte.mnttc.replace(/ /g,"");
    parametre.compte.montant = parametre.compte.montant.replace(/ /g,"");
    parametre.recharge.frais = parametre.compte.frais.replace(/ /g,"");
    this.serv.saisiecodepin(parametre).then(data=>{
      let value :any =data;
      parametre.compte.pin = value.pin;
      parametre.idTerm = this.glb.IDTERM;
      parametre.session = this.glb.IDSESS;
      this.serv.afficheloading();
      this.serv.posts('compte/cash2Acompte_enc.php',parametre,{}).then(data=>{
        this.serv.dismissloadin();
        let reponse :any= JSON.parse(data.data);
        if(reponse.returnCode=='0'){
          this.glb.recu = reponse;
          this.glb.recu.guichet = this.glb.IDTERM.substring(5,6);
          this.glb.recu.agence = this.glb.HEADER.agence;
          this.glb.recu.teclient = parametre.compte.telremet;
          if(parametre.compte.institution=='ATPS')
          {
            this.glb.recu.nomEs = this.NomEs;
            this.glb.recu.codees = parametre.compte.Codees;
            this.glb.recu.numpiece = parametre.compte.numPiece;
          }
          this.glb.recu.remettant = parametre.compte.prenomremet;

          this.glb.recu.mnttc = this.glb.recu.montant*1 + this.glb.recu.frais*1;
          if(parametre.compte.institution=='ATPS')
          this.glb.recu.mnttc = this.number.transform(this.glb.recu.mttc);
          else
            this.glb.recu.mnttc = this.number.transform(this.glb.recu.montant);
          this.glb.recu.montant = this.number.transform(this.glb.recu.montant);
          this.glb.recu.frais = this.number.transform(this.glb.recu.frais);
          this.glb.recu.dtTrx = this.formatDate.transform(Date.now(),'dd-MM-yyyy @ HH:mm:ss');
          this.glb.showRecu=true;
        }else this.serv.showError(reponse.errorLabel)
      }).catch(err=>{
        this.serv.dismissloadin();
        this.serv.showError("Impossible d'atteindre le serveur")
      })
    }).catch(err=>{

    })


  }
  changemontant(){

    if(this.dataForm.controls['montant'].value)
    {
      this.dataForm.controls['montant'].setValue(this.dataForm.controls['montant'].value.replace(/ /g, ""));
      this.dataForm.controls['montant'].setValue(this.dataForm.controls['montant'].value.replace(/-/g, ""))
      this.dataForm.controls['montant'].setValue(this.number.transform(this.dataForm.controls['montant'].value));

    }

  }
  changetel(){
    console.log('change')
    this.dataForm.controls['telremet'].setValue(this.dataForm.controls['telremet'].value.replace(/ /g, ""));
    this.dataForm.controls['telremet'].setValue(this.dataForm.controls['telremet'].value.replace(/-/g, ""));
    if(this.dataForm.controls['telremet'].value.length>9)
      this.dataForm.controls['telremet'].setValue(this.dataForm.controls['telremet'].value.substring(0,9));
  }
  focustel(){
    console.log('focus')
    if(this.dataForm.controls['telremet'].value)
    {
      this.dataForm.controls['telremet'].setValue(this.dataForm.controls['telremet'].value.replace(/ /g, ""));
      this.dataForm.controls['telremet'].setValue(this.dataForm.controls['telremet'].value.replace(/-/g, ""));

    }
  }
  blurtel(){

    this.dataForm.controls['telremet'].setValue(this.formatphone.transform(this.dataForm.controls['telremet'].value));

  }
  reset(){
    this.showdetails = false;
    if(this.dataForm.controls['institution'].value=='AMANA'){

      this.dataForm.controls['typIdExp'].clearValidators();
      this.dataForm.controls['typIdExp'].updateValueAndValidity();
      this.dataForm.controls['Codees'].clearValidators();
      this.dataForm.controls['Codees'].updateValueAndValidity();
      this.dataForm.controls['numPiece'].clearValidators();
      this.dataForm.controls['numPiece'].updateValueAndValidity();
      this.dataForm.controls['adresse'].clearValidators();
      this.dataForm.controls['adresse'].updateValueAndValidity();
      this.dataForm.controls['Numcompte'].clearValidators();
      this.dataForm.controls['Numcompte'].updateValueAndValidity();
    }
    else {
      this.dataForm.controls['typIdExp'].setValidators(Validators.required)
      this.dataForm.controls['typIdExp'].updateValueAndValidity();
      this.dataForm.controls['Codees'].setValidators(Validators.required)
      this.dataForm.controls['Codees'].updateValueAndValidity();
      this.dataForm.controls['numPiece'].setValidators(Validators.required)
      this.dataForm.controls['numPiece'].updateValueAndValidity();
      this.dataForm.controls['adresse'].setValidators(Validators.required)
      this.dataForm.controls['adresse'].updateValueAndValidity();
      this.dataForm.controls['Numcompte'].setValidators(Validators.required)
      this.dataForm.controls['Numcompte'].updateValueAndValidity();

    }
  }
  afficher(){
    this.showdetails =false;
    let parametre :any={};
    parametre.compte =  this.dataForm.getRawValue();
    parametre.compte.montant = parametre.compte.montant.replace(/ /g, "");
    parametre.idTerm= this.glb.IDTERM;
    parametre.session = this.glb.IDSESS;
    this.serv.afficheloading();
    this.serv.posts('compte/relevec2a.php',parametre,{}).then(data=>{
      this.serv.dismissloadin();
      let reponse :any= JSON.parse(data.data);
      if(reponse.returnCode=='0'){
        this.dataForm.controls['Codees'].setValue(reponse.Codees);
        this.dataForm.controls['montant'].setValue(this.number.transform(reponse.montant));
        this.dataForm.controls['Numcompte'].setValue(reponse.Numcompte);
        this.dataForm.controls['typIdExp'].setValue('CNI');
        this.dataForm.controls['frais'].setValue(reponse.frais);
        let mnttc :any = reponse.montant*1 + reponse.frais*1;
        mnttc+="";
        this.dataForm.controls['mnttc'].setValue(this.number.transform(mnttc));
        this.NomEs = reponse.Nomes;
        this.showdetails=true;


      }else this.serv.showError(reponse.errorLabel);
    }).catch(err=>{

    })
  }

}
