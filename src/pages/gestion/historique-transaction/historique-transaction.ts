import {Component, Injector} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalvariableProvider} from "../../../providers/globalvariable/globalvariable";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ServiceProvider} from "../../../providers/service/service";
import {FormatdatePipe} from "../../../pipes/formatdate/formatdate";
import {MillierPipe} from "../../../pipes/millier/millier";

@IonicPage()
@Component({
  selector: 'page-historique-transaction',
  templateUrl: 'historique-transaction.html',
})
export class HistoriqueTransactionPage {

  private showdetails :boolean=false;
  private all :boolean=false;
  private existewoyofal :boolean=false;
  private transactions:any;
  private criterForm:FormGroup;
  private minDate:any;
  private mnttotal:any;
  private formBuilder:any;
  private glb:any;
  private serv:any;
  private formatdate:any;
  private number:any;

  constructor(private injector:Injector,) {
    this.formBuilder = injector.get(FormBuilder);
    this.glb =this.injector.get(GlobalvariableProvider);
    this.serv = injector.get(ServiceProvider);
    this.formatdate = injector.get(FormatdatePipe);
    this.number = injector.get(MillierPipe);
    this.criterForm = this.formBuilder.group({
      date1: ['', Validators.required],
      date2: ['', Validators.required]
    })
  }
  changedatedeb() {
    this.showdetails = false;
    let datedeb = this.criterForm.controls['date1'].value;
    console.log(datedeb)
    let date = new Date(datedeb);
    console.log(date);
    this.minDate = date.toISOString();
    console.log(this.criterForm.controls['date1'].value);
    this.criterForm.controls['date2'].setValue("");
  }

  changefin() {
    this.showdetails = false;
  }
  ionViewDidLoad() {
    this.showdetails =false;
    this.all =false;
    this.existewoyofal =false;
    this.glb.showRecu=false;
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL+"icone_Gestion.jpg";
    this.glb.HEADERTITELE.title = "Historique Transaction";
    console.log('ionViewDidLoad EtatPlafondPage');
  }
  listerhisto(mode){
    this.showdetails=false;
    let parametre:any = this.criterForm.getRawValue();
    parametre.date1 = parametre.date1+' 00:00:00';
    parametre.date2 = parametre.date2+' 23:59:59';
    parametre.idTerm =this.glb.IDTERM;
    parametre.session = this.glb.IDSESS;
    let url= mode=='all'?'transaction/histotrx.php':'transaction/getlasttrx.php';
    this.all=mode=='all'?true:false;

    this.serv.afficheloading();
    this.serv.posts(url,parametre,{}).then(data=>{
      this.serv.dismissloadin();
      let reponse :any = JSON.parse(data.data);
      //alert(JSON.stringify(reponse));
      if(reponse.returnCode=='0'){
        this.showdetails=true;
        if(mode=='all')
        {
          if(reponse.Transactions.Transaction.length){
            this.transactions=reponse.Transactions.Transaction;
          }
          else{
            this.transactions=[];
            this.transactions[0]=reponse.Transactions.Transaction;
          }
          this.mnttotal=0;
          for(let i=0;i<this.transactions.length;i++){
            this.mnttotal=this.mnttotal*1+this.transactions[i].Montant*1;

          }
        }
        else{

          if(reponse.Trxs.Trx.length)
          {
            this.transactions=reponse.Trxs.Trx;

          }
          else{
            this.transactions=[];
            this.transactions[0]=reponse.Trxs.Trx
          }
          this.existewoyofal=false;

          for(let j=0;j<this.transactions.length;j++){
            this.transactions[j].Dtrx=this.formatdate.transform(this.transactions[j].Dtrx);
            this.transactions[j].Oper=this.serv.getSoup(this.transactions[j].Oper,this.transactions[j].Soper);
            if(this.transactions[j].Oper=='Woyofal')
              this.existewoyofal=true;
            if(typeof (this.transactions[j].IdDes)=='object')
              this.transactions[j].IdDes='';
            if(typeof (this.transactions[j].Numc)=='object')
              this.transactions[j].Numc='';
          }
        }
      }
      else this.serv.showError(reponse.errorLabel)

    }).catch(err=>{
      this.serv.dismissloadin();
      this.serv.showError("Impossible d'atteindre le serveur ")
    })
  }
  imprimer(){
   let date1=this.criterForm.controls['date1'].value.substr(8,2)+"-"+this.criterForm.controls['date1'].value.substr(5,2)+"-"+this.criterForm.controls['date1'].value.substr(0,4);
   let date2=this.criterForm.controls['date2'].value.substr(8,2)+"-"+this.criterForm.controls['date2'].value.substr(5,2)+"-"+this.criterForm.controls['date2'].value.substr(0,4);
    let imp:any;
    if(this.all==true){
      imp='          PR0XIMO\n\n';
      imp+='     ETAT DES TRANSACTIONS\n\n';
      imp+='Date du:'+date1+ '\n';
      imp+='Au     :'+date2+ '\n\n';
      imp+='================================\n'
      imp+='Operateur Nbr trx Montant(F CFA)   \n'
      imp+='================================\n'
      for(let i=0;i<this.transactions.length;i++){
        let trx=this.transactions[i];
        let type=trx.Type.substring(0,4)=='Trsf'?'_'+trx.Type.substring(7,8):'';
        console.log('type vaut',trx.Type);
        imp+=this.serv.padding(trx.Oper+type,10)+' '+this.serv.padding((trx.Nombre),6)+' '+this.serv.padding(this.number.transform(trx.Montant),7)+'\n';
      }
      imp+='\n\n==============================\n';
      imp+='Montant Total :'+this.number.transform(this.mnttotal+"")+ ' F CFA\n\n\n\n';
    }
    else{
      imp='          PR0XIMO\n\n';
      imp+='     ETAT Dernieres Transactions\n\n';
      imp+='Date du:'+date1+ '\n';
      imp+='Au     :'+date2+ '\n\n';
      imp+='================================\n'
      if(this.existewoyofal==true)
        imp+='Operateur  Montant(F CFA) N Compteur Tel  \n';
      else   imp+='Operateur  Montant(F CFA) Tel  \n'
      imp+='================================\n'
      for(let i=0;i<this.transactions.length;i++){
        let trx=this.transactions[i];
        if(this.existewoyofal==true)
          imp+=this.serv.padding(trx.Oper,10)+' '+this.serv.padding(this.number.transform(trx.Mnt),6)+' '+this.serv.padding(this.number.transform(trx.IdDes),7)+' '+this.serv.padding(this.number.transform(trx.Numc),7)+'\n';
        else imp+=this.serv.padding(trx.Oper,10)+' '+this.serv.padding(this.number.transform(trx.Mnt),6)+' '+this.serv.padding(this.number.transform(trx.Numc),7)+'\n';
      }
      imp+='\n\n==============================\n'
    }
    //  alert(imp);
    this.serv.imprimer(imp)
  }


}
