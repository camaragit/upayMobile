import {Component, Input} from '@angular/core';
import {GlobalvariableProvider} from "../../providers/globalvariable/globalvariable";
import {NavController} from "ionic-angular";
import {EtatPlafondPage} from "../../pages/compte/etat-plafond/etat-plafond";
import {HomePage} from "../../pages/home/home";

/**
 * Generated class for the HeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'headerComp',
  templateUrl: 'header.html'
})
export class HeaderComponent {
  @Input('header') header_data;
  set header(header_data: any) {
    this.header_data = header_data;
  }

  get header() {
    return this.header_data;
  }

  text: string;

  constructor(public glb:GlobalvariableProvider,public navCtrl:NavController) {
    console.log('Hello HeaderComponent Component');
    this.text = 'Hello World';
  }
  getPlafond(){
    let view =this.navCtrl.getActive();
    if ( view.instance instanceof EtatPlafondPage ){
    }else
    this.navCtrl.push(EtatPlafondPage)
  }
  vershome(){
    this.navCtrl.setRoot(HomePage)
  }

}
