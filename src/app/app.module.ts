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
import { FournisseurComponent } from './fournisseur/fournisseur.component';
import { ClientListComponent } from './client/client-list/client-list.component';

@NgModule({
  declarations: [
    components,
    AppComponent,
    CustomDatePipe,
    FournisseurComponent,
    ClientListComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    RouterTestingModule,
    HttpClientModule,
    AppBootstrapModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {}
