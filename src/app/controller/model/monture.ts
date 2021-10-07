import {Fournisseur} from "./fournisseur";
import {Client} from "./client";

export class Monture {
  public  id: number;
  public  barCode: number;
  public  marque: string;
  public  modele: string;
  public  series:string;
  public  etat: string; // vendu ou disponible ** disponible par defaut
  public  prix: number;
  public  priceTotale: number; // auto calculated for same marques and series
  public  stock: number; // NB: chaque fois que un monture vendu stock--
  public  buyingDate: Date;  // buy ***
  public  sellingDate: Date; // sell possible null**
  public  fournisseur: Fournisseur;
  public  client: Client;


  constructor() {
    this.id = 0;
    this.barCode = 0;
    this.marque = "";
    this.modele = "";
    this.series = "";
    this.etat = "disponible";
    this.prix = 0;
    this.priceTotale = 0;
    this.stock = 0;
    this.buyingDate = new Date();
    this.sellingDate = new Date();
    this.fournisseur = new Fournisseur();
    this.client = new Client();
  }
}
