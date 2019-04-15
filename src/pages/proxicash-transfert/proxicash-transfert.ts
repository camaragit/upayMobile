import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ServiceProvider} from "../../providers/service/service";
import {GlobalvariableProvider} from "../../providers/globalvariable/globalvariable";

/**
 * Generated class for the ProxicashTransfertPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-proxicash-transfert',
  templateUrl: 'proxicash-transfert.html',
})
export class ProxicashTransfertPage {
  private service;
  private datareception:any={};
  private dataenvoi:any={};
  private afficheenv:boolean=false;
  constructor(public serv:ServiceProvider,public glb:GlobalvariableProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.glb.showRecu =false;
    this.glb.recu={};
    this.service='Envoi';
    this.datareception.image = this.dataenvoi.image = this.glb.IMAGE_BASE_URL+"Icon-16.png";
    this.datareception.oper = this.dataenvoi.oper= '0080';
    this.datareception.operateur = this.dataenvoi.operateur='ProxiCash';
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL+"Petite-Icon-03.png";
    this.glb.HEADERTITELE.title = "Transfert d'argent";
   // this.relevelieux();

    console.log('ionViewDidLoad ProxicashPage');
  }
  relevelieux(){
    if (this.service=='Envoi'){
      this.afficheenv = false;
      this.serv.afficheloading();
      let parametre:any={
        'session': this.glb.IDSESS,
        'idTerm': this.glb.IDTERM,
        'oper': '0080'
      };
      this.serv.posts('transfert/getLieuxCash.php',parametre,{}).then(data=>{
        this.serv.dismissloadin();
        let reponse :any =JSON.parse(data.data);
        if(reponse.returnCode=='0'){
          this.dataenvoi.lieux = reponse.villes.ville;
          this.afficheenv =true;
          this.dataenvoi.oper='0080';
        }
        else{
          this.serv.showError(reponse.errorLabel);
          this.service='Réception';
        }

      }).catch(err=>{
        this.serv.dismissloadin();
        this.service='Réception';
        this.serv.showError("Impossible d'atteindre le serveur");
      })
    }

  }

}
