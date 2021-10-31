import {Fournisseur} from "./fournisseur";
import {Client} from "./client";
export class Verres {
  public  id=0;
  // @ts-ignore
  public  marque: string ;
  // @ts-ignore
  public  traitement: string ;
  // @ts-ignore
  public  price: number ;
  public fournisseur: Fournisseur = new Fournisseur();

}
