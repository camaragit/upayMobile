import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import {AutoCompleteService} from "ionic2-auto-complete";
import 'rxjs/add/operator/map';

/*
  Generated class for the PaysProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PaysProvider implements AutoCompleteService{

  constructor(private http:Http) {
    console.log('Hello PaysProvider Provider');
  }

  formValueAttribute: any;
  labelAttribute: string;

  getItemLabel(item: any): any {
    //console.log(JSON.stringify(item.callingCodes))
    return item.name;
  }

/*  getResults(term: any): any {
  }*/
  getResults(keyword:string) {
    return this.http.get("https://restcountries.eu/rest/v2/name/"+keyword)
      .map(
        result =>
        {
          return result.json()
           // .filter(item => item.name.toLowerCase().startsWith(keyword.toLowerCase()) )
        });
  }

}






