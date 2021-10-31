export class Fournisseur {
  public  id:number;
  public  name: string;
  public  adresse: string;
  public  localite:string;
  public  pays:string;
  public  siteWeb:string;
  public  email:string;
  public  telephone:string;
  public  fix:string;
  public  remarques:string | undefined;


  constructor() {
    this.id = 0;
    this.name = "";
    this.adresse = "";
    this.localite = "";
    this.pays = "maroc";
    this.siteWeb = "";
    this.email = "";
    this.telephone = "";
    this.fix = "";
  }
}
