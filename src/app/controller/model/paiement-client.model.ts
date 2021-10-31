import {Client} from "./client";
import {Verres} from "./verres";
import {Monture} from "./monture";
import {LunetteSoleil} from "./lunette-soleil";

export class PaiementClient {
  public id: number = Number(0);
  public reference: string = String();
  public date: Date = new Date();
  public montantTotale:number = Number();
  public totalPay:number = Number();
  public restAPay:number = Number();
  public  remise: number = Number(0);
  public  montantFinale: number = Number(0);
  public client: Client = new Client();
  public verre: Verres = new Verres();
  public monturesList: Array<Monture> = new Array<Monture>();
  public lunetteList: Array<LunetteSoleil> = new Array<LunetteSoleil>();

}
