import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalvariableProvider} from "../../../providers/globalvariable/globalvariable";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ServiceProvider} from "../../../providers/service/service";
import {MillierPipe} from "../../../pipes/millier/millier";

/**
 * Generated class for the EtatCaissePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-etat-caisse',
  templateUrl: 'etat-caisse.html',
})
export class EtatCaissePage {
  private showdetails: boolean = false;
  private caisseForm: FormGroup;
  private minDate: any;

  constructor(public number:MillierPipe,public serv:ServiceProvider,public formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public glb: GlobalvariableProvider) {
    this.caisseForm = this.formBuilder.group({
      date1: ['', Validators.required],
      date2: ['', Validators.required],
      plafondinitial: ['', Validators.required],
      totalencaissement: ['', Validators.required],
      totaldecaissement: ['', Validators.required],
      totaldebit: ['', Validators.required],
      totalcredit: ['', Validators.required],
      plafondfinal: ['', Validators.required],
    })
  }

  changedatedeb() {
    this.showdetails = false;
    let datedeb = this.caisseForm.controls['date1'].value;
    console.log(datedeb)
    let date = new Date(datedeb);
    console.log(date);
    this.minDate = date.toISOString();
    console.log(this.caisseForm.controls['date1'].value);
    this.caisseForm.controls['date2'].setValue("");
  }

  changefin() {
    this.showdetails = false;
  }

  ionViewDidLoad() {
    this.showdetails = false;
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL + "Icone_Compte.jpg";
    this.glb.HEADERTITELE.title = "Etat Caisse";
    console.log('ionViewDidLoad EtatPlafondPage');
  }

  AfficherEtatCaisse() {
    let parametre: any = this.caisseForm.getRawValue();
    parametre.idTerm = this.glb.IDTERM;
    parametre.session = this.glb.IDSESS;
    parametre.date1 =parametre.date1+" 00:00:00";
    parametre.date2 =parametre.date2+" 23:59:59";

    this.serv.afficheloading();
    this.serv.posts('compte/etatcaisse.php',parametre,{}).then(data=>{
      this.serv.dismissloadin();
      let reponse =JSON.parse(data.data);
      if(reponse.returnCode=='0'){

        this.caisseForm.controls['plafondinitial'].setValue(this.number.transform(reponse.solde_initial));
        this.caisseForm.controls['plafondfinal'].setValue(this.number.transform(reponse.solde_final));
        this.caisseForm.controls['totalencaissement'].setValue(this.number.transform(reponse.total_encaissement));
        this.caisseForm.controls['totaldecaissement'].setValue(this.number.transform(reponse.total_decaissement));
        this.caisseForm.controls['totalcredit'].setValue(this.number.transform(reponse.total_credit));
        this.caisseForm.controls['totaldebit'].setValue(this.number.transform(reponse.total_debit));
        this.showdetails=true;
      }
      else this.serv.showError(reponse.errorLabel);

    }).catch(err=>{
      this.serv.dismissloadin();
      this.serv.showError("Impossible d'atteindre le serveur ");
    })

  }
  imprimer(){
    var imp='          Proximo\n\n';
    imp+='          Etat caisse\n\n';
    imp+='Plaf Initial :'+this.caisseForm.controls['plafondinitial'].value+' F CFA\n';
    imp+='Encaissement :' +this.caisseForm.controls['totalencaissement'].value+' F CFA\n';
    imp+='Decaissement :' +this.caisseForm.controls['totaldecaissement'].value+' F CFA\n';
    imp+='Credit       :' +this.caisseForm.controls['totalcredit'].value+' F CFA\n';
    imp+='Debit        :' +this.caisseForm.controls['totaldebit'].value+' F CFA\n';
    imp+='Plaf final   :' +this.caisseForm.controls['plafondfinal'].value+' F CFA\n\n\n\n';
    this.serv.imprimer(imp);
  }
}
