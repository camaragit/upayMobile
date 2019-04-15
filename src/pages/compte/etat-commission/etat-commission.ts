import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalvariableProvider} from "../../../providers/globalvariable/globalvariable";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ServiceProvider} from "../../../providers/service/service";

/**
 * Generated class for the EtatCommissionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-etat-commission',
  templateUrl: 'etat-commission.html',
})
export class EtatCommissionPage {
private critere:FormGroup;
private commissions:any;
private total:any;
private showdetails:boolean=false;
private minDate:any;
  constructor(public serv:ServiceProvider,public formBuilder:FormBuilder,public navCtrl: NavController, public navParams: NavParams,public glb:GlobalvariableProvider) {
    this.critere=this.formBuilder.group({
      date1:['',Validators.required],
      date2:['',Validators.required],
      password:['',Validators.required]
    })
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
  changepassword(){
    this.showdetails=false;
  }
  listercios(){

    let paramete:any = this.critere.getRawValue();
    paramete.idTerm = this.glb.IDTERM;
    paramete.session = this.glb.IDSESS;
    paramete.date1 =paramete.date1+" 00:00:00";
    paramete.date2 =paramete.date2+" 23:59:59";
    console.log(JSON.stringify(paramete));
    this.serv.afficheloading();
    this.serv.posts('compte/etatcios.php',paramete,{}).then(data=>{
      this.serv.dismissloadin();
      let reponse = JSON.parse(data.data);
      if(reponse.returnCode=='0'){
        this.showdetails = true;
        this.total={};
        this.total.nbrtrx=0;
        this.total.MntBase=0;
        this.total.MntCom=0;

        if(reponse.Commissions.commission.length){
          this.commissions=reponse.Commissions.commission;
          for(let i=0;i<this.commissions.length;i++){
            let com=this.commissions[i];
            this.total.nbrtrx= this.total.nbrtrx*1+com.Nombre*1;
            this.total.MntBase= this.total.MntBase*1+com.MntBase*1;
            this.total.MntCom= this.total.MntCom*1+com.MntCom*1;

          }
        }
        else{
           this.commissions=[];
           this.commissions[0]=data.Commissions.commission;
           this.total.nbrtrx=1;
           this.total.MntBase=data.Commissions.commission.MntBase;
           this.total.MntCom=data.Commissions.commission.MntCom;
        }
      }
      else this.serv.showError(reponse.errorLabel);


    }).catch(err=>{
      this.serv.dismissloadin();
      this.serv.showError("Impossible d'atteindre le serveur")
    })



  }

  ionViewDidLoad() {
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL+"Icone_Compte.jpg";
    this.glb.HEADERTITELE.title = "Etat Commision";
    console.log('ionViewDidLoad EtatPlafondPage');
  }
}
