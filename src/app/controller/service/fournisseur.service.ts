import { Injectable } from '@angular/core';
import {Fournisseur} from "../model/fournisseur";
import {environment} from "../../../environments/environment";
import {DatePipe} from "@angular/common";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {
  private _fournisseur: Fournisseur = new Fournisseur();
  private _fournisseurs: Array<Fournisseur> = new Array<Fournisseur>();
  private _index: any;
  private urlBase = environment.apiUrl;
  private url = "fournisseur/fournisseur";

  constructor(private http: HttpClient, public datepipe: DatePipe) { }

  get fournisseur(): Fournisseur {
    if (this._fournisseur == null){
      this._fournisseur = new Fournisseur();
    }
    return this._fournisseur;
  }

  set fournisseur(value: Fournisseur) {
    this._fournisseur = value;
  }

  get fournisseurs(): Array<Fournisseur> {
    if (this._fournisseurs == null){
      this._fournisseurs = new Array<Fournisseur>();
    }
    return this._fournisseurs;
  }

  set fournisseurs(value: Array<Fournisseur>) {
    this._fournisseurs = value;
  }

  public update(fournisseur: Fournisseur){
    this.fournisseur = this.clone(fournisseur);
  }


  public clone(fournisseur: Fournisseur) {
    const myClone: Fournisseur = new Fournisseur();
    myClone.id = fournisseur.id;
    myClone.adresse = fournisseur.adresse;
    myClone.email = fournisseur.email;
    myClone.fix = fournisseur.fix;
    myClone.localite = fournisseur.localite;
    myClone.name = fournisseur.name;
    myClone.pays = fournisseur.pays;
    myClone.remarques = fournisseur.remarques;
    myClone.siteWeb = fournisseur.siteWeb;
    myClone.telephone = fournisseur.telephone;
    return myClone;
  }

  public save() {
    if (this.fournisseur.id == 0){
      this.http.post(this.urlBase + this.url + '/' , this.fournisseur).subscribe(
        data => {
          this.fournisseurs.push(this.clone(this.fournisseur));
        }, error => {
          console.log(error.error.message);
        });
    } else {
      this.http.post<number>(this.urlBase + this.url + '/', this.fournisseur).subscribe(
        data => {
          this._fournisseurs[this._index] = this.clone(this.fournisseur); // update
        }, error => {
          console.log(error.error.message);
        });
    }
    this.fournisseur = new Fournisseur();
  }

  public findAll() {
    this.http.get<Array<Fournisseur>>(this.urlBase + this.url + '/').subscribe(
      data => {
        this.fournisseurs = data;
      }, error => {
        console.log(error);
      }
    );
  }
}
