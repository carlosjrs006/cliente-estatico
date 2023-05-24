import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutosAddComponent } from './produtos-add/produtos-add.component';
import { ProdutosListComponent } from './produtos-list/produtos-list.component';


const routes: Routes = [
  {
    path: '',
    component: ProdutosListComponent
  },
  {
    path: 'cadastro-produto',
    component: ProdutosAddComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProdutoRoutingModule {}
