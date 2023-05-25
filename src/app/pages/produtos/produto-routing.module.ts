import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProdutosAddComponent } from './produtos-add/produtos-add.component';
import { ProdutosEditComponent } from './produtos-edit/produtos-edit.component';
import { ProdutosListComponent } from './produtos-list/produtos-list.component';
import { GuardRotaGuard } from 'src/app/shared/guards/guard-rota.guard';


const routes: Routes = [
  {
    path: '',
    component: ProdutosListComponent,
    canActivate: [GuardRotaGuard], data: {requiredRoles: ['admin']}
  },
  {
    path: 'cadastro-produto',
    component: ProdutosAddComponent,
    canActivate: [GuardRotaGuard], data: {requiredRoles: ['admin', 'user']}
  },
  {
    path: 'editar-produto/:id',
    component: ProdutosEditComponent,
    canActivate: [GuardRotaGuard], data: {requiredRoles: ['admin', 'user']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProdutoRoutingModule {}
