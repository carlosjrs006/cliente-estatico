import { NgxMaskModule } from 'ngx-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { EstoqueListComponent } from './cliente-list/estoque-list.component';
import { EstoqueRoutingModule } from './cliente-routing.module';
import { EstoqueAddComponent } from './estoque-add/estoque-add/estoque-add.component';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { CoreModule } from 'src/app/core/core.module';
import { ClientEditComponent } from './client-edit/client-edit.component';

@NgModule({
  imports: [
    CommonModule,
    EstoqueRoutingModule,
    SharedModule,
    CoreModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [
    EstoqueListComponent,
    EstoqueAddComponent,
    ClientEditComponent
  ],
  exports:[
    EstoqueListComponent,
    EstoqueAddComponent,
    ClientEditComponent
  ]
})
export class EstoqueModule {}
