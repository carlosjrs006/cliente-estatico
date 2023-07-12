import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendaListComponent } from './venda-list/venda-list.component';

const routes: Routes = [
  {
    path: '',
    component: VendaListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendaRoutingModule {}
