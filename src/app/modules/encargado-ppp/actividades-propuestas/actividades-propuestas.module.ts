import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActividadesPropuestasRoutingModule } from './actividades-propuestas-routing.module';
import { ActividadComponent } from './pages/actividad/actividad.component';


@NgModule({
  declarations: [
    ActividadComponent
  ],
  imports: [
    CommonModule,
    ActividadesPropuestasRoutingModule
  ]
})
export class ActividadesPropuestasModule { }
