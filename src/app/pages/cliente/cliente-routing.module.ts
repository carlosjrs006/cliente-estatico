import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientEditComponent } from './client-edit/client-edit.component';
import { ClienteAddComponent } from './cliente-add/cliente-add.component';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { GuardRotaGuard } from 'src/app/shared/guards/guard-rota.guard';


const routes: Routes = [
  {
    path: '',
    component: ClienteListComponent,
    canActivate: [GuardRotaGuard], data: {requiredRoles: ['admin']}
  },
  {
    path: 'cadastro-cliente',
    component: ClienteAddComponent,
    canActivate: [GuardRotaGuard], data: {requiredRoles: ['admin', 'user']}
  },
  {
    path: 'editar-cliente/:id',
    component: ClientEditComponent,
    canActivate: [GuardRotaGuard], data: {requiredRoles: ['admin', 'user']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClienteRoutingModule {}
