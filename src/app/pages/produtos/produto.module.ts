import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { CoreModule } from 'src/app/core/core.module';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProdutosAddComponent } from './produtos-add/produtos-add.component';
import { ProdutoRoutingModule } from './produto-routing.module';
import { ProdutosListComponent } from './produtos-list/produtos-list.component';



@NgModule({
  imports: [
    CommonModule,
    ProdutoRoutingModule,
    SharedModule,
    CoreModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [
    ProdutosAddComponent,
    ProdutosListComponent
  ],
  exports:[
    ProdutosAddComponent,
    ProdutosListComponent
  ]
})
export class ProdutoModule {}
