import {Component, OnInit} from '@angular/core';
import {ClientService} from "../controller/service/client.service";
import {MontureService} from "../controller/service/monture.service";
import {LunetteService} from "../controller/service/lunette.service";
import {VerresService} from "../controller/service/verres.service";
import {MesureService} from "../controller/service/mesure.service";
import {Mesure} from "../controller/model/mesure.model";
import {Client} from "../controller/model/client";
import {Monture} from "../controller/model/monture";
import {LunetteSoleil} from "../controller/model/lunette-soleil";
import {Verres} from "../controller/model/verres";
import {PaiementClientService} from "../controller/service/paiement-client.service";
import {PaiementClient} from "../controller/model/paiement-client.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-client-component',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  public listMesure: Array<Mesure> = new Array<Mesure>();
  private nomClient = 'moufid';
  private prenomClient = 'khalid';
  public client_print: Client = new Client();
  public paiement_print: PaiementClient = new PaiementClient();
  page = 1;
  pageSize = 4;
  totaleAPaye: number = Number(0);

  constructor(private clientService: ClientService,
              private montureService: MontureService,
              private lunettesService: LunetteService,
              private modalService: NgbModal,
              private paiementService: PaiementClientService,
              private mesureService: MesureService,
              private verreService: VerresService) {
  }

  ngOnInit(): void {
    this.montureService.findAll();
    this.verreService.findAll();
    this.lunettesService.findAll();
    this.client = new Client();
  }

  get client(): Client {
    return this.clientService.client;
  }


  set client(value: Client) {
    this.clientService.client = value;
  }

  get clients(): Array<Client> {
    return this.clientService.clients;
  }

  get mesure(): Mesure {
    return this.mesureService.mesure;
  }

  get mesures(): Array<Mesure> {
   return this.mesureService.mesures;
  }

  get montures(): Array<Monture> {
    return this.montureService.montures;
  }

  set montures(value: Array<Monture>) {
    this.montureService.montures = value;
  }

  get paiement(): PaiementClient {
    return this.paiementService.paiement;
  }


  set paiement(value: PaiementClient) {
    this.paiementService.paiement = value;
  }


  get lunettes(): Array<LunetteSoleil> {
    return this.lunettesService.lunettes;
  }

  get verres(): Array<Verres> {
    return this.verreService.verres;
  }


  public save_client() {
    this.nomClient = this.client.nom;
    this.prenomClient = this.client.prenom;
    return this.clientService.save();
  }

  public save_mesure() {
    this.mesure.client.nom = this.nomClient;
    this.mesure.client.prenom = this.prenomClient;
    return this.mesureService.save();
  }

  public save_paiement() {
    this.totaleAPaye = 0;
    if (this.paiement.montantFinale == 0){
      this.paiement.montantFinale = this.paiement.montantTotale;
    }
    this.paiement.restAPay = Number(this.paiement.montantFinale) - Number(this.paiement.totalPay);
    console.log(this.paiement);
    // this.paiementService.save();
    this.paiement_print = this.paiement;
    this.paiement = new PaiementClient();
    this.paiement.client = this.client_print;
  }


  selectChangeHandler(event: any) {
    this.paiement.client.id = event.target.value;
    this.clientService.findById(event.target.value).subscribe(
      data => {
        this.client_print = data;
        console.log(data);
        this.mesureService.findBYClient(data);
        this.paiement.client = this.client_print;
      },error => {
        console.log(error);
      }
    );
  }


  public searchMonture(searchTerm: string): void {
    const results: Monture[] = [];
    for (const monture of this.montures) {
      if (monture.marque.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        monture.series.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        monture.modele.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
        results.push(monture);
      }
    }
    if (results.length === 0 || !searchTerm) {
      this.montureService.findAll();
    } else {
      this.montures.splice(0, this.montures.length);
      for (const item of results) {
        this.montures.push(item);
      }
    }
  }

  public searchVerre(searchTerm: string): void {
    const results: Verres[] = [];
    for (const verre of this.verres) {
      if (verre.traitement.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        verre.marque.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        verre.fournisseur.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
        results.push(verre);
      }
    }
    if (results.length === 0 || !searchTerm) {
      this.verreService.findAll();
    } else {
      this.verres.splice(0, this.verres.length);
      for (const item of results) {
        this.verres.push(item);
      }
    }
  }


  public searchLunette(searchTerm: string): void {
    const results: LunetteSoleil[] = [];
    for (const lunette of this.lunettes) {
      if (lunette.series.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        lunette.marque.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        lunette.etat.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
        results.push(lunette);
      }
    }
    if (results.length === 0 || !searchTerm) {
      this.lunettesService.findAll();
    } else {
      this.lunettes.splice(0, this.lunettes.length);
      for (const item of results) {
        this.lunettes.push(item);
      }
    }
  }

  open(content: any) {
      this.modalService.open(content , { size: 'sm' });
  }
  open1(content: any) {
      this.modalService.open(content , { size: 'lg' });
  }

  calculeTotale(item: any, index: number) {
    this.paiement.montantTotale = Number(this.paiement.montantTotale) + Number(item.price);
    if (index == 1) {
      item.stock = Number(item.stock) - 1;
      this.paiement.monturesList.push({...item});
      this.montureService.update(item);
      this.montureService.save();
    } else if (index == 2) {
      this.paiement.verre = item;
      this.verreService.update(item);
      this.verreService.save();
    } else {
      item.qte = Number(item.qte) - 1;
      this.paiement.lunetteList.push({...item});
      this.lunettesService.update(item);
      this.lunettesService.save();
    }
  }

  calculemontantFinale(remise: number) {
    this.paiement.montantFinale = (this.paiement.montantTotale) - (this.paiement.montantTotale * remise);
  }
}
