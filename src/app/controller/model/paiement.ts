export class Paiement {

  public  id: number;
  public  reference: string;
  public  date: Date;
  public  libelle: string;
  public  montantTotale: number;
  public  totalPay: number;
  public  restAPay: number;

  constructor() {
    this.id = 0;
    this.reference = "";
    this.date = new Date()
    this.libelle = "";
    this.montantTotale = 0;
    this.totalPay = 0;
    this.restAPay = 0;
  }
}
