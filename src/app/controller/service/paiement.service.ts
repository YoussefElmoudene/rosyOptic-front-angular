import {Injectable} from '@angular/core';
import {Paiement} from "../model/paiement";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {DatePipe} from "@angular/common";
import {Monture} from "../model/monture";

@Injectable({
  providedIn: 'root'
})
export class PaiementService {
  private _paiement: Paiement = new Paiement();
  private _paiements: Array<Paiement> = new Array<Paiement>();
  private _index: any;
  private urlBase = environment.apiUrl;
  private url = "paiement-fornisseur/paiement-fornisseur";

  constructor(private http: HttpClient, public datepipe: DatePipe) {
  }


  get paiement(): Paiement {
    if (!this._paiement) {
      this._paiement = new Paiement();
    }
    return this._paiement;
  }

  set paiement(value: Paiement) {
    this._paiement = value;
  }

  get paiements(): Array<Paiement> {
    if (!this._paiements) {
      this._paiements = new Array<Paiement>();
    }
    return this._paiements;
  }

  set paiements(value: Array<Paiement>) {
    this._paiements = value;
  }


  public update(paiement: Paiement, index: number) {
    this.paiement = this.clone(paiement);
    this._index = index;
  }


  public clone(paiement: Paiement): Paiement {
    const myClone: Paiement = new Paiement();
    myClone.id = paiement.id;
    myClone.date = paiement.date;
    myClone.libelle = paiement.libelle;
    myClone.montantTotale = paiement.montantTotale;
    myClone.reference = paiement.reference;
    myClone.totalPay = paiement.totalPay;
    myClone.restAPay = paiement.restAPay;
    myClone.fournisseur = paiement.fournisseur;
    return myClone;
  }

  public save() {
    if (this.paiement.id == 0) {
      this.http.post(this.urlBase + this.url + '/', this.paiement).subscribe(
        data => {
          if (data == -1) {
            alert("Error: Selectionner un  fournisseur !");
          } else {
            this.paiements.push(this.clone(this.paiement));
          }
        }, error => {
          console.log(error.error.message);
        });
    } else {
      this.http.post<number>(this.urlBase + this.url + '/', this.paiement).subscribe(
        data => {
          this.paiements[this._index] = this.clone(this.paiement); // update
        }, error => {
          console.log(error.error.message);
        });
    }

  }

  public findAll() {
    this.http.get<Array<Paiement>>(this.urlBase + this.url + '/').subscribe(
      data => {
        this.paiements = data;
      }, error => {
        console.log(error);
      }
    );
  }
}
