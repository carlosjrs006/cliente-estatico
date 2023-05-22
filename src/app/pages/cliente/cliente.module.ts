import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { CoreModule } from 'src/app/core/core.module';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { ClientEditComponent } from './client-edit/client-edit.component';
import { ClienteAddComponent } from './cliente-add/cliente-add.component';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { ClienteRoutingModule } from './cliente-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ClienteRoutingModule,
    SharedModule,
    CoreModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [
    ClienteListComponent,
    ClienteAddComponent,
    ClientEditComponent
  ],
  exports:[
    ClienteListComponent,
    ClienteAddComponent,
    ClientEditComponent
  ]
})
export class ClienteModule {}
