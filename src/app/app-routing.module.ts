import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MenuComponent} from "./menu/menu.component";
import {ClientComponent} from "./client/client.component";
import {ClientListComponent} from "./client/client-list/client-list.component";
import {FournisseurComponent} from "./fournisseur/fournisseur.component";


export const components = [MenuComponent, /* 0 */
  ClientComponent /* 1 */,ClientListComponent /* 2 */,FournisseurComponent /* 3 */,
];

const routes: Routes = [
  {path: 'client', component: components[1]},
  {path: '', component: components[2]},
  {path: 'client-list', component: components[2]},
  {path: 'client-list/client', component: components[1]},
  {path: 'fournisseur', component: components[3]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
     ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
