import { Injectable } from '@angular/core';
import {LunetteSoleil} from "../model/lunette-soleil";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class LunetteService {
  private _lunette: LunetteSoleil = new LunetteSoleil();
  private _lunettes: Array<LunetteSoleil> = new Array<LunetteSoleil>();
  private _index: any;
  private urlBase = environment.apiUrl;
  private url = "lunette-soleil/lunette-soleil";
  constructor(private http: HttpClient, public datepipe: DatePipe) {}


  get lunette(): LunetteSoleil {
    if (this._lunette == null){
      this._lunette = new LunetteSoleil();
    }
    return this._lunette;
  }

  set lunette(value: LunetteSoleil) {
    this._lunette = value;
  }

  get lunettes(): Array<LunetteSoleil> {
    if (this._lunettes == null){
      this._lunettes = new Array<LunetteSoleil>();
    }
    return this._lunettes;
  }

  set lunettes(value: Array<LunetteSoleil>) {
    this._lunettes = value;
  }

  public update(lunette: LunetteSoleil){
    this.lunette = this.clone(lunette);
  }


  public clone(lunette: LunetteSoleil) {
    const myClone: LunetteSoleil = new LunetteSoleil();
    myClone.id = lunette.id;
    myClone.totalPrice = lunette.totalPrice;
    myClone.series = lunette.series;
    myClone.sellingDate = lunette.sellingDate;
    myClone.qte = lunette.qte;
    myClone.price = lunette.price;
    myClone.marque = lunette.marque;
    myClone.fourisseur = lunette.fourisseur;
    myClone.etat = lunette.etat;
    myClone.client = lunette.client;
    myClone.buyingDate = lunette.buyingDate;
    return myClone;
  }

  public save() {
    if (this.lunette.id == 0){
      this.http.post(this.urlBase + this.url + '/' , this.lunette).subscribe(
        data => {
          this.lunettes.push(this.clone(this.lunette));
        }, error => {
          console.log(error.error.message);
        });
    } else {
      this.http.post<number>(this.urlBase + this.url + '/', this.lunette).subscribe(
        data => {
          this._lunettes[this._index] = this.clone(this.lunette); // update
        }, error => {
          console.log(error.error.message);
        });
    }
  }

}
