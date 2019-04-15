import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GrobalvariableProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalvariableProvider {
 public IMAGE_BASE_URL                 = "assets/imgs/";
 //  public BASEURL                    = "https://atps93.dyndns.org:19670/";
  public BASEURL                    = "https://mobile.atps.sn:19660/";
 // public BASEURL                     = "https://proximo.dyndns.org:19670/";
//  public BASEURL                        = "http://192.168.0.93/atpswebservice/proximo/";
 public IDPART                         = "";
 public IDSESS                         = "";
 public IDTERM                         = "";
 public ISCONNECTED          : boolean = true;
 public HEADER               : any     = {agence:'cp10105',montant:'10 000',numcompte:'',consomme:''}
 public HEADERTITELE                   = {title : '',src:''}
 public recu                 : any;
 public notfound               = false;
 public message                = "";
 public minenlevement    : any = 200000;
 public listeImprimantes : any;
 public statusImpriamte        = false;
 public showRecu               = false;
 public liaisonreussie:boolean = false;
 public  ImprimanteAutorisee   = ['MPT','MTP','SPP-R','P25','InnerPrinter','WizarPOS_Printer','Blue M100A'];


  constructor(public http: HttpClient) {
    console.log('Hello GrobalvariableProvider Provider');
  }

}
