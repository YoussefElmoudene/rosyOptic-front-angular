import {Fournisseur} from "./fournisseur";
import {Client} from "./client";

export class Monture {
  public  id: number;
  public  marque: string;
  public  modele: string;
  public  series:string;
  public  etat: string; // vendu ou disponible ** disponible par defaut
  public  price : number | undefined;
  public  priceTotale: number; // auto calculated for same marques and series
  public  stock: number | undefined; // NB: chaque fois que un monture vendu stock--
  public  buyingDate: Date;  // buy ***
  public  sellingDate: Date | null; // sell possible null**
  public  fournisseur: Fournisseur;


  constructor() {
    this.id = 0;
    this.marque = "";
    this.modele = "";
    this.series = "";
    this.etat = "disponible";
    this.priceTotale = 0;
    this.buyingDate = new Date();
    this.sellingDate = null;
    this.fournisseur = new Fournisseur();
  }
}
