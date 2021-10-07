import {Fournisseur} from "./fournisseur";
import {Client} from "./client";

export class Verres {
  public  id: number;
  public  marque: string;
  public  series: string;
  public  qte: number;
  public  price: number;
  public  totalPrice: number;
  public  etat: string;
  public  buyingDate: Date;
  public  sellingDate: Date;
  public fourisseur: Fournisseur = new Fournisseur();
  public client:Client = new Client();


  constructor() {
    this.id = 0;
    this.marque = "";
    this.series = "";
    this.qte = 0;
    this.price = 0;
    this.totalPrice = 0;
    this.etat = "";
    this.buyingDate = new Date();
    this.sellingDate = new Date();
  }
}
