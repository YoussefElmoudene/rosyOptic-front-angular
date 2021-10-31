import {Injectable} from '@angular/core';
import {Verres} from "../model/verres";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {DatePipe} from "@angular/common";
import {Client} from "../model/client";

@Injectable({
  providedIn: 'root'
})
export class VerresService {
  private _verre: Verres = new Verres();
  private _verres: Array<Verres> = new Array<Verres>();
  private _index: any;
  private urlBase = environment.apiUrl;
  private url = "verres/verres";

  constructor(private http: HttpClient, public datepipe: DatePipe) {
  }


  get verre(): Verres {
    if (this._verre == null) {
      this._verre = new Verres();
    }
    return this._verre;
  }

  set verre(value: Verres) {
    this._verre = value;
  }

  get verres(): Array<Verres> {
    if (this._verres == null) {
      this._verres = new Array<Verres>();
    }
    return this._verres;
  }

  set verres(value: Array<Verres>) {
    this._verres = value;
  }


  public update(verre: Verres) {
    this.verre = this.clone(verre);
  }


  public clone(verre: Verres) {
    const myClone: Verres = new Verres();
    myClone.id = verre.id;
    myClone.traitement = verre.traitement;
    myClone.price = verre.price;
    myClone.marque = verre.marque;
    myClone.fournisseur = verre.fournisseur;
    return myClone;
  }

  public save() {
    if (this.verre.id == 0) {
      this.http.post(this.urlBase + this.url + '/', this.verre).subscribe(
        data => {
          if (data == -1) {
            alert("Error: svp ajouter un fournisseur");
          } else {
            this.verres.push(this.clone(this.verre));
          }
        }, error => {
          console.log(error);
        });
    } else {
      this.http.post<number>(this.urlBase + this.url + '/', this.verre).subscribe(
        data => {
          this.verres[this._index] = this.clone(this.verre); // update
        }, error => {
          console.log(error.error.message);
        });
    }
    this.verre = new Verres();
  }

  public findAll() {
    this.http.get<Array<Verres>>(this.urlBase + this.url + '/').subscribe(
      data => {
        this.verres = data;
      }, error => {
        console.log(error);
      }
    );
  }
}
