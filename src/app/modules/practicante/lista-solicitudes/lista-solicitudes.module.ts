import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaSolicitudesRoutingModule } from './lista-solicitudes-routing.module';
import { SolicitudesPostulacionComponent } from './pages/solicitudes-postulacion/solicitudes-postulacion.component';


@NgModule({
  declarations: [
    SolicitudesPostulacionComponent
  ],
  imports: [
    CommonModule,
    ListaSolicitudesRoutingModule
  ]
})
export class ListaSolicitudesModule { }
