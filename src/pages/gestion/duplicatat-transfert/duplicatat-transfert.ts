import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalvariableProvider} from "../../../providers/globalvariable/globalvariable";
import {ServiceProvider} from "../../../providers/service/service";
import {FormatCodeTransfertPipe} from "../../../pipes/format-code-transfert/format-code-transfert";

/**
 * Generated class for the DuplicatatTransfertPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-duplicatat-transfert',
  templateUrl: 'duplicatat-transfert.html',
})
export class DuplicatatTransfertPage {
  private operateur:any;
  private transactions:any;
  private showdetails:boolean;
  private voirRecu:boolean=false;


  constructor(public formatagechaine:FormatCodeTransfertPipe,public serv:ServiceProvider,public navCtrl: NavController, public navParams: NavParams,public glb:GlobalvariableProvider) {
  }

  ionViewDidLoad() {
    this.glb.showRecu=false;
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL+"icone_Gestion.jpg";
    this.glb.HEADERTITELE.title = "Duplicatat Transfert";
    console.log('ionViewDidLoad EtatPlafondPage');
  }
  rechercher(){
    this.voirRecu=this.showdetails=false;
    let parametre:any={};
    parametre.compte={};
    parametre.compte.oper = this.operateur;
    parametre.idTerm = this.glb.IDTERM;
    parametre.session = this.glb.IDSESS;

    this.serv.afficheloading();
    this.serv.posts('compte/duplicata_transfert.php',parametre,{}).then(data=>{
      this.serv.dismissloadin();
      let reponse = JSON.parse(data.data);
      if(reponse.returnCode=='0'){
        this.showdetails=true;
        this.transactions=[];
        if(!reponse.Transactions.transaction.length){
          this.transactions[0]=reponse.Transactions.transaction;
          this.transactions[0].id=0;
          this.transactions[0].checked=false;

        }
        else{
          this.transactions=reponse.Transactions.transaction;
          for(var i=0;i<this.transactions.length;i++)
          {
            this.transactions[i].id=i;
            this.transactions[i].checked=false;
          }
        }
      }
      else this.serv.showError(reponse.errorLabel);
    }).catch(err=>{
      this.serv.dismissloadin();
      this.serv.showError("Impossible d'atteindre le serveur");
    })

  }
  getdetails(trx){
    let contenu='<b>Nom expediteur : </b> '+trx.nomexpe+'<br>'+
      '<b>Téléphone expéditeur : </b> '+trx.telexpe+'<br>' +

      '<b>Nom beneficiaire : </b> '+trx.nombenef+'<br>'+
      '<b>Téléphone beneficiaire : </b> '+trx.telbenef+'<br>';
    this.serv.showdetails(contenu);
  }
  handlechecking(trx){
    let i = trx.id;
    this.transactions[i].checked = !this.transactions[i].checked;
    if(this.transactions[i].checked)
    {
      this.glb.recu=trx;
      this.glb.recu.duplicat=true;
      this.glb.recu.operation = trx.typeop;
      this.glb.recu.dtTrx=trx.dateop;
      this.glb.recu.telExp=trx.telexpe;
      this.glb.recu.telBen=trx.telbenef;
      this.glb.recu.codTrans=this.formatagechaine.transform(trx.code, 3, ' ');
      if(this.operateur=='0007')
        this.glb.recu.operateur='Joni Joni';
      if(this.operateur=='0052')
        this.glb.recu.operateur='ProxiCash';
      if(this.operateur=='0044')
        this.glb.recu.operateur='RIA';
      this.glb.recu.guichet = this.glb.IDTERM.substring(5,6);
      this.glb.recu.agence = this.glb.HEADER.agence;
      this.voirRecu=true;

      for(let j=0;j<this.transactions.length;j++)
      {
        if(this.transactions[j].id!=trx.id)
          this.transactions[j].checked=false;
      }
    }
    else{
      this.voirRecu=false;
    }

  }
  afficherrecu(){
    this.glb.showRecu=this.voirRecu;
  }

}
