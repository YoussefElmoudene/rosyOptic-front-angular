import { Injectable } from '@angular/core';
import {Mesure} from "../model/mesure.model";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class MesureService {
  private _mesure: Mesure = new Mesure();
  private _mesures: Array<Mesure> = new Array<Mesure>();
  private _index: any;
  private urlBase = environment.apiUrl;
  private url = "mesure/mesure";
  constructor(private http: HttpClient, public datepipe: DatePipe) {}


  get mesure(): Mesure {
    if (!this._mesure){
      this._mesure = new Mesure();
    }
    return this._mesure;
  }

  set mesure(value: Mesure) {
    this._mesure = value;
  }

  get mesures(): Array<Mesure> {
    if(this._mesures == null){
      this._mesures = new Array<Mesure>();
    }
    return this._mesures;
  }

  set mesures(value: Array<Mesure>) {
    this._mesures = value;
  }


  public update(mesure: Mesure){
    this.mesure = this.clone(mesure);
  }


  public clone(mesure: Mesure): Mesure {
    const myClone: Mesure = new Mesure();
    myClone.id = mesure.id;
    myClone.sph = mesure.sph;
    myClone.prisme = mesure.prisme;
    myClone.oeil = mesure.oeil;
    myClone.distance = mesure.distance;
    myClone.cyl = mesure.cyl;
    myClone.axe = mesure.axe;
    myClone.client = mesure.client;

    return myClone;
  }

  public save() {
    if (this.mesure.id == 0){
      this.http.post(this.urlBase + this.url + '/' , this.mesure).subscribe(
        data => {
          this.mesures.push(this.clone(this.mesure));
        }, error => {
          console.log(error.error.message);
        });
    } else {
      this.http.post<number>(this.urlBase + this.url + '/', this.mesure).subscribe(
        data => {
          this._mesures[this._index] = this.clone(this.mesure); // update
        }, error => {
          console.log(error.error.message);
        });
    }
    this.mesure = new Mesure();
  }

}
