import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalvariableProvider} from "../../../providers/globalvariable/globalvariable";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ServiceProvider} from "../../../providers/service/service";
import {FormatdatePipe} from "../../../pipes/formatdate/formatdate";

/**
 * Generated class for the DuplicatatEncaissementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-duplicatat-encaissement',
  templateUrl: 'duplicatat-encaissement.html',
})
export class DuplicatatEncaissementPage {
  private critere: FormGroup;
  private transactions:any;
  private typedocument:any;

  constructor(public formatdate:FormatdatePipe,public serv: ServiceProvider, public formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public glb: GlobalvariableProvider) {
    this.critere = formBuilder.group({
      oper: ['', Validators.required],
      iddoc: ['', Validators.required],
      datedebut: ['', Validators.required]
    })
  }

  ionViewDidLoad() {
    this.critere.reset();
    this.glb.showRecu=false;
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL + "icone_Gestion.jpg";
    this.glb.HEADERTITELE.title = "Duplicatat Encaissement";
    console.log('ionViewDidLoad EtatPlafondPage');
  }

  rechercher() {

    let parametre: any = {};
    parametre.compte = this.critere.getRawValue();
    parametre.compte.datedebut = parametre.compte.datedebut +" 00:00:00";
    parametre.idTerm = this.glb.IDTERM;
    parametre.session = this.glb.IDSESS;
    this.serv.afficheloading();
    this.serv.posts('compte/duplicata_enc.php', parametre, {}).then(data => {
      this.serv.dismissloadin();
      let reponse = JSON.parse(data.data);
      if(reponse.returnCode=='0'){

        if(parametre.compte.oper=='0016' && typeof(reponse.telClient)=='object')
        {
          reponse.telClient='';
        }
        this.transactions=reponse;
        this.glb.recu=reponse;
        this.glb.recu.guichet = this.glb.IDTERM.substring(5,6);
        this.glb.recu.agence = this.glb.HEADER.agence;
        this.glb.recu.duplicatat=true;
        if(this.glb.recu.dtTrx.indexOf(' ')==-1)
          this.glb.recu.dtTrx=this.formatdate.transform(this.glb.recu.dtTrx)
        this.glb.recu.Oper=parametre.compte.oper=='0016'?'SDE':'SENELEC';
        this.transactions.dtTrx=this.formatdate.transform(this.transactions.dtTrx);
        this.typedocument = parametre.compte.oper=='0016'?'Reference':'N° Police';
        this.glb.showRecu=true;
      }else this.serv.showError(reponse.errorLabel);
    }).catch(err => {
      this.serv.dismissloadin();
      this.serv.showError("Impossible d'atteindre le serveur")
    })


  }
  afficherrecu(){
    this.glb.showRecu=true;
  }
}
