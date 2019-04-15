import { Component } from '@angular/core';

/**
 * Generated class for the ScrollComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'scroll',
  templateUrl: 'scroll.html'
})
export class ScrollComponent {

  text: string;

  constructor() {
    console.log('Hello ScrollComponent Component');
    this.text = 'Hello World';
  }

}
