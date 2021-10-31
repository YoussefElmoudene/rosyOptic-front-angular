import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {AppRoutingModule, components} from "./app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppBootstrapModule} from "./app-bootstrap.module";
import {CustomDatePipe} from "./controller/model/custom.datepipe";
import {DatePipe} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FournisseurComponent} from './fournisseur/fournisseur.component';
import {ClientListComponent} from './client/client-list/client-list.component';
import {FournisseurListComponent} from './fournisseur/fournisseur-list/fournisseur-list.component';
import {FournisseurCreateComponent} from './fournisseur/fournisseur-create/fournisseur-create.component';
import {MatSelectModule} from '@angular/material/select';
import {VerreComponent} from './article/verre/verre.component';
import {
  NgbDropdown,
  NgbModal,
  NgbModalConfig,
  NgbModule,
  NgbPagination,
  NgbPaginationModule
} from "@ng-bootstrap/ng-bootstrap";
import {ArticleComponent} from './article/article.component';
import {PaiementFournisseurComponent} from './paiement/paiement-fournisseur/paiement-fournisseur.component';
import {PaiementClientComponent} from './paiement/paiement-client/paiement-client.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {MatIconModule} from "@angular/material/icon";
import {NgxPrintModule} from "ngx-print";

@NgModule({
  declarations: [
    components,
    AppComponent,
    CustomDatePipe,
    FournisseurComponent,
    ClientListComponent,
    FournisseurListComponent,
    FournisseurCreateComponent,
    VerreComponent,
    ArticleComponent,
    PaiementFournisseurComponent,
    PaiementClientComponent,
  ],
  imports: [
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    BrowserModule,
    NgbPaginationModule,
    RouterTestingModule,
    HttpClientModule,
    AppBootstrapModule,
    MatIconModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    NgbModule,
    NgxPrintModule,
  ],
  exports: [MatSelectModule, NgbPaginationModule,
    MatIconModule,
    NgxPrintModule
  ],
  providers: [DatePipe, NgbModalConfig, NgbModal, NgbPagination, NgbDropdown],
  bootstrap: [AppComponent]
})
export class AppModule {
}
