import { Component, OnInit } from '@angular/core';
import {FournisseurService} from "../controller/service/fournisseur.service";
import {MontureService} from "../controller/service/monture.service";
import {LunetteService} from "../controller/service/lunette.service";
import {PaiementService} from "../controller/service/paiement.service";
import {VerresService} from "../controller/service/verres.service";
import {ClientService} from "../controller/service/client.service";
import {LunetteSoleil} from "../controller/model/lunette-soleil";
import {Monture} from "../controller/model/monture";
import {Verres} from "../controller/model/verres";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  constructor(private fournisseurService: FournisseurService,
              private clientService: ClientService,
              private montureService: MontureService,
              private lunetteService: LunetteService,
              private verreService: VerresService) { }

  ngOnInit(): void {
    this.verreService.findAll();
    this.montureService.findAll();
    this.lunetteService.findAll();
  }

  get lunettes(): Array<LunetteSoleil> {
    return this.lunetteService.lunettes;
  }

  get montures(): Array<Monture> {
    return this.montureService.montures;
  }

  get verres(): Array<Verres> {
    return this.verreService.verres;
  }

}
