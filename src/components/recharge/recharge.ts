import {Component, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ServiceProvider} from "../../providers/service/service";
import {GlobalvariableProvider} from "../../providers/globalvariable/globalvariable";
import {MillierPipe} from "../../pipes/millier/millier";
import {RechargeProvider} from "../../providers/recharge/recharge";
import {FormatphonePipe} from "../../pipes/formatphone/formatphone";

/**
 * Generated class for the RechargeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'recharge',
  templateUrl: 'recharge.html'
})
export class RechargeComponent {
  private rechargeForm :FormGroup;

  @Input('datarecharge') datarecharge;

  constructor(public formatphone:FormatphonePipe,public rechargeServ:RechargeProvider,public number:MillierPipe,public formbuilder:FormBuilder,public serv:ServiceProvider,public glb:GlobalvariableProvider) {
    this.rechargeForm = this.formbuilder.group({
      telephone: ['', Validators.required],
      montant: ['', Validators.required],
      oper: [''],
      pin: [''],

    })

  }
  changetel(){
    console.log('change')
    this.rechargeForm.controls['telephone'].setValue(this.rechargeForm.controls['telephone'].value.replace(/ /g, ""));
    this.rechargeForm.controls['telephone'].setValue(this.rechargeForm.controls['telephone'].value.replace(/-/g, ""));
    if(this.rechargeForm.controls['telephone'].value.length>9)
      this.rechargeForm.controls['telephone'].setValue(this.rechargeForm.controls['telephone'].value.substring(0,9));
  }
  changemontant(){

      if(this.rechargeForm.controls['montant'].value)
      {
        this.rechargeForm.controls['montant'].setValue(this.rechargeForm.controls['montant'].value.replace(/ /g, ""));
        this.rechargeForm.controls['montant'].setValue(this.rechargeForm.controls['montant'].value.replace(/-/g, ""))
        this.rechargeForm.controls['montant'].setValue(this.number.transform(this.rechargeForm.controls['montant'].value));

      }

  }
  focustel(){
    console.log('focus')
    if(this.rechargeForm.controls['telephone'].value)
    {
      this.rechargeForm.controls['telephone'].setValue(this.rechargeForm.controls['telephone'].value.replace(/ /g, ""));
      this.rechargeForm.controls['telephone'].setValue(this.rechargeForm.controls['telephone'].value.replace(/-/g, ""));

    }
  }
  blurtel(){

    this.rechargeForm.controls['telephone'].setValue(this.formatphone.transform(this.rechargeForm.controls['telephone'].value));

  }
  recharger(){
      this.rechargeForm.controls['oper'].setValue(this.datarecharge.oper);
      let data :any={};
      data.recharge = this.rechargeForm.getRawValue();
      data.image = this.datarecharge.image;
      data.operation = this.datarecharge.operation;
      data.operateur = this.datarecharge.operateur;
      this.rechargeServ.recharger(data);
  }


}
