import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalvariableProvider} from "../../../providers/globalvariable/globalvariable";
import {ServiceProvider} from "../../../providers/service/service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormatdatePipe} from "../../../pipes/formatdate/formatdate";
import {FormatCodeTransfertPipe} from "../../../pipes/format-code-transfert/format-code-transfert";

/**
 * Generated class for the DuplicatatWoyofalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-duplicatat-woyofal',
  templateUrl: 'duplicatat-woyofal.html',
})
export class DuplicatatWoyofalPage {
private voirRecu:boolean=false;
private minDate: any;
private critereForm: FormGroup;
private transactions:any;
private showdetails:boolean=false;


  constructor(public formatagechaine:FormatCodeTransfertPipe,public formatdate:FormatdatePipe,public serv:ServiceProvider,public formBuilder:FormBuilder,public navCtrl: NavController, public navParams: NavParams,public glb:GlobalvariableProvider) {
    this.critereForm = this.formBuilder.group({
      datedebut:['',Validators.required],
      datefin:['',Validators.required],
      compteur:['',Validators.required]
    })
  }
  changedatedeb() {
    this.showdetails = false;
    let datedeb = this.critereForm.controls['datedebut'].value;
    console.log(datedeb)
    let date = new Date(datedeb);
    console.log(date);
    this.minDate = date.toISOString();
    console.log(this.critereForm.controls['datedebut'].value);
    this.critereForm.controls['datefin'].setValue("");
  }

  changefin() {
    this.showdetails = false;
  }
  ionViewDidLoad() {
    this.showdetails=false;
    this.glb.showRecu=false;
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL+"icone_Gestion.jpg";
    this.glb.HEADERTITELE.title = "Duplicatat Woyofal";
  }
  rechercher(){
    this.showdetails=false;
    let parametre:any={};
    parametre.compte = this.critereForm.getRawValue();
    parametre.compte.datedebut =parametre.compte.datedebut+" 00:00:00";
    parametre.compte.datefin =parametre.compte.datefin+" 23:59:59";
    parametre.session = this.glb.IDSESS;
    parametre.idTerm = this.glb.IDTERM;
    this.serv.afficheloading();
    this.serv.posts('compte/duplicata_woyofal.php',parametre,{}).then(data=>{
      this.serv.dismissloadin();
      let reponse:any=JSON.parse(data.data);
      if(reponse.returnCode=='0'){
        this.showdetails=true;
        this.transactions=[];
        if(!reponse.Transactions.transaction.length){
          reponse.Transactions.transaction.Date=this.formatdate.transform(reponse.Transactions.transaction.Date);
          this.transactions[0]=reponse.Transactions.transaction;
          this.transactions[0].id=0;
          this.transactions[0].checked=false;
        }
        else{
          for(let i=0;i<reponse.Transactions.transaction.length;i++)
          {
            reponse.Transactions.transaction[i].Date=this.formatdate.transform(reponse.Transactions.transaction[i].Date);
            this.transactions=reponse.Transactions.transaction;
            this.transactions[i].id=i;
            this.transactions[i].checked=false;
          }
        }
      }
      else this.serv.showError(reponse.eroorLabel);

    }).catch(err=>{
      this.serv.dismissloadin();
      this.serv.showError("Impossible d'atteindre le serveur")

    })
  }
  afficherrecu(){
    this.glb.showRecu=true;
  }
  handlechecking(trx){
    let i = trx.id;
    this.transactions[i].checked = !this.transactions[i].checked;
    if(this.transactions[i].checked)
    {
     // alert(JSON.stringify(trx))
      this.glb.recu=trx;
      this.glb.recu.duplicat=true;
      this.glb.recu.mntTotal=trx.Montant;
      this.glb.recu.Token2 = typeof (trx.Token3)!='object'?this.formatagechaine.transform(trx.Token2, 5, '-'):'';
      this.glb.recu.Token3 =typeof (trx.Token3)!='object'?this.formatagechaine.transform(trx.Token3, 5, '-'):'';
      this.glb.recu.Token1 = this.formatagechaine.transform(trx.Token1, 5, '-');
      this.glb.recu.guichet = this.glb.IDTERM.substring(5,6);
      this.glb.recu.agence = this.glb.HEADER.agence;
      this.glb.recu.dtTrx = trx.Date;
      this.glb.recu.IdClient=trx.Compteur;
      for(let j=0;j<this.transactions.length;j++)
      {
        if(this.transactions[j].id!=trx.id)
          this.transactions[j].checked=false;
      }
      this.voirRecu =true;
    }
    else{
      this.voirRecu=false;
    }

  }
}
