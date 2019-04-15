import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GlobalvariableProvider} from "../../providers/globalvariable/globalvariable";
import {ServiceProvider} from "../../providers/service/service";
import {MillierPipe} from "../../pipes/millier/millier";

/**
 * Generated class for the CashoutCodeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'cashout-code',
  templateUrl: 'cashout-code.html'
})
export class CashoutCodeComponent implements OnInit{

  private showdetails:boolean=false;
  private cashoutForm:FormGroup;
  @Input('datareception') datareception;

  constructor(public number:MillierPipe,public glb:GlobalvariableProvider,public serv:ServiceProvider,public formbuilder:FormBuilder) {
    this.cashoutForm = formbuilder.group({
      codeclient: ['', Validators.required],
      prenomBen: ['', Validators.required],
      nomBen: ['', Validators.required],
      montant: ['', Validators.required],
      telBen: ['', Validators.required],
      typIdBen: ['', Validators.required],
      idBen: ['', Validators.required],
      oper: [''],
      codevalidation: [''],
      numtrx: [''],

    })

  }
  releve(){
    let parametre :any={}
    parametre.recharge = this.cashoutForm.getRawValue();
    parametre.idTerm = this.glb.IDTERM;
    parametre.session = this.glb.IDSESS;
    this.serv.afficheloading();
    let fichier = 'recharge/'+this.datareception.initfile;
      this.serv.posts(fichier,parametre,{}).then(data=>{
      this.serv.dismissloadin();
      let reponse = JSON.parse(data.data);
      if(reponse.returnCode=='0'){
        this.showdetails = true;
        this.cashoutForm.controls['prenomBen'].setValue(reponse.prenom);
        this.cashoutForm.controls['nomBen'].setValue(reponse.nom);
        this.cashoutForm.controls['telBen'].setValue(reponse.telClient[0]);
        this.cashoutForm.controls['montant'].setValue(this.number.transform(reponse.montant));
        if(this.datareception.oper=='0054')
          this.cashoutForm.controls['codevalidation'].setValue(reponse.numtrx);
        if(this.datareception.oper=='0057')
        {
          this.cashoutForm.controls['telBen'].setValue(reponse.telClient);
          this.cashoutForm.controls['numtrx'].setValue(parametre.recharge.codeclient);

        }

      }
      else this.serv.showError(reponse.errorLabel)
    }).catch(err=>{
      this.serv.dismissloadin();
        this.serv.showError("Impossible d'atteindre le serveur ");
      }
    )

    //this.reset();
    // this.showdetails = !this.showdetails
  }
  reset(){
    this.showdetails = false;
    //this.cashoutForm.reset();

  }

  validerReception(){
    let parametres:any={};
    parametres.recharge = this.cashoutForm.getRawValue();
    parametres.recharge.montant = parametres.recharge.montant.replace(/-/g, "");
    parametres.operation = this.datareception.operation;
    parametres.operateur = this.datareception.operateur;
    parametres.image = this.datareception.image;
    this.serv.saisiecodepin(parametres).then(data=>{
      let values :any= data;
      parametres.recharge.pin = values.pin;
      parametres.idTerm = this.glb.IDTERM;
      parametres.session = this.glb.IDSESS;
      this.serv.afficheloading();
      //alert(JSON.stringify(parametres))
      let fichier = 'recharge/'+this.datareception.confirmfile;
      this.serv.posts(fichier,parametres,{}).then(data=>{
        this.serv.dismissloadin();
        let reponse = JSON.parse(data.data);
        if(reponse.returnCode=='0'){
          this.glb.recu = reponse;
          this.glb.recu.agence = this.glb.HEADER.agence;
          this.glb.recu.guichet = this.glb.IDTERM.substring(5,6);
          this.glb.recu.Oper = parametres.operateur;
          this.glb.recu.service = this.datareception.operation;
          this.glb.recu.telRech = parametres.recharge.telBen;
          this.glb.showRecu=true;
        }
        else this.serv.showError(reponse.errorLabel);

      }).catch(err=>{
        this.serv.dismissloadin();
        this.serv.showError("Impossibe d'atteindre le serveur")
      })

    }).catch(err=>{

    })
    console.log(JSON.stringify(parametres))


  }
  ngOnInit(){
    this.cashoutForm.controls['oper'].setValue(this.datareception.oper);

    console.log(JSON.stringify(this.datareception))
  }

}
