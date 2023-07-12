import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'clientes',
    loadChildren: () =>
      import('./pages/cliente/cliente.module').then((m) => m.ClienteModule),
  },
  {
    path: 'produtos',
    loadChildren: () =>
      import('./pages/produtos/produto.module').then((m) => m.ProdutoModule),
  },
  {
    path: 'caixa',
    loadChildren: () =>
      import('./pages/caixa/caixa.module').then((m) => m.CaixaModule),
  },
  {
    path: 'venda',
    loadChildren: () =>
      import('./pages/venda/venda.module').then((m) => m.VendaModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
