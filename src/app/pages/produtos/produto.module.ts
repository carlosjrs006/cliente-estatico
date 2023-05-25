import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { CoreModule } from 'src/app/core/core.module';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CurrentyFormatPipe } from 'src/app/shared/utils/pipe/currenty-format.pipe';

import { ProdutoRoutingModule } from './produto-routing.module';
import { ProdutosAddComponent } from './produtos-add/produtos-add.component';
import { ProdutosEditComponent } from './produtos-edit/produtos-edit.component';
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
    ProdutosListComponent,
    CurrentyFormatPipe,
    ProdutosEditComponent
  ],
  exports:[
    ProdutosAddComponent,
    ProdutosListComponent,
    ProdutosEditComponent
  ]
})
export class ProdutoModule {}
