import {Component, Input, OnInit} from '@angular/core';
import {ServiceProvider} from "../../providers/service/service";
import {GlobalvariableProvider} from "../../providers/globalvariable/globalvariable";
import {MillierPipe} from "../../pipes/millier/millier";
import {FormatphonePipe} from "../../pipes/formatphone/formatphone";
import {FormatdatePipe} from "../../pipes/formatdate/formatdate";
import {CoupureChainePipe} from "../../pipes/coupure-chaine/coupure-chaine";

/**
 * Generated class for the EncaissementReleveComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'encaissement-releve',
  templateUrl: 'encaissement-releve.html'
})
export class EncaissementReleveComponent implements OnInit{
  @Input('dataencaissement') dataencaissement;
  private numfacture;
  private  factures:any;
  private listefactures:any;
  private hastel:boolean=true;
  private total:any;
  private nombreFacture:number=0;
  private facturescoches:any=[];
  private showdetails:boolean=false;
  private telephone;
  constructor(public formatdate:FormatdatePipe,public coupurechaine:CoupureChainePipe,public formatphone:FormatphonePipe,public serv:ServiceProvider,public glb:GlobalvariableProvider,public number:MillierPipe) {
    console.log('Hello EncaissementReleveComponent Component');
  }
reset(){
    this.numfacture='';
    this.showdetails=false;
      this.listefactures=this.facturescoches=[]; this.hastel=true;
      this.nombreFacture=0;
      this.telephone='';
      this.total=0;

}
vider(){
  this.showdetails=false;
  this.listefactures=this.facturescoches=[]; this.hastel=true;
  this.nombreFacture=0;
  this.telephone='';
  this.total=0;
}
  releve(){
    this.vider();
    let parametre:any= {};
    parametre.numpolice = this.numfacture;
    parametre.idTerm = this.glb.IDTERM;
    parametre.session = this.glb.IDSESS;
    parametre.oper = this.dataencaissement.oper;

    this.serv.afficheloading();
    this.serv.posts('encaissement/releve.php',parametre,{}).then(data=>{
      let reponse = JSON.parse(data.data);
     //alert(JSON.stringify(reponse));
      this.serv.dismissloadin();
      if(reponse!=false){
        if(reponse.returnCode=='0'){
          this.showdetails=true;
          this.nombreFacture=0;
          if(reponse.Factures.Facture.length){
            console.log('taillle possible');
            this.factures = reponse;
            this.factures.nomClient=reponse.NomClient;
            this.factures.numfacture= this.numfacture = reponse.IdClient;

            /*La aussi j'ai remarqué lorqu'il n'ya pas de date d'echeance et que j valide l'operation le serveur se plante c'est pour cela
             que je mets un champs text vide dans ce cas
             * */
            for (let i = 0; i < this.factures.Factures.Facture.length; i++) {
              this.factures.Factures.Facture[i].checked = false;
              //si la date d'echeance n'est pas definie
              if(typeof(this.factures.Factures.Facture[i].dateEch)==='object')
                this.factures.Factures.Facture[i].dateEch='';
              //  console.log(typeof(this.factures.Factures.Facture[i].dateEch));
              this.factures.Factures.Facture[i].id = i;

            }
          }
          /*Le cas d'une seule factures
           * alors je dois reformater ma variable $rooScope.factures pour mettre la factures dans un tableau*/
          else
          {
            this.factures={};
            this.factures.NomClient=reponse.NomClient;
            this.factures.IdClient= this.numfacture = reponse.IdClient;
            this.factures.NomOper=reponse.NomOper;
            this.factures.errorCode=reponse.errorCode;
            this.factures.errorLabel=reponse.errorLabel;
            this.factures.nbrFact=reponse.nbrFact;
            this.factures.returnCode=reponse.returnCode;
            this.factures.Factures={};

            if(parametre.oper=='0016')
            {
              if(typeof (reponse.Factures.Facture.telclient)!="object"){
                this.telephone=this.formatphone.transform(reponse.Factures.Facture.telclient);
                this.hastel=true;
              }
            }

            //c'est le tableau qui va contenir ma facture
            this.factures.Factures.Facture=[];
            this.factures.Factures.Facture.push(reponse.Factures.Facture);
            this.factures.Factures.Facture[0].checked = false;
            this.factures.Factures.Facture[0].id = 0;
            console.log('une seule facture',this.factures);
          }
          this.listefactures = this.factures.Factures.Facture;
          //Pour le cas de sde on recupere le numero de telephone
        //  alert(JSON.stringify(this.listefactures))
          if(parametre.oper=='0016')
          {
            if(typeof (this.listefactures[0].telclient)!="object"){
              this.telephone = this.listefactures[0].telclient;
            }
            else this.hastel=false;
          }
        }
        else this.serv.showError(reponse.errorLabel)
      }
      else   this.serv.showError('Pas de facture correspondant');


    }).catch(err=>{
      this.serv.dismissloadin();
      this.serv.showError("Impossible d'atteindre le serveur")

    })
  }
  handlechecking(id:number){
  //  this.listefactures[2].checked =false;

    this.total=0;
    this.listefactures[id].checked = !this.listefactures[id].checked;
    if(this.listefactures[id].checked)
    {
      if(this.nombreFacture==3){
        this.serv.showError("Désolé, Vous ne pouvez pas payez plus 3 factures");
        setTimeout(() => {
          this.listefactures[id].checked=false;
        }, 100);
      }
      else {
        this.nombreFacture++;
        this.facturescoches.push(this.listefactures[id])

      }
    }
    else{
      this.nombreFacture--;
      let j=0;
      while(this.facturescoches[j].id!=id && j<this.facturescoches.length)
        j++;
      this.facturescoches.splice(j,1);

    }
    for (let i = 0; i < this.listefactures.length; i++) {
      if (this.listefactures[i].checked) {
        this.total =this.total*1+ this.listefactures[i].mntFact*1;
      }
    }
    this.total = this.number.transform(this.total);
     // alert('coché')
   //else alert('non coche')
  }
  change(){
    console.log("tester")

  }
  changetel(){
    console.log('change')
    this.telephone=this.telephone.replace(/ /g, "");
    this.telephone=this.telephone.replace(/-/g, "");
    if(this.telephone.value && this.telephone.value.length>9)
      this.telephone=this.telephone.substring(0,9);

  }



  focustel(){
    console.log('focus')
    if(this.telephone)
    {
      this.telephone=this.telephone.replace(/ /g, "");
      this.telephone=this.telephone.replace(/-/g, "");

    }
  }
  blurtel(){
    this.telephone=this.formatphone.transform(this.telephone.replace(/-/g, ""));

  }

  validerEncaissement(){
    if(this.dataencaissement.oper=='0016')
    {
      if(!this.telephone || this.serv.verificationnumero(this.telephone))
      {
        this.serv.showError("Veuillez bien renseigner le numéro de téléphone du client");
        return false;
      }

    }
    let parametre:any={};
    parametre.infoclient ={};
    parametre.infoclient.nom = this.factures.NomClient;
    parametre.infoclient.idclient = this.factures.IdClient;
    parametre.infoclient.telclient = this.dataencaissement.oper=='0016'? this.telephone:"";
    parametre.image = this.dataencaissement.image;
    parametre.oper = this.dataencaissement.oper;
    parametre.recharge={};
    parametre.operation='Encaissement Facture';
    parametre.recharge.montant=this.total;
    parametre.recharge.frais="500";
    parametre.factures = this.facturescoches;
    parametre.nbrfact= this.nombreFacture;
    parametre.mnttotal = this.total.replace(/ /g, "");

    this.serv.saisiecodepin(parametre).then(data=>{
      let value:any=data;
      parametre.infoclient.pin=value.pin;
      parametre.idTerm=this.glb.IDTERM;
      parametre.session= this.glb.IDSESS;
      this.serv.afficheloading();
      //alert(JSON.stringify(parametre))
      this.serv.posts(this.dataencaissement.encaissementfile,parametre,{}).then(data=>{
        this.serv.dismissloadin();
        let reponse:any = JSON.parse(data.data);
       // alert(JSON.stringify(reponse))
        if(reponse.returnCode=='0'){
          this.glb.recu = reponse;
          if (!reponse.Factures.Facture.length) {
            this.glb.recu = {};
            this.glb.recu.Oper = this.dataencaissement.operateur;
            this.glb.recu.dtTrx = reponse.dtTrx;
            this.glb.recu.NomClient = reponse.NomClient;
            this.glb.recu.IdClient = reponse.IdClient;
            if(typeof(reponse.telClient)!="string")
            this.glb.recu.telClient="";
            this.glb.recu.telClient = reponse.telClient;
            this.glb.recu.nbrFact = reponse.nbrFact;
            this.glb.recu.mntTotal = reponse.mntTotal;
            this.glb.recu.mntFrais = reponse.mntFrais;
            this.glb.recu.mntTbr = reponse.mntTbr;
            this.glb.recu.mntPlfap = reponse.mntPlfap;
            this.glb.recu.mntFact = reponse.mntFact;
            this.glb.recu.Factures = {};
            this.glb.recu.Factures.Facture = [];
            this.glb.recu.Factures.Facture.push(reponse.Factures.Facture);

          }
          this.glb.recu.numTrx = reponse.numTrx;
          this.glb.recu.dtTrx = this.formatdate.transform(reponse.dtTrx);
          this.glb.recu.NomClient = this.coupurechaine.transform(reponse.NomClient);
          this.glb.recu.guichet = this.glb.IDTERM.substring(5,6);
          this.glb.recu.agence = this.glb.HEADER.agence;
          this.glb.showRecu=true;
          this.glb.HEADER.montant= this.number.transform(reponse.mntPlfap);
          this.glb.recu.Oper = this.dataencaissement.operateur;
        }
        else{
          this.serv.showError(reponse.errorLabel)
        }

      }).catch(err=>{
        this.serv.dismissloadin();
        this.serv.showError("Impossible d'atteindre le serveur")

      })

    }).catch(err=>{

    })
  }

  ngOnInit(): void {
    this.reset();
  }

}
