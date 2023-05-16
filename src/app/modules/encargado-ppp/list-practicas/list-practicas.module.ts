import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListPracticasRoutingModule } from './list-practicas-routing.module';
import { ListarPracticasComponent } from './pages/listar-practicas/listar-practicas.component';


@NgModule({
  declarations: [
    ListarPracticasComponent
  ],
  imports: [
    CommonModule,
    ListPracticasRoutingModule
  ]
})
export class ListPracticasModule { }
