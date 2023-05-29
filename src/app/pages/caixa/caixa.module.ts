import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { CoreModule } from 'src/app/core/core.module';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { CaixaLivreComponent } from './caixa-livre/caixa-livre.component';
import { CaixaRoutingModule } from './caixa-routing.module';


@NgModule({
  imports: [
    CommonModule,
    CaixaRoutingModule,
    SharedModule,
    CoreModule,
    MaterialModule,
    FormsModule,
    DragDropModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [
   CaixaLivreComponent
  ],
  exports:[
    CaixaLivreComponent
  ]
})
export class CaixaModule {}
