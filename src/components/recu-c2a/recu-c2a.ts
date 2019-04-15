import { Component } from '@angular/core';
import {GlobalvariableProvider} from "../../providers/globalvariable/globalvariable";

/**
 * Generated class for the RecuC2aComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'recu-c2a',
  templateUrl: 'recu-c2a.html'
})
export class RecuC2aComponent {

  text: string;

  constructor(public glb:GlobalvariableProvider) {
    console.log('Hello RecuC2aComponent Component');
    this.text = 'Hello World';
  }

}
