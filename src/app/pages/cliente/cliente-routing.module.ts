import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientEditComponent } from './client-edit/client-edit.component';
import { ClienteAddComponent } from './cliente-add/cliente-add.component';
import { ClienteListComponent } from './cliente-list/cliente-list.component';


const routes: Routes = [
  {
    path: '',
    component: ClienteListComponent
  },
  {
    path: 'cadastro-cliente',
    component: ClienteAddComponent
  },
  {
    path: 'editar-cliente/:id',
    component: ClientEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClienteRoutingModule {}
