import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EnvoiProvider} from "../../providers/envoi/envoi";
import {GlobalvariableProvider} from "../../providers/globalvariable/globalvariable";
import {MillierPipe} from "../../pipes/millier/millier";
import {ServiceProvider} from "../../providers/service/service";
import {FormatdatePipe} from "../../pipes/formatdate/formatdate";
import {FormatCodeTransfertPipe} from "../../pipes/format-code-transfert/format-code-transfert";
import {PaysProvider} from "../../providers/pays/pays";

/**
 * Generated class for the EnvoiComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'envoi',
  templateUrl: 'envoi.html'
})
export class EnvoiComponent  implements OnInit{
@Input('dataenvoi') dataenvoi;
private envoiForm :FormGroup;
private motifs;


  constructor(public paysServ:PaysProvider,public formdate:FormatdatePipe,public formatcode:FormatCodeTransfertPipe,public number:MillierPipe,public envServ:ServiceProvider,public formBuilder :FormBuilder,public glb:GlobalvariableProvider) {
    this.envoiForm = formBuilder.group({
      montant:['',Validators.required],
      mntTarif:['',Validators.required],
      montantTTC:['',Validators.required],
      prenomExp:['',Validators.required],
      nomExp:['',Validators.required],
      adrsExp:['',Validators.required],
      telExp:['',Validators.required],
      typIdExp:['',Validators.required],
      idExp:['',Validators.required],
      prenomBen:['',Validators.required],
      nomBen:['',Validators.required],
      telBen:['',Validators.required],
      indicatif:['',Validators.required],
      idville:['',Validators.required]
    })

  }
  changemontant(){
    this.envoiForm.controls['montantTTC'].setValue('');
    if(this.envoiForm.controls['montant'].value)
    {
      this.envoiForm.controls['montant'].setValue(this.envoiForm.controls['montant'].value.replace(/ /g, ""));
      this.envoiForm.controls['montant'].setValue(this.envoiForm.controls['montant'].value.replace(/-/g, ""))
      this.envoiForm.controls['montant'].setValue(this.number.transform(this.envoiForm.controls['montant'].value));
    }
  }
  reinitialiser(){
    this.envoiForm.reset();

  }
  getIndicatif(pays){
    let indicatif = pays.callingCodes[0]
    console.log(JSON.stringify(indicatif));
    this.envoiForm.controls['indicatif'].setValue(indicatif);

  }
  calculerFrais(){
    this.envoiForm.controls['mntTarif'].setValue('');
    this.envoiForm.controls['montantTTC'].setValue('');
    let parametre : any={};
    parametre.oper = this.dataenvoi.oper;
    parametre.idTerm = this.glb.IDTERM;
    parametre.session = this.glb.IDSESS;
    parametre.montant = this.envoiForm.controls['montant'].value.replace(/ /g, "");
    parametre.lieu = this.envoiForm.controls['idville'].value;
    this.envServ.afficheloading();
    this.envServ.posts('transfert/calculfrais.php',parametre,{}).then(data=>{
      this.envServ.dismissloadin();
      let reponse :any = JSON.parse(data.data);
      if(reponse.returnCode=='0'){
        this.envoiForm.controls['montant'].setValue(this.number.transform(parametre.montant));
        this.envoiForm.controls['mntTarif'].setValue(this.number.transform(reponse.mntTarif));
        let mttc :any = reponse.mntTarif*1 + parametre.montant*1;
        mttc+="";
        this.envoiForm.controls['montantTTC'].setValue(this.number.transform(mttc));
      }
      else this.envServ.showError(reponse.errorLabel);

    }).catch(err=>{
      this.envServ.dismissloadin();
      this.envServ.showError("Impossible d'atteindre le serveur");

    })

  }
  validerEnvoi(){
    let parametres:any= {};
    parametres.image = this.dataenvoi.image;
    parametres.oper = this.dataenvoi.oper;
    parametres.recharge={};
    parametres.recharge.montant = this.envoiForm.controls['montantTTC'].value;
    parametres.operation ='Envoi';
    parametres.denv = this.envoiForm.getRawValue();
    this.envServ.saisiecodepin(parametres).then(data=>{
      let value :any= data;
      parametres.session = this.glb.IDSESS;
      parametres.idTerm = this.glb.IDTERM;
      parametres.denv.pin = value.pin;
      //alert(JSON.stringify(parametres));
      this.envServ.afficheloading();
      this.envServ.posts('transfert/envoicash.php',parametres,{}).then(data=>{
        this.envServ.dismissloadin();
        let reponse:any=JSON.parse(data.data);
        if(reponse.returnCode=='0'){
          this.glb.recu = reponse;
          this.glb.HEADER.montant = this.number.transform(reponse.mntPlfap);
          this.glb.recu.guichet = this.glb.IDTERM.substring(5,6);
          this.glb.recu.agence = this.glb.HEADER.agence;
          this.glb.recu.dtTrx = this.formdate.transform(this.glb.recu.dtTrx);
          this.glb.recu.codTrans = this.formatcode.transform(this.glb.recu.codTrans, 3, ' ');
          this.glb.recu.operateur=this.dataenvoi.operateur;
          this.glb.recu.operation = 'ENVOI';
          this.glb.showRecu = true;

        }
        else {
          this.envServ.showError(reponse.errorLabel)
        }

      }).catch(err=>{
        this.envServ.dismissloadin();
        this.envServ.showError("impossible d'atteindre le serveur");
      })
    }).catch(err=>{

    })


  }


  ngOnInit(): void {
    console.log(this.dataenvoi.oper)
    if (this.dataenvoi.oper=='0007')
      this.envoiForm.controls['idville'].setValue(this.dataenvoi.idlieu);
    this.motifs=['Consommation courante',
      'Sante',
      'Education',
      'Investissement immobilier',
      'Autres investissements',
      'Epargne, tontine',
      'Evènements familiaux/religieux',
      'Autres']
  }




}
