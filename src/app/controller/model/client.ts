export class Client {
  public  id: number ;
  public  nom: string;
  public  prenom: string ;
  public  adresse: string ;
  public  localite: string ;
  public  pays: string ;
  public  tele: string ;
  public  email: string ;
  public  dateVisit: Date | undefined;
  public  comments: string;
  public  age:number| undefined ;


  constructor() {
    this.id = 0;
    this.nom = "";
    this.prenom = "";
    this.adresse = "";
    this.localite = "";
    this.pays = "Maroc";
    this.tele = "";
    this.email = "";
    this.comments = "";
  }

}
