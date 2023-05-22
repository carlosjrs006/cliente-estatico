import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstoqueAddComponent } from './estoque-add/estoque-add/estoque-add.component';
import { EstoqueListComponent } from './cliente-list/estoque-list.component';
import { ClientEditComponent } from './client-edit/client-edit.component';


const routes: Routes = [
  {
    path: '',
    component: EstoqueListComponent
  },
  {
    path: 'cadastro-cliente',
    component: EstoqueAddComponent
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
export class EstoqueRoutingModule {}
