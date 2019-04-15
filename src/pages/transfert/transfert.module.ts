import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransfertPage } from './transfert';
import {HeaderComponent} from "../../components/header/header";
import {HeaderTitleComponent} from "../../components/header-title/header-title";

@NgModule({
  declarations: [
  //  TransfertPage, HeaderComponent,HeaderTitleComponent
  ],
  imports: [
    IonicPageModule.forChild(TransfertPage),
  ],
})
export class TransfertPageModule {}
