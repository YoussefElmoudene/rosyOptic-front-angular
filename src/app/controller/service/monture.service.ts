import { Injectable } from '@angular/core';
import {Monture} from "../model/monture";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {DatePipe} from "@angular/common";
import {Verres} from "../model/verres";

@Injectable({
  providedIn: 'root'
})
export class MontureService {
  private _monture: Monture = new Monture();
  private _montures: Array<Monture> = new Array<Monture>();
  private _index: any;
  private urlBase = environment.apiUrl;
  private url = "monture/monture";
  constructor(private http: HttpClient, public datepipe: DatePipe) {}


  get monture(): Monture {
    if (this._monture == null){
      this._monture = new Monture();
    }
    return this._monture;
  }

  set monture(value: Monture) {
    this._monture = value;
  }

  get montures(): Array<Monture> {
    if (!this._montures){
      this._montures = new Array<Monture>();
    }
    return this._montures;
  }

  set montures(value: Array<Monture>) {
    this._montures = value;
  }

  public update(monture: Monture){
    this.monture = this.clone(monture);
  }


  public clone(monture: Monture): Monture {
    const myClone: Monture = new Monture();
    myClone.id = monture.id;
    myClone.series = monture.series;
    myClone.sellingDate = monture.sellingDate;
    myClone.stock = monture.stock;
    myClone.price = monture.price;
    myClone.marque = monture.marque;
    myClone.modele = monture.modele;
    myClone.etat = monture.etat;
    myClone.fournisseur = monture.fournisseur;
    myClone.buyingDate = monture.buyingDate;
    myClone.priceTotale = monture.priceTotale;

    return myClone;
  }

  public save() {
    if (this.monture.id == 0){
      this.http.post(this.urlBase + this.url + '/' , this.monture).subscribe(
        data => {
          if (data === 0){
            this.montures.push(this.clone(this.monture));
          }else if (data == -1){
            alert("Error : Client n'existe pas !");
          }else {
            alert("Error : Fournisseur n'existe pas !");
          }
        }, error => {
          console.log(error);
        });
    } else {
      this.http.post<number>(this.urlBase + this.url + '/', this.monture).subscribe(
        data => {
          this._montures[this._index] = this.clone(this.monture); // update
        }, error => {
          console.log(error.error.message);
        });
    }
    this.monture = new Monture();
  }

  public findAll() {
    this.http.get<Array<Monture>>(this.urlBase + this.url + '/').subscribe(
      data => {
        this.montures = data;
      }, error => {
        console.log(error);
      }
    );
  }

}
