import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MenuComponent} from "./menu/menu.component";
import {ClientComponent} from "./client/client.component";
import {ClientListComponent} from "./client/client-list/client-list.component";
import {FournisseurComponent} from "./fournisseur/fournisseur.component";
import {FournisseurListComponent} from "./fournisseur/fournisseur-list/fournisseur-list.component";
import {FournisseurCreateComponent} from "./fournisseur/fournisseur-create/fournisseur-create.component";
import {ArticleComponent} from "./article/article.component";
import {PaiementClientComponent} from "./paiement/paiement-client/paiement-client.component";
import {PaiementFournisseurComponent} from "./paiement/paiement-fournisseur/paiement-fournisseur.component";


export const components = [MenuComponent, /* 0 */
  ClientComponent /* 1 */,ClientListComponent /* 2 */,FournisseurComponent /* 3 */,
  FournisseurListComponent /* 4 */,FournisseurCreateComponent /* 5 */,
  ArticleComponent /* 6 */, PaiementClientComponent /* 7 */ ,
  PaiementFournisseurComponent /* 8 */,
];

const routes: Routes = [
  {path: 'client', component: components[1]},
  {path: '', component: components[2]},
  {path: 'client-list', component: components[2]},
  {path: 'client-list/client', component: components[1]},
  {path: 'fournisseur', component: components[3]},
  {path: 'fournisseur/fournisseur-create', component: components[5]},
  {path: 'fournisseur-create', component: components[5]},
  {path: 'fournisseur-list', component: components[4]},
  {path: 'fournisseur-list/fournisseur-create', component: components[5]},
  {path: 'fournisseur-list/fournisseur/fournisseur-create', component: components[5]},
  {path: 'articles', component: components[6]},
  {path: 'paiement-fournisseur', component: components[8]},
  {path: 'paiement-client', component: components[7]},
  {path: 'articles/fournisseur', component: components[3]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
     ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
