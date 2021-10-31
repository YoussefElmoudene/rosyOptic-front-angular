import { Component, OnInit } from '@angular/core';
import {FournisseurService} from "../../controller/service/fournisseur.service";
import {Fournisseur} from "../../controller/model/fournisseur";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-fournisseur-list',
  templateUrl: './fournisseur-list.component.html',
  styleUrls: ['./fournisseur-list.component.css']
})
export class FournisseurListComponent implements OnInit {
  public fournisseur: Fournisseur = new Fournisseur();

  constructor(private fournisseurService: FournisseurService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.fournisseurService.findAll();
  }

  get fournisseurs(): Array<Fournisseur> {
    return this.fournisseurService.fournisseurs;
  }


  public searchfournisseurs(searchTerm: string): void {
    const results: Fournisseur[] = [];
    for (const fournisseur of this.fournisseurs) {
      if (fournisseur.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        fournisseur.telephone.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        fournisseur.adresse.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        fournisseur.email.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)  {
        results.push(fournisseur);
      }
    }
    if (results.length === 0 || !searchTerm) {
      this.fournisseurService.findAll();
    } else {
      this.fournisseurs.splice(0, this.fournisseurs.length);
      for (const item of results) {
        this.fournisseurs.push(item);
      }
    }
  }
  open(content: any , fournisseur: Fournisseur) {
    this.fournisseur = fournisseur;
    this.modalService.open(content, { size: 'xl' });
  }

}
