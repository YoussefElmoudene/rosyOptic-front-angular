import {Component, OnInit} from '@angular/core';
import {PaiementService} from "../../controller/service/paiement.service";
import {Paiement} from "../../controller/model/paiement";
import {NgbDropdown, NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-paiement-fournisseur',
  templateUrl: './paiement-fournisseur.component.html',
  styleUrls: ['./paiement-fournisseur.component.css']
})
export class PaiementFournisseurComponent implements OnInit {
  selected = 'option2';

  constructor(private paiementService: PaiementService) {
  }

  ngOnInit(): void {
    this.paiementService.findAll();
  }

  get paiement(): Paiement {
    return this.paiementService.paiement;
  }

  get paiements(): Array<Paiement> {
    return this.paiementService.paiements;
  }

  set paiements(value: Array<Paiement>) {
    this.paiementService.paiements = value;
  }


  public searchPaiement(searchTerm: string): void {
    const results: Paiement[] = [];
    for (const paiement1 of this.paiements) {
      if (paiement1.libelle.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        paiement1.reference.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        paiement1.fournisseur.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
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

  payRest(paiement: Paiement, index: number) {
    this.paiementService.update(paiement, index);
    this.paiement.totalPay = this.paiement.montantTotale;
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
}
