import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicacionNotasRoutingModule } from './publicacion-notas-routing.module';
import { NotasComponent } from './pages/notas/notas.component';


@NgModule({
  declarations: [
    NotasComponent
  ],
  imports: [
    CommonModule,
    PublicacionNotasRoutingModule
  ]
})
export class PublicacionNotasModule { }
