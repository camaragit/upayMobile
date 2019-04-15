import { Directive } from '@angular/core';

/**
 * Generated class for the MadirectiveDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[madirective]' // Attribute selector
})
export class MadirectiveDirective {

  constructor() {
    console.log('Hello MadirectiveDirective Directive');
  }

}
