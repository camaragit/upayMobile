import {Component, Injector, ViewChild} from '@angular/core';
import {Content, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {GlobalvariableProvider} from "../../providers/globalvariable/globalvariable";
import {ServiceProvider} from "../../providers/service/service";

/**
 * Generated class for the ImprimantePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-imprimante',
  templateUrl: 'imprimante.html',
})

export class ImprimantePage {
  @ViewChild(Content) content: Content;
  selectedImp:any;
  textaimprimer:any
  serv:any;

  constructor(public viewCtrl: ViewController,public glb:GlobalvariableProvider,private injector:Injector,public navCtrl: NavController, public navParams: NavParams) {
    this.serv = this.injector.get(ServiceProvider)
    this.textaimprimer = navParams.get("text");
    this.rechercher();
  }
  rechercher(){
    this.serv.rechercheperiph();
  }

  lier(){
    this.serv.linking(this.selectedImp.id).then(data=>{
      console.log("data vaut "+data)
      if(this.glb.liaisonreussie==true)
      {

        this.serv.imprimer(this.textaimprimer);
        this.viewCtrl.dismiss();
        this.navCtrl.pop();
      }
    })


  }
  annuler(){
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
/*    setTimeout(()=>{
      let yOffset = document.getElementById(this.liste).offsetTop;
      this.content.scrollTo(0, yOffset, 500);
    }, 200);*/
    console.log('ionViewDidLoad ImprimantePage');
  }

}
