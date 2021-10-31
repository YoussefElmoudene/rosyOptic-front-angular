import {Fournisseur} from "./fournisseur";
import {Client} from "./client";

export class LunetteSoleil {
  public id: number;
  public marque: string;
  public series: string;
  public qte: number | undefined;// NB: chaque fois que un monture vendu qte--
  public price: number | undefined;
  public totalPrice: number;
  public etat: string; // vendu ou disponible ** disponible par defaut
  public buyingDate: Date;  // buy ***
  public sellingDate: Date | null; // sell possible null**
  public fournisseur: Fournisseur = new Fournisseur();

  constructor() {
    this.id = 0;
    this.marque = "";
    this.series = "";
    this.totalPrice = 0;
    this.etat = "disponible";
    this.buyingDate = new Date();
    this.sellingDate = null;
  }
}
