import {Client} from "./client";

export class Mesure {
  public  id: number;
  public  distance: string; // loin pres
  public  oeil: string; // droite ou gouche
  public  axe: number | undefined;
  public  cyl: number| undefined;
  public  sph: number | undefined;
  public  prisme: number | undefined;
  public client:  Client;


  constructor() {
    this.id = 0;
    this.distance = 'Loin';
    this.oeil = 'oeil droite';
    this.client = new Client();
  }
}
