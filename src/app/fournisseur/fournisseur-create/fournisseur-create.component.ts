import { Component, OnInit } from '@angular/core';
import {FournisseurService} from "../../controller/service/fournisseur.service";
import {Fournisseur} from "../../controller/model/fournisseur";

@Component({
  selector: 'app-fournisseur-create',
  templateUrl: './fournisseur-create.component.html',
  styleUrls: ['./fournisseur-create.component.css']
})
export class FournisseurCreateComponent implements OnInit {

  constructor(private fournisseurService: FournisseurService) { }

  ngOnInit(): void {
  }

  get fournisseur(): Fournisseur {
    return this.fournisseurService.fournisseur;
  }

  public save_fournisseur(){
    console.log(this.fournisseur);
    return this.fournisseurService.save();
  }
}
