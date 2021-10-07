import { Injectable } from '@angular/core';
import {Client} from "../model/client";
import {HttpClient} from "@angular/common/http";
import {DatePipe} from "@angular/common";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private _client: Client = new Client();
  private _clients: Array<Client> = new Array<Client>();
  private _index: any;
  private urlBase = environment.apiUrl;
  private url = "client/client";

  get client(): Client {
    if (this._client == null){
      this._client = new Client();
    }
    return this._client;
  }

  set client(value: Client) {
    this._client = value;
  }

  get clients(): Array<Client> {
    if (this._clients == null){
      this._clients = new Array<Client>();
    }
    return this._clients;
  }

  set clients(value: Array<Client>) {
    this._clients = value;
  }

  constructor(private http: HttpClient, public datepipe: DatePipe) { }

  public clone(client: Client): Client{
    const myClone: Client = new Client();
    myClone.id = client.id;
    myClone.adresse = client.adresse;
    myClone.age = client.age;
    myClone.comments = client.comments;
    myClone.dateVisit = client.dateVisit;
    myClone.email = client.email;
    myClone.localite = client.localite;
    myClone.nom = client.nom;
    myClone.prenom = client.prenom;
    myClone.pays = client.pays;
    myClone.tele = client.tele;
    return myClone;
  }

  public update(index: number, client: Client) {
    this.client = this.clone(client);
    this._index = index;
  }

  public save() {
    if (this.client.id == 0){
      this.http.post(this.urlBase + this.url + '/' , this.client).subscribe(
        data => {
          this.clients.push(this.clone(this.client));
        }, error => {
          console.log(error);
        });
    } else {
      this.http.post<number>(this.urlBase + this.url + '/', this.client).subscribe(
        data => {
          this._clients[this._index] = this.clone(this.client); // update
        }, error => {
          console.log(error);
        });
    }
    this.client = new Client();
  }

  public findAll() {
    this.http.get<Array<Client>>(this.urlBase + this.url + '/').subscribe(
      data => {
        this.clients = data;
      }, error => {
        console.log(error);
      }
    );
  }
}
