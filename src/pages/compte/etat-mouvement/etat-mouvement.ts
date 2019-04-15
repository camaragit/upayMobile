import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalvariableProvider} from "../../../providers/globalvariable/globalvariable";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ServiceProvider} from "../../../providers/service/service";

/**
 * Generated class for the EtatMouvementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-etat-mouvement',
  templateUrl: 'etat-mouvement.html',
})
export class EtatMouvementPage {
  private critere:FormGroup;
  private minDate;
  private showdetails:boolean=false;
  private operations:any;
  constructor(public serv:ServiceProvider,public formbuilder:FormBuilder,public navCtrl: NavController, public navParams: NavParams,public glb:GlobalvariableProvider) {
    this.critere=this.formbuilder.group({
      date1:['',Validators.required],
      date2:['',Validators.required],
      bank:['',Validators.required]
    })
  }

  ionViewDidLoad() {
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL+"Icone_Compte.jpg";
    this.glb.HEADERTITELE.title = "Etat Mouvement";
    console.log('ionViewDidLoad EtatPlafondPage');
    this.critere.controls['bank'].setValue('tous');
  }
  changedatedeb() {
    this.showdetails=false;
    let datedeb = this.critere.controls['date1'].value;
    console.log(datedeb)
    let date = new Date(datedeb);
    console.log(date);
    this.minDate = date.toISOString();
    console.log(this.critere.controls['date1'].value);
    this.critere.controls['date2'].setValue("");
  }
  changefin(){
    this.showdetails=false;
  }
  changebank(){
    this.showdetails=false;
  }
  listermvt(){
this.showdetails=false;
    let paramete:any = this.critere.getRawValue();
    paramete.idTerm = this.glb.IDTERM;
    paramete.session = this.glb.IDSESS;
    paramete.date1 =paramete.date1+" 00:00:00";
    paramete.date2 =paramete.date2+" 23:59:59";
    console.log(JSON.stringify(paramete));
    this.serv.afficheloading();
    this.serv.posts('compte/etamvt.php',paramete,{}).then(data=>{
      this.serv.dismissloadin();
      let reponse = JSON.parse(data.data);
      if(reponse.returnCode=='0'){
        this.showdetails=true;
        if(reponse.Operations.Operation.length){
          this.operations=reponse.Operations.Operation;
        }
        else{
          this.operations=[];
          this.operations[0]=reponse.Operations.Operation;
        }
      }
      else this.serv.showError(reponse.errorLabel);


    }).catch(err=>{
      this.serv.dismissloadin();
      this.serv.showError("Impossible d'atteindre le serveur")
    })


  }
  getdetails(etat:any){
    etat.Dvb =typeof (etat.Dvb=='object')?'':etat.Dvb;
    etat.Inc =typeof (etat.Dvb=='object')?'':etat.Inc;
    etat.Rvb =typeof (etat.Dvb=='object')?'':etat.Rvb;
    let contenu ='<div align="center"><b>Details Etats mouvement du '+etat.Date+'</b> </div>' +
      '<b>Banque : </b> '+etat.Banque+'<br>' +
      '<b>Rvb : </b> '+etat.Rvb+'<br>' +
      '<b>Corr Inc : </b> '+etat.Inc+'<br>' +
      '<b>DVB : </b> '+etat.Dvb+'<br>';
    this.serv.showdetails(contenu)
  }

}
