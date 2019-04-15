import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BluetoothSerial} from "@ionic-native/bluetooth-serial";
import {GlobalvariableProvider} from "../globalvariable/globalvariable";
import {AlertController, App, LoadingController, ModalController} from "ionic-angular";
import {HTTP} from "@ionic-native/http";
import {MillierPipe} from "../../pipes/millier/millier";
import {el} from "@angular/platform-browser/testing/src/browser_util";
import {ImprimantePage} from "../../pages/imprimante/imprimante";
import {Toast} from "@ionic-native/toast";

/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceProvider {
  loading: any;
  constructor(public toast:Toast,public app:App,public modalCrtl:ModalController,public number:MillierPipe,public loadingCtrl:LoadingController,public alertCtrl:AlertController,public CONST:GlobalvariableProvider,public http: HTTP,public bluetooth:BluetoothSerial,public glb:GlobalvariableProvider) {
    console.log('Hello ServiceProvider Provider');
  }
  padding(chaine,taillepadding){
    chaine=chaine+"";
    if (chaine.length>= taillepadding)
      return chaine;
    else
    {

      taillepadding-=chaine.length;

      for (var i=0; i<taillepadding ; i++ )
      {
        chaine+= " ";
      }
    }
    return chaine;

  }
  showToast(message){
    this.toast.showLongCenter(message).subscribe(value => {
      console.log(value)
    })
  }

  posts(service: string, body: any = {}, headers: any = {}): any {
    if(!this.glb.ISCONNECTED)
    {
      this.showToast("Veuillez revoir votre connexion internet !");
      this.dismissloadin();
      return;
    }
    else{
      let url = this.CONST.BASEURL+service;
      console.log(headers);
      console.log(url);
      console.log(body);
      this.http.setDataSerializer("json");
      this.http.setSSLCertMode("nocheck");
      return this.http.post(url, body, headers);
    }

  }

  rechercheperiph() {
    this.bluetooth.isConnected().then(err => {
      this.glb.notfound = true;
      this.glb.message = "Vous êtes deja connecté à une imprimante"
    }).catch(err => {

      this.bluetooth.isEnabled().then(vall => {
        this.afficheloading();
        this.bluetooth.discoverUnpaired().then(data => {
          this.dismissloadin();
          console.log("liste imp " + JSON.stringify(data));

          if (data.length <= 0) {
            this.glb.statusImpriamte = false;
            this.glb.notfound = true;
            this.glb.message = "Aucune imrpimante trouvée!"

          }
          else {
            this.glb.listeImprimantes = this.listeimprimanteAutorisees(data);
            if(this.glb.listeImprimantes.length <=0)
            {
              this.glb.statusImpriamte = false;
              this.glb.notfound = true;
              this.glb.message = "Aucune imrpimante trouvée!"
            }
            else
              this.glb.notfound = false;

          }

        })

      }).catch(err => {
        this.glb.statusImpriamte=false;
        this.dismissloadin();
        this.bluetooth.enable().then(act => {
          this.glb.statusImpriamte=false;
          this.glb.notfound=true;
          this.glb.message=""
        }).catch(err => {
          this.glb.notfound=true;
          this.glb.message=""
        })
      })
    })

  }

  liaison(id) {
    this.glb.liaisonreussie=false;
    this.afficheloading();
    this.bluetooth.connect(id).subscribe(data => {
      this.dismissloadin();
      this.glb.liaisonreussie=true;
      console.log("impression ok " + JSON.stringify(data))
      this.showToast("Liaison à l'imprimante réussie")
    },error2 => {
      this.dismissloadin();
      this.showError("Erreur lors de la liaison à l'imprimante veuillez réessayer ")
    })

  }
  linking(id){
    return new Promise( (resolve, reject) => {

      this.bluetooth.connect(id).subscribe(data => {
        this.dismissloadin();
        this.glb.liaisonreussie=true;
        console.log("impression ok " + JSON.stringify(data));
        resolve('ok')
        this.showToast("Liaison à l'imprimante réussie")
      },error2 => {
        this.dismissloadin();
        reject('nok')
        this.showError("Erreur lors de la liaison à l'imprimante veuillez réessayer ")
      })
    });
  }
  imprimer(text) {
    this.bluetooth.isConnected().then(d => {
      this.bluetooth.write(text).then(data => {
        let nav = this.app.getActiveNav();
        nav.pop();
        console.log("impression ok")

      }).catch(err => {
        this.showError("Erreur impression" + JSON.stringify(err))
      })
    }).catch(err=>{

      let mod= this.modalCrtl.create(ImprimantePage,{'text':text});
      mod.present();
      mod.onDidDismiss(d=>{

      })
    })

  }
  showAlert(message :string){
    let alert = this.alertCtrl.create({
      title: '<div class="success"><img style="width: 70%" src="assets/imgs/Icon-01.png"><br><b>'+message+'!</b> </div>',
      //subTitle: message,
      cssClass:'alertSucces',
      buttons: ['OK']
    });
    alert.present();

  }
  showError(message: string) {
    let alert = this.alertCtrl.create({
      title: '<div class="error"><img   src="assets/imgs/warning.png" ><br><b>'+message+'!</b> </div>',
/*
      subTitle: message,
*/

      buttons: ['OK']
    });
    alert.present();
  }
  showdetails(contenu:string){
    let alert = this.alertCtrl.create({
      title: '<div class="details"><img  src="assets/imgs/Icon-01.png" ><br><div><b>'+contenu+'</b> </div></div>',
      buttons: ['OK']
    });
    alert.present();
  }
  afficheloading() {
    if (!this.loading) {
      this.loading = this.loadingCtrl.create({
        content: 'Veuillez patienter...'
      });
      this.loading.present();
    }
    else this.loading.present();
  }
  dismissloadin() {
    if (this.loading) {
      this.loading.dismiss();
      this.loading = null;
    }
  }
  getplafond(){
    let parametre={'idPartn':this.glb.IDPART,'idTerm':this.glb.IDTERM,'session':this.glb.IDSESS}
    return this.posts('plafond/solde.php',parametre,{});
  }
  saisiecodepin(data) {
    return new Promise((resolve, reject) => {
      let ligneMontant="",lignetelephone="";
      let oper ="";
      if(data.operation)
        oper="<h3 align='center'><b>"+data.operation+"</b> </h3>";
      if(data.recharge.telephone)
      {
        if(data.recharge.oper=='0057' && data.recharge.sousop=='0002')
          lignetelephone="<h6>Numéro Badge : <font color='red'>"+data.recharge.telephone+"</font> </h6><br>";
        else{
          if(data.recharge.oper=='0029')
            lignetelephone="<h6>N° Compteur : <font color='red'>"+data.recharge.telephone+"</font> </h6><br>";
          else
          lignetelephone="<h6>Téléphone : <font color='red'>"+data.recharge.telephone+"</font> </h6><br>";

        }

      }
      if(data.recharge.montant)
      {
        if(data.recharge.frais)
        {
          let mttc:any=  data.recharge.montant.replace(/ /g, "")*1 + data.recharge.frais.replace(/ /g, "")*1;
          mttc+="";
          ligneMontant="<h6>Montant TTC : <font color='red'>"+this.number.transform(mttc)+"</font> </h6><br>";
        }
        else{
          ligneMontant="<h6>Montant TTC : <font color='red'>"+this.number.transform(data.recharge.montant)+"</font> </h6><br>";

        }
      }
      let alert = this.alertCtrl.create({
        title: '<img class="center" src="'+data.image+'" width="50%"/><br>'+oper,
        message:lignetelephone+ligneMontant,

        inputs: [
          {
            name: 'pin',
            placeholder: 'Saisir Code Pin',
            type:'tel'
          },

        ],
        buttons: [
          {
            text: 'Annuler',
            role: 'cancel',
            handler: data => {
              data.type='cancel';
              return reject(data);
            }
          },
          {
            text: 'Valider',
            handler: data => {
              data.type='valide';
              return resolve(data);
              // console.log(JSON.stringify(data))

            }
          }
        ]

      });

      alert.present();

    });
  }

   verificationnumero(telephone) {
     telephone=telephone.replace(/-/g, "");
     telephone=telephone.replace(/ /g, "");
     console.log('telephone '+telephone)
     let  numeroautorisé=['77','78','70','76'];
     let retour = numeroautorisé.indexOf(telephone.substring(0,2));
     return retour==-1;
  }
  getSoup(oper,codeSoup) {
    if(oper=="Tigo")
    {
      if(codeSoup=="2")
        return "CASHING TIGO";
      return "IZI";
    }
    else if(oper=="Orange"){
      if(codeSoup=="2")
        return "SEDDO";
      return "OM"
    }  else if(oper=="Expresso"){
      return "YAKALMA";
    }
    return oper;
  }
  listeimprimanteAutorisees(data) {
    var liste=[];

    for(let i=0;i<this.glb.ImprimanteAutorisee.length;i++)
    {
      for(let j=0;j<data.length;j++)
      {
        if(data[j].name.indexOf(this.glb.ImprimanteAutorisee[i])!=-1)
        {
          if(liste.indexOf(data[j])==-1)
            liste.push(data[j]);
        }
      }
    }

    return liste;
  }

}
