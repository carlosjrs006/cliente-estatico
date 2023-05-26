import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CaixaLivreComponent } from './caixa-livre/caixa-livre.component';




const routes: Routes = [
  {
    path: '',
    component: CaixaLivreComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CaixaRoutingModule {}
