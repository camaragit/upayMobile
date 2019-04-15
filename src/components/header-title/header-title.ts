import { Component } from '@angular/core';
import {GlobalvariableProvider} from "../../providers/globalvariable/globalvariable";

/**
 * Generated class for the HeaderTitleComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'header-title',
  templateUrl: 'header-title.html'
})
export class HeaderTitleComponent {

  text: string;

  constructor(public glb:GlobalvariableProvider) {
    console.log('Hello HeaderTitleComponent Component');
    this.text = 'Hello World';
  }

}
