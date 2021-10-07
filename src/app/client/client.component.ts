import { Component, OnInit } from '@angular/core';
import {ClientService} from "../controller/service/client.service";
import {MontureService} from "../controller/service/monture.service";
import {LunetteService} from "../controller/service/lunette.service";
import {VerresService} from "../controller/service/verres.service";
import {Client} from "../controller/model/client";
import {MesureService} from "../controller/service/mesure.service";
import {Mesure} from "../controller/model/mesure.model";


@Component({
  selector: 'app-client-component',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  public listMesure: Array<Mesure> = new Array<Mesure>();
  private nomClient = '';
  private prenomClient = '';

  constructor(private clientService: ClientService,
              private montureService: MontureService,
              private LunettesService: LunetteService,
              private mesureService: MesureService,
              private verreService: VerresService) { }

  ngOnInit(): void {
  }

  get client(): Client {
    return this.clientService.client;
  }

  get mesure(): Mesure {
    return this.mesureService.mesure;
  }

  public save_client(){
    this.nomClient = this.client.nom;
    this.prenomClient = this.client.prenom;
    return this.clientService.save();
  }

  public save_mesure(){
    this.mesure.client.nom = this.nomClient;
    this.mesure.client.prenom = this.prenomClient;
    return this.mesureService.save();
  }

}
