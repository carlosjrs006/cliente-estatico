import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VendaListComponent } from './venda-list/venda-list.component';

@NgModule({
  imports: [CommonModule],
  declarations: [VendaListComponent],
  exports: [VendaListComponent],
})
export class VendaModule {}
