import { Injectable } from '@angular/core';
import {Verres} from "../model/verres";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class VerresService {
  private _verre: Verres = new Verres();
  private _verres: Array<Verres> = new Array<Verres>();
  private _index: any;
  private urlBase = environment.apiUrl;
  private url = "verres/verres";
  constructor(private http: HttpClient, public datepipe: DatePipe) {}


  get verre(): Verres {
    if(this._verre == null){
      this._verre = new Verres();
    }
    return this._verre;
  }

  set verre(value: Verres) {
    this._verre = value;
  }

  get verres(): Array<Verres> {
    if( this._verres == null){
      this._verres = new Array<Verres>();
    }
    return this._verres;
  }

  set verres(value: Array<Verres>) {
    this._verres = value;
  }


  public update(verre: Verres){
    this.verre = this.clone(verre);
  }


  public clone(verre: Verres) {
    const myClone: Verres = new Verres();
    myClone.id = verre.id;
    myClone.totalPrice = verre.totalPrice;
    myClone.series = verre.series;
    myClone.sellingDate = verre.sellingDate;
    myClone.qte = verre.qte;
    myClone.price = verre.price;
    myClone.marque = verre.marque;
    myClone.fourisseur = verre.fourisseur;
    myClone.etat = verre.etat;
    myClone.client = verre.client;
    myClone.buyingDate = verre.buyingDate;
    return myClone;
  }

  public save() {
    if (this.verre.id == 0){
      this.http.post(this.urlBase + this.url + '/' , this.verre).subscribe(
        data => {
          this.verres.push(this.clone(this.verre));
        }, error => {
          console.log(error.error.message);
        });
    } else {
      this.http.post<number>(this.urlBase + this.url + '/', this.verre).subscribe(
        data => {
          this._verres[this._index] = this.clone(this.verre); // update
        }, error => {
          console.log(error.error.message);
        });
    }
  }
}
