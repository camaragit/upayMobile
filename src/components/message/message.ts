import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from "ionic-angular";

/**
 * Generated class for the MessageComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'message',
  templateUrl: 'message.html'
})
export class MessageComponent {
  message : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private viewCrtl:ViewController) {
    this.message = this.navParams.get('val').notification.payload;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagePage');
  }
  quitter(){
    this.viewCrtl.dismiss();
  }

}
