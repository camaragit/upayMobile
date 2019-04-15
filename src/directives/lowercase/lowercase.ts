import { Directive,EventEmitter, HostListener, Output } from '@angular/core';

/**
 * Generated class for the LowercaseDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
/*@Directive({
  selector: '[lowercase]' // Attribute selector
})
export class LowercaseDirective {

  constructor() {
    console.log('Hello LowercaseDirective Directive');
  }

}*/
@Directive({
  selector: '[ngModel][lowercase]'
})
export class LowercaseDirective {
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();
  value: any;

  @HostListener('input', ['$event']) onInputChange($event) {
    this.value = $event.target.value.toLowerCase();
    this.ngModelChange.emit(this.value);
  }
}
