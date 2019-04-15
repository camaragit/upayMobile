import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalvariableProvider} from "../../../providers/globalvariable/globalvariable";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ServiceProvider} from "../../../providers/service/service";
import {MillierPipe} from "../../../pipes/millier/millier";
import {FormatdatePipe} from "../../../pipes/formatdate/formatdate";

/**
 * Generated class for the HistoriquePlafondPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-historique-plafond',
  templateUrl: 'historique-plafond.html',
})
export class HistoriquePlafondPage {
  private criterForm:FormGroup;
  private minDate:any;
  private transactions;
  private showdetails :boolean=false;

  constructor(public formatdate:FormatdatePipe,public serv:ServiceProvider,public number:MillierPipe,public formBuilder:FormBuilder,public navCtrl: NavController, public navParams: NavParams,public glb:GlobalvariableProvider) {
    this.criterForm = formBuilder.group({
      datedebut: ['', Validators.required],
      datefin: ['', Validators.required],
      montant: ['0', Validators.required],
      statut: ['', Validators.required]
    })
  }


  ionViewDidLoad() {
    this.criterForm.controls['statut'].setValue('0');
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL+"icone_Gestion.jpg";
    this.glb.HEADERTITELE.title = "Historique Plafond";
    console.log('ionViewDidLoad EtatPlafondPage');
  }
  changedatedeb() {
    this.showdetails = false;
    let datedeb = this.criterForm.controls['datedebut'].value;
    console.log(datedeb)
    let date = new Date(datedeb);
    console.log(date);
    this.minDate = date.toISOString();
    console.log(this.criterForm.controls['datedebut'].value);
    this.criterForm.controls['datefin'].setValue("");
  }
  changemontant() {
    this.showdetails=false;
    if (this.criterForm.controls['montant'].value) {
      this.criterForm.controls['montant'].setValue(this.criterForm.controls['montant'].value.replace(/ /g, ""));
      this.criterForm.controls['montant'].setValue(this.criterForm.controls['montant'].value.replace(/-/g, ""))
      this.criterForm.controls['montant'].setValue(this.number.transform(this.criterForm.controls['montant'].value));

    }
  }
  changefin() {
    this.showdetails = false;
  }
  getdetails(trx){
    trx.statut =trx.statut=='0'?'En attente':'Validé';
    let balisedatevalidation,balisebanque;
    balisedatevalidation=balisebanque="";
    let title= '<div align="center">Details enlevement du '+trx.DateOperation+' </div><br><br>';
    if(trx.DateValidation)
    {
      balisedatevalidation='<b>Date validation : </b> '+trx.DateValidation+'<br>';
    }
    if(trx.Banque)
    {
      balisebanque='<b>Banque : </b> '+trx.Banque+'<br>';
    }
    let contenu =title+balisebanque+
      '<b>Statut : </b> '+trx.statut+'<br>' +
      balisedatevalidation +
      '<b>Moyen de Paiement : </b> '+trx.MoyenPaiement+'<br>'
    this.serv.showdetails(contenu);

  }
  afficher(){
    this.showdetails=false;
    let parametre :any={};
    parametre.compte = this.criterForm.getRawValue();
    if(!parametre.compte.montant || parametre.compte.montant<=0)
      parametre.compte.montant=0;
    parametre.idTerm = this.glb.IDTERM;
    parametre.session = this.glb.IDSESS;
    parametre.compte.datedebut=parametre.compte.datedebut+' 00:00:00';
    parametre.compte.datefin=parametre.compte.datefin+' 23:59:59';

    this.serv.afficheloading();
    this.serv.posts('compte/histoenlevement.php',parametre,{}).then(data=>{
      this.serv.dismissloadin();
      let reponse = JSON.parse(data.data);
      if(reponse.returnCode=='0'){
        this.transactions=[];
        if(!reponse.Operations.Operation.length)
          this.transactions[0]=reponse.Operations.Operation;
        else
          this.transactions=reponse.Operations.Operation;
        this.showdetails=true;
        for(let i=0;i<this.transactions.length;i++)
        {
          //console.log(this.transactions[i].DateOperation,this.transactions[i].DateOperation,i)

          this.transactions[i].DateOperation=this.formatdate.transform(this.transactions[i].DateOperation);
          if(typeof (this.transactions[i].DateValidation)!='object')
            this.transactions[i].DateValidation=this.formatdate.transform(this.transactions[i].DateValidation);
          else
            this.transactions[i].DateValidation='';
          if(typeof (this.transactions[i].Banque)=='object')
            this.transactions[i].Banque='';
          this.transactions[i].statut=parametre.compte.statut;

        }


      }
      else this.serv.showError(reponse.errorLabel)
    }).catch(err=>{
      this.serv.dismissloadin();
      this.serv.showError("Impossible d'atteindre le serveur")
    })
  }

}
