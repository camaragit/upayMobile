import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from "ionic-angular";

/**
 * Generated class for the PubliciteComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'publicite',
  templateUrl: 'publicite.html'
})
export class PubliciteComponent {

  message : any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private viewCrtl: ViewController) {
    this.message = this.navParams.get('val').notification.payload;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PublicitePage');
  }
  quitter(){
    this.viewCrtl.dismiss();
  }

}
