import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/cliente/cliente.module').then((m) => m.ClienteModule)
  },
  {
    path: 'produtos',
    loadChildren: () =>
      import('./pages/produtos/produto.module').then((m) => m.ProdutoModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
