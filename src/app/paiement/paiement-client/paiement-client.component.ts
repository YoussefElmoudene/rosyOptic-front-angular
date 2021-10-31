import { Component, OnInit } from '@angular/core';
import {Paiement} from "../../controller/model/paiement";
import {PaiementClientService} from "../../controller/service/paiement-client.service";
import {PaiementClient} from "../../controller/model/paiement-client.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Monture} from "../../controller/model/monture";
import {LunetteSoleil} from "../../controller/model/lunette-soleil";
import {Verres} from "../../controller/model/verres";

@Component({
  selector: 'app-paiement-client',
  templateUrl: './paiement-client.component.html',
  styleUrls: ['./paiement-client.component.css']
})
export class PaiementClientComponent implements OnInit {
  monture: Array<Monture> = new Array<Monture>();
  lunettes: Array<LunetteSoleil> = new Array<LunetteSoleil>();
  verre: Verres = new Verres();

  constructor(private paiementService: PaiementClientService,
              private modalService: NgbModal) { }


  ngOnInit(): void {
    this.paiementService.findAll();
  }

  get paiement(): PaiementClient {
    return this.paiementService.paiement;
  }

  get paiements(): Array<PaiementClient> {
    return this.paiementService.paiements;
  }

  set paiements(value: Array<PaiementClient>) {
    this.paiementService.paiements = value;
  }


  public searchPaiement(searchTerm: string): void {
    const results: PaiementClient[] = [];
    for (const paiement1 of this.paiements) {
      if (
        paiement1.reference.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        paiement1.client.prenom.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        paiement1.client.nom.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ) {
        results.push(paiement1);
      }
    }
    if (results.length === 0 || !searchTerm) {
      this.paiementService.findAll();
    } else {
      this.paiements.splice(0, this.paiements.length);
      for (const item of results) {
        this.paiements.push(item);
      }
    }
  }

  payRest(paiement: PaiementClient, index: number) {
    this.paiementService.update(paiement, index);
    this.paiement.totalPay = this.paiement.montantFinale;
    this.paiement.restAPay = 0;
    console.log(this.paiement);
    this.paiementService.save();

  }

  dataFilter(index: number) {
    if (index == 2) {
      this.paiements = this.paiements.filter(p => p.restAPay == 0);
    } else {
      this.paiements = this.paiements.filter(p => p.restAPay != 0);

    }

  }

  findAll() {
    this.paiementService.findAll();
  }
  open(content: any, paiement: PaiementClient) {
    this.monture = paiement.monturesList;
    this.lunettes = paiement.lunetteList;
    this.verre = paiement.verre;
    this.modalService.open(content);
  }
}
