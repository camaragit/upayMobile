import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GlobalvariableProvider} from "../../providers/globalvariable/globalvariable";
import {ServiceProvider} from "../../providers/service/service";
import {MillierPipe} from "../../pipes/millier/millier";
import {FormatphonePipe} from "../../pipes/formatphone/formatphone";
import {FormatdatePipe} from "../../pipes/formatdate/formatdate";
import {FormatCodeTransfertPipe} from "../../pipes/format-code-transfert/format-code-transfert";
import {PaysProvider} from "../../providers/pays/pays";

/**
 * Generated class for the ReceptionComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'reception',
  templateUrl: 'reception.html'
})
export class ReceptionComponent implements OnInit{
  private showdetails:boolean=false;
  private cashoutForm:FormGroup;
  private refid:any;
  private ordernum:any;
  @Input('datareception') datareception;

  constructor(public paysServ:PaysProvider,public formdate:FormatdatePipe,public formatcode:FormatCodeTransfertPipe,public phoneformat:FormatphonePipe,public number:MillierPipe,public glb:GlobalvariableProvider,public serv:ServiceProvider,public formbuilder:FormBuilder) {
    this.cashoutForm = formbuilder.group({
      codTrans: ['', Validators.required],
      prenomExp: ['', Validators.required],
      nomExp: ['', Validators.required],
      telExp: ['', Validators.required],
      adrsExp: ['', Validators.required],
      prenomBen: ['', Validators.required],
      nomBen: ['', Validators.required],
      telBen: ['', Validators.required],
      adrsBen: ['', Validators.required],
      typIdBen: ['', Validators.required],
      idBen: ['', Validators.required],
      mntPaie: ['', Validators.required],

    })

  }
reset(){
  this.showdetails = false;
}
vider(){
  this.showdetails = false;
  this.cashoutForm.reset();

}
  tester(e){
    console.log(JSON.stringify(e.callingCodes[0]))
    console.log(typeof (e.callingCodes))
  }
releve(){

    this.showdetails =false;
  let parametre :any={};
  parametre.oper = this.datareception.oper;
  parametre.codetransfert = this.cashoutForm.controls['codTrans'].value;
  parametre.idTerm = this.glb.IDTERM;
  parametre.session = this.glb.IDSESS;
  this.serv.afficheloading();
  this.serv.posts('transfert/releveRecepCash.php',parametre,{}).then(data=>{
    this.serv.dismissloadin();

    let reponse = JSON.parse(data.data);
    if(reponse.returnCode=='0'){
      this.showdetails = true;
      this.cashoutForm.controls['prenomExp'].setValue(reponse.prenomExp);
      this.cashoutForm.controls['nomExp'].setValue(reponse.nomExp);
      this.cashoutForm.controls['telExp'].setValue(reponse.telExp);
      this.cashoutForm.controls['adrsExp'].setValue(reponse.adrsExp);
      this.cashoutForm.controls['prenomBen'].setValue(reponse.prenomBen);
      this.cashoutForm.controls['nomBen'].setValue(reponse.nomBen);
      this.cashoutForm.controls['adrsBen'].setValue(reponse.adrsBen);
      this.cashoutForm.controls['telBen'].setValue(reponse.telBen);
      this.cashoutForm.controls['typIdBen'].setValue('1');
      this.cashoutForm.controls['idBen'].setValue('');
      this.cashoutForm.controls['mntPaie'].setValue(this.number.transform(reponse.mntPaie));
      if(typeof(reponse.codTrans)=='object' )
      {
        this.cashoutForm.controls['codTrans'].setValue(parametre.codetransfert);

      }
      if(typeof(reponse.adrsBen)=='object' )
      {
        this.cashoutForm.controls['adrsBen'].setValue('');
      }
      if(this.datareception.oper=='0044')
      {
        this.refid = reponse.RefId;
        this.ordernum = reponse.OrderNum;
      }
    }
    else this.serv.showError(reponse.errorLabel)
  }).catch(err=>{
    this.serv.dismissloadin();
      this.serv.showError("Impossible d'atteindre le serveur ");
    }
  )

  this.reset();
   // this.showdetails = !this.showdetails
 }

  ngOnInit(): void {

  }
  validerReception(){

    let parametre :any={};
    parametre.datarecep = this.cashoutForm.getRawValue();
    parametre.image = this.datareception.image;
    parametre.operation = 'Reception';
    parametre.operateur = this.datareception.operateur;
    parametre.recharge = {};
    parametre.recharge.montant = parametre.datarecep.mntPaie;
    this.serv.saisiecodepin(parametre).then(data=>{
      let value :any = data;
      parametre.session = this.glb.IDSESS;
      parametre.idTerm = this.glb.IDTERM;
      parametre.datarecep.pin = value.pin;
      parametre.oper = this.datareception.oper;
      if(this.datareception.oper=='0044')
      {
        parametre.datarecep.RefId= this.refid;
        parametre.datarecep.OrderNum= this.ordernum;
      }
      this.serv.afficheloading();
      this.serv.posts('transfert/ReceptionCash.php',parametre,{}).then(data=>{
        this.serv.dismissloadin();
        let reponse = JSON.parse(data.data);
        if(reponse.returnCode=='0')
        {
          this.glb.recu = reponse;
          this.glb.recu.operation = 'RECEPTION';
          this.glb.HEADER.montant = this.number.transform(reponse.mntPlfap);
          this.glb.recu.guichet = this.glb.IDTERM.substring(5,6);
          this.glb.recu.agence = this.glb.HEADER.agence;
          this.glb.recu.dtTrx = this.formdate.transform(this.glb.recu.dtTrx);
          this.glb.recu.codTrans = this.formatcode.transform(this.glb.recu.codTrans, 3, ' ');
          this.glb.recu.operateur=this.datareception.operateur;
          this.glb.showRecu = true;

        }else this.serv.showError(reponse.errorLabel)

      }).catch(err=>{
        this.serv.dismissloadin();
        this.serv.showError("Impossible d'atteindre le serveur")
      })

    }).catch(err=>{

    })
  }

}
