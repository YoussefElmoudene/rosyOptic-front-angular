import {Component, OnInit} from '@angular/core';
import {ClientService} from "../../controller/service/client.service";
import {Client} from "../../controller/model/client";

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  constructor(private clientService: ClientService) {
  }

  ngOnInit(): void {
    this.clientService.findAll();
  }

  get clients(): Array<Client> {
    return this.clientService.clients;
  }

  public searchClients(searchTerm: string): void {
    const results: Client[] = [];
    for (const client of this.clients) {
      if (client.nom.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        client.prenom.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
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
}
