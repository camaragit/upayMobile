import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalvariableProvider} from "../../../providers/globalvariable/globalvariable";
import {ServiceProvider} from "../../../providers/service/service";
import {MillierPipe} from "../../../pipes/millier/millier";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormatphonePipe} from "../../../pipes/formatphone/formatphone";
import {FormatdatePipe} from "../../../pipes/formatdate/formatdate";
import {FormatCodeTransfertPipe} from "../../../pipes/format-code-transfert/format-code-transfert";

/**
 * Generated class for the EncWoyofalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-enc-woyofal',
  templateUrl: 'enc-woyofal.html',
})
export class EncWoyofalPage {
  private clientForm:FormGroup;
  private showdetails:boolean=false;
  private newclient:boolean=false;
  private client:any;

  constructor(public formatagechaine:FormatCodeTransfertPipe,public phoneformat:FormatphonePipe,public dateformat:FormatdatePipe,public formBuilder:FormBuilder,public serv:ServiceProvider,public number:MillierPipe,public navCtrl: NavController, public navParams: NavParams,public glb:GlobalvariableProvider) {
    this.clientForm=this.formBuilder.group({
      'numcompteur':['',Validators.required],
      'NomClient':['',Validators.required],
      'telClient':['',Validators.required],
      'IdClient':['',Validators.required],
      'mnttotal':['',Validators.required],
      'adrsClient':['',Validators.required]

    })
  }

  ionViewDidLoad() {
    this.showdetails= this.newclient=false;
    this.glb.showRecu=false;
    this.glb.recu={};
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL+"Icon-11.png";
    this.glb.HEADERTITELE.title = "Paiement de Factures";
  }
  releve(){
    this.showdetails=this.newclient=false;
    let parametre :any={}
    parametre.idTerm = this.glb.IDTERM;
    parametre.session = this.glb.IDSESS;
    parametre.oper='0029';
    parametre.numpolice = this.clientForm.controls['numcompteur'].value;
    this.serv.afficheloading();
    this.serv.posts('encaissement/releve.php',parametre,{}).then(data=>{
      this.serv.dismissloadin();
      let reponse:any= JSON.parse(data.data);
      if(reponse.returnCode=='0'){
        this.showdetails=true;
       this.client = reponse;
       this.clientForm.controls['NomClient'].setValue(reponse.NomClient);
       this.clientForm.controls['telClient'].setValue(reponse.telClient);
       this.clientForm.controls['IdClient'].setValue(reponse.IdClient);
       this.clientForm.controls['numcompteur'].setValue(reponse.IdClient);
       this.clientForm.controls['adrsClient'].setValue(reponse.adrsClient);
       this.client.telClient = this.phoneformat.transform(reponse.telClient);
      }
      else{
        if(reponse.errorLabel=='Nom Client inconnu'){
          this.showdetails = this.newclient=true;
        }
        else this.serv.showError(reponse.errorLabel)
      }


    }).catch(err=>{
      this.serv.dismissloadin();
      this.serv.showError("Impossible d'atteindre le serveur")
    })
  }
  vider(){
    this.showdetails=false;
  }
  reset(){

  }
  changetel(){
    console.log('change')
    this.clientForm.controls['telClient'].setValue(this.clientForm.controls['telClient'].value.replace(/ /g, ""));
    this.clientForm.controls['telClient'].setValue(this.clientForm.controls['telClient'].value.replace(/-/g, ""));
    if(this.clientForm.controls['telClient'].value.length>9)
      this.clientForm.controls['telClient'].setValue(this.clientForm.controls['telClient'].value.substring(0,9));
  }
  changemontant(){

    if(this.clientForm.controls['mnttotal'].value)
    {
      this.clientForm.controls['mnttotal'].setValue(this.clientForm.controls['mnttotal'].value.replace(/ /g, ""));
      this.clientForm.controls['mnttotal'].setValue(this.clientForm.controls['mnttotal'].value.replace(/-/g, ""))
      this.clientForm.controls['mnttotal'].setValue(this.number.transform(this.clientForm.controls['mnttotal'].value));

    }

  }
  focustel(){
    console.log('focus')
    if(this.clientForm.controls['telClient'].value)
    {
      this.clientForm.controls['telClient'].setValue(this.clientForm.controls['telClient'].value.replace(/ /g, ""));
      this.clientForm.controls['telClient'].setValue(this.clientForm.controls['telClient'].value.replace(/-/g, ""));

    }
  }
  blurtel(){

    this.clientForm.controls['telClient'].setValue(this.phoneformat.transform(this.clientForm.controls['telClient'].value));

  }
  encaisser(){
    if(this.newclient && this.serv.verificationnumero(this.clientForm.controls['telClient'].value))
    {
      this.serv.showError("Veuillez bien renseigner le numéro de téléphone du client");
      return false;
    }
    let parametre:any={};
    parametre.factures=this.clientForm.getRawValue();
    parametre.image = this.glb.IMAGE_BASE_URL+'Icon-23.png';
    parametre.recharge={};
    parametre.recharge.telephone = parametre.factures.IdClient;
    parametre.recharge.montant = parametre.factures.mnttotal;
    parametre.recharge.oper='0029';
    parametre.operation='Recharge WOYOFAL';
    parametre.newclient=this.newclient?"nouveau":"";

    this.serv.saisiecodepin(parametre).then(data=>{
      let value:any=data;
      parametre.factures.pin = value.pin;
      parametre.idTerm = this.glb.IDTERM;
      parametre.session = this.glb.IDSESS;
      this.serv.afficheloading();
      this.serv.posts('encaissement/encaissementwoyofal.php',parametre,{}).then(data=>{
        this.serv.dismissloadin();
        let reponse = JSON.parse(data.data);
        //alert(JSON.stringify(reponse))
        if(reponse.returnCode=="0"){
          this.glb.recu = reponse;
          this.glb.recu.guichet = this.glb.IDTERM.substring(5,6);
          this.glb.recu.agence = this.glb.HEADER.agence;
          this.glb.HEADER.montant= this.number.transform(reponse.mntPlfap);
          this.glb.recu.dtTrx = this.dateformat.transform(reponse.dtTrx);
          this.glb.recu.numTrx = reponse.numTrx;
          this.glb.recu.Token2 = typeof (reponse.Token3)!='object'?this.formatagechaine.transform(reponse.Token2, 5, '-'):'';
          this.glb.recu.Token3 =typeof (reponse.Token3)!='object'?this.formatagechaine.transform(reponse.Token3, 5, '-'):'';
          this.glb.recu.Token1 = this.formatagechaine.transform(reponse.Token1, 5, '-');
          this.glb.recu.mntFrais = this.number.transform(reponse.mntFrais);
          this.glb.recu.mntFact = this.number.transform(reponse.mntFact);
          this.glb.recu.mntTotal = this.number.transform(reponse.mntTotal);
          this.glb.showRecu=true;

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
