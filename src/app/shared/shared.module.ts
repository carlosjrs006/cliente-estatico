import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './modules/material.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
  ],
  declarations: [],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    HttpClientModule,
  ],
})
export class SharedModule {}
