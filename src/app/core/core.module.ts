import { NgxMaskModule } from 'ngx-mask';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { ConfirmaDeleteComponent } from './components/confirma-delete/confirma-delete.component';
import { PeopleFormComponent } from './components/people-form/people-form.component';
import { OrganizationsFormComponent } from './components/organizations-form/organizations-form.component';
import { PublicFromComponent } from './components/public-from/public-from.component';
import { ModalErrorComponent } from './components/modal-error/modal-error.component';


@NgModule({
  imports: [CommonModule, SharedModule, NgxMaskModule.forRoot()],
  declarations: [SidebarComponent,ConfirmaDeleteComponent, PeopleFormComponent, OrganizationsFormComponent, PublicFromComponent, ModalErrorComponent],
  exports: [SidebarComponent,ConfirmaDeleteComponent,PeopleFormComponent,OrganizationsFormComponent,PublicFromComponent,ModalErrorComponent],

})
export class CoreModule {}
