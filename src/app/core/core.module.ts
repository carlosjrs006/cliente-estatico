import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';

import { SharedModule } from '../shared/shared.module';
import { ConfirmaDeleteComponent } from './components/confirma-delete/confirma-delete.component';
import { ModalErrorComponent } from './components/modal-error/modal-error.component';
import { OrganizationsFormComponent } from './components/organizations-form/organizations-form.component';
import { PeopleFormComponent } from './components/people-form/people-form.component';
import { PublicFromComponent } from './components/public-from/public-from.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';


@NgModule({
  imports: [CommonModule, SharedModule, NgxMaskModule.forRoot()],
  declarations: [SidebarComponent,ConfirmaDeleteComponent, PeopleFormComponent, OrganizationsFormComponent, PublicFromComponent, ModalErrorComponent],
  exports: [SidebarComponent,ConfirmaDeleteComponent,PeopleFormComponent,OrganizationsFormComponent,PublicFromComponent,ModalErrorComponent],

})
export class CoreModule {}
