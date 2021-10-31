import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {PaiementClient} from "../model/paiement-client.model";
import {HttpClient} from "@angular/common/http";
import {Paiement} from "../model/paiement";
import {Client} from "../model/client";
import {Mesure} from "../model/mesure.model";

@Injectable({
  providedIn: 'root'
})
export class PaiementClientService {
  private _paiement: PaiementClient = new PaiementClient();
  private _paiements: Array<PaiementClient> = new Array<PaiementClient>();
  private _index: any;
  private urlBase = environment.apiUrl;
  private url = "paiement-client/paiement-client";
  constructor(private http: HttpClient) { }


  get paiement(): PaiementClient {
    if (this._paiement == null){
      this._paiement = new PaiementClient();
    }
    return this._paiement;
  }

  set paiement(value: PaiementClient) {
    this._paiement = value;
  }

  get paiements(): Array<PaiementClient> {
    if (this._paiements == null){
      this._paiements = new Array<PaiementClient>();
    }
    return this._paiements;
  }

  set paiements(value: Array<PaiementClient>) {
    this._paiements = value;
  }

  public update(paiement: PaiementClient, index: number) {
    this.paiement = this.clone(paiement);
    this._index = index;
  }


  public clone(paiement: PaiementClient): PaiementClient {
    const myClone: PaiementClient = new PaiementClient();
    myClone.id = paiement.id;
    myClone.date = paiement.date;
    myClone.montantTotale = paiement.montantTotale;
    myClone.montantFinale = paiement.montantFinale;
    myClone.reference = paiement.reference;
    myClone.totalPay = paiement.totalPay;
    myClone.restAPay = paiement.restAPay;
    myClone.client = paiement.client;
    myClone.lunetteList = paiement.lunetteList;
    myClone.verre = paiement.verre;
    myClone.monturesList = paiement.monturesList;
    return myClone;
  }

  public save() {
    console.log(this.paiement);
    if (this.paiement.id == 0) {
      this.http.post(this.urlBase + this.url + '/', this.paiement).subscribe(
        data => {
          if (data == -1) {
            alert("Error: Selectionner un  client !");
          } else {
            this.paiements.push(this.clone(this.paiement));
          }
        }, error => {
          console.log(error);
        });
    } else {
      this.http.post<number>(this.urlBase + this.url + '/', this.paiement).subscribe(
        data => {
          this.paiements[this._index] = this.clone(this.paiement); // update
        }, error => {
          console.log(error);
        });
    }
    // this.paiement = new PaiementClient();
  }

  public findAll() {
    this.http.get<Array<PaiementClient>>(this.urlBase + this.url + '/').subscribe(
      data => {
        this.paiements = data;
      }, error => {
        console.log(error);
      }
    );
  }

  public findBYClient(client:Client){
    this.http.get<Array<PaiementClient>>(this.urlBase + this.url + '/nom/' + client.nom + '/prenom/' + client.prenom).subscribe(
      data => {
        this.paiements = data;
      },error => {
        console.log(error);
      }
    )
  }
}
