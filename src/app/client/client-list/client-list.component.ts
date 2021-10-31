import {Component, OnInit} from '@angular/core';
import {ClientService} from "../../controller/service/client.service";
import {Client} from "../../controller/model/client";
import {Fournisseur} from "../../controller/model/fournisseur";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PaiementClientService} from "../../controller/service/paiement-client.service";
import {MesureService} from "../../controller/service/mesure.service";
import {Mesure} from "../../controller/model/mesure.model";
import {PaiementClient} from "../../controller/model/paiement-client.model";

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  constructor(private clientService: ClientService,
              private paiementService: PaiementClientService,
              private mesureService: MesureService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.clientService.findAll();
    // this.paiementService.findAll();
  }

  get clients(): Array<Client> {
    return this.clientService.clients;
  }

  get client(): Client {
    return this.clientService.client;
  }

  get mesures(): Array<Mesure> {
    return this.mesureService.mesures;
  }

  get paiements(): Array<PaiementClient> {
    return this.paiementService.paiements;
  }


  set paiements(value: Array<PaiementClient>) {
    this.paiementService.paiements = value;
  }

  set client(value: Client) {
    this.clientService.client = value;
  }


  public searchClients(searchTerm: string): void {
    const results: Client[] = [];
    for (const client of this.clients) {
      if (client.nom.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        client.prenom.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        client.adresse.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        client.email.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        client.tele.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)  {
        results.push(client);
      }
    }
    if (results.length === 0 || !searchTerm) {
      this.clientService.findAll();
    } else {
      this.clients.splice(0, this.clients.length);
      for (const item of results) {
        this.clients.push(item);
      }
    }
  }

  open(content: any , client: Client) {
    this.client = client;
    this.mesureService.findBYClient(client);
    // this.paiements = this.paiements.filter(p => p.client.prenom == client.prenom && p.client.nom == client.nom);
    this.paiementService.findBYClient(client);
    this.modalService.open(content, { size: 'xl' });
    console.log(this.paiements);
  }
}
